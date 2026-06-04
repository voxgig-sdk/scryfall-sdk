# Scryfall SDK

Query Magic: The Gathering cards, sets, rulings, and high-resolution card images over a JSON REST API

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Scryfall API

[Scryfall](https://scryfall.com) is a community-run search engine and data service for [Magic: The Gathering](https://magic.wizards.com). The Scryfall API exposes the same card, set, and ruling data that powers the Scryfall website over a JSON REST interface at `https://api.scryfall.com`.

The API is organised around a few core resources: individual cards (with multiple lookup strategies such as by name, set/collector number, or Scryfall ID), set objects, rulings, card symbols and mana costs, plus bulk-data snapshots for downloading the full database as a single file.

CORS is enabled so the API can be called directly from browser code. Scryfall publishes large daily bulk-data files for users who need the full corpus rather than per-card lookups.

## Try it

**TypeScript**
```bash
npm install scryfall
```

**Python**
```bash
pip install scryfall-sdk
```

**PHP**
```bash
composer require voxgig/scryfall-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/scryfall-sdk/go
```

**Ruby**
```bash
gem install scryfall-sdk
```

**Lua**
```bash
luarocks install scryfall-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { ScryfallSDK } from 'scryfall'

const client = new ScryfallSDK({})

// List all bulkdatas
const bulkdatas = await client.BulkData().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o scryfall-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "scryfall": {
      "command": "/abs/path/to/scryfall-mcp"
    }
  }
}
```

## Entities

The API exposes 9 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **BulkData** | Bulk-data snapshots of the entire Scryfall database (default cards, all cards, rulings, etc.) listed under `/bulk-data`. | `/bulk-data` |
| **Card** | An individual Magic: The Gathering card, retrievable by Scryfall ID, name, set + collector number, or other identifiers under `/cards`. | `/cards/named` |
| **CardList** | A paginated list of card objects returned by search and listing endpoints such as `/cards/search`. | `/cards/collection` |
| **CardSymbolList** | List of card symbols (mana symbols, tap, etc.) used in Magic card text, served from `/symbology`. | `/symbology` |
| **Catalog** | Reference catalogues of known values (card names, creature types, keyword abilities, and similar) under `/catalog`. | `/catalog/{catalog_name}` |
| **ManaCost** | Parsed representation of a mana cost string, including converted mana cost and colours, via `/symbology/parse-mana`. | `/symbology/parse-mana` |
| **Migration** | Records of card migrations and merges that change canonical Scryfall IDs over time, listed under `/migrations`. | `/migrations` |
| **Ruling** |  | `/cards/{id}/rulings` |
| **Set** | A Magic: The Gathering set (expansion, core set, supplemental product, etc.) accessible under `/sets`. | `/sets` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from scryfall_sdk import ScryfallSDK

client = ScryfallSDK({})

# List all bulkdatas
bulkdatas, err = client.BulkData(None).list(None, None)

# Load a specific bulkdata
bulkdata, err = client.BulkData(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'scryfall_sdk.php';

$client = new ScryfallSDK([]);

// List all bulkdatas
[$bulkdatas, $err] = $client->BulkData(null)->list(null, null);

// Load a specific bulkdata
[$bulkdata, $err] = $client->BulkData(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/scryfall-sdk/go"

client := sdk.NewScryfallSDK(map[string]any{})

// List all bulkdatas
bulkdatas, err := client.BulkData(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Scryfall_sdk"

client = ScryfallSDK.new({})

# List all bulkdatas
bulkdatas, err = client.BulkData(nil).list(nil, nil)

# Load a specific bulkdata
bulkdata, err = client.BulkData(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("scryfall_sdk")

local client = sdk.new({})

-- List all bulkdatas
local bulkdatas, err = client:BulkData(nil):list(nil, nil)

-- Load a specific bulkdata
local bulkdata, err = client:BulkData(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = ScryfallSDK.test()
const result = await client.BulkData().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = ScryfallSDK.test(None, None)
result, err = client.BulkData(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = ScryfallSDK::test(null, null);
[$result, $err] = $client->BulkData(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.BulkData(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = ScryfallSDK.test(nil, nil)
result, err = client.BulkData(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:BulkData(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Scryfall API

- Upstream: [https://scryfall.com](https://scryfall.com)
- API docs: [https://scryfall.com/docs/api](https://scryfall.com/docs/api)

---

Generated from the Scryfall API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
