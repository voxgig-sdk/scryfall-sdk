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
    // load() returns the ENTITY — call data_get() for the BulkData record (throws on error).
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

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
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

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
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
| `content_encoding` | The Content-Encoding encoding for this file |
| `content_type` | The MIME type of this file |
| `description` | A human-readable description for this file |
| `download_uri` | The URI that hosts this bulk file |
| `id` | A unique ID for this bulk data file |
| `name` | A human-readable name for this file |
| `object` | The object type |
| `size` | The size of this file in bytes |
| `type` | The type of bulk data |
| `updated_at` | The time this file was last updated |

Operations: List, Load.

API path: `/bulk-data`

#### Card

| Field | Description |
| --- | --- |
| `artist` | The name of the illustrator of this card |
| `cmc` | The card's converted mana cost |
| `collector_number` | This card's collector number |
| `color_identity` | This card's color identity |
| `colors` | This card's colors |
| `id` | A unique ID for this card in Scryfall's database |
| `image_uris` | An object containing URIs to this card's imagery |
| `lang` | The language code for this printing |
| `layout` | A code for this card's layout |
| `legalities` | An object describing the legality of this card |
| `loyalty` | This card's loyalty (for planeswalkers) |
| `mana_cost` | The mana cost for this card |
| `name` | The name of this card |
| `oracle_id` | A unique ID for this card's oracle identity |
| `oracle_text` | The Oracle text for this card |
| `power` | This card's power (for creatures) |
| `prices` | An object containing daily price information for this card |
| `rarity` | This card's rarity |
| `released_at` | The date this card was first released |
| `scryfall_uri` | A link to this card's page on Scryfall's website |
| `set` | This card's set code |
| `set_name` | This card's full set name |
| `toughness` | This card's toughness (for creatures) |
| `type_line` | The type line of this card |
| `uri` | A link to this card object on Scryfall's API |

Operations: List, Load.

API path: `/cards/named`

#### CardList

| Field | Description |
| --- | --- |
| `artist` | The name of the illustrator of this card |
| `cmc` | The card's converted mana cost |
| `collector_number` | This card's collector number |
| `color_identity` | This card's color identity |
| `colors` | This card's colors |
| `data` | An array of the requested objects |
| `has_more` | True if this list is paginated and has more pages |
| `id` | A unique ID for this card in Scryfall's database |
| `identifiers` |  |
| `image_uris` | An object containing URIs to this card's imagery |
| `lang` | The language code for this printing |
| `layout` | A code for this card's layout |
| `legalities` | An object describing the legality of this card |
| `loyalty` | This card's loyalty (for planeswalkers) |
| `mana_cost` | The mana cost for this card |
| `name` | The name of this card |
| `next_page` | The URL for the next page of results |
| `object` | The object type |
| `oracle_id` | A unique ID for this card's oracle identity |
| `oracle_text` | The Oracle text for this card |
| `power` | This card's power (for creatures) |
| `prices` | An object containing daily price information for this card |
| `rarity` | This card's rarity |
| `released_at` | The date this card was first released |
| `scryfall_uri` | A link to this card's page on Scryfall's website |
| `set` | This card's set code |
| `set_name` | This card's full set name |
| `total_cards` | The total number of cards found |
| `toughness` | This card's toughness (for creatures) |
| `type_line` | The type line of this card |
| `uri` | A link to this card object on Scryfall's API |

Operations: Create, List.

API path: `/cards/collection`

#### CardSymbolList

| Field | Description |
| --- | --- |
| `appears_in_mana_costs` | True if this symbol appears in mana costs |
| `cmc` | The converted mana cost represented by this symbol |
| `colors` | The colors of this symbol |
| `english` | An English textual description of the symbol |
| `funny` | True if this symbol is only used on funny cards |
| `loose_variant` | An alternate version of this symbol |
| `object` | The object type |
| `represents_mana` | True if this is a mana symbol |
| `svg_uri` | A URI to an SVG image for this symbol |
| `symbol` | The plaintext symbol |
| `transposable` | True if it's possible to write this symbol backwards |

Operations: List.

API path: `/symbology`

#### Catalog

| Field | Description |
| --- | --- |
| `data` | An array of datapoints |
| `id` |  |
| `object` | The object type |
| `total_values` | The number of items in the data array |
| `uri` | A link to this catalog on Scryfall's API |

Operations: Load.

API path: `/catalog/{catalog_name}`

#### ManaCost

| Field | Description |
| --- | --- |
| `cmc` | The converted mana cost |
| `colorless` | True if this mana cost is colorless |
| `colors` | The colors in this mana cost |
| `cost` | The normalized cost |
| `monocolored` | True if this mana cost is monocolored |
| `multicolored` | True if this mana cost is multicolored |
| `object` | The object type |

Operations: List.

API path: `/symbology/parse-mana`

#### Migration

| Field | Description |
| --- | --- |
| `id` | A unique ID for this migration |
| `migration_strategy` | The type of migration strategy |
| `new_scryfall_id` | The updated Scryfall ID |
| `object` | The object type |
| `old_scryfall_id` | The original Scryfall ID |
| `performed_at` | The date this migration was performed |
| `uri` | A link to this migration on Scryfall's API |

Operations: List.

API path: `/migrations`

#### Ruling

| Field | Description |
| --- | --- |
| `comment` | The text of the ruling |
| `object` | The object type |
| `oracle_id` | The Oracle ID of the card this ruling applies to |
| `published_at` | The date this ruling was published |
| `source` | The source of this ruling |

Operations: List.

API path: `/cards/{id}/rulings`

#### Set

| Field | Description |
| --- | --- |
| `card_count` | The number of cards in this set |
| `code` | The unique three to five-letter code for this set |
| `digital` | True if this set is only available digitally |
| `icon_svg_uri` | A URI to an SVG file for this set's icon |
| `id` | A unique ID for this set |
| `name` | The English name of the set |
| `released_at` | The date the set was released |
| `scryfall_uri` | A link to this set's page on Scryfall's website |
| `search_uri` | A link to search for cards in this set on Scryfall's API |
| `set_type` | The type of set |
| `uri` | A link to this set object on Scryfall's API |

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
| `content_encoding` | `string` | The Content-Encoding encoding for this file |
| `content_type` | `string` | The MIME type of this file |
| `description` | `string` | A human-readable description for this file |
| `download_uri` | `string` | The URI that hosts this bulk file |
| `id` | `string` | A unique ID for this bulk data file |
| `name` | `string` | A human-readable name for this file |
| `object` | `string` | The object type |
| `size` | `int` | The size of this file in bytes |
| `type` | `string` | The type of bulk data |
| `updated_at` | `string` | The time this file was last updated |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the BulkData record (throws on error).
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
| `artist` | `string` | The name of the illustrator of this card |
| `cmc` | `float` | The card's converted mana cost |
| `collector_number` | `string` | This card's collector number |
| `color_identity` | `array` | This card's color identity |
| `colors` | `array` | This card's colors |
| `id` | `string` | A unique ID for this card in Scryfall's database |
| `image_uris` | `array` | An object containing URIs to this card's imagery |
| `lang` | `string` | The language code for this printing |
| `layout` | `string` | A code for this card's layout |
| `legalities` | `array` | An object describing the legality of this card |
| `loyalty` | `string` | This card's loyalty (for planeswalkers) |
| `mana_cost` | `string` | The mana cost for this card |
| `name` | `string` | The name of this card |
| `oracle_id` | `string` | A unique ID for this card's oracle identity |
| `oracle_text` | `string` | The Oracle text for this card |
| `power` | `string` | This card's power (for creatures) |
| `prices` | `array` | An object containing daily price information for this card |
| `rarity` | `string` | This card's rarity |
| `released_at` | `string` | The date this card was first released |
| `scryfall_uri` | `string` | A link to this card's page on Scryfall's website |
| `set` | `string` | This card's set code |
| `set_name` | `string` | This card's full set name |
| `toughness` | `string` | This card's toughness (for creatures) |
| `type_line` | `string` | The type line of this card |
| `uri` | `string` | A link to this card object on Scryfall's API |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Card record (throws on error).
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
| `artist` | `string` | The name of the illustrator of this card |
| `cmc` | `float` | The card's converted mana cost |
| `collector_number` | `string` | This card's collector number |
| `color_identity` | `array` | This card's color identity |
| `colors` | `array` | This card's colors |
| `data` | `array` | An array of the requested objects |
| `has_more` | `bool` | True if this list is paginated and has more pages |
| `id` | `string` | A unique ID for this card in Scryfall's database |
| `identifiers` | `array` |  |
| `image_uris` | `array` | An object containing URIs to this card's imagery |
| `lang` | `string` | The language code for this printing |
| `layout` | `string` | A code for this card's layout |
| `legalities` | `array` | An object describing the legality of this card |
| `loyalty` | `string` | This card's loyalty (for planeswalkers) |
| `mana_cost` | `string` | The mana cost for this card |
| `name` | `string` | The name of this card |
| `next_page` | `string` | The URL for the next page of results |
| `object` | `string` | The object type |
| `oracle_id` | `string` | A unique ID for this card's oracle identity |
| `oracle_text` | `string` | The Oracle text for this card |
| `power` | `string` | This card's power (for creatures) |
| `prices` | `array` | An object containing daily price information for this card |
| `rarity` | `string` | This card's rarity |
| `released_at` | `string` | The date this card was first released |
| `scryfall_uri` | `string` | A link to this card's page on Scryfall's website |
| `set` | `string` | This card's set code |
| `set_name` | `string` | This card's full set name |
| `total_cards` | `int` | The total number of cards found |
| `toughness` | `string` | This card's toughness (for creatures) |
| `type_line` | `string` | The type line of this card |
| `uri` | `string` | A link to this card object on Scryfall's API |

#### Example: List

```php
// list() returns an array of CardList records (throws on error).
$card_lists = $client->CardList()->list();
```

#### Example: Create

```php
$card_list = $client->CardList()->create([
    "identifiers" => null, // array
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
| `appears_in_mana_costs` | `bool` | True if this symbol appears in mana costs |
| `cmc` | `float` | The converted mana cost represented by this symbol |
| `colors` | `array` | The colors of this symbol |
| `english` | `string` | An English textual description of the symbol |
| `funny` | `bool` | True if this symbol is only used on funny cards |
| `loose_variant` | `string` | An alternate version of this symbol |
| `object` | `string` | The object type |
| `represents_mana` | `bool` | True if this is a mana symbol |
| `svg_uri` | `string` | A URI to an SVG image for this symbol |
| `symbol` | `string` | The plaintext symbol |
| `transposable` | `bool` | True if it's possible to write this symbol backwards |

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
| `data` | `array` | An array of datapoints |
| `id` | `string` |  |
| `object` | `string` | The object type |
| `total_values` | `int` | The number of items in the data array |
| `uri` | `string` | A link to this catalog on Scryfall's API |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Catalog record (throws on error).
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
| `cmc` | `float` | The converted mana cost |
| `colorless` | `bool` | True if this mana cost is colorless |
| `colors` | `array` | The colors in this mana cost |
| `cost` | `string` | The normalized cost |
| `monocolored` | `bool` | True if this mana cost is monocolored |
| `multicolored` | `bool` | True if this mana cost is multicolored |
| `object` | `string` | The object type |

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
| `id` | `string` | A unique ID for this migration |
| `migration_strategy` | `string` | The type of migration strategy |
| `new_scryfall_id` | `string` | The updated Scryfall ID |
| `object` | `string` | The object type |
| `old_scryfall_id` | `string` | The original Scryfall ID |
| `performed_at` | `string` | The date this migration was performed |
| `uri` | `string` | A link to this migration on Scryfall's API |

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
| `comment` | `string` | The text of the ruling |
| `object` | `string` | The object type |
| `oracle_id` | `string` | The Oracle ID of the card this ruling applies to |
| `published_at` | `string` | The date this ruling was published |
| `source` | `string` | The source of this ruling |

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
| `card_count` | `int` | The number of cards in this set |
| `code` | `string` | The unique three to five-letter code for this set |
| `digital` | `bool` | True if this set is only available digitally |
| `icon_svg_uri` | `string` | A URI to an SVG file for this set's icon |
| `id` | `string` | A unique ID for this set |
| `name` | `string` | The English name of the set |
| `released_at` | `string` | The date the set was released |
| `scryfall_uri` | `string` | A link to this set's page on Scryfall's website |
| `search_uri` | `string` | A link to search for cards in this set on Scryfall's API |
| `set_type` | `string` | The type of set |
| `uri` | `string` | A link to this set object on Scryfall's API |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Set record (throws on error).
$set = $client->Set()->load(["id" => "set_id"]);
```

#### Example: List

```php
// list() returns an array of Set records (throws on error).
$sets = $client->Set()->list();
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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
