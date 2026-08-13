# Scryfall Ruby SDK Reference

Complete API reference for the Scryfall Ruby SDK.


## ScryfallSDK

### Constructor

```ruby
require_relative 'Scryfall_sdk'

client = ScryfallSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ScryfallSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = ScryfallSDK.test
```


### Instance Methods

#### `BulkData(data = nil)`

Create a new `BulkData` entity instance. Pass `nil` for no initial data.

#### `Card(data = nil)`

Create a new `Card` entity instance. Pass `nil` for no initial data.

#### `CardList(data = nil)`

Create a new `CardList` entity instance. Pass `nil` for no initial data.

#### `CardSymbolList(data = nil)`

Create a new `CardSymbolList` entity instance. Pass `nil` for no initial data.

#### `Catalog(data = nil)`

Create a new `Catalog` entity instance. Pass `nil` for no initial data.

#### `ManaCost(data = nil)`

Create a new `ManaCost` entity instance. Pass `nil` for no initial data.

#### `Migration(data = nil)`

Create a new `Migration` entity instance. Pass `nil` for no initial data.

#### `Ruling(data = nil)`

Create a new `Ruling` entity instance. Pass `nil` for no initial data.

#### `Set(data = nil)`

Create a new `Set` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## BulkDataEntity

```ruby
bulk_data = client.BulkData
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content_encoding` | `String` | No |  |
| `content_type` | `String` | No |  |
| `description` | `String` | No |  |
| `download_uri` | `String` | No |  |
| `id` | `String` | No |  |
| `name` | `String` | No |  |
| `object` | `String` | No |  |
| `size` | `Integer` | No |  |
| `type` | `String` | No |  |
| `updated_at` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.BulkData.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.BulkData.load({ "id" => "bulk_data_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BulkDataEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CardEntity

```ruby
card = client.Card
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artist` | `String` | No |  |
| `cmc` | `Float` | No |  |
| `collector_number` | `String` | No |  |
| `color_identity` | `Array` | No |  |
| `colors` | `Array` | No |  |
| `id` | `String` | No |  |
| `image_uris` | `Hash` | No |  |
| `lang` | `String` | No |  |
| `layout` | `String` | No |  |
| `legalities` | `Hash` | No |  |
| `loyalty` | `String` | No |  |
| `mana_cost` | `String` | No |  |
| `name` | `String` | No |  |
| `oracle_id` | `String` | No |  |
| `oracle_text` | `String` | No |  |
| `power` | `String` | No |  |
| `prices` | `Hash` | No |  |
| `rarity` | `String` | No |  |
| `released_at` | `String` | No |  |
| `scryfall_uri` | `String` | No |  |
| `set` | `String` | No |  |
| `set_name` | `String` | No |  |
| `toughness` | `String` | No |  |
| `type_line` | `String` | No |  |
| `uri` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Card.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Card.load({ "id" => "card_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CardEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CardListEntity

```ruby
card_list = client.CardList
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artist` | `String` | No |  |
| `cmc` | `Float` | No |  |
| `collector_number` | `String` | No |  |
| `color_identity` | `Array` | No |  |
| `colors` | `Array` | No |  |
| `data` | `Array` | No |  |
| `has_more` | `Boolean` | No |  |
| `id` | `String` | No |  |
| `identifiers` | `Array` | Yes |  |
| `image_uris` | `Hash` | No |  |
| `lang` | `String` | No |  |
| `layout` | `String` | No |  |
| `legalities` | `Hash` | No |  |
| `loyalty` | `String` | No |  |
| `mana_cost` | `String` | No |  |
| `name` | `String` | No |  |
| `next_page` | `String` | No |  |
| `object` | `String` | No |  |
| `oracle_id` | `String` | No |  |
| `oracle_text` | `String` | No |  |
| `power` | `String` | No |  |
| `prices` | `Hash` | No |  |
| `rarity` | `String` | No |  |
| `released_at` | `String` | No |  |
| `scryfall_uri` | `String` | No |  |
| `set` | `String` | No |  |
| `set_name` | `String` | No |  |
| `total_cards` | `Integer` | No |  |
| `toughness` | `String` | No |  |
| `type_line` | `String` | No |  |
| `uri` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.CardList.create({
  "identifiers" => [], # Array
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.CardList.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CardListEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CardSymbolListEntity

```ruby
card_symbol_list = client.CardSymbolList
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `appears_in_mana_costs` | `Boolean` | No |  |
| `cmc` | `Float` | No |  |
| `colors` | `Array` | No |  |
| `english` | `String` | No |  |
| `funny` | `Boolean` | No |  |
| `loose_variant` | `String` | No |  |
| `object` | `String` | No |  |
| `represents_mana` | `Boolean` | No |  |
| `svg_uri` | `String` | No |  |
| `symbol` | `String` | No |  |
| `transposable` | `Boolean` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.CardSymbolList.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CardSymbolListEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CatalogEntity

```ruby
catalog = client.Catalog
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Array` | No |  |
| `object` | `String` | No |  |
| `total_values` | `Integer` | No |  |
| `uri` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Catalog.load({ "id" => "catalog_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CatalogEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ManaCostEntity

```ruby
mana_cost = client.ManaCost
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cmc` | `Float` | No |  |
| `colorless` | `Boolean` | No |  |
| `colors` | `Array` | No |  |
| `cost` | `String` | No |  |
| `monocolored` | `Boolean` | No |  |
| `multicolored` | `Boolean` | No |  |
| `object` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.ManaCost.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ManaCostEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MigrationEntity

```ruby
migration = client.Migration
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |
| `migration_strategy` | `String` | No |  |
| `new_scryfall_id` | `String` | No |  |
| `object` | `String` | No |  |
| `old_scryfall_id` | `String` | No |  |
| `performed_at` | `String` | No |  |
| `uri` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Migration.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MigrationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RulingEntity

```ruby
ruling = client.Ruling
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `comment` | `String` | No |  |
| `object` | `String` | No |  |
| `oracle_id` | `String` | No |  |
| `published_at` | `String` | No |  |
| `source` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Ruling.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RulingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SetEntity

```ruby
set = client.Set
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card_count` | `Integer` | No |  |
| `code` | `String` | No |  |
| `digital` | `Boolean` | No |  |
| `icon_svg_uri` | `String` | No |  |
| `id` | `String` | No |  |
| `name` | `String` | No |  |
| `released_at` | `String` | No |  |
| `scryfall_uri` | `String` | No |  |
| `search_uri` | `String` | No |  |
| `set_type` | `String` | No |  |
| `uri` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Set.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Set.load({ "id" => "set_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SetEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = ScryfallSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

