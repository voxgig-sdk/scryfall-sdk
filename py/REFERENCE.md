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
| `content_encoding` | `str` | No |  |
| `content_type` | `str` | No |  |
| `description` | `str` | No |  |
| `download_uri` | `str` | No |  |
| `id` | `str` | No |  |
| `name` | `str` | No |  |
| `object` | `str` | No |  |
| `size` | `int` | No |  |
| `type` | `str` | No |  |
| `updated_at` | `str` | No |  |

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
| `artist` | `str` | No |  |
| `cmc` | `float` | No |  |
| `collector_number` | `str` | No |  |
| `color` | `list` | No |  |
| `color_identity` | `list` | No |  |
| `id` | `str` | No |  |
| `image_uri` | `dict` | No |  |
| `lang` | `str` | No |  |
| `layout` | `str` | No |  |
| `legality` | `dict` | No |  |
| `loyalty` | `str` | No |  |
| `mana_cost` | `str` | No |  |
| `name` | `str` | No |  |
| `oracle_id` | `str` | No |  |
| `oracle_text` | `str` | No |  |
| `power` | `str` | No |  |
| `price` | `dict` | No |  |
| `rarity` | `str` | No |  |
| `released_at` | `str` | No |  |
| `scryfall_uri` | `str` | No |  |
| `set` | `str` | No |  |
| `set_name` | `str` | No |  |
| `toughness` | `str` | No |  |
| `type_line` | `str` | No |  |
| `uri` | `str` | No |  |

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
| `artist` | `str` | No |  |
| `cmc` | `float` | No |  |
| `collector_number` | `str` | No |  |
| `color` | `list` | No |  |
| `color_identity` | `list` | No |  |
| `data` | `list` | No |  |
| `has_more` | `bool` | No |  |
| `id` | `str` | No |  |
| `identifier` | `list` | Yes |  |
| `image_uri` | `dict` | No |  |
| `lang` | `str` | No |  |
| `layout` | `str` | No |  |
| `legality` | `dict` | No |  |
| `loyalty` | `str` | No |  |
| `mana_cost` | `str` | No |  |
| `name` | `str` | No |  |
| `next_page` | `str` | No |  |
| `object` | `str` | No |  |
| `oracle_id` | `str` | No |  |
| `oracle_text` | `str` | No |  |
| `power` | `str` | No |  |
| `price` | `dict` | No |  |
| `rarity` | `str` | No |  |
| `released_at` | `str` | No |  |
| `scryfall_uri` | `str` | No |  |
| `set` | `str` | No |  |
| `set_name` | `str` | No |  |
| `total_card` | `int` | No |  |
| `toughness` | `str` | No |  |
| `type_line` | `str` | No |  |
| `uri` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.CardList().create({
    "identifier": [],  # list
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
| `appears_in_mana_cost` | `bool` | No |  |
| `cmc` | `float` | No |  |
| `color` | `list` | No |  |
| `english` | `str` | No |  |
| `funny` | `bool` | No |  |
| `loose_variant` | `str` | No |  |
| `object` | `str` | No |  |
| `represents_mana` | `bool` | No |  |
| `svg_uri` | `str` | No |  |
| `symbol` | `str` | No |  |
| `transposable` | `bool` | No |  |

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
| `data` | `list` | No |  |
| `object` | `str` | No |  |
| `total_value` | `int` | No |  |
| `uri` | `str` | No |  |

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
| `cmc` | `float` | No |  |
| `color` | `list` | No |  |
| `colorless` | `bool` | No |  |
| `cost` | `str` | No |  |
| `monocolored` | `bool` | No |  |
| `multicolored` | `bool` | No |  |
| `object` | `str` | No |  |

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
| `id` | `str` | No |  |
| `migration_strategy` | `str` | No |  |
| `new_scryfall_id` | `str` | No |  |
| `object` | `str` | No |  |
| `old_scryfall_id` | `str` | No |  |
| `performed_at` | `str` | No |  |
| `uri` | `str` | No |  |

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
| `comment` | `str` | No |  |
| `object` | `str` | No |  |
| `oracle_id` | `str` | No |  |
| `published_at` | `str` | No |  |
| `source` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Ruling().list()
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
| `card_count` | `int` | No |  |
| `code` | `str` | No |  |
| `digital` | `bool` | No |  |
| `icon_svg_uri` | `str` | No |  |
| `id` | `str` | No |  |
| `name` | `str` | No |  |
| `released_at` | `str` | No |  |
| `scryfall_uri` | `str` | No |  |
| `search_uri` | `str` | No |  |
| `set_type` | `str` | No |  |
| `uri` | `str` | No |  |

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

