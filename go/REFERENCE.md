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
bulkData := client.BulkData(nil)
fmt.Println(bulkData.GetName()) // "bulk_data"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.BulkData(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.BulkData(nil).Load(map[string]any{"id": "bulk_data_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(card.GetName()) // "card"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artist` | `string` | No |  |
| `cmc` | `float64` | No |  |
| `collector_number` | `string` | No |  |
| `color` | `[]any` | No |  |
| `color_identity` | `[]any` | No |  |
| `id` | `string` | No |  |
| `image_uri` | `map[string]any` | No |  |
| `lang` | `string` | No |  |
| `layout` | `string` | No |  |
| `legality` | `map[string]any` | No |  |
| `loyalty` | `string` | No |  |
| `mana_cost` | `string` | No |  |
| `name` | `string` | No |  |
| `oracle_id` | `string` | No |  |
| `oracle_text` | `string` | No |  |
| `power` | `string` | No |  |
| `price` | `map[string]any` | No |  |
| `rarity` | `string` | No |  |
| `released_at` | `string` | No |  |
| `scryfall_uri` | `string` | No |  |
| `set` | `string` | No |  |
| `set_name` | `string` | No |  |
| `toughness` | `string` | No |  |
| `type_line` | `string` | No |  |
| `uri` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Card(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Card(nil).Load(map[string]any{"id": "card_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
cardList := client.CardList(nil)
fmt.Println(cardList.GetName()) // "card_list"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artist` | `string` | No |  |
| `cmc` | `float64` | No |  |
| `collector_number` | `string` | No |  |
| `color` | `[]any` | No |  |
| `color_identity` | `[]any` | No |  |
| `data` | `[]any` | No |  |
| `has_more` | `bool` | No |  |
| `id` | `string` | No |  |
| `identifier` | `[]any` | Yes |  |
| `image_uri` | `map[string]any` | No |  |
| `lang` | `string` | No |  |
| `layout` | `string` | No |  |
| `legality` | `map[string]any` | No |  |
| `loyalty` | `string` | No |  |
| `mana_cost` | `string` | No |  |
| `name` | `string` | No |  |
| `next_page` | `string` | No |  |
| `object` | `string` | No |  |
| `oracle_id` | `string` | No |  |
| `oracle_text` | `string` | No |  |
| `power` | `string` | No |  |
| `price` | `map[string]any` | No |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.CardList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.CardList(nil).Create(map[string]any{
    "identifier": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
cardSymbolList := client.CardSymbolList(nil)
fmt.Println(cardSymbolList.GetName()) // "card_symbol_list"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `appears_in_mana_cost` | `bool` | No |  |
| `cmc` | `float64` | No |  |
| `color` | `[]any` | No |  |
| `english` | `string` | No |  |
| `funny` | `bool` | No |  |
| `loose_variant` | `string` | No |  |
| `object` | `string` | No |  |
| `represents_mana` | `bool` | No |  |
| `svg_uri` | `string` | No |  |
| `symbol` | `string` | No |  |
| `transposable` | `bool` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.CardSymbolList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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
fmt.Println(catalog.GetName()) // "catalog"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `[]any` | No |  |
| `object` | `string` | No |  |
| `total_value` | `int` | No |  |
| `uri` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Catalog(nil).Load(map[string]any{"id": "catalog_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
manaCost := client.ManaCost(nil)
fmt.Println(manaCost.GetName()) // "mana_cost"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cmc` | `float64` | No |  |
| `color` | `[]any` | No |  |
| `colorless` | `bool` | No |  |
| `cost` | `string` | No |  |
| `monocolored` | `bool` | No |  |
| `multicolored` | `bool` | No |  |
| `object` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ManaCost(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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
fmt.Println(migration.GetName()) // "migration"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Migration(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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
fmt.Println(ruling.GetName()) // "ruling"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Ruling(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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
fmt.Println(set.GetName()) // "set"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Set(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Set(nil).Load(map[string]any{"id": "set_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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

