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
| `content_encoding` | `String` | No | The Content-Encoding encoding for this file |
| `content_type` | `String` | No | The MIME type of this file |
| `description` | `String` | No | A human-readable description for this file |
| `download_uri` | `String` | No | The URI that hosts this bulk file |
| `id` | `String` | No | A unique ID for this bulk data file |
| `name` | `String` | No | A human-readable name for this file |
| `object` | `String` | No | The object type |
| `size` | `Integer` | No | The size of this file in bytes |
| `type` | `String` | No | The type of bulk data |
| `updated_at` | `String` | No | The time this file was last updated |

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
| `artist` | `String` | No | The name of the illustrator of this card |
| `cmc` | `Float` | No | The card's converted mana cost |
| `collector_number` | `String` | No | This card's collector number |
| `color_identity` | `Array` | No | This card's color identity |
| `colors` | `Array` | No | This card's colors |
| `id` | `String` | No | A unique ID for this card in Scryfall's database |
| `image_uris` | `Hash` | No | An object containing URIs to this card's imagery |
| `lang` | `String` | No | The language code for this printing |
| `layout` | `String` | No | A code for this card's layout |
| `legalities` | `Hash` | No | An object describing the legality of this card |
| `loyalty` | `String` | No | This card's loyalty (for planeswalkers) |
| `mana_cost` | `String` | No | The mana cost for this card |
| `name` | `String` | No | The name of this card |
| `oracle_id` | `String` | No | A unique ID for this card's oracle identity |
| `oracle_text` | `String` | No | The Oracle text for this card |
| `power` | `String` | No | This card's power (for creatures) |
| `prices` | `Hash` | No | An object containing daily price information for this card |
| `rarity` | `String` | No | This card's rarity |
| `released_at` | `String` | No | The date this card was first released |
| `scryfall_uri` | `String` | No | A link to this card's page on Scryfall's website |
| `set` | `String` | No | This card's set code |
| `set_name` | `String` | No | This card's full set name |
| `toughness` | `String` | No | This card's toughness (for creatures) |
| `type_line` | `String` | No | The type line of this card |
| `uri` | `String` | No | A link to this card object on Scryfall's API |

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
| `artist` | `String` | No | The name of the illustrator of this card |
| `cmc` | `Float` | No | The card's converted mana cost |
| `collector_number` | `String` | No | This card's collector number |
| `color_identity` | `Array` | No | This card's color identity |
| `colors` | `Array` | No | This card's colors |
| `data` | `Array` | No | An array of the requested objects |
| `has_more` | `Boolean` | No | True if this list is paginated and has more pages |
| `id` | `String` | No | A unique ID for this card in Scryfall's database |
| `identifiers` | `Array` | Yes |  |
| `image_uris` | `Hash` | No | An object containing URIs to this card's imagery |
| `lang` | `String` | No | The language code for this printing |
| `layout` | `String` | No | A code for this card's layout |
| `legalities` | `Hash` | No | An object describing the legality of this card |
| `loyalty` | `String` | No | This card's loyalty (for planeswalkers) |
| `mana_cost` | `String` | No | The mana cost for this card |
| `name` | `String` | No | The name of this card |
| `next_page` | `String` | No | The URL for the next page of results |
| `object` | `String` | No | The object type |
| `oracle_id` | `String` | No | A unique ID for this card's oracle identity |
| `oracle_text` | `String` | No | The Oracle text for this card |
| `power` | `String` | No | This card's power (for creatures) |
| `prices` | `Hash` | No | An object containing daily price information for this card |
| `rarity` | `String` | No | This card's rarity |
| `released_at` | `String` | No | The date this card was first released |
| `scryfall_uri` | `String` | No | A link to this card's page on Scryfall's website |
| `set` | `String` | No | This card's set code |
| `set_name` | `String` | No | This card's full set name |
| `total_cards` | `Integer` | No | The total number of cards found |
| `toughness` | `String` | No | This card's toughness (for creatures) |
| `type_line` | `String` | No | The type line of this card |
| `uri` | `String` | No | A link to this card object on Scryfall's API |

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
| `appears_in_mana_costs` | `Boolean` | No | True if this symbol appears in mana costs |
| `cmc` | `Float` | No | The converted mana cost represented by this symbol |
| `colors` | `Array` | No | The colors of this symbol |
| `english` | `String` | No | An English textual description of the symbol |
| `funny` | `Boolean` | No | True if this symbol is only used on funny cards |
| `loose_variant` | `String` | No | An alternate version of this symbol |
| `object` | `String` | No | The object type |
| `represents_mana` | `Boolean` | No | True if this is a mana symbol |
| `svg_uri` | `String` | No | A URI to an SVG image for this symbol |
| `symbol` | `String` | No | The plaintext symbol |
| `transposable` | `Boolean` | No | True if it's possible to write this symbol backwards |

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
| `data` | `Array` | No | An array of datapoints |
| `id` | `String` | No |  |
| `object` | `String` | No | The object type |
| `total_values` | `Integer` | No | The number of items in the data array |
| `uri` | `String` | No | A link to this catalog on Scryfall's API |

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
| `cmc` | `Float` | No | The converted mana cost |
| `colorless` | `Boolean` | No | True if this mana cost is colorless |
| `colors` | `Array` | No | The colors in this mana cost |
| `cost` | `String` | No | The normalized cost |
| `monocolored` | `Boolean` | No | True if this mana cost is monocolored |
| `multicolored` | `Boolean` | No | True if this mana cost is multicolored |
| `object` | `String` | No | The object type |

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
| `id` | `String` | No | A unique ID for this migration |
| `migration_strategy` | `String` | No | The type of migration strategy |
| `new_scryfall_id` | `String` | No | The updated Scryfall ID |
| `object` | `String` | No | The object type |
| `old_scryfall_id` | `String` | No | The original Scryfall ID |
| `performed_at` | `String` | No | The date this migration was performed |
| `uri` | `String` | No | A link to this migration on Scryfall's API |

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
| `comment` | `String` | No | The text of the ruling |
| `object` | `String` | No | The object type |
| `oracle_id` | `String` | No | The Oracle ID of the card this ruling applies to |
| `published_at` | `String` | No | The date this ruling was published |
| `source` | `String` | No | The source of this ruling |

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
| `card_count` | `Integer` | No | The number of cards in this set |
| `code` | `String` | No | The unique three to five-letter code for this set |
| `digital` | `Boolean` | No | True if this set is only available digitally |
| `icon_svg_uri` | `String` | No | A URI to an SVG file for this set's icon |
| `id` | `String` | No | A unique ID for this set |
| `name` | `String` | No | The English name of the set |
| `released_at` | `String` | No | The date the set was released |
| `scryfall_uri` | `String` | No | A link to this set's page on Scryfall's website |
| `search_uri` | `String` | No | A link to search for cards in this set on Scryfall's API |
| `set_type` | `String` | No | The type of set |
| `uri` | `String` | No | A link to this set object on Scryfall's API |

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


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

