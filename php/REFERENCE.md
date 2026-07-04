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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

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
$bulk_data = $client->bulk_data();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content_encoding` | ``$STRING`` | No |  |
| `content_type` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `download_uri` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `object` | ``$STRING`` | No |  |
| `size` | ``$INTEGER`` | No |  |
| `type` | ``$STRING`` | No |  |
| `updated_at` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->bulk_data()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->bulk_data()->load(["id" => "bulk_data_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): BulkDataEntity`

Create a new `BulkDataEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CardEntity

```php
$card = $client->card();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artist` | ``$STRING`` | No |  |
| `cmc` | ``$NUMBER`` | No |  |
| `collector_number` | ``$STRING`` | No |  |
| `color` | ``$ARRAY`` | No |  |
| `color_identity` | ``$ARRAY`` | No |  |
| `id` | ``$STRING`` | No |  |
| `image_uri` | ``$OBJECT`` | No |  |
| `lang` | ``$STRING`` | No |  |
| `layout` | ``$STRING`` | No |  |
| `legality` | ``$OBJECT`` | No |  |
| `loyalty` | ``$STRING`` | No |  |
| `mana_cost` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `oracle_id` | ``$STRING`` | No |  |
| `oracle_text` | ``$STRING`` | No |  |
| `power` | ``$STRING`` | No |  |
| `price` | ``$OBJECT`` | No |  |
| `rarity` | ``$STRING`` | No |  |
| `released_at` | ``$STRING`` | No |  |
| `scryfall_uri` | ``$STRING`` | No |  |
| `set` | ``$STRING`` | No |  |
| `set_name` | ``$STRING`` | No |  |
| `toughness` | ``$STRING`` | No |  |
| `type_line` | ``$STRING`` | No |  |
| `uri` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->card()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->card()->load(["id" => "card_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CardEntity`

Create a new `CardEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CardListEntity

```php
$card_list = $client->card_list();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artist` | ``$STRING`` | No |  |
| `cmc` | ``$NUMBER`` | No |  |
| `collector_number` | ``$STRING`` | No |  |
| `color` | ``$ARRAY`` | No |  |
| `color_identity` | ``$ARRAY`` | No |  |
| `data` | ``$ARRAY`` | No |  |
| `has_more` | ``$BOOLEAN`` | No |  |
| `id` | ``$STRING`` | No |  |
| `identifier` | ``$ARRAY`` | Yes |  |
| `image_uri` | ``$OBJECT`` | No |  |
| `lang` | ``$STRING`` | No |  |
| `layout` | ``$STRING`` | No |  |
| `legality` | ``$OBJECT`` | No |  |
| `loyalty` | ``$STRING`` | No |  |
| `mana_cost` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `next_page` | ``$STRING`` | No |  |
| `object` | ``$STRING`` | No |  |
| `oracle_id` | ``$STRING`` | No |  |
| `oracle_text` | ``$STRING`` | No |  |
| `power` | ``$STRING`` | No |  |
| `price` | ``$OBJECT`` | No |  |
| `rarity` | ``$STRING`` | No |  |
| `released_at` | ``$STRING`` | No |  |
| `scryfall_uri` | ``$STRING`` | No |  |
| `set` | ``$STRING`` | No |  |
| `set_name` | ``$STRING`` | No |  |
| `total_card` | ``$INTEGER`` | No |  |
| `toughness` | ``$STRING`` | No |  |
| `type_line` | ``$STRING`` | No |  |
| `uri` | ``$STRING`` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->card_list()->create([
  "identifier" => /* `$ARRAY` */,
]);
```

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->card_list()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CardListEntity`

Create a new `CardListEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CardSymbolListEntity

```php
$card_symbol_list = $client->card_symbol_list();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `appears_in_mana_cost` | ``$BOOLEAN`` | No |  |
| `cmc` | ``$NUMBER`` | No |  |
| `color` | ``$ARRAY`` | No |  |
| `english` | ``$STRING`` | No |  |
| `funny` | ``$BOOLEAN`` | No |  |
| `loose_variant` | ``$STRING`` | No |  |
| `object` | ``$STRING`` | No |  |
| `represents_mana` | ``$BOOLEAN`` | No |  |
| `svg_uri` | ``$STRING`` | No |  |
| `symbol` | ``$STRING`` | No |  |
| `transposable` | ``$BOOLEAN`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->card_symbol_list()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CardSymbolListEntity`

Create a new `CardSymbolListEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CatalogEntity

```php
$catalog = $client->catalog();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$ARRAY`` | No |  |
| `object` | ``$STRING`` | No |  |
| `total_value` | ``$INTEGER`` | No |  |
| `uri` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->catalog()->load(["id" => "catalog_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CatalogEntity`

Create a new `CatalogEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ManaCostEntity

```php
$mana_cost = $client->mana_cost();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cmc` | ``$NUMBER`` | No |  |
| `color` | ``$ARRAY`` | No |  |
| `colorless` | ``$BOOLEAN`` | No |  |
| `cost` | ``$STRING`` | No |  |
| `monocolored` | ``$BOOLEAN`` | No |  |
| `multicolored` | ``$BOOLEAN`` | No |  |
| `object` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->mana_cost()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ManaCostEntity`

Create a new `ManaCostEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## MigrationEntity

```php
$migration = $client->migration();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$STRING`` | No |  |
| `migration_strategy` | ``$STRING`` | No |  |
| `new_scryfall_id` | ``$STRING`` | No |  |
| `object` | ``$STRING`` | No |  |
| `old_scryfall_id` | ``$STRING`` | No |  |
| `performed_at` | ``$STRING`` | No |  |
| `uri` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->migration()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): MigrationEntity`

Create a new `MigrationEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RulingEntity

```php
$ruling = $client->ruling();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `comment` | ``$STRING`` | No |  |
| `object` | ``$STRING`` | No |  |
| `oracle_id` | ``$STRING`` | No |  |
| `published_at` | ``$STRING`` | No |  |
| `source` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->ruling()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RulingEntity`

Create a new `RulingEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SetEntity

```php
$set = $client->set();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card_count` | ``$INTEGER`` | No |  |
| `code` | ``$STRING`` | No |  |
| `digital` | ``$BOOLEAN`` | No |  |
| `icon_svg_uri` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `released_at` | ``$STRING`` | No |  |
| `scryfall_uri` | ``$STRING`` | No |  |
| `search_uri` | ``$STRING`` | No |  |
| `set_type` | ``$STRING`` | No |  |
| `uri` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->set()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->set()->load(["id" => "set_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SetEntity`

Create a new `SetEntity` instance with the same client and
options.

#### `getName(): string`

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

