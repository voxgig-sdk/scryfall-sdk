# Scryfall Lua SDK



The Lua SDK for the Scryfall API — an entity-oriented client using Lua conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/scryfall-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("scryfall_sdk")

local client = sdk.new()
```

### 2. List bulkdatas

```lua
local result, err = client:bulkdata():list()
if err then error(err) end

if type(result) == "table" then
  for _, item in ipairs(result) do
    local d = item:data_get()
    print(d["id"], d["name"])
  end
end
```

### 3. Load a bulkdata

```lua
local result, err = client:bulkdata():load({ id = "example_id" })
if err then error(err) end
print(result)
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:bulkdata():load({ id = "test01" })
-- result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### ScryfallSDK

```lua
local sdk = require("scryfall_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ScryfallSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `BulkData` | `(data) -> BulkDataEntity` | Create a BulkData entity instance. |
| `Card` | `(data) -> CardEntity` | Create a Card entity instance. |
| `CardList` | `(data) -> CardListEntity` | Create a CardList entity instance. |
| `CardSymbolList` | `(data) -> CardSymbolListEntity` | Create a CardSymbolList entity instance. |
| `Catalog` | `(data) -> CatalogEntity` | Create a Catalog entity instance. |
| `ManaCost` | `(data) -> ManaCostEntity` | Create a ManaCost entity instance. |
| `Migration` | `(data) -> MigrationEntity` | Create a Migration entity instance. |
| `Ruling` | `(data) -> RulingEntity` | Create a Ruling entity instance. |
| `Set` | `(data) -> SetEntity` | Create a Set entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(any, err)`. The first value is a
`table` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `boolean` | `true` if the HTTP status is 2xx. |
| `status` | `number` | HTTP status code. |
| `headers` | `table` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `false` and `err` contains the error value.

### Entities

#### BulkData

| Field | Description |
| --- | --- |
| `content_encoding` |  |
| `content_type` |  |
| `description` |  |
| `download_uri` |  |
| `id` |  |
| `name` |  |
| `object` |  |
| `size` |  |
| `type` |  |
| `updated_at` |  |

Operations: List, Load.

API path: `/bulk-data`

#### Card

| Field | Description |
| --- | --- |
| `artist` |  |
| `cmc` |  |
| `collector_number` |  |
| `color` |  |
| `color_identity` |  |
| `id` |  |
| `image_uri` |  |
| `lang` |  |
| `layout` |  |
| `legality` |  |
| `loyalty` |  |
| `mana_cost` |  |
| `name` |  |
| `oracle_id` |  |
| `oracle_text` |  |
| `power` |  |
| `price` |  |
| `rarity` |  |
| `released_at` |  |
| `scryfall_uri` |  |
| `set` |  |
| `set_name` |  |
| `toughness` |  |
| `type_line` |  |
| `uri` |  |

Operations: List, Load.

API path: `/cards/named`

#### CardList

| Field | Description |
| --- | --- |
| `artist` |  |
| `cmc` |  |
| `collector_number` |  |
| `color` |  |
| `color_identity` |  |
| `data` |  |
| `has_more` |  |
| `id` |  |
| `identifier` |  |
| `image_uri` |  |
| `lang` |  |
| `layout` |  |
| `legality` |  |
| `loyalty` |  |
| `mana_cost` |  |
| `name` |  |
| `next_page` |  |
| `object` |  |
| `oracle_id` |  |
| `oracle_text` |  |
| `power` |  |
| `price` |  |
| `rarity` |  |
| `released_at` |  |
| `scryfall_uri` |  |
| `set` |  |
| `set_name` |  |
| `total_card` |  |
| `toughness` |  |
| `type_line` |  |
| `uri` |  |

Operations: Create, List.

API path: `/cards/collection`

#### CardSymbolList

| Field | Description |
| --- | --- |
| `appears_in_mana_cost` |  |
| `cmc` |  |
| `color` |  |
| `english` |  |
| `funny` |  |
| `loose_variant` |  |
| `object` |  |
| `represents_mana` |  |
| `svg_uri` |  |
| `symbol` |  |
| `transposable` |  |

Operations: List.

API path: `/symbology`

#### Catalog

| Field | Description |
| --- | --- |
| `data` |  |
| `object` |  |
| `total_value` |  |
| `uri` |  |

Operations: Load.

API path: `/catalog/{catalog_name}`

#### ManaCost

| Field | Description |
| --- | --- |
| `cmc` |  |
| `color` |  |
| `colorless` |  |
| `cost` |  |
| `monocolored` |  |
| `multicolored` |  |
| `object` |  |

Operations: List.

API path: `/symbology/parse-mana`

#### Migration

| Field | Description |
| --- | --- |
| `id` |  |
| `migration_strategy` |  |
| `new_scryfall_id` |  |
| `object` |  |
| `old_scryfall_id` |  |
| `performed_at` |  |
| `uri` |  |

Operations: List.

API path: `/migrations`

#### Ruling

| Field | Description |
| --- | --- |
| `comment` |  |
| `object` |  |
| `oracle_id` |  |
| `published_at` |  |
| `source` |  |

Operations: List.

API path: `/cards/{id}/rulings`

#### Set

| Field | Description |
| --- | --- |
| `card_count` |  |
| `code` |  |
| `digital` |  |
| `icon_svg_uri` |  |
| `id` |  |
| `name` |  |
| `released_at` |  |
| `scryfall_uri` |  |
| `search_uri` |  |
| `set_type` |  |
| `uri` |  |

Operations: List, Load.

API path: `/sets`



## Entities


### BulkData

Create an instance: `const bulk_data = client.bulk_data`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

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

```ts
const bulk_data = await client.bulk_data.load({ id: 'bulk_data_id' })
```

#### Example: List

```ts
const bulk_datas = await client.bulk_data.list()
```


### Card

Create an instance: `const card = client.card`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

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

```ts
const card = await client.card.load({ id: 'card_id' })
```

#### Example: List

```ts
const cards = await client.card.list()
```


### CardList

Create an instance: `const card_list = client.card_list`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

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

```ts
const card_lists = await client.card_list.list()
```

#### Example: Create

```ts
const card_list = await client.card_list.create({
  identifier: /* `$ARRAY` */,
})
```


### CardSymbolList

Create an instance: `const card_symbol_list = client.card_symbol_list`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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

```ts
const card_symbol_lists = await client.card_symbol_list.list()
```


### Catalog

Create an instance: `const catalog = client.catalog`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$ARRAY`` |  |
| `object` | ``$STRING`` |  |
| `total_value` | ``$INTEGER`` |  |
| `uri` | ``$STRING`` |  |

#### Example: Load

```ts
const catalog = await client.catalog.load({ id: 'catalog_id' })
```


### ManaCost

Create an instance: `const mana_cost = client.mana_cost`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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

```ts
const mana_costs = await client.mana_cost.list()
```


### Migration

Create an instance: `const migration = client.migration`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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

```ts
const migrations = await client.migration.list()
```


### Ruling

Create an instance: `const ruling = client.ruling`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `comment` | ``$STRING`` |  |
| `object` | ``$STRING`` |  |
| `oracle_id` | ``$STRING`` |  |
| `published_at` | ``$STRING`` |  |
| `source` | ``$STRING`` |  |

#### Example: List

```ts
const rulings = await client.ruling.list()
```


### Set

Create an instance: `const set = client.set`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

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

```ts
const set = await client.set.load({ id: 'set_id' })
```

#### Example: List

```ts
const sets = await client.set.list()
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
error is returned to the caller as a second return value.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── scryfall_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`scryfall_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local bulkdata = client:bulkdata()
bulkdata:load({ id = "example_id" })

-- bulkdata:data_get() now returns the loaded bulkdata data
-- bulkdata:match_get() returns the last match criteria
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
