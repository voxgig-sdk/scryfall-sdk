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
| `content_encoding` | `string` | No |  |
| `content_type` | `string` | No |  |
| `description` | `string` | No |  |
| `download_uri` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `object` | `string` | No |  |
| `size` | `number` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |

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
| `artist` | `string` | No |  |
| `cmc` | `number` | No |  |
| `collector_number` | `string` | No |  |
| `color` | `table` | No |  |
| `color_identity` | `table` | No |  |
| `id` | `string` | No |  |
| `image_uri` | `table` | No |  |
| `lang` | `string` | No |  |
| `layout` | `string` | No |  |
| `legality` | `table` | No |  |
| `loyalty` | `string` | No |  |
| `mana_cost` | `string` | No |  |
| `name` | `string` | No |  |
| `oracle_id` | `string` | No |  |
| `oracle_text` | `string` | No |  |
| `power` | `string` | No |  |
| `price` | `table` | No |  |
| `rarity` | `string` | No |  |
| `released_at` | `string` | No |  |
| `scryfall_uri` | `string` | No |  |
| `set` | `string` | No |  |
| `set_name` | `string` | No |  |
| `toughness` | `string` | No |  |
| `type_line` | `string` | No |  |
| `uri` | `string` | No |  |

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
| `artist` | `string` | No |  |
| `cmc` | `number` | No |  |
| `collector_number` | `string` | No |  |
| `color` | `table` | No |  |
| `color_identity` | `table` | No |  |
| `data` | `table` | No |  |
| `has_more` | `boolean` | No |  |
| `id` | `string` | No |  |
| `identifier` | `table` | Yes |  |
| `image_uri` | `table` | No |  |
| `lang` | `string` | No |  |
| `layout` | `string` | No |  |
| `legality` | `table` | No |  |
| `loyalty` | `string` | No |  |
| `mana_cost` | `string` | No |  |
| `name` | `string` | No |  |
| `next_page` | `string` | No |  |
| `object` | `string` | No |  |
| `oracle_id` | `string` | No |  |
| `oracle_text` | `string` | No |  |
| `power` | `string` | No |  |
| `price` | `table` | No |  |
| `rarity` | `string` | No |  |
| `released_at` | `string` | No |  |
| `scryfall_uri` | `string` | No |  |
| `set` | `string` | No |  |
| `set_name` | `string` | No |  |
| `total_card` | `number` | No |  |
| `toughness` | `string` | No |  |
| `type_line` | `string` | No |  |
| `uri` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:CardList():create({
  identifier = --[[ table ]],
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
| `appears_in_mana_cost` | `boolean` | No |  |
| `cmc` | `number` | No |  |
| `color` | `table` | No |  |
| `english` | `string` | No |  |
| `funny` | `boolean` | No |  |
| `loose_variant` | `string` | No |  |
| `object` | `string` | No |  |
| `represents_mana` | `boolean` | No |  |
| `svg_uri` | `string` | No |  |
| `symbol` | `string` | No |  |
| `transposable` | `boolean` | No |  |

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
| `data` | `table` | No |  |
| `object` | `string` | No |  |
| `total_value` | `number` | No |  |
| `uri` | `string` | No |  |

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
| `cmc` | `number` | No |  |
| `color` | `table` | No |  |
| `colorless` | `boolean` | No |  |
| `cost` | `string` | No |  |
| `monocolored` | `boolean` | No |  |
| `multicolored` | `boolean` | No |  |
| `object` | `string` | No |  |

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
| `id` | `string` | No |  |
| `migration_strategy` | `string` | No |  |
| `new_scryfall_id` | `string` | No |  |
| `object` | `string` | No |  |
| `old_scryfall_id` | `string` | No |  |
| `performed_at` | `string` | No |  |
| `uri` | `string` | No |  |

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
| `comment` | `string` | No |  |
| `object` | `string` | No |  |
| `oracle_id` | `string` | No |  |
| `published_at` | `string` | No |  |
| `source` | `string` | No |  |

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
| `card_count` | `number` | No |  |
| `code` | `string` | No |  |
| `digital` | `boolean` | No |  |
| `icon_svg_uri` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `released_at` | `string` | No |  |
| `scryfall_uri` | `string` | No |  |
| `search_uri` | `string` | No |  |
| `set_type` | `string` | No |  |
| `uri` | `string` | No |  |

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

