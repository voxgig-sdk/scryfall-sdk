# Scryfall Golang SDK



The Golang SDK for the Scryfall API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.BulkData(nil)` — each with the same small set of operations (`List`, `Load`, `Create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
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

    // List bulkdata records — the value is the array of records itself.
    bulkdatas, err := client.BulkData(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range bulkdatas.([]any) {
        fmt.Println(item)
    }

    // Load a single bulkdata — the value is the loaded record.
    bulkdata, err := client.BulkData(nil).Load(map[string]any{"id": "example"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(bulkdata)
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

bulkdata, err := client.BulkData(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(bulkdata) // the returned mock data
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

    bulkdata, err := client.BulkData(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // bulkdata is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### BulkData

| Field | Description |
| --- | --- |
| `"content_encoding"` |  |
| `"content_type"` |  |
| `"description"` |  |
| `"download_uri"` |  |
| `"id"` |  |
| `"name"` |  |
| `"object"` |  |
| `"size"` |  |
| `"type"` |  |
| `"updated_at"` |  |

Operations: List, Load.

API path: `/bulk-data`

#### Card

| Field | Description |
| --- | --- |
| `"artist"` |  |
| `"cmc"` |  |
| `"collector_number"` |  |
| `"color"` |  |
| `"color_identity"` |  |
| `"id"` |  |
| `"image_uri"` |  |
| `"lang"` |  |
| `"layout"` |  |
| `"legality"` |  |
| `"loyalty"` |  |
| `"mana_cost"` |  |
| `"name"` |  |
| `"oracle_id"` |  |
| `"oracle_text"` |  |
| `"power"` |  |
| `"price"` |  |
| `"rarity"` |  |
| `"released_at"` |  |
| `"scryfall_uri"` |  |
| `"set"` |  |
| `"set_name"` |  |
| `"toughness"` |  |
| `"type_line"` |  |
| `"uri"` |  |

Operations: List, Load.

API path: `/cards/named`

#### CardList

| Field | Description |
| --- | --- |
| `"artist"` |  |
| `"cmc"` |  |
| `"collector_number"` |  |
| `"color"` |  |
| `"color_identity"` |  |
| `"data"` |  |
| `"has_more"` |  |
| `"id"` |  |
| `"identifier"` |  |
| `"image_uri"` |  |
| `"lang"` |  |
| `"layout"` |  |
| `"legality"` |  |
| `"loyalty"` |  |
| `"mana_cost"` |  |
| `"name"` |  |
| `"next_page"` |  |
| `"object"` |  |
| `"oracle_id"` |  |
| `"oracle_text"` |  |
| `"power"` |  |
| `"price"` |  |
| `"rarity"` |  |
| `"released_at"` |  |
| `"scryfall_uri"` |  |
| `"set"` |  |
| `"set_name"` |  |
| `"total_card"` |  |
| `"toughness"` |  |
| `"type_line"` |  |
| `"uri"` |  |

Operations: Create, List.

API path: `/cards/collection`

#### CardSymbolList

| Field | Description |
| --- | --- |
| `"appears_in_mana_cost"` |  |
| `"cmc"` |  |
| `"color"` |  |
| `"english"` |  |
| `"funny"` |  |
| `"loose_variant"` |  |
| `"object"` |  |
| `"represents_mana"` |  |
| `"svg_uri"` |  |
| `"symbol"` |  |
| `"transposable"` |  |

Operations: List.

API path: `/symbology`

#### Catalog

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"object"` |  |
| `"total_value"` |  |
| `"uri"` |  |

Operations: Load.

API path: `/catalog/{catalog_name}`

#### ManaCost

| Field | Description |
| --- | --- |
| `"cmc"` |  |
| `"color"` |  |
| `"colorless"` |  |
| `"cost"` |  |
| `"monocolored"` |  |
| `"multicolored"` |  |
| `"object"` |  |

Operations: List.

API path: `/symbology/parse-mana`

#### Migration

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"migration_strategy"` |  |
| `"new_scryfall_id"` |  |
| `"object"` |  |
| `"old_scryfall_id"` |  |
| `"performed_at"` |  |
| `"uri"` |  |

Operations: List.

API path: `/migrations`

#### Ruling

| Field | Description |
| --- | --- |
| `"comment"` |  |
| `"object"` |  |
| `"oracle_id"` |  |
| `"published_at"` |  |
| `"source"` |  |

Operations: List.

API path: `/cards/{id}/rulings`

#### Set

| Field | Description |
| --- | --- |
| `"card_count"` |  |
| `"code"` |  |
| `"digital"` |  |
| `"icon_svg_uri"` |  |
| `"id"` |  |
| `"name"` |  |
| `"released_at"` |  |
| `"scryfall_uri"` |  |
| `"search_uri"` |  |
| `"set_type"` |  |
| `"uri"` |  |

Operations: List, Load.

API path: `/sets`



## Entities


### BulkData

Create an instance: `bulk_data := client.BulkData(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
bulk_data, err := client.BulkData(nil).Load(map[string]any{"id": "bulk_data_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(bulk_data) // the loaded record
```

#### Example: List

```go
bulk_datas, err := client.BulkData(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(bulk_datas) // the array of records
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
| `artist` | `string` |  |
| `cmc` | `float64` |  |
| `collector_number` | `string` |  |
| `color` | `[]any` |  |
| `color_identity` | `[]any` |  |
| `id` | `string` |  |
| `image_uri` | `map[string]any` |  |
| `lang` | `string` |  |
| `layout` | `string` |  |
| `legality` | `map[string]any` |  |
| `loyalty` | `string` |  |
| `mana_cost` | `string` |  |
| `name` | `string` |  |
| `oracle_id` | `string` |  |
| `oracle_text` | `string` |  |
| `power` | `string` |  |
| `price` | `map[string]any` |  |
| `rarity` | `string` |  |
| `released_at` | `string` |  |
| `scryfall_uri` | `string` |  |
| `set` | `string` |  |
| `set_name` | `string` |  |
| `toughness` | `string` |  |
| `type_line` | `string` |  |
| `uri` | `string` |  |

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

Create an instance: `card_list := client.CardList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artist` | `string` |  |
| `cmc` | `float64` |  |
| `collector_number` | `string` |  |
| `color` | `[]any` |  |
| `color_identity` | `[]any` |  |
| `data` | `[]any` |  |
| `has_more` | `bool` |  |
| `id` | `string` |  |
| `identifier` | `[]any` |  |
| `image_uri` | `map[string]any` |  |
| `lang` | `string` |  |
| `layout` | `string` |  |
| `legality` | `map[string]any` |  |
| `loyalty` | `string` |  |
| `mana_cost` | `string` |  |
| `name` | `string` |  |
| `next_page` | `string` |  |
| `object` | `string` |  |
| `oracle_id` | `string` |  |
| `oracle_text` | `string` |  |
| `power` | `string` |  |
| `price` | `map[string]any` |  |
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

```go
card_lists, err := client.CardList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(card_lists) // the array of records
```

#### Example: Create

```go
result, err := client.CardList(nil).Create(map[string]any{
    "identifier": /* []any */,
}, nil)
```


### CardSymbolList

Create an instance: `card_symbol_list := client.CardSymbolList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `appears_in_mana_cost` | `bool` |  |
| `cmc` | `float64` |  |
| `color` | `[]any` |  |
| `english` | `string` |  |
| `funny` | `bool` |  |
| `loose_variant` | `string` |  |
| `object` | `string` |  |
| `represents_mana` | `bool` |  |
| `svg_uri` | `string` |  |
| `symbol` | `string` |  |
| `transposable` | `bool` |  |

#### Example: List

```go
card_symbol_lists, err := client.CardSymbolList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(card_symbol_lists) // the array of records
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
| `data` | `[]any` |  |
| `object` | `string` |  |
| `total_value` | `int` |  |
| `uri` | `string` |  |

#### Example: Load

```go
catalog, err := client.Catalog(nil).Load(map[string]any{"id": "catalog_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(catalog) // the loaded record
```


### ManaCost

Create an instance: `mana_cost := client.ManaCost(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cmc` | `float64` |  |
| `color` | `[]any` |  |
| `colorless` | `bool` |  |
| `cost` | `string` |  |
| `monocolored` | `bool` |  |
| `multicolored` | `bool` |  |
| `object` | `string` |  |

#### Example: List

```go
mana_costs, err := client.ManaCost(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(mana_costs) // the array of records
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
| `id` | `string` |  |
| `migration_strategy` | `string` |  |
| `new_scryfall_id` | `string` |  |
| `object` | `string` |  |
| `old_scryfall_id` | `string` |  |
| `performed_at` | `string` |  |
| `uri` | `string` |  |

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
| `comment` | `string` |  |
| `object` | `string` |  |
| `oracle_id` | `string` |  |
| `published_at` | `string` |  |
| `source` | `string` |  |

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
