# Scryfall PHP SDK



The PHP SDK for the Scryfall API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->BulkData()` — with named operations (`list`/`load`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/scryfall-sdk/releases](https://github.com/voxgig-sdk/scryfall-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'scryfall_sdk.php';

$client = new ScryfallSDK();
```

### 2. List bulkdata records

```php
try {
    // list() returns an array of BulkData records — iterate directly.
    $bulkdatas = $client->BulkData()->list();
    foreach ($bulkdatas as $item) {
        echo $item["id"] . " " . $item["content_encoding"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a bulkdata

```php
try {
    // load() returns the bare BulkData record (throws on error).
    $bulkdata = $client->BulkData()->load(["id" => "example_id"]);
    print_r($bulkdata);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $bulkdatas = $client->BulkData()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = ScryfallSDK::test([
    "entity" => ["bulkdata" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the bare mock record (throws on error).
$bulkdata = $client->BulkData()->list();
print_r($bulkdata);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new ScryfallSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
SCRYFALL_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### ScryfallSDK

```php
require_once 'scryfall_sdk.php';
$client = new ScryfallSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = ScryfallSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### ScryfallSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `BulkData` | `($data): BulkDataEntity` | Create a BulkData entity instance. |
| `Card` | `($data): CardEntity` | Create a Card entity instance. |
| `CardList` | `($data): CardListEntity` | Create a CardList entity instance. |
| `CardSymbolList` | `($data): CardSymbolListEntity` | Create a CardSymbolList entity instance. |
| `Catalog` | `($data): CatalogEntity` | Create a Catalog entity instance. |
| `ManaCost` | `($data): ManaCostEntity` | Create a ManaCost entity instance. |
| `Migration` | `($data): MigrationEntity` | Create a Migration entity instance. |
| `Ruling` | `($data): RulingEntity` | Create a Ruling entity instance. |
| `Set` | `($data): SetEntity` | Create a Set entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### BulkData

| Field | Description |
| --- | --- |
| `content_encoding` |  |
| `content_type` |  |
| `description` |  |
| `download_uri` |  |
| `id` |  |
| `name` |  |
| `object` |  |
| `size` |  |
| `type` |  |
| `updated_at` |  |

Operations: List, Load.

API path: `/bulk-data`

#### Card

| Field | Description |
| --- | --- |
| `artist` |  |
| `cmc` |  |
| `collector_number` |  |
| `color` |  |
| `color_identity` |  |
| `id` |  |
| `image_uri` |  |
| `lang` |  |
| `layout` |  |
| `legality` |  |
| `loyalty` |  |
| `mana_cost` |  |
| `name` |  |
| `oracle_id` |  |
| `oracle_text` |  |
| `power` |  |
| `price` |  |
| `rarity` |  |
| `released_at` |  |
| `scryfall_uri` |  |
| `set` |  |
| `set_name` |  |
| `toughness` |  |
| `type_line` |  |
| `uri` |  |

Operations: List, Load.

API path: `/cards/named`

#### CardList

| Field | Description |
| --- | --- |
| `artist` |  |
| `cmc` |  |
| `collector_number` |  |
| `color` |  |
| `color_identity` |  |
| `data` |  |
| `has_more` |  |
| `id` |  |
| `identifier` |  |
| `image_uri` |  |
| `lang` |  |
| `layout` |  |
| `legality` |  |
| `loyalty` |  |
| `mana_cost` |  |
| `name` |  |
| `next_page` |  |
| `object` |  |
| `oracle_id` |  |
| `oracle_text` |  |
| `power` |  |
| `price` |  |
| `rarity` |  |
| `released_at` |  |
| `scryfall_uri` |  |
| `set` |  |
| `set_name` |  |
| `total_card` |  |
| `toughness` |  |
| `type_line` |  |
| `uri` |  |

Operations: Create, List.

API path: `/cards/collection`

#### CardSymbolList

| Field | Description |
| --- | --- |
| `appears_in_mana_cost` |  |
| `cmc` |  |
| `color` |  |
| `english` |  |
| `funny` |  |
| `loose_variant` |  |
| `object` |  |
| `represents_mana` |  |
| `svg_uri` |  |
| `symbol` |  |
| `transposable` |  |

Operations: List.

API path: `/symbology`

#### Catalog

| Field | Description |
| --- | --- |
| `data` |  |
| `object` |  |
| `total_value` |  |
| `uri` |  |

Operations: Load.

API path: `/catalog/{catalog_name}`

#### ManaCost

| Field | Description |
| --- | --- |
| `cmc` |  |
| `color` |  |
| `colorless` |  |
| `cost` |  |
| `monocolored` |  |
| `multicolored` |  |
| `object` |  |

Operations: List.

API path: `/symbology/parse-mana`

#### Migration

| Field | Description |
| --- | --- |
| `id` |  |
| `migration_strategy` |  |
| `new_scryfall_id` |  |
| `object` |  |
| `old_scryfall_id` |  |
| `performed_at` |  |
| `uri` |  |

Operations: List.

API path: `/migrations`

#### Ruling

| Field | Description |
| --- | --- |
| `comment` |  |
| `object` |  |
| `oracle_id` |  |
| `published_at` |  |
| `source` |  |

Operations: List.

API path: `/cards/{id}/rulings`

#### Set

| Field | Description |
| --- | --- |
| `card_count` |  |
| `code` |  |
| `digital` |  |
| `icon_svg_uri` |  |
| `id` |  |
| `name` |  |
| `released_at` |  |
| `scryfall_uri` |  |
| `search_uri` |  |
| `set_type` |  |
| `uri` |  |

Operations: List, Load.

API path: `/sets`



## Entities


### BulkData

Create an instance: `$bulk_data = $client->BulkData();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content_encoding` | `string` |  |
| `content_type` | `string` |  |
| `description` | `string` |  |
| `download_uri` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `object` | `string` |  |
| `size` | `int` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the bare BulkData record (throws on error).
$bulk_data = $client->BulkData()->load(["id" => "bulk_data_id"]);
```

#### Example: List

```php
// list() returns an array of BulkData records (throws on error).
$bulk_datas = $client->BulkData()->list();
```


### Card

Create an instance: `$card = $client->Card();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artist` | `string` |  |
| `cmc` | `float` |  |
| `collector_number` | `string` |  |
| `color` | `array` |  |
| `color_identity` | `array` |  |
| `id` | `string` |  |
| `image_uri` | `array` |  |
| `lang` | `string` |  |
| `layout` | `string` |  |
| `legality` | `array` |  |
| `loyalty` | `string` |  |
| `mana_cost` | `string` |  |
| `name` | `string` |  |
| `oracle_id` | `string` |  |
| `oracle_text` | `string` |  |
| `power` | `string` |  |
| `price` | `array` |  |
| `rarity` | `string` |  |
| `released_at` | `string` |  |
| `scryfall_uri` | `string` |  |
| `set` | `string` |  |
| `set_name` | `string` |  |
| `toughness` | `string` |  |
| `type_line` | `string` |  |
| `uri` | `string` |  |

#### Example: Load

```php
// load() returns the bare Card record (throws on error).
$card = $client->Card()->load(["id" => "card_id"]);
```

#### Example: List

```php
// list() returns an array of Card records (throws on error).
$cards = $client->Card()->list();
```


### CardList

Create an instance: `$card_list = $client->CardList();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artist` | `string` |  |
| `cmc` | `float` |  |
| `collector_number` | `string` |  |
| `color` | `array` |  |
| `color_identity` | `array` |  |
| `data` | `array` |  |
| `has_more` | `bool` |  |
| `id` | `string` |  |
| `identifier` | `array` |  |
| `image_uri` | `array` |  |
| `lang` | `string` |  |
| `layout` | `string` |  |
| `legality` | `array` |  |
| `loyalty` | `string` |  |
| `mana_cost` | `string` |  |
| `name` | `string` |  |
| `next_page` | `string` |  |
| `object` | `string` |  |
| `oracle_id` | `string` |  |
| `oracle_text` | `string` |  |
| `power` | `string` |  |
| `price` | `array` |  |
| `rarity` | `string` |  |
| `released_at` | `string` |  |
| `scryfall_uri` | `string` |  |
| `set` | `string` |  |
| `set_name` | `string` |  |
| `total_card` | `int` |  |
| `toughness` | `string` |  |
| `type_line` | `string` |  |
| `uri` | `string` |  |

#### Example: List

```php
// list() returns an array of CardList records (throws on error).
$card_lists = $client->CardList()->list();
```

#### Example: Create

```php
$card_list = $client->CardList()->create([
    "identifier" => null, // array
]);
```


### CardSymbolList

Create an instance: `$card_symbol_list = $client->CardSymbolList();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `appears_in_mana_cost` | `bool` |  |
| `cmc` | `float` |  |
| `color` | `array` |  |
| `english` | `string` |  |
| `funny` | `bool` |  |
| `loose_variant` | `string` |  |
| `object` | `string` |  |
| `represents_mana` | `bool` |  |
| `svg_uri` | `string` |  |
| `symbol` | `string` |  |
| `transposable` | `bool` |  |

#### Example: List

```php
// list() returns an array of CardSymbolList records (throws on error).
$card_symbol_lists = $client->CardSymbolList()->list();
```


### Catalog

Create an instance: `$catalog = $client->Catalog();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `object` | `string` |  |
| `total_value` | `int` |  |
| `uri` | `string` |  |

#### Example: Load

```php
// load() returns the bare Catalog record (throws on error).
$catalog = $client->Catalog()->load(["id" => "catalog_id"]);
```


### ManaCost

Create an instance: `$mana_cost = $client->ManaCost();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cmc` | `float` |  |
| `color` | `array` |  |
| `colorless` | `bool` |  |
| `cost` | `string` |  |
| `monocolored` | `bool` |  |
| `multicolored` | `bool` |  |
| `object` | `string` |  |

#### Example: List

```php
// list() returns an array of ManaCost records (throws on error).
$mana_costs = $client->ManaCost()->list();
```


### Migration

Create an instance: `$migration = $client->Migration();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `migration_strategy` | `string` |  |
| `new_scryfall_id` | `string` |  |
| `object` | `string` |  |
| `old_scryfall_id` | `string` |  |
| `performed_at` | `string` |  |
| `uri` | `string` |  |

#### Example: List

```php
// list() returns an array of Migration records (throws on error).
$migrations = $client->Migration()->list();
```


### Ruling

Create an instance: `$ruling = $client->Ruling();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `comment` | `string` |  |
| `object` | `string` |  |
| `oracle_id` | `string` |  |
| `published_at` | `string` |  |
| `source` | `string` |  |

#### Example: List

```php
// list() returns an array of Ruling records (throws on error).
$rulings = $client->Ruling()->list();
```


### Set

Create an instance: `$set = $client->Set();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `card_count` | `int` |  |
| `code` | `string` |  |
| `digital` | `bool` |  |
| `icon_svg_uri` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `released_at` | `string` |  |
| `scryfall_uri` | `string` |  |
| `search_uri` | `string` |  |
| `set_type` | `string` |  |
| `uri` | `string` |  |

#### Example: Load

```php
// load() returns the bare Set record (throws on error).
$set = $client->Set()->load(["id" => "set_id"]);
```

#### Example: List

```php
// list() returns an array of Set records (throws on error).
$sets = $client->Set()->list();
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── scryfall_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`scryfall_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$bulkdata = $client->BulkData();
$bulkdata->list();

// $bulkdata->data_get() now returns the bulkdata data from the last list
// $bulkdata->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
