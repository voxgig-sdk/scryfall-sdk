# Scryfall TypeScript SDK Reference

Complete API reference for the Scryfall TypeScript SDK.


## ScryfallSDK

### Constructor

```ts
new ScryfallSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ScryfallSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = ScryfallSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `ScryfallSDK` instance in test mode.


### Instance Methods

#### `BulkData(data?: object)`

Create a new `BulkData` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BulkDataEntity` instance.

#### `Card(data?: object)`

Create a new `Card` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CardEntity` instance.

#### `CardList(data?: object)`

Create a new `CardList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CardListEntity` instance.

#### `CardSymbolList(data?: object)`

Create a new `CardSymbolList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CardSymbolListEntity` instance.

#### `Catalog(data?: object)`

Create a new `Catalog` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CatalogEntity` instance.

#### `ManaCost(data?: object)`

Create a new `ManaCost` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ManaCostEntity` instance.

#### `Migration(data?: object)`

Create a new `Migration` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MigrationEntity` instance.

#### `Ruling(data?: object)`

Create a new `Ruling` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RulingEntity` instance.

#### `Set(data?: object)`

Create a new `Set` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SetEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `ScryfallSDK.test()`.

**Returns:** `ScryfallSDK` instance in test mode.


---

## BulkDataEntity

```ts
const bulk_data = client.BulkData()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.BulkData().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.BulkData().load({ id: 'bulk_data_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BulkDataEntity` instance with the same client and
options.

#### `client()`

Return the parent `ScryfallSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CardEntity

```ts
const card = client.Card()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artist` | `string` | No |  |
| `cmc` | `number` | No |  |
| `collector_number` | `string` | No |  |
| `color_identity` | `any[]` | No |  |
| `colors` | `any[]` | No |  |
| `id` | `string` | No |  |
| `image_uris` | `Record<string, any>` | No |  |
| `lang` | `string` | No |  |
| `layout` | `string` | No |  |
| `legalities` | `Record<string, any>` | No |  |
| `loyalty` | `string` | No |  |
| `mana_cost` | `string` | No |  |
| `name` | `string` | No |  |
| `oracle_id` | `string` | No |  |
| `oracle_text` | `string` | No |  |
| `power` | `string` | No |  |
| `prices` | `Record<string, any>` | No |  |
| `rarity` | `string` | No |  |
| `released_at` | `string` | No |  |
| `scryfall_uri` | `string` | No |  |
| `set` | `string` | No |  |
| `set_name` | `string` | No |  |
| `toughness` | `string` | No |  |
| `type_line` | `string` | No |  |
| `uri` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `named` | `/cards/named` | `client.Card().list({ $action: 'named', ... })` |
| `random` | `/cards/random` | `client.Card().list({ $action: 'random', ... })` |

An action returns that action's OWN response, which is not necessarily a
Card record — check the API definition for its shape.

```ts
const result = await client.Card().list({
  $action: 'named',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Card().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Card().load({ id: 'card_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CardEntity` instance with the same client and
options.

#### `client()`

Return the parent `ScryfallSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CardListEntity

```ts
const card_list = client.CardList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artist` | `string` | No |  |
| `cmc` | `number` | No |  |
| `collector_number` | `string` | No |  |
| `color_identity` | `any[]` | No |  |
| `colors` | `any[]` | No |  |
| `data` | `any[]` | No |  |
| `has_more` | `boolean` | No |  |
| `id` | `string` | No |  |
| `identifiers` | `any[]` | Yes |  |
| `image_uris` | `Record<string, any>` | No |  |
| `lang` | `string` | No |  |
| `layout` | `string` | No |  |
| `legalities` | `Record<string, any>` | No |  |
| `loyalty` | `string` | No |  |
| `mana_cost` | `string` | No |  |
| `name` | `string` | No |  |
| `next_page` | `string` | No |  |
| `object` | `string` | No |  |
| `oracle_id` | `string` | No |  |
| `oracle_text` | `string` | No |  |
| `power` | `string` | No |  |
| `prices` | `Record<string, any>` | No |  |
| `rarity` | `string` | No |  |
| `released_at` | `string` | No |  |
| `scryfall_uri` | `string` | No |  |
| `set` | `string` | No |  |
| `set_name` | `string` | No |  |
| `total_cards` | `number` | No |  |
| `toughness` | `string` | No |  |
| `type_line` | `string` | No |  |
| `uri` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.CardList().create({
  identifiers: [],
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.CardList().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CardListEntity` instance with the same client and
options.

#### `client()`

Return the parent `ScryfallSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CardSymbolListEntity

```ts
const card_symbol_list = client.CardSymbolList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `appears_in_mana_costs` | `boolean` | No |  |
| `cmc` | `number` | No |  |
| `colors` | `any[]` | No |  |
| `english` | `string` | No |  |
| `funny` | `boolean` | No |  |
| `loose_variant` | `string` | No |  |
| `object` | `string` | No |  |
| `represents_mana` | `boolean` | No |  |
| `svg_uri` | `string` | No |  |
| `symbol` | `string` | No |  |
| `transposable` | `boolean` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.CardSymbolList().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CardSymbolListEntity` instance with the same client and
options.

#### `client()`

Return the parent `ScryfallSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CatalogEntity

```ts
const catalog = client.Catalog()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any[]` | No |  |
| `object` | `string` | No |  |
| `total_values` | `number` | No |  |
| `uri` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Catalog().load({ id: 'catalog_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CatalogEntity` instance with the same client and
options.

#### `client()`

Return the parent `ScryfallSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ManaCostEntity

```ts
const mana_cost = client.ManaCost()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cmc` | `number` | No |  |
| `colorless` | `boolean` | No |  |
| `colors` | `any[]` | No |  |
| `cost` | `string` | No |  |
| `monocolored` | `boolean` | No |  |
| `multicolored` | `boolean` | No |  |
| `object` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ManaCost().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ManaCostEntity` instance with the same client and
options.

#### `client()`

Return the parent `ScryfallSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MigrationEntity

```ts
const migration = client.Migration()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Migration().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MigrationEntity` instance with the same client and
options.

#### `client()`

Return the parent `ScryfallSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RulingEntity

```ts
const ruling = client.Ruling()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Ruling().list({ card_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RulingEntity` instance with the same client and
options.

#### `client()`

Return the parent `ScryfallSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SetEntity

```ts
const set = client.Set()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Set().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Set().load({ id: 'set_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SetEntity` instance with the same client and
options.

#### `client()`

Return the parent `ScryfallSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new ScryfallSDK({
  feature: {
    test: { active: true },
  }
})
```

