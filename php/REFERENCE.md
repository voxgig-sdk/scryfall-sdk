# Scryfall PHP SDK Reference

Complete API reference for the Scryfall PHP SDK.


## ScryfallSDK

### Constructor

```php
require_once __DIR__ . '/scryfall_sdk.php';

$client = new ScryfallSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ScryfallSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = ScryfallSDK::test();
```


### Instance Methods

#### `BulkData($data = null)`

Create a new `BulkDataEntity` instance. Pass `null` for no initial data.

#### `Card($data = null)`

Create a new `CardEntity` instance. Pass `null` for no initial data.

#### `CardList($data = null)`

Create a new `CardListEntity` instance. Pass `null` for no initial data.

#### `CardSymbolList($data = null)`

Create a new `CardSymbolListEntity` instance. Pass `null` for no initial data.

#### `Catalog($data = null)`

Create a new `CatalogEntity` instance. Pass `null` for no initial data.

#### `ManaCost($data = null)`

Create a new `ManaCostEntity` instance. Pass `null` for no initial data.

#### `Migration($data = null)`

Create a new `MigrationEntity` instance. Pass `null` for no initial data.

#### `Ruling($data = null)`

Create a new `RulingEntity` instance. Pass `null` for no initial data.

#### `Set($data = null)`

Create a new `SetEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): ScryfallUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## BulkDataEntity

```php
$bulk_data = $client->BulkData();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content_encoding` | `string` | No |  |
| `content_type` | `string` | No |  |
| `description` | `string` | No |  |
| `download_uri` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `object` | `string` | No |  |
| `size` | `int` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->BulkData()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->BulkData()->load(["id" => "bulk_data_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BulkDataEntity`

Create a new `BulkDataEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CardEntity

```php
$card = $client->Card();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artist` | `string` | No |  |
| `cmc` | `float` | No |  |
| `collector_number` | `string` | No |  |
| `color` | `array` | No |  |
| `color_identity` | `array` | No |  |
| `id` | `string` | No |  |
| `image_uri` | `array` | No |  |
| `lang` | `string` | No |  |
| `layout` | `string` | No |  |
| `legality` | `array` | No |  |
| `loyalty` | `string` | No |  |
| `mana_cost` | `string` | No |  |
| `name` | `string` | No |  |
| `oracle_id` | `string` | No |  |
| `oracle_text` | `string` | No |  |
| `power` | `string` | No |  |
| `price` | `array` | No |  |
| `rarity` | `string` | No |  |
| `released_at` | `string` | No |  |
| `scryfall_uri` | `string` | No |  |
| `set` | `string` | No |  |
| `set_name` | `string` | No |  |
| `toughness` | `string` | No |  |
| `type_line` | `string` | No |  |
| `uri` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Card()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Card()->load(["id" => "card_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CardEntity`

Create a new `CardEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CardListEntity

```php
$card_list = $client->CardList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artist` | `string` | No |  |
| `cmc` | `float` | No |  |
| `collector_number` | `string` | No |  |
| `color` | `array` | No |  |
| `color_identity` | `array` | No |  |
| `data` | `array` | No |  |
| `has_more` | `bool` | No |  |
| `id` | `string` | No |  |
| `identifier` | `array` | Yes |  |
| `image_uri` | `array` | No |  |
| `lang` | `string` | No |  |
| `layout` | `string` | No |  |
| `legality` | `array` | No |  |
| `loyalty` | `string` | No |  |
| `mana_cost` | `string` | No |  |
| `name` | `string` | No |  |
| `next_page` | `string` | No |  |
| `object` | `string` | No |  |
| `oracle_id` | `string` | No |  |
| `oracle_text` | `string` | No |  |
| `power` | `string` | No |  |
| `price` | `array` | No |  |
| `rarity` | `string` | No |  |
| `released_at` | `string` | No |  |
| `scryfall_uri` | `string` | No |  |
| `set` | `string` | No |  |
| `set_name` | `string` | No |  |
| `total_card` | `int` | No |  |
| `toughness` | `string` | No |  |
| `type_line` | `string` | No |  |
| `uri` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->CardList()->create([
  "identifier" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->CardList()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CardListEntity`

Create a new `CardListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CardSymbolListEntity

```php
$card_symbol_list = $client->CardSymbolList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `appears_in_mana_cost` | `bool` | No |  |
| `cmc` | `float` | No |  |
| `color` | `array` | No |  |
| `english` | `string` | No |  |
| `funny` | `bool` | No |  |
| `loose_variant` | `string` | No |  |
| `object` | `string` | No |  |
| `represents_mana` | `bool` | No |  |
| `svg_uri` | `string` | No |  |
| `symbol` | `string` | No |  |
| `transposable` | `bool` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->CardSymbolList()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CardSymbolListEntity`

Create a new `CardSymbolListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CatalogEntity

```php
$catalog = $client->Catalog();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `array` | No |  |
| `object` | `string` | No |  |
| `total_value` | `int` | No |  |
| `uri` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Catalog()->load(["id" => "catalog_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CatalogEntity`

Create a new `CatalogEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ManaCostEntity

```php
$mana_cost = $client->ManaCost();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cmc` | `float` | No |  |
| `color` | `array` | No |  |
| `colorless` | `bool` | No |  |
| `cost` | `string` | No |  |
| `monocolored` | `bool` | No |  |
| `multicolored` | `bool` | No |  |
| `object` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->ManaCost()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ManaCostEntity`

Create a new `ManaCostEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MigrationEntity

```php
$migration = $client->Migration();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `migration_strategy` | `string` | No |  |
| `new_scryfall_id` | `string` | No |  |
| `object` | `string` | No |  |
| `old_scryfall_id` | `string` | No |  |
| `performed_at` | `string` | No |  |
| `uri` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Migration()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MigrationEntity`

Create a new `MigrationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RulingEntity

```php
$ruling = $client->Ruling();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `comment` | `string` | No |  |
| `object` | `string` | No |  |
| `oracle_id` | `string` | No |  |
| `published_at` | `string` | No |  |
| `source` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Ruling()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RulingEntity`

Create a new `RulingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SetEntity

```php
$set = $client->Set();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card_count` | `int` | No |  |
| `code` | `string` | No |  |
| `digital` | `bool` | No |  |
| `icon_svg_uri` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `released_at` | `string` | No |  |
| `scryfall_uri` | `string` | No |  |
| `search_uri` | `string` | No |  |
| `set_type` | `string` | No |  |
| `uri` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Set()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Set()->load(["id" => "set_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SetEntity`

Create a new `SetEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new ScryfallSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

