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
| `artist` | `string` | No | The name of the illustrator of this card |
| `cmc` | `float64` | No | The card's converted mana cost |
| `collector_number` | `string` | No | This card's collector number |
| `color_identity` | `[]any` | No | This card's color identity |
| `colors` | `[]any` | No | This card's colors |
| `id` | `string` | No | A unique ID for this card in Scryfall's database |
| `image_uris` | `map[string]any` | No | An object containing URIs to this card's imagery |
| `lang` | `string` | No | The language code for this printing |
| `layout` | `string` | No | A code for this card's layout |
| `legalities` | `map[string]any` | No | An object describing the legality of this card |
| `loyalty` | `string` | No | This card's loyalty (for planeswalkers) |
| `mana_cost` | `string` | No | The mana cost for this card |
| `name` | `string` | No | The name of this card |
| `oracle_id` | `string` | No | A unique ID for this card's oracle identity |
| `oracle_text` | `string` | No | The Oracle text for this card |
| `power` | `string` | No | This card's power (for creatures) |
| `prices` | `map[string]any` | No | An object containing daily price information for this card |
| `rarity` | `string` | No | This card's rarity |
| `released_at` | `string` | No | The date this card was first released |
| `scryfall_uri` | `string` | No | A link to this card's page on Scryfall's website |
| `set` | `string` | No | This card's set code |
| `set_name` | `string` | No | This card's full set name |
| `toughness` | `string` | No | This card's toughness (for creatures) |
| `type_line` | `string` | No | The type line of this card |
| `uri` | `string` | No | A link to this card object on Scryfall's API |

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
| `artist` | `string` | No | The name of the illustrator of this card |
| `cmc` | `float64` | No | The card's converted mana cost |
| `collector_number` | `string` | No | This card's collector number |
| `color_identity` | `[]any` | No | This card's color identity |
| `colors` | `[]any` | No | This card's colors |
| `data` | `[]any` | No | An array of the requested objects |
| `has_more` | `bool` | No | True if this list is paginated and has more pages |
| `id` | `string` | No | A unique ID for this card in Scryfall's database |
| `identifiers` | `[]any` | Yes |  |
| `image_uris` | `map[string]any` | No | An object containing URIs to this card's imagery |
| `lang` | `string` | No | The language code for this printing |
| `layout` | `string` | No | A code for this card's layout |
| `legalities` | `map[string]any` | No | An object describing the legality of this card |
| `loyalty` | `string` | No | This card's loyalty (for planeswalkers) |
| `mana_cost` | `string` | No | The mana cost for this card |
| `name` | `string` | No | The name of this card |
| `next_page` | `string` | No | The URL for the next page of results |
| `object` | `string` | No | The object type |
| `oracle_id` | `string` | No | A unique ID for this card's oracle identity |
| `oracle_text` | `string` | No | The Oracle text for this card |
| `power` | `string` | No | This card's power (for creatures) |
| `prices` | `map[string]any` | No | An object containing daily price information for this card |
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
    "identifiers": []any{},
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
| `appears_in_mana_costs` | `bool` | No | True if this symbol appears in mana costs |
| `cmc` | `float64` | No | The converted mana cost represented by this symbol |
| `colors` | `[]any` | No | The colors of this symbol |
| `english` | `string` | No | An English textual description of the symbol |
| `funny` | `bool` | No | True if this symbol is only used on funny cards |
| `loose_variant` | `string` | No | An alternate version of this symbol |
| `object` | `string` | No | The object type |
| `represents_mana` | `bool` | No | True if this is a mana symbol |
| `svg_uri` | `string` | No | A URI to an SVG image for this symbol |
| `symbol` | `string` | No | The plaintext symbol |
| `transposable` | `bool` | No | True if it's possible to write this symbol backwards |

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
| `data` | `[]any` | No | An array of datapoints |
| `id` | `string` | No |  |
| `object` | `string` | No | The object type |
| `total_values` | `int` | No | The number of items in the data array |
| `uri` | `string` | No | A link to this catalog on Scryfall's API |

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
| `cmc` | `float64` | No | The converted mana cost |
| `colorless` | `bool` | No | True if this mana cost is colorless |
| `colors` | `[]any` | No | The colors in this mana cost |
| `cost` | `string` | No | The normalized cost |
| `monocolored` | `bool` | No | True if this mana cost is monocolored |
| `multicolored` | `bool` | No | True if this mana cost is multicolored |
| `object` | `string` | No | The object type |

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
| `id` | `string` | No | A unique ID for this migration |
| `migration_strategy` | `string` | No | The type of migration strategy |
| `new_scryfall_id` | `string` | No | The updated Scryfall ID |
| `object` | `string` | No | The object type |
| `old_scryfall_id` | `string` | No | The original Scryfall ID |
| `performed_at` | `string` | No | The date this migration was performed |
| `uri` | `string` | No | A link to this migration on Scryfall's API |

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
| `comment` | `string` | No | The text of the ruling |
| `object` | `string` | No | The object type |
| `oracle_id` | `string` | No | The Oracle ID of the card this ruling applies to |
| `published_at` | `string` | No | The date this ruling was published |
| `source` | `string` | No | The source of this ruling |

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

