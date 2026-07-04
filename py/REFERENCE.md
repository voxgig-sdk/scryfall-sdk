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
bulk_data = client.bulk_data
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content_encoding` | ``$STRING`` | No |  |
| `content_type` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `download_uri` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `object` | ``$STRING`` | No |  |
| `size` | ``$INTEGER`` | No |  |
| `type` | ``$STRING`` | No |  |
| `updated_at` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.bulk_data.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.bulk_data.load({"id": "bulk_data_id"})
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
card = client.card
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artist` | ``$STRING`` | No |  |
| `cmc` | ``$NUMBER`` | No |  |
| `collector_number` | ``$STRING`` | No |  |
| `color` | ``$ARRAY`` | No |  |
| `color_identity` | ``$ARRAY`` | No |  |
| `id` | ``$STRING`` | No |  |
| `image_uri` | ``$OBJECT`` | No |  |
| `lang` | ``$STRING`` | No |  |
| `layout` | ``$STRING`` | No |  |
| `legality` | ``$OBJECT`` | No |  |
| `loyalty` | ``$STRING`` | No |  |
| `mana_cost` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `oracle_id` | ``$STRING`` | No |  |
| `oracle_text` | ``$STRING`` | No |  |
| `power` | ``$STRING`` | No |  |
| `price` | ``$OBJECT`` | No |  |
| `rarity` | ``$STRING`` | No |  |
| `released_at` | ``$STRING`` | No |  |
| `scryfall_uri` | ``$STRING`` | No |  |
| `set` | ``$STRING`` | No |  |
| `set_name` | ``$STRING`` | No |  |
| `toughness` | ``$STRING`` | No |  |
| `type_line` | ``$STRING`` | No |  |
| `uri` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.card.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.card.load({"id": "card_id"})
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
card_list = client.card_list
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artist` | ``$STRING`` | No |  |
| `cmc` | ``$NUMBER`` | No |  |
| `collector_number` | ``$STRING`` | No |  |
| `color` | ``$ARRAY`` | No |  |
| `color_identity` | ``$ARRAY`` | No |  |
| `data` | ``$ARRAY`` | No |  |
| `has_more` | ``$BOOLEAN`` | No |  |
| `id` | ``$STRING`` | No |  |
| `identifier` | ``$ARRAY`` | Yes |  |
| `image_uri` | ``$OBJECT`` | No |  |
| `lang` | ``$STRING`` | No |  |
| `layout` | ``$STRING`` | No |  |
| `legality` | ``$OBJECT`` | No |  |
| `loyalty` | ``$STRING`` | No |  |
| `mana_cost` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `next_page` | ``$STRING`` | No |  |
| `object` | ``$STRING`` | No |  |
| `oracle_id` | ``$STRING`` | No |  |
| `oracle_text` | ``$STRING`` | No |  |
| `power` | ``$STRING`` | No |  |
| `price` | ``$OBJECT`` | No |  |
| `rarity` | ``$STRING`` | No |  |
| `released_at` | ``$STRING`` | No |  |
| `scryfall_uri` | ``$STRING`` | No |  |
| `set` | ``$STRING`` | No |  |
| `set_name` | ``$STRING`` | No |  |
| `total_card` | ``$INTEGER`` | No |  |
| `toughness` | ``$STRING`` | No |  |
| `type_line` | ``$STRING`` | No |  |
| `uri` | ``$STRING`` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.card_list.create({
    "identifier": # `$ARRAY`,
})
```

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.card_list.list({})
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
card_symbol_list = client.card_symbol_list
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `appears_in_mana_cost` | ``$BOOLEAN`` | No |  |
| `cmc` | ``$NUMBER`` | No |  |
| `color` | ``$ARRAY`` | No |  |
| `english` | ``$STRING`` | No |  |
| `funny` | ``$BOOLEAN`` | No |  |
| `loose_variant` | ``$STRING`` | No |  |
| `object` | ``$STRING`` | No |  |
| `represents_mana` | ``$BOOLEAN`` | No |  |
| `svg_uri` | ``$STRING`` | No |  |
| `symbol` | ``$STRING`` | No |  |
| `transposable` | ``$BOOLEAN`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.card_symbol_list.list({})
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
catalog = client.catalog
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$ARRAY`` | No |  |
| `object` | ``$STRING`` | No |  |
| `total_value` | ``$INTEGER`` | No |  |
| `uri` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.catalog.load({"id": "catalog_id"})
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
mana_cost = client.mana_cost
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cmc` | ``$NUMBER`` | No |  |
| `color` | ``$ARRAY`` | No |  |
| `colorless` | ``$BOOLEAN`` | No |  |
| `cost` | ``$STRING`` | No |  |
| `monocolored` | ``$BOOLEAN`` | No |  |
| `multicolored` | ``$BOOLEAN`` | No |  |
| `object` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.mana_cost.list({})
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
migration = client.migration
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$STRING`` | No |  |
| `migration_strategy` | ``$STRING`` | No |  |
| `new_scryfall_id` | ``$STRING`` | No |  |
| `object` | ``$STRING`` | No |  |
| `old_scryfall_id` | ``$STRING`` | No |  |
| `performed_at` | ``$STRING`` | No |  |
| `uri` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.migration.list({})
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
ruling = client.ruling
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `comment` | ``$STRING`` | No |  |
| `object` | ``$STRING`` | No |  |
| `oracle_id` | ``$STRING`` | No |  |
| `published_at` | ``$STRING`` | No |  |
| `source` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.ruling.list({})
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
set = client.set
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card_count` | ``$INTEGER`` | No |  |
| `code` | ``$STRING`` | No |  |
| `digital` | ``$BOOLEAN`` | No |  |
| `icon_svg_uri` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `released_at` | ``$STRING`` | No |  |
| `scryfall_uri` | ``$STRING`` | No |  |
| `search_uri` | ``$STRING`` | No |  |
| `set_type` | ``$STRING`` | No |  |
| `uri` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.set.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.set.load({"id": "set_id"})
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

