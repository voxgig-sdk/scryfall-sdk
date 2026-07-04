# Scryfall Golang SDK Reference

Complete API reference for the Scryfall Golang SDK.


## ScryfallSDK

### Constructor

```go
func NewScryfallSDK(options map[string]any) *ScryfallSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *ScryfallSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *ScryfallSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `BulkData(data map[string]any) ScryfallEntity`

Create a new `BulkData` entity instance. Pass `nil` for no initial data.

#### `Card(data map[string]any) ScryfallEntity`

Create a new `Card` entity instance. Pass `nil` for no initial data.

#### `CardList(data map[string]any) ScryfallEntity`

Create a new `CardList` entity instance. Pass `nil` for no initial data.

#### `CardSymbolList(data map[string]any) ScryfallEntity`

Create a new `CardSymbolList` entity instance. Pass `nil` for no initial data.

#### `Catalog(data map[string]any) ScryfallEntity`

Create a new `Catalog` entity instance. Pass `nil` for no initial data.

#### `ManaCost(data map[string]any) ScryfallEntity`

Create a new `ManaCost` entity instance. Pass `nil` for no initial data.

#### `Migration(data map[string]any) ScryfallEntity`

Create a new `Migration` entity instance. Pass `nil` for no initial data.

#### `Ruling(data map[string]any) ScryfallEntity`

Create a new `Ruling` entity instance. Pass `nil` for no initial data.

#### `Set(data map[string]any) ScryfallEntity`

Create a new `Set` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## BulkDataEntity

```go
bulk_data := client.BulkData(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.BulkData(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.BulkData(nil).Load(map[string]any{"id": "bulk_data_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BulkDataEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CardEntity

```go
card := client.Card(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Card(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Card(nil).Load(map[string]any{"id": "card_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CardEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CardListEntity

```go
card_list := client.CardList(nil)
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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.CardList(nil).Create(map[string]any{
    "identifier": /* `$ARRAY` */,
}, nil)
```

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.CardList(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CardListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CardSymbolListEntity

```go
card_symbol_list := client.CardSymbolList(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.CardSymbolList(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CardSymbolListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CatalogEntity

```go
catalog := client.Catalog(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$ARRAY`` | No |  |
| `object` | ``$STRING`` | No |  |
| `total_value` | ``$INTEGER`` | No |  |
| `uri` | ``$STRING`` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Catalog(nil).Load(map[string]any{"id": "catalog_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CatalogEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ManaCostEntity

```go
mana_cost := client.ManaCost(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ManaCost(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ManaCostEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MigrationEntity

```go
migration := client.Migration(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Migration(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MigrationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RulingEntity

```go
ruling := client.Ruling(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Ruling(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RulingEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SetEntity

```go
set := client.Set(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Set(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Set(nil).Load(map[string]any{"id": "set_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SetEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewScryfallSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

