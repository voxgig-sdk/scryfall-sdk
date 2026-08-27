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
| `content_encoding` | `string` | No | The Content-Encoding encoding for this file |
| `content_type` | `string` | No | The MIME type of this file |
| `description` | `string` | No | A human-readable description for this file |
| `download_uri` | `string` | No | The URI that hosts this bulk file |
| `id` | `string` | No | A unique ID for this bulk data file |
| `name` | `string` | No | A human-readable name for this file |
| `object` | `string` | No | The object type |
| `size` | `int` | No | The size of this file in bytes |
| `type` | `string` | No | The type of bulk data |
| `updated_at` | `string` | No | The time this file was last updated |

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
| `artist` | `string` | No | The name of the illustrator of this card |
| `cmc` | `float` | No | The card's converted mana cost |
| `collector_number` | `string` | No | This card's collector number |
| `color_identity` | `array` | No | This card's color identity |
| `colors` | `array` | No | This card's colors |
| `id` | `string` | No | A unique ID for this card in Scryfall's database |
| `image_uris` | `array` | No | An object containing URIs to this card's imagery |
| `lang` | `string` | No | The language code for this printing |
| `layout` | `string` | No | A code for this card's layout |
| `legalities` | `array` | No | An object describing the legality of this card |
| `loyalty` | `string` | No | This card's loyalty (for planeswalkers) |
| `mana_cost` | `string` | No | The mana cost for this card |
| `name` | `string` | No | The name of this card |
| `oracle_id` | `string` | No | A unique ID for this card's oracle identity |
| `oracle_text` | `string` | No | The Oracle text for this card |
| `power` | `string` | No | This card's power (for creatures) |
| `prices` | `array` | No | An object containing daily price information for this card |
| `rarity` | `string` | No | This card's rarity |
| `released_at` | `string` | No | The date this card was first released |
| `scryfall_uri` | `string` | No | A link to this card's page on Scryfall's website |
| `set` | `string` | No | This card's set code |
| `set_name` | `string` | No | This card's full set name |
| `toughness` | `string` | No | This card's toughness (for creatures) |
| `type_line` | `string` | No | The type line of this card |
| `uri` | `string` | No | A link to this card object on Scryfall's API |

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
| `artist` | `string` | No | The name of the illustrator of this card |
| `cmc` | `float` | No | The card's converted mana cost |
| `collector_number` | `string` | No | This card's collector number |
| `color_identity` | `array` | No | This card's color identity |
| `colors` | `array` | No | This card's colors |
| `data` | `array` | No | An array of the requested objects |
| `has_more` | `bool` | No | True if this list is paginated and has more pages |
| `id` | `string` | No | A unique ID for this card in Scryfall's database |
| `identifiers` | `array` | Yes |  |
| `image_uris` | `array` | No | An object containing URIs to this card's imagery |
| `lang` | `string` | No | The language code for this printing |
| `layout` | `string` | No | A code for this card's layout |
| `legalities` | `array` | No | An object describing the legality of this card |
| `loyalty` | `string` | No | This card's loyalty (for planeswalkers) |
| `mana_cost` | `string` | No | The mana cost for this card |
| `name` | `string` | No | The name of this card |
| `next_page` | `string` | No | The URL for the next page of results |
| `object` | `string` | No | The object type |
| `oracle_id` | `string` | No | A unique ID for this card's oracle identity |
| `oracle_text` | `string` | No | The Oracle text for this card |
| `power` | `string` | No | This card's power (for creatures) |
| `prices` | `array` | No | An object containing daily price information for this card |
| `rarity` | `string` | No | This card's rarity |
| `released_at` | `string` | No | The date this card was first released |
| `scryfall_uri` | `string` | No | A link to this card's page on Scryfall's website |
| `set` | `string` | No | This card's set code |
| `set_name` | `string` | No | This card's full set name |
| `total_cards` | `int` | No | The total number of cards found |
| `toughness` | `string` | No | This card's toughness (for creatures) |
| `type_line` | `string` | No | The type line of this card |
| `uri` | `string` | No | A link to this card object on Scryfall's API |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->CardList()->create([
  "identifiers" => null, // array
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
| `appears_in_mana_costs` | `bool` | No | True if this symbol appears in mana costs |
| `cmc` | `float` | No | The converted mana cost represented by this symbol |
| `colors` | `array` | No | The colors of this symbol |
| `english` | `string` | No | An English textual description of the symbol |
| `funny` | `bool` | No | True if this symbol is only used on funny cards |
| `loose_variant` | `string` | No | An alternate version of this symbol |
| `object` | `string` | No | The object type |
| `represents_mana` | `bool` | No | True if this is a mana symbol |
| `svg_uri` | `string` | No | A URI to an SVG image for this symbol |
| `symbol` | `string` | No | The plaintext symbol |
| `transposable` | `bool` | No | True if it's possible to write this symbol backwards |

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
| `data` | `array` | No | An array of datapoints |
| `id` | `string` | No |  |
| `object` | `string` | No | The object type |
| `total_values` | `int` | No | The number of items in the data array |
| `uri` | `string` | No | A link to this catalog on Scryfall's API |

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
| `cmc` | `float` | No | The converted mana cost |
| `colorless` | `bool` | No | True if this mana cost is colorless |
| `colors` | `array` | No | The colors in this mana cost |
| `cost` | `string` | No | The normalized cost |
| `monocolored` | `bool` | No | True if this mana cost is monocolored |
| `multicolored` | `bool` | No | True if this mana cost is multicolored |
| `object` | `string` | No | The object type |

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
| `id` | `string` | No | A unique ID for this migration |
| `migration_strategy` | `string` | No | The type of migration strategy |
| `new_scryfall_id` | `string` | No | The updated Scryfall ID |
| `object` | `string` | No | The object type |
| `old_scryfall_id` | `string` | No | The original Scryfall ID |
| `performed_at` | `string` | No | The date this migration was performed |
| `uri` | `string` | No | A link to this migration on Scryfall's API |

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
| `comment` | `string` | No | The text of the ruling |
| `object` | `string` | No | The object type |
| `oracle_id` | `string` | No | The Oracle ID of the card this ruling applies to |
| `published_at` | `string` | No | The date this ruling was published |
| `source` | `string` | No | The source of this ruling |

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
| `card_count` | `int` | No | The number of cards in this set |
| `code` | `string` | No | The unique three to five-letter code for this set |
| `digital` | `bool` | No | True if this set is only available digitally |
| `icon_svg_uri` | `string` | No | A URI to an SVG file for this set's icon |
| `id` | `string` | No | A unique ID for this set |
| `name` | `string` | No | The English name of the set |
| `released_at` | `string` | No | The date the set was released |
| `scryfall_uri` | `string` | No | A link to this set's page on Scryfall's website |
| `search_uri` | `string` | No | A link to search for cards in this set on Scryfall's API |
| `set_type` | `string` | No | The type of set |
| `uri` | `string` | No | A link to this set object on Scryfall's API |

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

