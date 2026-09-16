# Scryfall API

Scryfall provides a REST-like API for accessing Magic: The Gathering card data programmatically. It offers endpoints to retrieve cards, sets, images, and other related data in an easy-to-consume format.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 9 entities and 15 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### BulkData

Results: List of bulk data files; Bulk data file information.

SDK operations: `list`, `load`.

Key fields to recognise:

- `content_encoding`: The Content-Encoding encoding for this file
- `content_type`: The MIME type of this file
- `description`: A human-readable description for this file
- `download_uri`: The URI that hosts this bulk file
- `id`: A unique ID for this bulk data file

### Card

Results: Card found; Random card.

SDK operations: `list`, `load`.

Key fields to recognise:

- `artist`: The name of the illustrator of this card
- `cmc`: The card&#39;s converted mana cost
- `collector_number`: This card&#39;s collector number
- `color_identity`: This card&#39;s color identity
- `colors`: This card&#39;s colors

### CardList

Results: Collection of cards; Successful search results.

SDK operations: `create`, `list`.

Key fields to recognise:

- `artist`: The name of the illustrator of this card
- `cmc`: The card&#39;s converted mana cost
- `collector_number`: This card&#39;s collector number
- `color_identity`: This card&#39;s color identity
- `colors`: This card&#39;s colors

### CardSymbolList

Results: List of all card symbols.

SDK operations: `list`.

Key fields to recognise:

- `appears_in_mana_costs`: True if this symbol appears in mana costs
- `cmc`: The converted mana cost represented by this symbol
- `colors`: The colors of this symbol
- `english`: An English textual description of the symbol
- `funny`: True if this symbol is only used on funny cards

### Catalog

Results: Catalog values.

SDK operations: `load`.

Key fields to recognise:

- `data`: An array of datapoints
- `object`: The object type
- `total_values`: The number of items in the data array
- `uri`: A link to this catalog on Scryfall&#39;s API

### ManaCost

Results: Parsed mana cost.

SDK operations: `list`.

Key fields to recognise:

- `cmc`: The converted mana cost
- `colorless`: True if this mana cost is colorless
- `colors`: The colors in this mana cost
- `cost`: The normalized cost
- `monocolored`: True if this mana cost is monocolored

### Migration

Results: List of card migrations.

SDK operations: `list`.

Key fields to recognise:

- `id`: A unique ID for this migration
- `migration_strategy`: The type of migration strategy
- `new_scryfall_id`: The updated Scryfall ID
- `object`: The object type
- `old_scryfall_id`: The original Scryfall ID

### Ruling

Results: List of rulings.

SDK operations: `list`.

Key fields to recognise:

- `comment`: The text of the ruling
- `object`: The object type
- `oracle_id`: The Oracle ID of the card this ruling applies to
- `published_at`: The date this ruling was published
- `source`: The source of this ruling

### Set

Results: List of all sets; Set found.

SDK operations: `list`, `load`.

Key fields to recognise:

- `card_count`: The number of cards in this set
- `code`: The unique three to five-letter code for this set
- `digital`: True if this set is only available digitally
- `icon_svg_uri`: A URI to an SVG file for this set&#39;s icon
- `id`: A unique ID for this set

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| BulkData | `list` | `GET /bulk-data` | Not required |
| BulkData | `load` | `GET /bulk-data/{id}` | Not required |
| Card | `list` | `GET /cards/named` | Not required |
| Card | `list` | `GET /cards/random` | Not required |
| Card | `load` | `GET /cards/{id}` | Not required |
| CardList | `create` | `POST /cards/collection` | Not required |
| CardList | `list` | `GET /cards/search` | Not required |
| CardSymbolList | `list` | `GET /symbology` | Not required |
| Catalog | `load` | `GET /catalog/{catalog_name}` | Not required |
| ManaCost | `list` | `GET /symbology/parse-mana` | Not required |
| Migration | `list` | `GET /migrations` | Not required |
| Ruling | `list` | `GET /cards/{id}/rulings` | Not required |
| Set | `list` | `GET /sets` | Not required |
| Set | `load` | `GET /sets/{code}` | Not required |
| Set | `load` | `GET /sets/{id}` | Not required |

## Connect to the API

- Production API Server: `https://api.scryfall.com`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

A read request without required parameters or authentication is `GET /bulk-data`. For example:

```sh
curl --fail-with-body --silent --show-error 'https://api.scryfall.com/bulk-data'
```

Inspect the response using the BulkData reference. This checks the public route; authenticated operations need their own credentials and request data.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `scryfall_list`: List records for an entity. Supported entities: `bulk_data`, `card`, `card_list`, `card_symbol_list`, `mana_cost`, `migration`, `ruling`, `set`.
- `scryfall_load`: Load one record for an entity. Supported entities: `bulk_data`, `card`, `catalog`, `set`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

