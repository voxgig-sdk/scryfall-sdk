# Scryfall Python SDK Reference

Complete API reference for the Scryfall Python SDK.


## ScryfallSDK

### Constructor

```python
from scryfall_sdk import ScryfallSDK

client = ScryfallSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ScryfallSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = ScryfallSDK.test()
```


### Instance Methods

#### `BulkData(data=None)`

Create a new `BulkDataEntity` instance. Pass `None` for no initial data.

#### `Card(data=None)`

Create a new `CardEntity` instance. Pass `None` for no initial data.

#### `CardList(data=None)`

Create a new `CardListEntity` instance. Pass `None` for no initial data.

#### `CardSymbolList(data=None)`

Create a new `CardSymbolListEntity` instance. Pass `None` for no initial data.

#### `Catalog(data=None)`

Create a new `CatalogEntity` instance. Pass `None` for no initial data.

#### `ManaCost(data=None)`

Create a new `ManaCostEntity` instance. Pass `None` for no initial data.

#### `Migration(data=None)`

Create a new `MigrationEntity` instance. Pass `None` for no initial data.

#### `Ruling(data=None)`

Create a new `RulingEntity` instance. Pass `None` for no initial data.

#### `Set(data=None)`

Create a new `SetEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## BulkDataEntity

```python
bulk_data = client.BulkData()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content_encoding` | `str` | No | The Content-Encoding encoding for this file |
| `content_type` | `str` | No | The MIME type of this file |
| `description` | `str` | No | A human-readable description for this file |
| `download_uri` | `str` | No | The URI that hosts this bulk file |
| `id` | `str` | No | A unique ID for this bulk data file |
| `name` | `str` | No | A human-readable name for this file |
| `object` | `str` | No | The object type |
| `size` | `int` | No | The size of this file in bytes |
| `type` | `str` | No | The type of bulk data |
| `updated_at` | `str` | No | The time this file was last updated |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.BulkData().list()
for bulk_data in results:
    print(bulk_data)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.BulkData().load({"id": "bulk_data_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BulkDataEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CardEntity

```python
card = client.Card()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artist` | `str` | No | The name of the illustrator of this card |
| `cmc` | `float` | No | The card's converted mana cost |
| `collector_number` | `str` | No | This card's collector number |
| `color_identity` | `list` | No | This card's color identity |
| `colors` | `list` | No | This card's colors |
| `id` | `str` | No | A unique ID for this card in Scryfall's database |
| `image_uris` | `dict` | No | An object containing URIs to this card's imagery |
| `lang` | `str` | No | The language code for this printing |
| `layout` | `str` | No | A code for this card's layout |
| `legalities` | `dict` | No | An object describing the legality of this card |
| `loyalty` | `str` | No | This card's loyalty (for planeswalkers) |
| `mana_cost` | `str` | No | The mana cost for this card |
| `name` | `str` | No | The name of this card |
| `oracle_id` | `str` | No | A unique ID for this card's oracle identity |
| `oracle_text` | `str` | No | The Oracle text for this card |
| `power` | `str` | No | This card's power (for creatures) |
| `prices` | `dict` | No | An object containing daily price information for this card |
| `rarity` | `str` | No | This card's rarity |
| `released_at` | `str` | No | The date this card was first released |
| `scryfall_uri` | `str` | No | A link to this card's page on Scryfall's website |
| `set` | `str` | No | This card's set code |
| `set_name` | `str` | No | This card's full set name |
| `toughness` | `str` | No | This card's toughness (for creatures) |
| `type_line` | `str` | No | The type line of this card |
| `uri` | `str` | No | A link to this card object on Scryfall's API |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Card().list()
for card in results:
    print(card)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Card().load({"id": "card_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CardListEntity

```python
card_list = client.CardList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artist` | `str` | No | The name of the illustrator of this card |
| `cmc` | `float` | No | The card's converted mana cost |
| `collector_number` | `str` | No | This card's collector number |
| `color_identity` | `list` | No | This card's color identity |
| `colors` | `list` | No | This card's colors |
| `data` | `list` | No | An array of the requested objects |
| `has_more` | `bool` | No | True if this list is paginated and has more pages |
| `id` | `str` | No | A unique ID for this card in Scryfall's database |
| `identifiers` | `list` | Yes |  |
| `image_uris` | `dict` | No | An object containing URIs to this card's imagery |
| `lang` | `str` | No | The language code for this printing |
| `layout` | `str` | No | A code for this card's layout |
| `legalities` | `dict` | No | An object describing the legality of this card |
| `loyalty` | `str` | No | This card's loyalty (for planeswalkers) |
| `mana_cost` | `str` | No | The mana cost for this card |
| `name` | `str` | No | The name of this card |
| `next_page` | `str` | No | The URL for the next page of results |
| `object` | `str` | No | The object type |
| `oracle_id` | `str` | No | A unique ID for this card's oracle identity |
| `oracle_text` | `str` | No | The Oracle text for this card |
| `power` | `str` | No | This card's power (for creatures) |
| `prices` | `dict` | No | An object containing daily price information for this card |
| `rarity` | `str` | No | This card's rarity |
| `released_at` | `str` | No | The date this card was first released |
| `scryfall_uri` | `str` | No | A link to this card's page on Scryfall's website |
| `set` | `str` | No | This card's set code |
| `set_name` | `str` | No | This card's full set name |
| `total_cards` | `int` | No | The total number of cards found |
| `toughness` | `str` | No | This card's toughness (for creatures) |
| `type_line` | `str` | No | The type line of this card |
| `uri` | `str` | No | A link to this card object on Scryfall's API |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.CardList().create({
    "identifiers": [],  # list
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.CardList().list()
for card_list in results:
    print(card_list)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CardSymbolListEntity

```python
card_symbol_list = client.CardSymbolList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `appears_in_mana_costs` | `bool` | No | True if this symbol appears in mana costs |
| `cmc` | `float` | No | The converted mana cost represented by this symbol |
| `colors` | `list` | No | The colors of this symbol |
| `english` | `str` | No | An English textual description of the symbol |
| `funny` | `bool` | No | True if this symbol is only used on funny cards |
| `loose_variant` | `str` | No | An alternate version of this symbol |
| `object` | `str` | No | The object type |
| `represents_mana` | `bool` | No | True if this is a mana symbol |
| `svg_uri` | `str` | No | A URI to an SVG image for this symbol |
| `symbol` | `str` | No | The plaintext symbol |
| `transposable` | `bool` | No | True if it's possible to write this symbol backwards |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.CardSymbolList().list()
for card_symbol_list in results:
    print(card_symbol_list)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardSymbolListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CatalogEntity

```python
catalog = client.Catalog()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `list` | No | An array of datapoints |
| `id` | `str` | No |  |
| `object` | `str` | No | The object type |
| `total_values` | `int` | No | The number of items in the data array |
| `uri` | `str` | No | A link to this catalog on Scryfall's API |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Catalog().load({"id": "catalog_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CatalogEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ManaCostEntity

```python
mana_cost = client.ManaCost()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cmc` | `float` | No | The converted mana cost |
| `colorless` | `bool` | No | True if this mana cost is colorless |
| `colors` | `list` | No | The colors in this mana cost |
| `cost` | `str` | No | The normalized cost |
| `monocolored` | `bool` | No | True if this mana cost is monocolored |
| `multicolored` | `bool` | No | True if this mana cost is multicolored |
| `object` | `str` | No | The object type |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ManaCost().list()
for mana_cost in results:
    print(mana_cost)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ManaCostEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MigrationEntity

```python
migration = client.Migration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No | A unique ID for this migration |
| `migration_strategy` | `str` | No | The type of migration strategy |
| `new_scryfall_id` | `str` | No | The updated Scryfall ID |
| `object` | `str` | No | The object type |
| `old_scryfall_id` | `str` | No | The original Scryfall ID |
| `performed_at` | `str` | No | The date this migration was performed |
| `uri` | `str` | No | A link to this migration on Scryfall's API |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Migration().list()
for migration in results:
    print(migration)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MigrationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RulingEntity

```python
ruling = client.Ruling()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `comment` | `str` | No | The text of the ruling |
| `object` | `str` | No | The object type |
| `oracle_id` | `str` | No | The Oracle ID of the card this ruling applies to |
| `published_at` | `str` | No | The date this ruling was published |
| `source` | `str` | No | The source of this ruling |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Ruling().list({"card_id": "example"})
for ruling in results:
    print(ruling)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RulingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SetEntity

```python
set = client.Set()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card_count` | `int` | No | The number of cards in this set |
| `code` | `str` | No | The unique three to five-letter code for this set |
| `digital` | `bool` | No | True if this set is only available digitally |
| `icon_svg_uri` | `str` | No | A URI to an SVG file for this set's icon |
| `id` | `str` | No | A unique ID for this set |
| `name` | `str` | No | The English name of the set |
| `released_at` | `str` | No | The date the set was released |
| `scryfall_uri` | `str` | No | A link to this set's page on Scryfall's website |
| `search_uri` | `str` | No | A link to search for cards in this set on Scryfall's API |
| `set_type` | `str` | No | The type of set |
| `uri` | `str` | No | A link to this set object on Scryfall's API |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Set().list()
for set in results:
    print(set)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Set().load({"id": "set_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = ScryfallSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

