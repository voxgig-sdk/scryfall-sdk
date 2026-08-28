# Scryfall Ruby SDK



The Ruby SDK for the Scryfall API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.BulkData` — with named operations (`list`/`load`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

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
    puts "#{item["id"]} #{item["content_encoding"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a bulkdata

```ruby
begin
  # load returns the ENTITY — call data_get for the BulkData record (raises on error).
  bulkdata = client.BulkData.load({ "id" => "example_id" })
  puts bulkdata
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  bulkdatas = client.BulkData.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
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
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
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

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
bulkdata = client.BulkData.list()
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
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
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

Create an instance: `bulk_data = client.BulkData`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content_encoding` | `String` | The Content-Encoding encoding for this file |
| `content_type` | `String` | The MIME type of this file |
| `description` | `String` | A human-readable description for this file |
| `download_uri` | `String` | The URI that hosts this bulk file |
| `id` | `String` | A unique ID for this bulk data file |
| `name` | `String` | A human-readable name for this file |
| `object` | `String` | The object type |
| `size` | `Integer` | The size of this file in bytes |
| `type` | `String` | The type of bulk data |
| `updated_at` | `String` | The time this file was last updated |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the BulkData record (raises on error).
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
| `artist` | `String` | The name of the illustrator of this card |
| `cmc` | `Float` | The card's converted mana cost |
| `collector_number` | `String` | This card's collector number |
| `color_identity` | `Array` | This card's color identity |
| `colors` | `Array` | This card's colors |
| `id` | `String` | A unique ID for this card in Scryfall's database |
| `image_uris` | `Hash` | An object containing URIs to this card's imagery |
| `lang` | `String` | The language code for this printing |
| `layout` | `String` | A code for this card's layout |
| `legalities` | `Hash` | An object describing the legality of this card |
| `loyalty` | `String` | This card's loyalty (for planeswalkers) |
| `mana_cost` | `String` | The mana cost for this card |
| `name` | `String` | The name of this card |
| `oracle_id` | `String` | A unique ID for this card's oracle identity |
| `oracle_text` | `String` | The Oracle text for this card |
| `power` | `String` | This card's power (for creatures) |
| `prices` | `Hash` | An object containing daily price information for this card |
| `rarity` | `String` | This card's rarity |
| `released_at` | `String` | The date this card was first released |
| `scryfall_uri` | `String` | A link to this card's page on Scryfall's website |
| `set` | `String` | This card's set code |
| `set_name` | `String` | This card's full set name |
| `toughness` | `String` | This card's toughness (for creatures) |
| `type_line` | `String` | The type line of this card |
| `uri` | `String` | A link to this card object on Scryfall's API |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Card record (raises on error).
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
| `artist` | `String` | The name of the illustrator of this card |
| `cmc` | `Float` | The card's converted mana cost |
| `collector_number` | `String` | This card's collector number |
| `color_identity` | `Array` | This card's color identity |
| `colors` | `Array` | This card's colors |
| `data` | `Array` | An array of the requested objects |
| `has_more` | `Boolean` | True if this list is paginated and has more pages |
| `id` | `String` | A unique ID for this card in Scryfall's database |
| `identifiers` | `Array` |  |
| `image_uris` | `Hash` | An object containing URIs to this card's imagery |
| `lang` | `String` | The language code for this printing |
| `layout` | `String` | A code for this card's layout |
| `legalities` | `Hash` | An object describing the legality of this card |
| `loyalty` | `String` | This card's loyalty (for planeswalkers) |
| `mana_cost` | `String` | The mana cost for this card |
| `name` | `String` | The name of this card |
| `next_page` | `String` | The URL for the next page of results |
| `object` | `String` | The object type |
| `oracle_id` | `String` | A unique ID for this card's oracle identity |
| `oracle_text` | `String` | The Oracle text for this card |
| `power` | `String` | This card's power (for creatures) |
| `prices` | `Hash` | An object containing daily price information for this card |
| `rarity` | `String` | This card's rarity |
| `released_at` | `String` | The date this card was first released |
| `scryfall_uri` | `String` | A link to this card's page on Scryfall's website |
| `set` | `String` | This card's set code |
| `set_name` | `String` | This card's full set name |
| `total_cards` | `Integer` | The total number of cards found |
| `toughness` | `String` | This card's toughness (for creatures) |
| `type_line` | `String` | The type line of this card |
| `uri` | `String` | A link to this card object on Scryfall's API |

#### Example: List

```ruby
# list returns an Array of CardList records (raises on error).
card_lists = client.CardList.list
```

#### Example: Create

```ruby
card_list = client.CardList.create({
  "identifiers" => [], # Array
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
| `appears_in_mana_costs` | `Boolean` | True if this symbol appears in mana costs |
| `cmc` | `Float` | The converted mana cost represented by this symbol |
| `colors` | `Array` | The colors of this symbol |
| `english` | `String` | An English textual description of the symbol |
| `funny` | `Boolean` | True if this symbol is only used on funny cards |
| `loose_variant` | `String` | An alternate version of this symbol |
| `object` | `String` | The object type |
| `represents_mana` | `Boolean` | True if this is a mana symbol |
| `svg_uri` | `String` | A URI to an SVG image for this symbol |
| `symbol` | `String` | The plaintext symbol |
| `transposable` | `Boolean` | True if it's possible to write this symbol backwards |

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
| `data` | `Array` | An array of datapoints |
| `id` | `String` |  |
| `object` | `String` | The object type |
| `total_values` | `Integer` | The number of items in the data array |
| `uri` | `String` | A link to this catalog on Scryfall's API |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Catalog record (raises on error).
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
| `cmc` | `Float` | The converted mana cost |
| `colorless` | `Boolean` | True if this mana cost is colorless |
| `colors` | `Array` | The colors in this mana cost |
| `cost` | `String` | The normalized cost |
| `monocolored` | `Boolean` | True if this mana cost is monocolored |
| `multicolored` | `Boolean` | True if this mana cost is multicolored |
| `object` | `String` | The object type |

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
| `id` | `String` | A unique ID for this migration |
| `migration_strategy` | `String` | The type of migration strategy |
| `new_scryfall_id` | `String` | The updated Scryfall ID |
| `object` | `String` | The object type |
| `old_scryfall_id` | `String` | The original Scryfall ID |
| `performed_at` | `String` | The date this migration was performed |
| `uri` | `String` | A link to this migration on Scryfall's API |

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
| `comment` | `String` | The text of the ruling |
| `object` | `String` | The object type |
| `oracle_id` | `String` | The Oracle ID of the card this ruling applies to |
| `published_at` | `String` | The date this ruling was published |
| `source` | `String` | The source of this ruling |

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
| `card_count` | `Integer` | The number of cards in this set |
| `code` | `String` | The unique three to five-letter code for this set |
| `digital` | `Boolean` | True if this set is only available digitally |
| `icon_svg_uri` | `String` | A URI to an SVG file for this set's icon |
| `id` | `String` | A unique ID for this set |
| `name` | `String` | The English name of the set |
| `released_at` | `String` | The date the set was released |
| `scryfall_uri` | `String` | A link to this set's page on Scryfall's website |
| `search_uri` | `String` | A link to search for cards in this set on Scryfall's API |
| `set_type` | `String` | The type of set |
| `uri` | `String` | A link to this set object on Scryfall's API |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Set record (raises on error).
set = client.Set.load({ "id" => "set_id" })
```

#### Example: List

```ruby
# list returns an Array of Set records (raises on error).
sets = client.Set.list
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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
bulkdata = client.BulkData
bulkdata.list()

# bulkdata.data_get now returns the bulkdata data from the last list
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
