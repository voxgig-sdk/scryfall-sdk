# Scryfall Lua SDK



The Lua SDK for the Scryfall API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:BulkData()` — each with the same small set of operations (`list`, `load`, `create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

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

### 2. List bulkdata records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local bulkdatas, err = client:BulkData():list()
if err then error(err) end

for _, item in ipairs(bulkdatas) do
  print(item["id"], item["content_encoding"])
end
```

### 3. Load a bulkdata

```lua
local bulkdata, err = client:BulkData():load({ id = "example_id" })
if err then error(err) end
print(bulkdata)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local bulkdatas, err = client:BulkData():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
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

local result, err = client:BulkData():list()
-- result is the returned data; err is set on failure
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
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local bulk_data, err = client:BulkData():load({ id = "example_id" })
    if err then error(err) end
    -- bulk_data is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### BulkData

| Field | Description |
| --- | --- |
| `content_encoding` | The Content-Encoding encoding for this file |
| `content_type` | The MIME type of this file |
| `description` | A human-readable description for this file |
| `download_uri` | The URI that hosts this bulk file |
| `id` | A unique ID for this bulk data file |
| `name` | A human-readable name for this file |
| `object` | The object type |
| `size` | The size of this file in bytes |
| `type` | The type of bulk data |
| `updated_at` | The time this file was last updated |

Operations: List, Load.

API path: `/bulk-data`

#### Card

| Field | Description |
| --- | --- |
| `artist` | The name of the illustrator of this card |
| `cmc` | The card's converted mana cost |
| `collector_number` | This card's collector number |
| `color_identity` | This card's color identity |
| `colors` | This card's colors |
| `id` | A unique ID for this card in Scryfall's database |
| `image_uris` | An object containing URIs to this card's imagery |
| `lang` | The language code for this printing |
| `layout` | A code for this card's layout |
| `legalities` | An object describing the legality of this card |
| `loyalty` | This card's loyalty (for planeswalkers) |
| `mana_cost` | The mana cost for this card |
| `name` | The name of this card |
| `oracle_id` | A unique ID for this card's oracle identity |
| `oracle_text` | The Oracle text for this card |
| `power` | This card's power (for creatures) |
| `prices` | An object containing daily price information for this card |
| `rarity` | This card's rarity |
| `released_at` | The date this card was first released |
| `scryfall_uri` | A link to this card's page on Scryfall's website |
| `set` | This card's set code |
| `set_name` | This card's full set name |
| `toughness` | This card's toughness (for creatures) |
| `type_line` | The type line of this card |
| `uri` | A link to this card object on Scryfall's API |

Operations: List, Load.

API path: `/cards/named`

#### CardList

| Field | Description |
| --- | --- |
| `artist` | The name of the illustrator of this card |
| `cmc` | The card's converted mana cost |
| `collector_number` | This card's collector number |
| `color_identity` | This card's color identity |
| `colors` | This card's colors |
| `data` | An array of the requested objects |
| `has_more` | True if this list is paginated and has more pages |
| `id` | A unique ID for this card in Scryfall's database |
| `identifiers` |  |
| `image_uris` | An object containing URIs to this card's imagery |
| `lang` | The language code for this printing |
| `layout` | A code for this card's layout |
| `legalities` | An object describing the legality of this card |
| `loyalty` | This card's loyalty (for planeswalkers) |
| `mana_cost` | The mana cost for this card |
| `name` | The name of this card |
| `next_page` | The URL for the next page of results |
| `object` | The object type |
| `oracle_id` | A unique ID for this card's oracle identity |
| `oracle_text` | The Oracle text for this card |
| `power` | This card's power (for creatures) |
| `prices` | An object containing daily price information for this card |
| `rarity` | This card's rarity |
| `released_at` | The date this card was first released |
| `scryfall_uri` | A link to this card's page on Scryfall's website |
| `set` | This card's set code |
| `set_name` | This card's full set name |
| `total_cards` | The total number of cards found |
| `toughness` | This card's toughness (for creatures) |
| `type_line` | The type line of this card |
| `uri` | A link to this card object on Scryfall's API |

Operations: Create, List.

API path: `/cards/collection`

#### CardSymbolList

| Field | Description |
| --- | --- |
| `appears_in_mana_costs` | True if this symbol appears in mana costs |
| `cmc` | The converted mana cost represented by this symbol |
| `colors` | The colors of this symbol |
| `english` | An English textual description of the symbol |
| `funny` | True if this symbol is only used on funny cards |
| `loose_variant` | An alternate version of this symbol |
| `object` | The object type |
| `represents_mana` | True if this is a mana symbol |
| `svg_uri` | A URI to an SVG image for this symbol |
| `symbol` | The plaintext symbol |
| `transposable` | True if it's possible to write this symbol backwards |

Operations: List.

API path: `/symbology`

#### Catalog

| Field | Description |
| --- | --- |
| `data` | An array of datapoints |
| `id` |  |
| `object` | The object type |
| `total_values` | The number of items in the data array |
| `uri` | A link to this catalog on Scryfall's API |

Operations: Load.

API path: `/catalog/{catalog_name}`

#### ManaCost

| Field | Description |
| --- | --- |
| `cmc` | The converted mana cost |
| `colorless` | True if this mana cost is colorless |
| `colors` | The colors in this mana cost |
| `cost` | The normalized cost |
| `monocolored` | True if this mana cost is monocolored |
| `multicolored` | True if this mana cost is multicolored |
| `object` | The object type |

Operations: List.

API path: `/symbology/parse-mana`

#### Migration

| Field | Description |
| --- | --- |
| `id` | A unique ID for this migration |
| `migration_strategy` | The type of migration strategy |
| `new_scryfall_id` | The updated Scryfall ID |
| `object` | The object type |
| `old_scryfall_id` | The original Scryfall ID |
| `performed_at` | The date this migration was performed |
| `uri` | A link to this migration on Scryfall's API |

Operations: List.

API path: `/migrations`

#### Ruling

| Field | Description |
| --- | --- |
| `comment` | The text of the ruling |
| `object` | The object type |
| `oracle_id` | The Oracle ID of the card this ruling applies to |
| `published_at` | The date this ruling was published |
| `source` | The source of this ruling |

Operations: List.

API path: `/cards/{id}/rulings`

#### Set

| Field | Description |
| --- | --- |
| `card_count` | The number of cards in this set |
| `code` | The unique three to five-letter code for this set |
| `digital` | True if this set is only available digitally |
| `icon_svg_uri` | A URI to an SVG file for this set's icon |
| `id` | A unique ID for this set |
| `name` | The English name of the set |
| `released_at` | The date the set was released |
| `scryfall_uri` | A link to this set's page on Scryfall's website |
| `search_uri` | A link to search for cards in this set on Scryfall's API |
| `set_type` | The type of set |
| `uri` | A link to this set object on Scryfall's API |

Operations: List, Load.

API path: `/sets`



## Entities


### BulkData

Create an instance: `local bulk_data = client:BulkData(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

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
| `size` | `number` | The size of this file in bytes |
| `type` | `string` | The type of bulk data |
| `updated_at` | `string` | The time this file was last updated |

#### Example: Load

```lua
local bulk_data, err = client:BulkData():load({ id = "bulk_data_id" })
```

#### Example: List

```lua
local bulk_datas, err = client:BulkData():list()
```


### Card

Create an instance: `local card = client:Card(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artist` | `string` | The name of the illustrator of this card |
| `cmc` | `number` | The card's converted mana cost |
| `collector_number` | `string` | This card's collector number |
| `color_identity` | `table` | This card's color identity |
| `colors` | `table` | This card's colors |
| `id` | `string` | A unique ID for this card in Scryfall's database |
| `image_uris` | `table` | An object containing URIs to this card's imagery |
| `lang` | `string` | The language code for this printing |
| `layout` | `string` | A code for this card's layout |
| `legalities` | `table` | An object describing the legality of this card |
| `loyalty` | `string` | This card's loyalty (for planeswalkers) |
| `mana_cost` | `string` | The mana cost for this card |
| `name` | `string` | The name of this card |
| `oracle_id` | `string` | A unique ID for this card's oracle identity |
| `oracle_text` | `string` | The Oracle text for this card |
| `power` | `string` | This card's power (for creatures) |
| `prices` | `table` | An object containing daily price information for this card |
| `rarity` | `string` | This card's rarity |
| `released_at` | `string` | The date this card was first released |
| `scryfall_uri` | `string` | A link to this card's page on Scryfall's website |
| `set` | `string` | This card's set code |
| `set_name` | `string` | This card's full set name |
| `toughness` | `string` | This card's toughness (for creatures) |
| `type_line` | `string` | The type line of this card |
| `uri` | `string` | A link to this card object on Scryfall's API |

#### Example: Load

```lua
local card, err = client:Card():load({ id = "card_id" })
```

#### Example: List

```lua
local cards, err = client:Card():list()
```


### CardList

Create an instance: `local card_list = client:CardList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artist` | `string` | The name of the illustrator of this card |
| `cmc` | `number` | The card's converted mana cost |
| `collector_number` | `string` | This card's collector number |
| `color_identity` | `table` | This card's color identity |
| `colors` | `table` | This card's colors |
| `data` | `table` | An array of the requested objects |
| `has_more` | `boolean` | True if this list is paginated and has more pages |
| `id` | `string` | A unique ID for this card in Scryfall's database |
| `identifiers` | `table` |  |
| `image_uris` | `table` | An object containing URIs to this card's imagery |
| `lang` | `string` | The language code for this printing |
| `layout` | `string` | A code for this card's layout |
| `legalities` | `table` | An object describing the legality of this card |
| `loyalty` | `string` | This card's loyalty (for planeswalkers) |
| `mana_cost` | `string` | The mana cost for this card |
| `name` | `string` | The name of this card |
| `next_page` | `string` | The URL for the next page of results |
| `object` | `string` | The object type |
| `oracle_id` | `string` | A unique ID for this card's oracle identity |
| `oracle_text` | `string` | The Oracle text for this card |
| `power` | `string` | This card's power (for creatures) |
| `prices` | `table` | An object containing daily price information for this card |
| `rarity` | `string` | This card's rarity |
| `released_at` | `string` | The date this card was first released |
| `scryfall_uri` | `string` | A link to this card's page on Scryfall's website |
| `set` | `string` | This card's set code |
| `set_name` | `string` | This card's full set name |
| `total_cards` | `number` | The total number of cards found |
| `toughness` | `string` | This card's toughness (for creatures) |
| `type_line` | `string` | The type line of this card |
| `uri` | `string` | A link to this card object on Scryfall's API |

#### Example: List

```lua
local card_lists, err = client:CardList():list()
```

#### Example: Create

```lua
local card_list, err = client:CardList():create({
  identifiers = {}, -- table
})
```


### CardSymbolList

Create an instance: `local card_symbol_list = client:CardSymbolList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `appears_in_mana_costs` | `boolean` | True if this symbol appears in mana costs |
| `cmc` | `number` | The converted mana cost represented by this symbol |
| `colors` | `table` | The colors of this symbol |
| `english` | `string` | An English textual description of the symbol |
| `funny` | `boolean` | True if this symbol is only used on funny cards |
| `loose_variant` | `string` | An alternate version of this symbol |
| `object` | `string` | The object type |
| `represents_mana` | `boolean` | True if this is a mana symbol |
| `svg_uri` | `string` | A URI to an SVG image for this symbol |
| `symbol` | `string` | The plaintext symbol |
| `transposable` | `boolean` | True if it's possible to write this symbol backwards |

#### Example: List

```lua
local card_symbol_lists, err = client:CardSymbolList():list()
```


### Catalog

Create an instance: `local catalog = client:Catalog(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` | An array of datapoints |
| `id` | `string` |  |
| `object` | `string` | The object type |
| `total_values` | `number` | The number of items in the data array |
| `uri` | `string` | A link to this catalog on Scryfall's API |

#### Example: Load

```lua
local catalog, err = client:Catalog():load({ id = "catalog_id" })
```


### ManaCost

Create an instance: `local mana_cost = client:ManaCost(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cmc` | `number` | The converted mana cost |
| `colorless` | `boolean` | True if this mana cost is colorless |
| `colors` | `table` | The colors in this mana cost |
| `cost` | `string` | The normalized cost |
| `monocolored` | `boolean` | True if this mana cost is monocolored |
| `multicolored` | `boolean` | True if this mana cost is multicolored |
| `object` | `string` | The object type |

#### Example: List

```lua
local mana_costs, err = client:ManaCost():list()
```


### Migration

Create an instance: `local migration = client:Migration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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

```lua
local migrations, err = client:Migration():list()
```


### Ruling

Create an instance: `local ruling = client:Ruling(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `comment` | `string` | The text of the ruling |
| `object` | `string` | The object type |
| `oracle_id` | `string` | The Oracle ID of the card this ruling applies to |
| `published_at` | `string` | The date this ruling was published |
| `source` | `string` | The source of this ruling |

#### Example: List

```lua
local rulings, err = client:Ruling():list()
```


### Set

Create an instance: `local set = client:Set(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `card_count` | `number` | The number of cards in this set |
| `code` | `string` | The unique three to five-letter code for this set |
| `digital` | `boolean` | True if this set is only available digitally |
| `icon_svg_uri` | `string` | A URI to an SVG file for this set's icon |
| `id` | `string` | A unique ID for this set |
| `name` | `string` | The English name of the set |
| `released_at` | `string` | The date the set was released |
| `scryfall_uri` | `string` | A link to this set's page on Scryfall's website |
| `search_uri` | `string` | A link to search for cards in this set on Scryfall's API |
| `set_type` | `string` | The type of set |
| `uri` | `string` | A link to this set object on Scryfall's API |

#### Example: Load

```lua
local set, err = client:Set():load({ id = "set_id" })
```

#### Example: List

```lua
local sets, err = client:Set():list()
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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local bulkdata = client:BulkData()
bulkdata:list()

-- bulkdata:data_get() now returns the bulkdata data from the last list
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
