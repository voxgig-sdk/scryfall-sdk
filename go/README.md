# Scryfall Golang SDK



The Golang SDK for the Scryfall API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.BulkData(nil)` — each with the same small set of operations (`List`, `Load`, `Create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/scryfall-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/scryfall-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/scryfall-sdk/go=../scryfall-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/scryfall-sdk/go"
)

func main() {
    client := sdk.New()

    // List bulkData records — the value is the array of records itself.
    bulkDatas, err := client.BulkData(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range bulkDatas.([]any) {
        fmt.Println(item)
    }

    // Load a single bulkData — the value is the loaded record.
    bulkData, err := client.BulkData(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(bulkData)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
bulkdatas, err := client.BulkData(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = bulkdatas
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

bulkData, err := client.BulkData(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(bulkData) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewScryfallSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
SCRYFALL_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewScryfallSDK

```go
func NewScryfallSDK(options map[string]any) *ScryfallSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *ScryfallSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ScryfallSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `BulkData` | `(data map[string]any) ScryfallEntity` | Create a BulkData entity instance. |
| `Card` | `(data map[string]any) ScryfallEntity` | Create a Card entity instance. |
| `CardList` | `(data map[string]any) ScryfallEntity` | Create a CardList entity instance. |
| `CardSymbolList` | `(data map[string]any) ScryfallEntity` | Create a CardSymbolList entity instance. |
| `Catalog` | `(data map[string]any) ScryfallEntity` | Create a Catalog entity instance. |
| `ManaCost` | `(data map[string]any) ScryfallEntity` | Create a ManaCost entity instance. |
| `Migration` | `(data map[string]any) ScryfallEntity` | Create a Migration entity instance. |
| `Ruling` | `(data map[string]any) ScryfallEntity` | Create a Ruling entity instance. |
| `Set` | `(data map[string]any) ScryfallEntity` | Create a Set entity instance. |

### Entity interface (ScryfallEntity)

All entities implement the `ScryfallEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    bulkData, err := client.BulkData(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // bulkData is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### BulkData

| Field | Description |
| --- | --- |
| `"content_encoding"` | The Content-Encoding encoding for this file |
| `"content_type"` | The MIME type of this file |
| `"description"` | A human-readable description for this file |
| `"download_uri"` | The URI that hosts this bulk file |
| `"id"` | A unique ID for this bulk data file |
| `"name"` | A human-readable name for this file |
| `"object"` | The object type |
| `"size"` | The size of this file in bytes |
| `"type"` | The type of bulk data |
| `"updated_at"` | The time this file was last updated |

Operations: List, Load.

API path: `/bulk-data`

#### Card

| Field | Description |
| --- | --- |
| `"artist"` | The name of the illustrator of this card |
| `"cmc"` | The card's converted mana cost |
| `"collector_number"` | This card's collector number |
| `"color_identity"` | This card's color identity |
| `"colors"` | This card's colors |
| `"id"` | A unique ID for this card in Scryfall's database |
| `"image_uris"` | An object containing URIs to this card's imagery |
| `"lang"` | The language code for this printing |
| `"layout"` | A code for this card's layout |
| `"legalities"` | An object describing the legality of this card |
| `"loyalty"` | This card's loyalty (for planeswalkers) |
| `"mana_cost"` | The mana cost for this card |
| `"name"` | The name of this card |
| `"oracle_id"` | A unique ID for this card's oracle identity |
| `"oracle_text"` | The Oracle text for this card |
| `"power"` | This card's power (for creatures) |
| `"prices"` | An object containing daily price information for this card |
| `"rarity"` | This card's rarity |
| `"released_at"` | The date this card was first released |
| `"scryfall_uri"` | A link to this card's page on Scryfall's website |
| `"set"` | This card's set code |
| `"set_name"` | This card's full set name |
| `"toughness"` | This card's toughness (for creatures) |
| `"type_line"` | The type line of this card |
| `"uri"` | A link to this card object on Scryfall's API |

Operations: List, Load.

API path: `/cards/named`

#### CardList

| Field | Description |
| --- | --- |
| `"artist"` | The name of the illustrator of this card |
| `"cmc"` | The card's converted mana cost |
| `"collector_number"` | This card's collector number |
| `"color_identity"` | This card's color identity |
| `"colors"` | This card's colors |
| `"data"` | An array of the requested objects |
| `"has_more"` | True if this list is paginated and has more pages |
| `"id"` | A unique ID for this card in Scryfall's database |
| `"identifiers"` |  |
| `"image_uris"` | An object containing URIs to this card's imagery |
| `"lang"` | The language code for this printing |
| `"layout"` | A code for this card's layout |
| `"legalities"` | An object describing the legality of this card |
| `"loyalty"` | This card's loyalty (for planeswalkers) |
| `"mana_cost"` | The mana cost for this card |
| `"name"` | The name of this card |
| `"next_page"` | The URL for the next page of results |
| `"object"` | The object type |
| `"oracle_id"` | A unique ID for this card's oracle identity |
| `"oracle_text"` | The Oracle text for this card |
| `"power"` | This card's power (for creatures) |
| `"prices"` | An object containing daily price information for this card |
| `"rarity"` | This card's rarity |
| `"released_at"` | The date this card was first released |
| `"scryfall_uri"` | A link to this card's page on Scryfall's website |
| `"set"` | This card's set code |
| `"set_name"` | This card's full set name |
| `"total_cards"` | The total number of cards found |
| `"toughness"` | This card's toughness (for creatures) |
| `"type_line"` | The type line of this card |
| `"uri"` | A link to this card object on Scryfall's API |

Operations: Create, List.

API path: `/cards/collection`

#### CardSymbolList

| Field | Description |
| --- | --- |
| `"appears_in_mana_costs"` | True if this symbol appears in mana costs |
| `"cmc"` | The converted mana cost represented by this symbol |
| `"colors"` | The colors of this symbol |
| `"english"` | An English textual description of the symbol |
| `"funny"` | True if this symbol is only used on funny cards |
| `"loose_variant"` | An alternate version of this symbol |
| `"object"` | The object type |
| `"represents_mana"` | True if this is a mana symbol |
| `"svg_uri"` | A URI to an SVG image for this symbol |
| `"symbol"` | The plaintext symbol |
| `"transposable"` | True if it's possible to write this symbol backwards |

Operations: List.

API path: `/symbology`

#### Catalog

| Field | Description |
| --- | --- |
| `"data"` | An array of datapoints |
| `"id"` |  |
| `"object"` | The object type |
| `"total_values"` | The number of items in the data array |
| `"uri"` | A link to this catalog on Scryfall's API |

Operations: Load.

API path: `/catalog/{catalog_name}`

#### ManaCost

| Field | Description |
| --- | --- |
| `"cmc"` | The converted mana cost |
| `"colorless"` | True if this mana cost is colorless |
| `"colors"` | The colors in this mana cost |
| `"cost"` | The normalized cost |
| `"monocolored"` | True if this mana cost is monocolored |
| `"multicolored"` | True if this mana cost is multicolored |
| `"object"` | The object type |

Operations: List.

API path: `/symbology/parse-mana`

#### Migration

| Field | Description |
| --- | --- |
| `"id"` | A unique ID for this migration |
| `"migration_strategy"` | The type of migration strategy |
| `"new_scryfall_id"` | The updated Scryfall ID |
| `"object"` | The object type |
| `"old_scryfall_id"` | The original Scryfall ID |
| `"performed_at"` | The date this migration was performed |
| `"uri"` | A link to this migration on Scryfall's API |

Operations: List.

API path: `/migrations`

#### Ruling

| Field | Description |
| --- | --- |
| `"comment"` | The text of the ruling |
| `"object"` | The object type |
| `"oracle_id"` | The Oracle ID of the card this ruling applies to |
| `"published_at"` | The date this ruling was published |
| `"source"` | The source of this ruling |

Operations: List.

API path: `/cards/{id}/rulings`

#### Set

| Field | Description |
| --- | --- |
| `"card_count"` | The number of cards in this set |
| `"code"` | The unique three to five-letter code for this set |
| `"digital"` | True if this set is only available digitally |
| `"icon_svg_uri"` | A URI to an SVG file for this set's icon |
| `"id"` | A unique ID for this set |
| `"name"` | The English name of the set |
| `"released_at"` | The date the set was released |
| `"scryfall_uri"` | A link to this set's page on Scryfall's website |
| `"search_uri"` | A link to search for cards in this set on Scryfall's API |
| `"set_type"` | The type of set |
| `"uri"` | A link to this set object on Scryfall's API |

Operations: List, Load.

API path: `/sets`



## Entities


### BulkData

Create an instance: `bulkData := client.BulkData(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
bulkData, err := client.BulkData(nil).Load(map[string]any{"id": "bulk_data_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(bulkData) // the loaded record
```

#### Example: List

```go
bulkDatas, err := client.BulkData(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(bulkDatas) // the array of records
```


### Card

Create an instance: `card := client.Card(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artist` | `string` | The name of the illustrator of this card |
| `cmc` | `float64` | The card's converted mana cost |
| `collector_number` | `string` | This card's collector number |
| `color_identity` | `[]any` | This card's color identity |
| `colors` | `[]any` | This card's colors |
| `id` | `string` | A unique ID for this card in Scryfall's database |
| `image_uris` | `map[string]any` | An object containing URIs to this card's imagery |
| `lang` | `string` | The language code for this printing |
| `layout` | `string` | A code for this card's layout |
| `legalities` | `map[string]any` | An object describing the legality of this card |
| `loyalty` | `string` | This card's loyalty (for planeswalkers) |
| `mana_cost` | `string` | The mana cost for this card |
| `name` | `string` | The name of this card |
| `oracle_id` | `string` | A unique ID for this card's oracle identity |
| `oracle_text` | `string` | The Oracle text for this card |
| `power` | `string` | This card's power (for creatures) |
| `prices` | `map[string]any` | An object containing daily price information for this card |
| `rarity` | `string` | This card's rarity |
| `released_at` | `string` | The date this card was first released |
| `scryfall_uri` | `string` | A link to this card's page on Scryfall's website |
| `set` | `string` | This card's set code |
| `set_name` | `string` | This card's full set name |
| `toughness` | `string` | This card's toughness (for creatures) |
| `type_line` | `string` | The type line of this card |
| `uri` | `string` | A link to this card object on Scryfall's API |

#### Example: Load

```go
card, err := client.Card(nil).Load(map[string]any{"id": "card_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(card) // the loaded record
```

#### Example: List

```go
cards, err := client.Card(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(cards) // the array of records
```


### CardList

Create an instance: `cardList := client.CardList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artist` | `string` | The name of the illustrator of this card |
| `cmc` | `float64` | The card's converted mana cost |
| `collector_number` | `string` | This card's collector number |
| `color_identity` | `[]any` | This card's color identity |
| `colors` | `[]any` | This card's colors |
| `data` | `[]any` | An array of the requested objects |
| `has_more` | `bool` | True if this list is paginated and has more pages |
| `id` | `string` | A unique ID for this card in Scryfall's database |
| `identifiers` | `[]any` |  |
| `image_uris` | `map[string]any` | An object containing URIs to this card's imagery |
| `lang` | `string` | The language code for this printing |
| `layout` | `string` | A code for this card's layout |
| `legalities` | `map[string]any` | An object describing the legality of this card |
| `loyalty` | `string` | This card's loyalty (for planeswalkers) |
| `mana_cost` | `string` | The mana cost for this card |
| `name` | `string` | The name of this card |
| `next_page` | `string` | The URL for the next page of results |
| `object` | `string` | The object type |
| `oracle_id` | `string` | A unique ID for this card's oracle identity |
| `oracle_text` | `string` | The Oracle text for this card |
| `power` | `string` | This card's power (for creatures) |
| `prices` | `map[string]any` | An object containing daily price information for this card |
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

```go
cardLists, err := client.CardList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(cardLists) // the array of records
```

#### Example: Create

```go
result, err := client.CardList(nil).Create(map[string]any{
    "identifiers": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### CardSymbolList

Create an instance: `cardSymbolList := client.CardSymbolList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `appears_in_mana_costs` | `bool` | True if this symbol appears in mana costs |
| `cmc` | `float64` | The converted mana cost represented by this symbol |
| `colors` | `[]any` | The colors of this symbol |
| `english` | `string` | An English textual description of the symbol |
| `funny` | `bool` | True if this symbol is only used on funny cards |
| `loose_variant` | `string` | An alternate version of this symbol |
| `object` | `string` | The object type |
| `represents_mana` | `bool` | True if this is a mana symbol |
| `svg_uri` | `string` | A URI to an SVG image for this symbol |
| `symbol` | `string` | The plaintext symbol |
| `transposable` | `bool` | True if it's possible to write this symbol backwards |

#### Example: List

```go
cardSymbolLists, err := client.CardSymbolList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(cardSymbolLists) // the array of records
```


### Catalog

Create an instance: `catalog := client.Catalog(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `[]any` | An array of datapoints |
| `id` | `string` |  |
| `object` | `string` | The object type |
| `total_values` | `int` | The number of items in the data array |
| `uri` | `string` | A link to this catalog on Scryfall's API |

#### Example: Load

```go
catalog, err := client.Catalog(nil).Load(map[string]any{"id": "catalog_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(catalog) // the loaded record
```


### ManaCost

Create an instance: `manaCost := client.ManaCost(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cmc` | `float64` | The converted mana cost |
| `colorless` | `bool` | True if this mana cost is colorless |
| `colors` | `[]any` | The colors in this mana cost |
| `cost` | `string` | The normalized cost |
| `monocolored` | `bool` | True if this mana cost is monocolored |
| `multicolored` | `bool` | True if this mana cost is multicolored |
| `object` | `string` | The object type |

#### Example: List

```go
manaCosts, err := client.ManaCost(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(manaCosts) // the array of records
```


### Migration

Create an instance: `migration := client.Migration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
migrations, err := client.Migration(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(migrations) // the array of records
```


### Ruling

Create an instance: `ruling := client.Ruling(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `comment` | `string` | The text of the ruling |
| `object` | `string` | The object type |
| `oracle_id` | `string` | The Oracle ID of the card this ruling applies to |
| `published_at` | `string` | The date this ruling was published |
| `source` | `string` | The source of this ruling |

#### Example: List

```go
rulings, err := client.Ruling(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(rulings) // the array of records
```


### Set

Create an instance: `set := client.Set(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
set, err := client.Set(nil).Load(map[string]any{"id": "set_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(set) // the loaded record
```

#### Example: List

```go
sets, err := client.Set(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(sets) // the array of records
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/scryfall-sdk/go/
├── scryfall.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/scryfall-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
bulkdata := client.BulkData(nil)
bulkdata.List(nil, nil)

// bulkdata.Data() now returns the bulkdata data from the last list
// bulkdata.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
