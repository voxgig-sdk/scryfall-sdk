# Scryfall Lua SDK Reference

Complete API reference for the Scryfall Lua SDK.


## ScryfallSDK

### Constructor

```lua
local sdk = require("scryfall_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `BulkData(data)`

Create a new `BulkData` entity instance. Pass `nil` for no initial data.

#### `Card(data)`

Create a new `Card` entity instance. Pass `nil` for no initial data.

#### `CardList(data)`

Create a new `CardList` entity instance. Pass `nil` for no initial data.

#### `CardSymbolList(data)`

Create a new `CardSymbolList` entity instance. Pass `nil` for no initial data.

#### `Catalog(data)`

Create a new `Catalog` entity instance. Pass `nil` for no initial data.

#### `ManaCost(data)`

Create a new `ManaCost` entity instance. Pass `nil` for no initial data.

#### `Migration(data)`

Create a new `Migration` entity instance. Pass `nil` for no initial data.

#### `Ruling(data)`

Create a new `Ruling` entity instance. Pass `nil` for no initial data.

#### `Set(data)`

Create a new `Set` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## BulkDataEntity

```lua
local bulk_data = client:BulkData(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content_encoding` | `string` | No | The Content-Encoding encoding for this file |
| `content_type` | `string` | No | The MIME type of this file |
| `description` | `string` | No | A human-readable description for this file |
| `download_uri` | `string` | No | The URI that hosts this bulk file |
| `id` | `string` | No | A unique ID for this bulk data file |
| `name` | `string` | No | A human-readable name for this file |
| `object` | `string` | No | The object type |
| `size` | `number` | No | The size of this file in bytes |
| `type` | `string` | No | The type of bulk data |
| `updated_at` | `string` | No | The time this file was last updated |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:BulkData():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:BulkData():load({ id = "bulk_data_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BulkDataEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CardEntity

```lua
local card = client:Card(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artist` | `string` | No | The name of the illustrator of this card |
| `cmc` | `number` | No | The card's converted mana cost |
| `collector_number` | `string` | No | This card's collector number |
| `color_identity` | `table` | No | This card's color identity |
| `colors` | `table` | No | This card's colors |
| `id` | `string` | No | A unique ID for this card in Scryfall's database |
| `image_uris` | `table` | No | An object containing URIs to this card's imagery |
| `lang` | `string` | No | The language code for this printing |
| `layout` | `string` | No | A code for this card's layout |
| `legalities` | `table` | No | An object describing the legality of this card |
| `loyalty` | `string` | No | This card's loyalty (for planeswalkers) |
| `mana_cost` | `string` | No | The mana cost for this card |
| `name` | `string` | No | The name of this card |
| `oracle_id` | `string` | No | A unique ID for this card's oracle identity |
| `oracle_text` | `string` | No | The Oracle text for this card |
| `power` | `string` | No | This card's power (for creatures) |
| `prices` | `table` | No | An object containing daily price information for this card |
| `rarity` | `string` | No | This card's rarity |
| `released_at` | `string` | No | The date this card was first released |
| `scryfall_uri` | `string` | No | A link to this card's page on Scryfall's website |
| `set` | `string` | No | This card's set code |
| `set_name` | `string` | No | This card's full set name |
| `toughness` | `string` | No | This card's toughness (for creatures) |
| `type_line` | `string` | No | The type line of this card |
| `uri` | `string` | No | A link to this card object on Scryfall's API |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Card():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Card():load({ id = "card_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CardListEntity

```lua
local card_list = client:CardList(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artist` | `string` | No | The name of the illustrator of this card |
| `cmc` | `number` | No | The card's converted mana cost |
| `collector_number` | `string` | No | This card's collector number |
| `color_identity` | `table` | No | This card's color identity |
| `colors` | `table` | No | This card's colors |
| `data` | `table` | No | An array of the requested objects |
| `has_more` | `boolean` | No | True if this list is paginated and has more pages |
| `id` | `string` | No | A unique ID for this card in Scryfall's database |
| `identifiers` | `table` | Yes |  |
| `image_uris` | `table` | No | An object containing URIs to this card's imagery |
| `lang` | `string` | No | The language code for this printing |
| `layout` | `string` | No | A code for this card's layout |
| `legalities` | `table` | No | An object describing the legality of this card |
| `loyalty` | `string` | No | This card's loyalty (for planeswalkers) |
| `mana_cost` | `string` | No | The mana cost for this card |
| `name` | `string` | No | The name of this card |
| `next_page` | `string` | No | The URL for the next page of results |
| `object` | `string` | No | The object type |
| `oracle_id` | `string` | No | A unique ID for this card's oracle identity |
| `oracle_text` | `string` | No | The Oracle text for this card |
| `power` | `string` | No | This card's power (for creatures) |
| `prices` | `table` | No | An object containing daily price information for this card |
| `rarity` | `string` | No | This card's rarity |
| `released_at` | `string` | No | The date this card was first released |
| `scryfall_uri` | `string` | No | A link to this card's page on Scryfall's website |
| `set` | `string` | No | This card's set code |
| `set_name` | `string` | No | This card's full set name |
| `total_cards` | `number` | No | The total number of cards found |
| `toughness` | `string` | No | This card's toughness (for creatures) |
| `type_line` | `string` | No | The type line of this card |
| `uri` | `string` | No | A link to this card object on Scryfall's API |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:CardList():create({
  identifiers = --[[ table ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:CardList():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CardSymbolListEntity

```lua
local card_symbol_list = client:CardSymbolList(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `appears_in_mana_costs` | `boolean` | No | True if this symbol appears in mana costs |
| `cmc` | `number` | No | The converted mana cost represented by this symbol |
| `colors` | `table` | No | The colors of this symbol |
| `english` | `string` | No | An English textual description of the symbol |
| `funny` | `boolean` | No | True if this symbol is only used on funny cards |
| `loose_variant` | `string` | No | An alternate version of this symbol |
| `object` | `string` | No | The object type |
| `represents_mana` | `boolean` | No | True if this is a mana symbol |
| `svg_uri` | `string` | No | A URI to an SVG image for this symbol |
| `symbol` | `string` | No | The plaintext symbol |
| `transposable` | `boolean` | No | True if it's possible to write this symbol backwards |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:CardSymbolList():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardSymbolListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CatalogEntity

```lua
local catalog = client:Catalog(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `table` | No | An array of datapoints |
| `id` | `string` | No |  |
| `object` | `string` | No | The object type |
| `total_values` | `number` | No | The number of items in the data array |
| `uri` | `string` | No | A link to this catalog on Scryfall's API |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Catalog():load({ id = "catalog_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CatalogEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ManaCostEntity

```lua
local mana_cost = client:ManaCost(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cmc` | `number` | No | The converted mana cost |
| `colorless` | `boolean` | No | True if this mana cost is colorless |
| `colors` | `table` | No | The colors in this mana cost |
| `cost` | `string` | No | The normalized cost |
| `monocolored` | `boolean` | No | True if this mana cost is monocolored |
| `multicolored` | `boolean` | No | True if this mana cost is multicolored |
| `object` | `string` | No | The object type |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ManaCost():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ManaCostEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MigrationEntity

```lua
local migration = client:Migration(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No | A unique ID for this migration |
| `migration_strategy` | `string` | No | The type of migration strategy |
| `new_scryfall_id` | `string` | No | The updated Scryfall ID |
| `object` | `string` | No | The object type |
| `old_scryfall_id` | `string` | No | The original Scryfall ID |
| `performed_at` | `string` | No | The date this migration was performed |
| `uri` | `string` | No | A link to this migration on Scryfall's API |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Migration():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MigrationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RulingEntity

```lua
local ruling = client:Ruling(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `comment` | `string` | No | The text of the ruling |
| `object` | `string` | No | The object type |
| `oracle_id` | `string` | No | The Oracle ID of the card this ruling applies to |
| `published_at` | `string` | No | The date this ruling was published |
| `source` | `string` | No | The source of this ruling |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Ruling():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RulingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SetEntity

```lua
local set = client:Set(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card_count` | `number` | No | The number of cards in this set |
| `code` | `string` | No | The unique three to five-letter code for this set |
| `digital` | `boolean` | No | True if this set is only available digitally |
| `icon_svg_uri` | `string` | No | A URI to an SVG file for this set's icon |
| `id` | `string` | No | A unique ID for this set |
| `name` | `string` | No | The English name of the set |
| `released_at` | `string` | No | The date the set was released |
| `scryfall_uri` | `string` | No | A link to this set's page on Scryfall's website |
| `search_uri` | `string` | No | A link to search for cards in this set on Scryfall's API |
| `set_type` | `string` | No | The type of set |
| `uri` | `string` | No | A link to this set object on Scryfall's API |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Set():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Set():load({ id = "set_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SetEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
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

