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
| `artist` | `string` | No | The name of the illustrator of this card |
| `cmc` | `number` | No | The card's converted mana cost |
| `collector_number` | `string` | No | This card's collector number |
| `color_identity` | `any[]` | No | This card's color identity |
| `colors` | `any[]` | No | This card's colors |
| `id` | `string` | No | A unique ID for this card in Scryfall's database |
| `image_uris` | `Record<string, any>` | No | An object containing URIs to this card's imagery |
| `lang` | `string` | No | The language code for this printing |
| `layout` | `string` | No | A code for this card's layout |
| `legalities` | `Record<string, any>` | No | An object describing the legality of this card |
| `loyalty` | `string` | No | This card's loyalty (for planeswalkers) |
| `mana_cost` | `string` | No | The mana cost for this card |
| `name` | `string` | No | The name of this card |
| `oracle_id` | `string` | No | A unique ID for this card's oracle identity |
| `oracle_text` | `string` | No | The Oracle text for this card |
| `power` | `string` | No | This card's power (for creatures) |
| `prices` | `Record<string, any>` | No | An object containing daily price information for this card |
| `rarity` | `string` | No | This card's rarity |
| `released_at` | `string` | No | The date this card was first released |
| `scryfall_uri` | `string` | No | A link to this card's page on Scryfall's website |
| `set` | `string` | No | This card's set code |
| `set_name` | `string` | No | This card's full set name |
| `toughness` | `string` | No | This card's toughness (for creatures) |
| `type_line` | `string` | No | The type line of this card |
| `uri` | `string` | No | A link to this card object on Scryfall's API |

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
| `artist` | `string` | No | The name of the illustrator of this card |
| `cmc` | `number` | No | The card's converted mana cost |
| `collector_number` | `string` | No | This card's collector number |
| `color_identity` | `any[]` | No | This card's color identity |
| `colors` | `any[]` | No | This card's colors |
| `data` | `any[]` | No | An array of the requested objects |
| `has_more` | `boolean` | No | True if this list is paginated and has more pages |
| `id` | `string` | No | A unique ID for this card in Scryfall's database |
| `identifiers` | `any[]` | Yes |  |
| `image_uris` | `Record<string, any>` | No | An object containing URIs to this card's imagery |
| `lang` | `string` | No | The language code for this printing |
| `layout` | `string` | No | A code for this card's layout |
| `legalities` | `Record<string, any>` | No | An object describing the legality of this card |
| `loyalty` | `string` | No | This card's loyalty (for planeswalkers) |
| `mana_cost` | `string` | No | The mana cost for this card |
| `name` | `string` | No | The name of this card |
| `next_page` | `string` | No | The URL for the next page of results |
| `object` | `string` | No | The object type |
| `oracle_id` | `string` | No | A unique ID for this card's oracle identity |
| `oracle_text` | `string` | No | The Oracle text for this card |
| `power` | `string` | No | This card's power (for creatures) |
| `prices` | `Record<string, any>` | No | An object containing daily price information for this card |
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
| `appears_in_mana_costs` | `boolean` | No | True if this symbol appears in mana costs |
| `cmc` | `number` | No | The converted mana cost represented by this symbol |
| `colors` | `any[]` | No | The colors of this symbol |
| `english` | `string` | No | An English textual description of the symbol |
| `funny` | `boolean` | No | True if this symbol is only used on funny cards |
| `loose_variant` | `string` | No | An alternate version of this symbol |
| `object` | `string` | No | The object type |
| `represents_mana` | `boolean` | No | True if this is a mana symbol |
| `svg_uri` | `string` | No | A URI to an SVG image for this symbol |
| `symbol` | `string` | No | The plaintext symbol |
| `transposable` | `boolean` | No | True if it's possible to write this symbol backwards |

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
| `data` | `any[]` | No | An array of datapoints |
| `object` | `string` | No | The object type |
| `total_values` | `number` | No | The number of items in the data array |
| `uri` | `string` | No | A link to this catalog on Scryfall's API |

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
| `cmc` | `number` | No | The converted mana cost |
| `colorless` | `boolean` | No | True if this mana cost is colorless |
| `colors` | `any[]` | No | The colors in this mana cost |
| `cost` | `string` | No | The normalized cost |
| `monocolored` | `boolean` | No | True if this mana cost is monocolored |
| `multicolored` | `boolean` | No | True if this mana cost is multicolored |
| `object` | `string` | No | The object type |

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
| `id` | `string` | No | A unique ID for this migration |
| `migration_strategy` | `string` | No | The type of migration strategy |
| `new_scryfall_id` | `string` | No | The updated Scryfall ID |
| `object` | `string` | No | The object type |
| `old_scryfall_id` | `string` | No | The original Scryfall ID |
| `performed_at` | `string` | No | The date this migration was performed |
| `uri` | `string` | No | A link to this migration on Scryfall's API |

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
| `comment` | `string` | No | The text of the ruling |
| `object` | `string` | No | The object type |
| `oracle_id` | `string` | No | The Oracle ID of the card this ruling applies to |
| `published_at` | `string` | No | The date this ruling was published |
| `source` | `string` | No | The source of this ruling |

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

