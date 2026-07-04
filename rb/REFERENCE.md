# Scryfall Ruby SDK Reference

Complete API reference for the Scryfall Ruby SDK.


## ScryfallSDK

### Constructor

```ruby
require_relative 'scryfall_sdk'

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
| `content_encoding` | ``$STRING`` | No |  |
| `content_type` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `download_uri` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `object` | ``$STRING`` | No |  |
| `size` | ``$INTEGER`` | No |  |
| `type` | ``$STRING`` | No |  |
| `updated_at` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.BulkData.list(nil)
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
| `artist` | ``$STRING`` | No |  |
| `cmc` | ``$NUMBER`` | No |  |
| `collector_number` | ``$STRING`` | No |  |
| `color` | ``$ARRAY`` | No |  |
| `color_identity` | ``$ARRAY`` | No |  |
| `id` | ``$STRING`` | No |  |
| `image_uri` | ``$OBJECT`` | No |  |
| `lang` | ``$STRING`` | No |  |
| `layout` | ``$STRING`` | No |  |
| `legality` | ``$OBJECT`` | No |  |
| `loyalty` | ``$STRING`` | No |  |
| `mana_cost` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `oracle_id` | ``$STRING`` | No |  |
| `oracle_text` | ``$STRING`` | No |  |
| `power` | ``$STRING`` | No |  |
| `price` | ``$OBJECT`` | No |  |
| `rarity` | ``$STRING`` | No |  |
| `released_at` | ``$STRING`` | No |  |
| `scryfall_uri` | ``$STRING`` | No |  |
| `set` | ``$STRING`` | No |  |
| `set_name` | ``$STRING`` | No |  |
| `toughness` | ``$STRING`` | No |  |
| `type_line` | ``$STRING`` | No |  |
| `uri` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.Card.list(nil)
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
| `artist` | ``$STRING`` | No |  |
| `cmc` | ``$NUMBER`` | No |  |
| `collector_number` | ``$STRING`` | No |  |
| `color` | ``$ARRAY`` | No |  |
| `color_identity` | ``$ARRAY`` | No |  |
| `data` | ``$ARRAY`` | No |  |
| `has_more` | ``$BOOLEAN`` | No |  |
| `id` | ``$STRING`` | No |  |
| `identifier` | ``$ARRAY`` | Yes |  |
| `image_uri` | ``$OBJECT`` | No |  |
| `lang` | ``$STRING`` | No |  |
| `layout` | ``$STRING`` | No |  |
| `legality` | ``$OBJECT`` | No |  |
| `loyalty` | ``$STRING`` | No |  |
| `mana_cost` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `next_page` | ``$STRING`` | No |  |
| `object` | ``$STRING`` | No |  |
| `oracle_id` | ``$STRING`` | No |  |
| `oracle_text` | ``$STRING`` | No |  |
| `power` | ``$STRING`` | No |  |
| `price` | ``$OBJECT`` | No |  |
| `rarity` | ``$STRING`` | No |  |
| `released_at` | ``$STRING`` | No |  |
| `scryfall_uri` | ``$STRING`` | No |  |
| `set` | ``$STRING`` | No |  |
| `set_name` | ``$STRING`` | No |  |
| `total_card` | ``$INTEGER`` | No |  |
| `toughness` | ``$STRING`` | No |  |
| `type_line` | ``$STRING`` | No |  |
| `uri` | ``$STRING`` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.CardList.create({
  "identifier" => # `$ARRAY`,
})
```

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.CardList.list(nil)
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
| `appears_in_mana_cost` | ``$BOOLEAN`` | No |  |
| `cmc` | ``$NUMBER`` | No |  |
| `color` | ``$ARRAY`` | No |  |
| `english` | ``$STRING`` | No |  |
| `funny` | ``$BOOLEAN`` | No |  |
| `loose_variant` | ``$STRING`` | No |  |
| `object` | ``$STRING`` | No |  |
| `represents_mana` | ``$BOOLEAN`` | No |  |
| `svg_uri` | ``$STRING`` | No |  |
| `symbol` | ``$STRING`` | No |  |
| `transposable` | ``$BOOLEAN`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.CardSymbolList.list(nil)
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
| `data` | ``$ARRAY`` | No |  |
| `object` | ``$STRING`` | No |  |
| `total_value` | ``$INTEGER`` | No |  |
| `uri` | ``$STRING`` | No |  |

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
| `cmc` | ``$NUMBER`` | No |  |
| `color` | ``$ARRAY`` | No |  |
| `colorless` | ``$BOOLEAN`` | No |  |
| `cost` | ``$STRING`` | No |  |
| `monocolored` | ``$BOOLEAN`` | No |  |
| `multicolored` | ``$BOOLEAN`` | No |  |
| `object` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.ManaCost.list(nil)
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
| `id` | ``$STRING`` | No |  |
| `migration_strategy` | ``$STRING`` | No |  |
| `new_scryfall_id` | ``$STRING`` | No |  |
| `object` | ``$STRING`` | No |  |
| `old_scryfall_id` | ``$STRING`` | No |  |
| `performed_at` | ``$STRING`` | No |  |
| `uri` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.Migration.list(nil)
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
| `comment` | ``$STRING`` | No |  |
| `object` | ``$STRING`` | No |  |
| `oracle_id` | ``$STRING`` | No |  |
| `published_at` | ``$STRING`` | No |  |
| `source` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.Ruling.list(nil)
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
| `card_count` | ``$INTEGER`` | No |  |
| `code` | ``$STRING`` | No |  |
| `digital` | ``$BOOLEAN`` | No |  |
| `icon_svg_uri` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `released_at` | ``$STRING`` | No |  |
| `scryfall_uri` | ``$STRING`` | No |  |
| `search_uri` | ``$STRING`` | No |  |
| `set_type` | ``$STRING`` | No |  |
| `uri` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.Set.list(nil)
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

