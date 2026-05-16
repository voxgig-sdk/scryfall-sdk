# Scryfall Golang SDK

The Golang SDK for the Scryfall API. Provides an entity-oriented interface using standard Go conventions — no generics required, data flows as `map[string]any`.


## Install
```bash
go get github.com/voxgig-sdk/scryfall-sdk
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/scryfall-sdk=../path/to/github.com/voxgig-sdk/scryfall-sdk
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"
    "os"

    sdk "github.com/voxgig-sdk/scryfall-sdk"
    "github.com/voxgig-sdk/scryfall-sdk/core"
)

func main() {
    client := sdk.NewScryfallSDK(map[string]any{
        "apikey": os.Getenv("SCRYFALL_APIKEY"),
    })
```

### 2. List bulkdatas

```go
    result, err := client.BulkData(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }

    rm := core.ToMapAny(result)
    if rm["ok"] == true {
        for _, item := range rm["data"].([]any) {
            p := core.ToMapAny(item)
            fmt.Println(p["id"], p["name"])
        }
    }
```

### 3. Load a bulkdata

```go
    result, err = client.BulkData(nil).Load(
        map[string]any{"id": "example_id"}, nil,
    )
    if err != nil {
        panic(err)
    }

    rm = core.ToMapAny(result)
    if rm["ok"] == true {
        fmt.Println(rm["data"])
    }
}
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
client := sdk.TestSDK(nil, nil)

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
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
SCRYFALL_APIKEY=<your-key>
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
| `"apikey"` | `string` | API key for authentication. |
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
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

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
| `content_encoding` | ``$STRING`` |  |
| `content_type` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `download_uri` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `object` | ``$STRING`` |  |
| `size` | ``$INTEGER`` |  |
| `type` | ``$STRING`` |  |
| `updated_at` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.BulkData(nil).Load(map[string]any{"id": "bulk_data_id"}, nil)
```

#### Example: List

```go
results, err := client.BulkData(nil).List(nil, nil)
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
| `artist` | ``$STRING`` |  |
| `cmc` | ``$NUMBER`` |  |
| `collector_number` | ``$STRING`` |  |
| `color` | ``$ARRAY`` |  |
| `color_identity` | ``$ARRAY`` |  |
| `id` | ``$STRING`` |  |
| `image_uri` | ``$OBJECT`` |  |
| `lang` | ``$STRING`` |  |
| `layout` | ``$STRING`` |  |
| `legality` | ``$OBJECT`` |  |
| `loyalty` | ``$STRING`` |  |
| `mana_cost` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `oracle_id` | ``$STRING`` |  |
| `oracle_text` | ``$STRING`` |  |
| `power` | ``$STRING`` |  |
| `price` | ``$OBJECT`` |  |
| `rarity` | ``$STRING`` |  |
| `released_at` | ``$STRING`` |  |
| `scryfall_uri` | ``$STRING`` |  |
| `set` | ``$STRING`` |  |
| `set_name` | ``$STRING`` |  |
| `toughness` | ``$STRING`` |  |
| `type_line` | ``$STRING`` |  |
| `uri` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Card(nil).Load(map[string]any{"id": "card_id"}, nil)
```

#### Example: List

```go
results, err := client.Card(nil).List(nil, nil)
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
| `artist` | ``$STRING`` |  |
| `cmc` | ``$NUMBER`` |  |
| `collector_number` | ``$STRING`` |  |
| `color` | ``$ARRAY`` |  |
| `color_identity` | ``$ARRAY`` |  |
| `data` | ``$ARRAY`` |  |
| `has_more` | ``$BOOLEAN`` |  |
| `id` | ``$STRING`` |  |
| `identifier` | ``$ARRAY`` |  |
| `image_uri` | ``$OBJECT`` |  |
| `lang` | ``$STRING`` |  |
| `layout` | ``$STRING`` |  |
| `legality` | ``$OBJECT`` |  |
| `loyalty` | ``$STRING`` |  |
| `mana_cost` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `next_page` | ``$STRING`` |  |
| `object` | ``$STRING`` |  |
| `oracle_id` | ``$STRING`` |  |
| `oracle_text` | ``$STRING`` |  |
| `power` | ``$STRING`` |  |
| `price` | ``$OBJECT`` |  |
| `rarity` | ``$STRING`` |  |
| `released_at` | ``$STRING`` |  |
| `scryfall_uri` | ``$STRING`` |  |
| `set` | ``$STRING`` |  |
| `set_name` | ``$STRING`` |  |
| `total_card` | ``$INTEGER`` |  |
| `toughness` | ``$STRING`` |  |
| `type_line` | ``$STRING`` |  |
| `uri` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.CardList(nil).List(nil, nil)
```

#### Example: Create

```go
result, err := client.CardList(nil).Create(map[string]any{
    "identifier": /* `$ARRAY` */,
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
| `appears_in_mana_cost` | ``$BOOLEAN`` |  |
| `cmc` | ``$NUMBER`` |  |
| `color` | ``$ARRAY`` |  |
| `english` | ``$STRING`` |  |
| `funny` | ``$BOOLEAN`` |  |
| `loose_variant` | ``$STRING`` |  |
| `object` | ``$STRING`` |  |
| `represents_mana` | ``$BOOLEAN`` |  |
| `svg_uri` | ``$STRING`` |  |
| `symbol` | ``$STRING`` |  |
| `transposable` | ``$BOOLEAN`` |  |

#### Example: List

```go
results, err := client.CardSymbolList(nil).List(nil, nil)
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
| `data` | ``$ARRAY`` |  |
| `object` | ``$STRING`` |  |
| `total_value` | ``$INTEGER`` |  |
| `uri` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Catalog(nil).Load(map[string]any{"id": "catalog_id"}, nil)
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
| `cmc` | ``$NUMBER`` |  |
| `color` | ``$ARRAY`` |  |
| `colorless` | ``$BOOLEAN`` |  |
| `cost` | ``$STRING`` |  |
| `monocolored` | ``$BOOLEAN`` |  |
| `multicolored` | ``$BOOLEAN`` |  |
| `object` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.ManaCost(nil).List(nil, nil)
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
| `id` | ``$STRING`` |  |
| `migration_strategy` | ``$STRING`` |  |
| `new_scryfall_id` | ``$STRING`` |  |
| `object` | ``$STRING`` |  |
| `old_scryfall_id` | ``$STRING`` |  |
| `performed_at` | ``$STRING`` |  |
| `uri` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.Migration(nil).List(nil, nil)
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
| `comment` | ``$STRING`` |  |
| `object` | ``$STRING`` |  |
| `oracle_id` | ``$STRING`` |  |
| `published_at` | ``$STRING`` |  |
| `source` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.Ruling(nil).List(nil, nil)
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
| `card_count` | ``$INTEGER`` |  |
| `code` | ``$STRING`` |  |
| `digital` | ``$BOOLEAN`` |  |
| `icon_svg_uri` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `released_at` | ``$STRING`` |  |
| `scryfall_uri` | ``$STRING`` |  |
| `search_uri` | ``$STRING`` |  |
| `set_type` | ``$STRING`` |  |
| `uri` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Set(nil).Load(map[string]any{"id": "set_id"}, nil)
```

#### Example: List

```go
results, err := client.Set(nil).List(nil, nil)
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

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
github.com/voxgig-sdk/scryfall-sdk/
├── scryfall.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/scryfall-sdk`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
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
