<?php
declare(strict_types=1);

// Scryfall SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

class ScryfallSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new ScryfallUtility();
        $this->_utility = $utility;

        $config = ScryfallConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features from config.
        $feature_opts = ScryfallHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $items = Struct::items($feature_opts);
            if ($items) {
                foreach ($items as $item) {
                    $fname = $item[0];
                    $fopts = ScryfallHelpers::to_map($item[1]);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, ScryfallFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return ScryfallUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = ScryfallHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = ScryfallHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = ScryfallHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new ScryfallSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = ScryfallHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = ScryfallHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_bulk_data = null;

    // Idiomatic facade: $client->bulk_data()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias BulkData() (PHP method
    // names are case-insensitive).
    public function bulk_data($data = null)
    {
        require_once __DIR__ . '/entity/bulk_data_entity.php';
        if ($data === null) {
            if ($this->_bulk_data === null) {
                $this->_bulk_data = new BulkDataEntity($this, null);
            }
            return $this->_bulk_data;
        }
        return new BulkDataEntity($this, $data);
    }


    private $_card = null;

    // Idiomatic facade: $client->card()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Card() (PHP method
    // names are case-insensitive).
    public function card($data = null)
    {
        require_once __DIR__ . '/entity/card_entity.php';
        if ($data === null) {
            if ($this->_card === null) {
                $this->_card = new CardEntity($this, null);
            }
            return $this->_card;
        }
        return new CardEntity($this, $data);
    }


    private $_card_list = null;

    // Idiomatic facade: $client->card_list()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias CardList() (PHP method
    // names are case-insensitive).
    public function card_list($data = null)
    {
        require_once __DIR__ . '/entity/card_list_entity.php';
        if ($data === null) {
            if ($this->_card_list === null) {
                $this->_card_list = new CardListEntity($this, null);
            }
            return $this->_card_list;
        }
        return new CardListEntity($this, $data);
    }


    private $_card_symbol_list = null;

    // Idiomatic facade: $client->card_symbol_list()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias CardSymbolList() (PHP method
    // names are case-insensitive).
    public function card_symbol_list($data = null)
    {
        require_once __DIR__ . '/entity/card_symbol_list_entity.php';
        if ($data === null) {
            if ($this->_card_symbol_list === null) {
                $this->_card_symbol_list = new CardSymbolListEntity($this, null);
            }
            return $this->_card_symbol_list;
        }
        return new CardSymbolListEntity($this, $data);
    }


    private $_catalog = null;

    // Idiomatic facade: $client->catalog()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Catalog() (PHP method
    // names are case-insensitive).
    public function catalog($data = null)
    {
        require_once __DIR__ . '/entity/catalog_entity.php';
        if ($data === null) {
            if ($this->_catalog === null) {
                $this->_catalog = new CatalogEntity($this, null);
            }
            return $this->_catalog;
        }
        return new CatalogEntity($this, $data);
    }


    private $_mana_cost = null;

    // Idiomatic facade: $client->mana_cost()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias ManaCost() (PHP method
    // names are case-insensitive).
    public function mana_cost($data = null)
    {
        require_once __DIR__ . '/entity/mana_cost_entity.php';
        if ($data === null) {
            if ($this->_mana_cost === null) {
                $this->_mana_cost = new ManaCostEntity($this, null);
            }
            return $this->_mana_cost;
        }
        return new ManaCostEntity($this, $data);
    }


    private $_migration = null;

    // Idiomatic facade: $client->migration()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Migration() (PHP method
    // names are case-insensitive).
    public function migration($data = null)
    {
        require_once __DIR__ . '/entity/migration_entity.php';
        if ($data === null) {
            if ($this->_migration === null) {
                $this->_migration = new MigrationEntity($this, null);
            }
            return $this->_migration;
        }
        return new MigrationEntity($this, $data);
    }


    private $_ruling = null;

    // Idiomatic facade: $client->ruling()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Ruling() (PHP method
    // names are case-insensitive).
    public function ruling($data = null)
    {
        require_once __DIR__ . '/entity/ruling_entity.php';
        if ($data === null) {
            if ($this->_ruling === null) {
                $this->_ruling = new RulingEntity($this, null);
            }
            return $this->_ruling;
        }
        return new RulingEntity($this, $data);
    }


    private $_set = null;

    // Idiomatic facade: $client->set()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Set() (PHP method
    // names are case-insensitive).
    public function set($data = null)
    {
        require_once __DIR__ . '/entity/set_entity.php';
        if ($data === null) {
            if ($this->_set === null) {
                $this->_set = new SetEntity($this, null);
            }
            return $this->_set;
        }
        return new SetEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new ScryfallSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
