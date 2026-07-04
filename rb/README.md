# Scryfall Ruby SDK



The Ruby SDK for the Scryfall API — an entity-oriented client using idiomatic Ruby conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/scryfall-sdk/releases](https://github.com/voxgig-sdk/scryfall-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Scryfall_sdk"

client = ScryfallSDK.new
```

### 2. List bulkdata records

```ruby
begin
  # list returns an Array of BulkData records — iterate directly.
  bulkdatas = client.BulkData.list
  bulkdatas.each do |item|
    puts "#{item["id"]} #{item["name"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a bulkdata

```ruby
begin
  # load returns the bare BulkData record (raises on error).
  bulkdata = client.BulkData.load({ "id" => "example_id" })
  puts bulkdata
rescue => err
  warn "load failed: #{err}"
end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  warn result["err"]
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = ScryfallSDK.test({
  "entity" => { "bulkdata" => { "test01" => { "id" => "test01" } } },
})

# load returns the bare mock record (raises on error).
bulkdata = client.BulkData.load({ "id" => "test01" })
puts bulkdata
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = ScryfallSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### ScryfallSDK

```ruby
require_relative "Scryfall_sdk"
client = ScryfallSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = ScryfallSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ScryfallSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> Array` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `ScryfallError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `bulk_data = client.BulkData`

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

```ruby
# load returns the bare BulkData record (raises on error).
bulk_data = client.BulkData.load({ "id" => "bulk_data_id" })
```

#### Example: List

```ruby
# list returns an Array of BulkData records (raises on error).
bulk_datas = client.BulkData.list
```


### Card

Create an instance: `card = client.Card`

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

```ruby
# load returns the bare Card record (raises on error).
card = client.Card.load({ "id" => "card_id" })
```

#### Example: List

```ruby
# list returns an Array of Card records (raises on error).
cards = client.Card.list
```


### CardList

Create an instance: `card_list = client.CardList`

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

```ruby
# list returns an Array of CardList records (raises on error).
card_lists = client.CardList.list
```

#### Example: Create

```ruby
card_list = client.CardList.create({
  "identifier" => nil, # `$ARRAY`
})
```


### CardSymbolList

Create an instance: `card_symbol_list = client.CardSymbolList`

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

```ruby
# list returns an Array of CardSymbolList records (raises on error).
card_symbol_lists = client.CardSymbolList.list
```


### Catalog

Create an instance: `catalog = client.Catalog`

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

```ruby
# load returns the bare Catalog record (raises on error).
catalog = client.Catalog.load({ "id" => "catalog_id" })
```


### ManaCost

Create an instance: `mana_cost = client.ManaCost`

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

```ruby
# list returns an Array of ManaCost records (raises on error).
mana_costs = client.ManaCost.list
```


### Migration

Create an instance: `migration = client.Migration`

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

```ruby
# list returns an Array of Migration records (raises on error).
migrations = client.Migration.list
```


### Ruling

Create an instance: `ruling = client.Ruling`

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

```ruby
# list returns an Array of Ruling records (raises on error).
rulings = client.Ruling.list
```


### Set

Create an instance: `set = client.Set`

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

```ruby
# load returns the bare Set record (raises on error).
set = client.Set.load({ "id" => "set_id" })
```

#### Example: List

```ruby
# list returns an Array of Set records (raises on error).
sets = client.Set.list
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Scryfall_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Scryfall_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
bulkdata = client.BulkData
bulkdata.load({ "id" => "example_id" })

# bulkdata.data_get now returns the loaded bulkdata data
# bulkdata.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
