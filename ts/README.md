# Scryfall TypeScript SDK



The TypeScript SDK for the Scryfall API — a type-safe, entity-oriented client with full async/await support.

> Other languages, the CLI, and MCP server live alongside this one — see
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

`list()` resolves to an array of BulkData objects — iterate it directly:

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

const bulkdata = await client.BulkData().load({ id: 'test01' })
// bulkdata is a bare entity populated with mock response data
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

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
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
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): ScryfallSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: create, list.

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

Operations: list.

API path: `/symbology`

#### Catalog

| Field | Description |
| --- | --- |
| `data` |  |
| `object` |  |
| `total_value` |  |
| `uri` |  |

Operations: load.

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

Operations: list.

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

Operations: list.

API path: `/migrations`

#### Ruling

| Field | Description |
| --- | --- |
| `comment` |  |
| `object` |  |
| `oracle_id` |  |
| `published_at` |  |
| `source` |  |

Operations: list.

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

```ts
const card_lists = await client.CardList().list()
```

#### Example: Create

```ts
const card_list = await client.CardList().create({
  identifier: /* `$ARRAY` */,
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
| `data` | ``$ARRAY`` |  |
| `object` | ``$STRING`` |  |
| `total_value` | ``$INTEGER`` |  |
| `uri` | ``$STRING`` |  |

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
| `cmc` | ``$NUMBER`` |  |
| `color` | ``$ARRAY`` |  |
| `colorless` | ``$BOOLEAN`` |  |
| `cost` | ``$STRING`` |  |
| `monocolored` | ``$BOOLEAN`` |  |
| `multicolored` | ``$BOOLEAN`` |  |
| `object` | ``$STRING`` |  |

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
| `id` | ``$STRING`` |  |
| `migration_strategy` | ``$STRING`` |  |
| `new_scryfall_id` | ``$STRING`` |  |
| `object` | ``$STRING`` |  |
| `old_scryfall_id` | ``$STRING`` |  |
| `performed_at` | ``$STRING`` |  |
| `uri` | ``$STRING`` |  |

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
| `comment` | ``$STRING`` |  |
| `object` | ``$STRING`` |  |
| `oracle_id` | ``$STRING`` |  |
| `published_at` | ``$STRING`` |  |
| `source` | ``$STRING`` |  |

#### Example: List

```ts
const rulings = await client.Ruling().list()
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

```ts
const set = await client.Set().load({ id: 'set_id' })
```

#### Example: List

```ts
const sets = await client.Set().list()
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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const bulkdata = client.BulkData()
await bulkdata.load({ id: "example_id" })

// bulkdata.data() now returns the loaded bulkdata data
// bulkdata.match() returns { id: "example_id" }
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
