# Scryfall Python SDK



The Python SDK for the Scryfall API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.BulkData()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/scryfall-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from scryfall_sdk import ScryfallSDK

client = ScryfallSDK()
```

### 2. List bulkdata records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    bulkdatas = client.BulkData().list()
    for bulkdata in bulkdatas:
        print(bulkdata)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a bulkdata

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    bulkdata = client.BulkData().load({"id": "example_id"})
    print(bulkdata)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    bulkdatas = client.BulkData().list()
    print(bulkdatas)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = ScryfallSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
bulkdata = client.BulkData().list()
# bulkdata contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = ScryfallSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### ScryfallSDK

```python
from scryfall_sdk import ScryfallSDK

client = ScryfallSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = ScryfallSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### ScryfallSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `bulk_data = client.BulkData()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content_encoding` | `str` | The Content-Encoding encoding for this file |
| `content_type` | `str` | The MIME type of this file |
| `description` | `str` | A human-readable description for this file |
| `download_uri` | `str` | The URI that hosts this bulk file |
| `id` | `str` | A unique ID for this bulk data file |
| `name` | `str` | A human-readable name for this file |
| `object` | `str` | The object type |
| `size` | `int` | The size of this file in bytes |
| `type` | `str` | The type of bulk data |
| `updated_at` | `str` | The time this file was last updated |

#### Example: Load

```python
bulk_data = client.BulkData().load({"id": "bulk_data_id"})
```

#### Example: List

```python
bulk_datas = client.BulkData().list()
```


### Card

Create an instance: `card = client.Card()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artist` | `str` | The name of the illustrator of this card |
| `cmc` | `float` | The card's converted mana cost |
| `collector_number` | `str` | This card's collector number |
| `color_identity` | `list` | This card's color identity |
| `colors` | `list` | This card's colors |
| `id` | `str` | A unique ID for this card in Scryfall's database |
| `image_uris` | `dict` | An object containing URIs to this card's imagery |
| `lang` | `str` | The language code for this printing |
| `layout` | `str` | A code for this card's layout |
| `legalities` | `dict` | An object describing the legality of this card |
| `loyalty` | `str` | This card's loyalty (for planeswalkers) |
| `mana_cost` | `str` | The mana cost for this card |
| `name` | `str` | The name of this card |
| `oracle_id` | `str` | A unique ID for this card's oracle identity |
| `oracle_text` | `str` | The Oracle text for this card |
| `power` | `str` | This card's power (for creatures) |
| `prices` | `dict` | An object containing daily price information for this card |
| `rarity` | `str` | This card's rarity |
| `released_at` | `str` | The date this card was first released |
| `scryfall_uri` | `str` | A link to this card's page on Scryfall's website |
| `set` | `str` | This card's set code |
| `set_name` | `str` | This card's full set name |
| `toughness` | `str` | This card's toughness (for creatures) |
| `type_line` | `str` | The type line of this card |
| `uri` | `str` | A link to this card object on Scryfall's API |

#### Example: Load

```python
card = client.Card().load({"id": "card_id"})
```

#### Example: List

```python
cards = client.Card().list()
```


### CardList

Create an instance: `card_list = client.CardList()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artist` | `str` | The name of the illustrator of this card |
| `cmc` | `float` | The card's converted mana cost |
| `collector_number` | `str` | This card's collector number |
| `color_identity` | `list` | This card's color identity |
| `colors` | `list` | This card's colors |
| `data` | `list` | An array of the requested objects |
| `has_more` | `bool` | True if this list is paginated and has more pages |
| `id` | `str` | A unique ID for this card in Scryfall's database |
| `identifiers` | `list` |  |
| `image_uris` | `dict` | An object containing URIs to this card's imagery |
| `lang` | `str` | The language code for this printing |
| `layout` | `str` | A code for this card's layout |
| `legalities` | `dict` | An object describing the legality of this card |
| `loyalty` | `str` | This card's loyalty (for planeswalkers) |
| `mana_cost` | `str` | The mana cost for this card |
| `name` | `str` | The name of this card |
| `next_page` | `str` | The URL for the next page of results |
| `object` | `str` | The object type |
| `oracle_id` | `str` | A unique ID for this card's oracle identity |
| `oracle_text` | `str` | The Oracle text for this card |
| `power` | `str` | This card's power (for creatures) |
| `prices` | `dict` | An object containing daily price information for this card |
| `rarity` | `str` | This card's rarity |
| `released_at` | `str` | The date this card was first released |
| `scryfall_uri` | `str` | A link to this card's page on Scryfall's website |
| `set` | `str` | This card's set code |
| `set_name` | `str` | This card's full set name |
| `total_cards` | `int` | The total number of cards found |
| `toughness` | `str` | This card's toughness (for creatures) |
| `type_line` | `str` | The type line of this card |
| `uri` | `str` | A link to this card object on Scryfall's API |

#### Example: List

```python
card_lists = client.CardList().list()
```

#### Example: Create

```python
card_list = client.CardList().create({
    "identifiers": [],  # list
})
```


### CardSymbolList

Create an instance: `card_symbol_list = client.CardSymbolList()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `appears_in_mana_costs` | `bool` | True if this symbol appears in mana costs |
| `cmc` | `float` | The converted mana cost represented by this symbol |
| `colors` | `list` | The colors of this symbol |
| `english` | `str` | An English textual description of the symbol |
| `funny` | `bool` | True if this symbol is only used on funny cards |
| `loose_variant` | `str` | An alternate version of this symbol |
| `object` | `str` | The object type |
| `represents_mana` | `bool` | True if this is a mana symbol |
| `svg_uri` | `str` | A URI to an SVG image for this symbol |
| `symbol` | `str` | The plaintext symbol |
| `transposable` | `bool` | True if it's possible to write this symbol backwards |

#### Example: List

```python
card_symbol_lists = client.CardSymbolList().list()
```


### Catalog

Create an instance: `catalog = client.Catalog()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `list` | An array of datapoints |
| `object` | `str` | The object type |
| `total_values` | `int` | The number of items in the data array |
| `uri` | `str` | A link to this catalog on Scryfall's API |

#### Example: Load

```python
catalog = client.Catalog().load({"id": "catalog_id"})
```


### ManaCost

Create an instance: `mana_cost = client.ManaCost()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cmc` | `float` | The converted mana cost |
| `colorless` | `bool` | True if this mana cost is colorless |
| `colors` | `list` | The colors in this mana cost |
| `cost` | `str` | The normalized cost |
| `monocolored` | `bool` | True if this mana cost is monocolored |
| `multicolored` | `bool` | True if this mana cost is multicolored |
| `object` | `str` | The object type |

#### Example: List

```python
mana_costs = client.ManaCost().list()
```


### Migration

Create an instance: `migration = client.Migration()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` | A unique ID for this migration |
| `migration_strategy` | `str` | The type of migration strategy |
| `new_scryfall_id` | `str` | The updated Scryfall ID |
| `object` | `str` | The object type |
| `old_scryfall_id` | `str` | The original Scryfall ID |
| `performed_at` | `str` | The date this migration was performed |
| `uri` | `str` | A link to this migration on Scryfall's API |

#### Example: List

```python
migrations = client.Migration().list()
```


### Ruling

Create an instance: `ruling = client.Ruling()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `comment` | `str` | The text of the ruling |
| `object` | `str` | The object type |
| `oracle_id` | `str` | The Oracle ID of the card this ruling applies to |
| `published_at` | `str` | The date this ruling was published |
| `source` | `str` | The source of this ruling |

#### Example: List

```python
rulings = client.Ruling().list({"card_id": "example"})
```


### Set

Create an instance: `set = client.Set()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `card_count` | `int` | The number of cards in this set |
| `code` | `str` | The unique three to five-letter code for this set |
| `digital` | `bool` | True if this set is only available digitally |
| `icon_svg_uri` | `str` | A URI to an SVG file for this set's icon |
| `id` | `str` | A unique ID for this set |
| `name` | `str` | The English name of the set |
| `released_at` | `str` | The date the set was released |
| `scryfall_uri` | `str` | A link to this set's page on Scryfall's website |
| `search_uri` | `str` | A link to search for cards in this set on Scryfall's API |
| `set_type` | `str` | The type of set |
| `uri` | `str` | A link to this set object on Scryfall's API |

#### Example: Load

```python
set = client.Set().load({"id": "set_id"})
```

#### Example: List

```python
sets = client.Set().list()
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── scryfall_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`scryfall_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
bulkdata = client.BulkData()
bulkdata.list()

# bulkdata.data_get() now returns the bulkdata data from the last list
# bulkdata.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
