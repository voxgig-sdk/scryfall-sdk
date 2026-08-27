# Scryfall TypeScript SDK



The TypeScript SDK for the Scryfall API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.BulkData()` — each with a small set of operations (`list`, `load`, `create`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/scryfall-sdk/releases](https://github.com/voxgig-sdk/scryfall-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { ScryfallSDK } from '@voxgig-sdk/scryfall'

const client = new ScryfallSDK()
```

### 2. List bulkdata records

`list()` resolves to an array of BulkData ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const bulkdatas = await client.BulkData().list()

for (const bulkdata of bulkdatas) {
  console.log(bulkdata)
}
```

### 3. Load a bulkdata

`load()` returns the entity directly and throws on failure:

```ts
try {
  const bulkdata = await client.BulkData().load({ id: 'example_id' })
  console.log(bulkdata)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const bulkdatas = await client.BulkData().list()
  console.log(bulkdatas)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = ScryfallSDK.test()

const bulkdata = await client.BulkData().list()
// bulkdata is the entity, populated with mock response data
// — call bulkdata.data() for the record itself
console.log(bulkdata)
```

You can also use the instance method:

```ts
const client = new ScryfallSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.BulkData()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new ScryfallSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
SCRYFALL_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### ScryfallSDK

#### Constructor

```ts
new ScryfallSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `BulkData(data?)` | `BulkDataEntity` | Create a BulkData entity instance. |
| `Card(data?)` | `CardEntity` | Create a Card entity instance. |
| `CardList(data?)` | `CardListEntity` | Create a CardList entity instance. |
| `CardSymbolList(data?)` | `CardSymbolListEntity` | Create a CardSymbolList entity instance. |
| `Catalog(data?)` | `CatalogEntity` | Create a Catalog entity instance. |
| `ManaCost(data?)` | `ManaCostEntity` | Create a ManaCost entity instance. |
| `Migration(data?)` | `MigrationEntity` | Create a Migration entity instance. |
| `Ruling(data?)` | `RulingEntity` | Create a Ruling entity instance. |
| `Set(data?)` | `SetEntity` | Create a Set entity instance. |
| `tester(testopts?, sdkopts?)` | `ScryfallSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `ScryfallSDK.test(testopts?, sdkopts?)` | `ScryfallSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): ScryfallSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` and `create` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: list, load.

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

Operations: list, load.

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

Operations: create, list.

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

Operations: list.

API path: `/symbology`

#### Catalog

| Field | Description |
| --- | --- |
| `data` | An array of datapoints |
| `id` |  |
| `object` | The object type |
| `total_values` | The number of items in the data array |
| `uri` | A link to this catalog on Scryfall's API |

Operations: load.

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

Operations: list.

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

Operations: list.

API path: `/migrations`

#### Ruling

| Field | Description |
| --- | --- |
| `comment` | The text of the ruling |
| `object` | The object type |
| `oracle_id` | The Oracle ID of the card this ruling applies to |
| `published_at` | The date this ruling was published |
| `source` | The source of this ruling |

Operations: list.

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

Operations: list, load.

API path: `/sets`



## Entities


### BulkData

Create an instance: `const bulk_data = client.BulkData()`

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

```ts
const bulk_data = await client.BulkData().load({ id: 'bulk_data_id' })
```

#### Example: List

```ts
const bulk_datas = await client.BulkData().list()
```


### Card

Create an instance: `const card = client.Card()`

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
| `color_identity` | `any[]` | This card's color identity |
| `colors` | `any[]` | This card's colors |
| `id` | `string` | A unique ID for this card in Scryfall's database |
| `image_uris` | `Record<string, any>` | An object containing URIs to this card's imagery |
| `lang` | `string` | The language code for this printing |
| `layout` | `string` | A code for this card's layout |
| `legalities` | `Record<string, any>` | An object describing the legality of this card |
| `loyalty` | `string` | This card's loyalty (for planeswalkers) |
| `mana_cost` | `string` | The mana cost for this card |
| `name` | `string` | The name of this card |
| `oracle_id` | `string` | A unique ID for this card's oracle identity |
| `oracle_text` | `string` | The Oracle text for this card |
| `power` | `string` | This card's power (for creatures) |
| `prices` | `Record<string, any>` | An object containing daily price information for this card |
| `rarity` | `string` | This card's rarity |
| `released_at` | `string` | The date this card was first released |
| `scryfall_uri` | `string` | A link to this card's page on Scryfall's website |
| `set` | `string` | This card's set code |
| `set_name` | `string` | This card's full set name |
| `toughness` | `string` | This card's toughness (for creatures) |
| `type_line` | `string` | The type line of this card |
| `uri` | `string` | A link to this card object on Scryfall's API |

#### Example: Load

```ts
const card = await client.Card().load({ id: 'card_id' })
```

#### Example: List

```ts
const cards = await client.Card().list()
```


### CardList

Create an instance: `const card_list = client.CardList()`

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
| `color_identity` | `any[]` | This card's color identity |
| `colors` | `any[]` | This card's colors |
| `data` | `any[]` | An array of the requested objects |
| `has_more` | `boolean` | True if this list is paginated and has more pages |
| `id` | `string` | A unique ID for this card in Scryfall's database |
| `identifiers` | `any[]` |  |
| `image_uris` | `Record<string, any>` | An object containing URIs to this card's imagery |
| `lang` | `string` | The language code for this printing |
| `layout` | `string` | A code for this card's layout |
| `legalities` | `Record<string, any>` | An object describing the legality of this card |
| `loyalty` | `string` | This card's loyalty (for planeswalkers) |
| `mana_cost` | `string` | The mana cost for this card |
| `name` | `string` | The name of this card |
| `next_page` | `string` | The URL for the next page of results |
| `object` | `string` | The object type |
| `oracle_id` | `string` | A unique ID for this card's oracle identity |
| `oracle_text` | `string` | The Oracle text for this card |
| `power` | `string` | This card's power (for creatures) |
| `prices` | `Record<string, any>` | An object containing daily price information for this card |
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

```ts
const card_lists = await client.CardList().list()
```

#### Example: Create

```ts
const card_list = await client.CardList().create({
  identifiers: [],
})
```


### CardSymbolList

Create an instance: `const card_symbol_list = client.CardSymbolList()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `appears_in_mana_costs` | `boolean` | True if this symbol appears in mana costs |
| `cmc` | `number` | The converted mana cost represented by this symbol |
| `colors` | `any[]` | The colors of this symbol |
| `english` | `string` | An English textual description of the symbol |
| `funny` | `boolean` | True if this symbol is only used on funny cards |
| `loose_variant` | `string` | An alternate version of this symbol |
| `object` | `string` | The object type |
| `represents_mana` | `boolean` | True if this is a mana symbol |
| `svg_uri` | `string` | A URI to an SVG image for this symbol |
| `symbol` | `string` | The plaintext symbol |
| `transposable` | `boolean` | True if it's possible to write this symbol backwards |

#### Example: List

```ts
const card_symbol_lists = await client.CardSymbolList().list()
```


### Catalog

Create an instance: `const catalog = client.Catalog()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `any[]` | An array of datapoints |
| `id` | `string` |  |
| `object` | `string` | The object type |
| `total_values` | `number` | The number of items in the data array |
| `uri` | `string` | A link to this catalog on Scryfall's API |

#### Example: Load

```ts
const catalog = await client.Catalog().load({ id: 'catalog_id' })
```


### ManaCost

Create an instance: `const mana_cost = client.ManaCost()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cmc` | `number` | The converted mana cost |
| `colorless` | `boolean` | True if this mana cost is colorless |
| `colors` | `any[]` | The colors in this mana cost |
| `cost` | `string` | The normalized cost |
| `monocolored` | `boolean` | True if this mana cost is monocolored |
| `multicolored` | `boolean` | True if this mana cost is multicolored |
| `object` | `string` | The object type |

#### Example: List

```ts
const mana_costs = await client.ManaCost().list()
```


### Migration

Create an instance: `const migration = client.Migration()`

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

```ts
const migrations = await client.Migration().list()
```


### Ruling

Create an instance: `const ruling = client.Ruling()`

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

```ts
const rulings = await client.Ruling().list({ card_id: "example" })
```


### Set

Create an instance: `const set = client.Set()`

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

```ts
const set = await client.Set().load({ id: 'set_id' })
```

#### Example: List

```ts
const sets = await client.Set().list()
```


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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
scryfall/
├── src/
│   ├── ScryfallSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { ScryfallSDK } from '@voxgig-sdk/scryfall'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const bulkdata = client.BulkData()
await bulkdata.list()

// bulkdata.data() now returns the bulkdata data from the last `list`
// bulkdata.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
