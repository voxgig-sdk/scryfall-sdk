<?php
declare(strict_types=1);

// CardSymbolList entity test

require_once __DIR__ . '/../scryfall_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class CardSymbolListEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = ScryfallSDK::test(null, null);
        $ent = $testsdk->CardSymbolList(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "card_symbol_list" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = ScryfallSDK::test($seed, null);
        $seen = iterator_to_array($base->CardSymbolList(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = ScryfallConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = ScryfallSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->CardSymbolList(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = card_symbol_list_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "card_symbol_list." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set SCRYFALL_TEST_CARD_SYMBOL_LIST_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $card_symbol_list_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.card_symbol_list")));
        $card_symbol_list_ref01_data = null;
        if (count($card_symbol_list_ref01_data_raw) > 0) {
            $card_symbol_list_ref01_data = Helpers::to_map($card_symbol_list_ref01_data_raw[0][1]);
        }

        // LIST
        $card_symbol_list_ref01_ent = $client->CardSymbolList(null);
        $card_symbol_list_ref01_match = [];

        $card_symbol_list_ref01_list_result = $card_symbol_list_ref01_ent->list($card_symbol_list_ref01_match, null);
        $this->assertIsArray($card_symbol_list_ref01_list_result);

    }
}

function card_symbol_list_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/card_symbol_list/CardSymbolListTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ScryfallSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["card_symbol_list01", "card_symbol_list02", "card_symbol_list03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("SCRYFALL_TEST_CARD_SYMBOL_LIST_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "SCRYFALL_TEST_CARD_SYMBOL_LIST_ENTID" => $idmap,
        "SCRYFALL_TEST_LIVE" => "FALSE",
        "SCRYFALL_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["SCRYFALL_TEST_CARD_SYMBOL_LIST_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["SCRYFALL_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new ScryfallSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["SCRYFALL_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["SCRYFALL_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
