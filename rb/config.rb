# Scryfall SDK configuration

module ScryfallConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Scryfall",
        "slug" => "scryfall",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://api.scryfall.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "bulk_data" => {},
          "card" => {},
          "card_list" => {},
          "card_symbol_list" => {},
          "catalog" => {},
          "mana_cost" => {},
          "migration" => {},
          "ruling" => {},
          "set" => {},
        },
      },
      "entity" => {
        "bulk_data" => {
          "fields" => [
            {
              "name" => "content_encoding",
              "short" => "The Content-Encoding encoding for this file",
              "type" => "`$STRING`",
            },
            {
              "name" => "content_type",
              "short" => "The MIME type of this file",
              "type" => "`$STRING`",
            },
            {
              "name" => "description",
              "short" => "A human-readable description for this file",
              "type" => "`$STRING`",
            },
            {
              "name" => "download_uri",
              "short" => "The URI that hosts this bulk file",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "A unique ID for this bulk data file",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "A human-readable name for this file",
              "type" => "`$STRING`",
            },
            {
              "name" => "object",
              "short" => "The object type",
              "type" => "`$STRING`",
            },
            {
              "name" => "size",
              "short" => "The size of this file in bytes",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "type",
              "short" => "The type of bulk data",
              "type" => "`$STRING`",
            },
            {
              "name" => "updated_at",
              "short" => "The time this file was last updated",
              "type" => "`$STRING`",
            },
          ],
          "name" => "bulk_data",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/bulk-data",
                  "parts" => [
                    "bulk-data",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/bulk-data/{id}",
                  "parts" => [
                    "bulk-data",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "card" => {
          "fields" => [
            {
              "name" => "artist",
              "short" => "The name of the illustrator of this card",
              "type" => "`$STRING`",
            },
            {
              "name" => "cmc",
              "short" => "The card's converted mana cost",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "collector_number",
              "short" => "This card's collector number",
              "type" => "`$STRING`",
            },
            {
              "name" => "color_identity",
              "short" => "This card's color identity",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "colors",
              "short" => "This card's colors",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "id",
              "short" => "A unique ID for this card in Scryfall's database",
              "type" => "`$STRING`",
            },
            {
              "name" => "image_uris",
              "short" => "An object containing URIs to this card's imagery",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "lang",
              "short" => "The language code for this printing",
              "type" => "`$STRING`",
            },
            {
              "name" => "layout",
              "short" => "A code for this card's layout",
              "type" => "`$STRING`",
            },
            {
              "name" => "legalities",
              "short" => "An object describing the legality of this card",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "loyalty",
              "short" => "This card's loyalty (for planeswalkers)",
              "type" => "`$STRING`",
            },
            {
              "name" => "mana_cost",
              "short" => "The mana cost for this card",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "The name of this card",
              "type" => "`$STRING`",
            },
            {
              "name" => "oracle_id",
              "short" => "A unique ID for this card's oracle identity",
              "type" => "`$STRING`",
            },
            {
              "name" => "oracle_text",
              "short" => "The Oracle text for this card",
              "type" => "`$STRING`",
            },
            {
              "name" => "power",
              "short" => "This card's power (for creatures)",
              "type" => "`$STRING`",
            },
            {
              "name" => "prices",
              "short" => "An object containing daily price information for this card",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "rarity",
              "short" => "This card's rarity",
              "type" => "`$STRING`",
            },
            {
              "name" => "released_at",
              "short" => "The date this card was first released",
              "type" => "`$STRING`",
            },
            {
              "name" => "scryfall_uri",
              "short" => "A link to this card's page on Scryfall's website",
              "type" => "`$STRING`",
            },
            {
              "name" => "set",
              "short" => "This card's set code",
              "type" => "`$STRING`",
            },
            {
              "name" => "set_name",
              "short" => "This card's full set name",
              "type" => "`$STRING`",
            },
            {
              "name" => "toughness",
              "short" => "This card's toughness (for creatures)",
              "type" => "`$STRING`",
            },
            {
              "name" => "type_line",
              "short" => "The type line of this card",
              "type" => "`$STRING`",
            },
            {
              "name" => "uri",
              "short" => "A link to this card object on Scryfall's API",
              "type" => "`$STRING`",
            },
          ],
          "name" => "card",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "Lightning Bolt",
                        "kind" => "query",
                        "name" => "exact",
                        "orig" => "exact",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "aust com",
                        "kind" => "query",
                        "name" => "fuzzy",
                        "orig" => "fuzzy",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "m19",
                        "kind" => "query",
                        "name" => "set",
                        "orig" => "set",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/cards/named",
                  "parts" => [
                    "cards",
                    "named",
                  ],
                  "select" => {
                    "$action" => "named",
                    "exist" => [
                      "exact",
                      "fuzzy",
                      "set",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "q",
                        "orig" => "q",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/cards/random",
                  "parts" => [
                    "cards",
                    "random",
                  ],
                  "select" => {
                    "$action" => "random",
                    "exist" => [
                      "q",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "683a5707-cddb-494d-9b41-51b4584ded69",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/cards/{id}",
                  "parts" => [
                    "cards",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "card_list" => {
          "fields" => [
            {
              "name" => "artist",
              "short" => "The name of the illustrator of this card",
              "type" => "`$STRING`",
            },
            {
              "name" => "cmc",
              "short" => "The card's converted mana cost",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "collector_number",
              "short" => "This card's collector number",
              "type" => "`$STRING`",
            },
            {
              "name" => "color_identity",
              "short" => "This card's color identity",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "colors",
              "short" => "This card's colors",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "data",
              "short" => "An array of the requested objects",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "has_more",
              "short" => "True if this list is paginated and has more pages",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "id",
              "short" => "A unique ID for this card in Scryfall's database",
              "type" => "`$STRING`",
            },
            {
              "name" => "identifiers",
              "req" => true,
              "type" => "`$ARRAY`",
            },
            {
              "name" => "image_uris",
              "short" => "An object containing URIs to this card's imagery",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "lang",
              "short" => "The language code for this printing",
              "type" => "`$STRING`",
            },
            {
              "name" => "layout",
              "short" => "A code for this card's layout",
              "type" => "`$STRING`",
            },
            {
              "name" => "legalities",
              "short" => "An object describing the legality of this card",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "loyalty",
              "short" => "This card's loyalty (for planeswalkers)",
              "type" => "`$STRING`",
            },
            {
              "name" => "mana_cost",
              "short" => "The mana cost for this card",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "The name of this card",
              "type" => "`$STRING`",
            },
            {
              "name" => "next_page",
              "short" => "The URL for the next page of results",
              "type" => "`$STRING`",
            },
            {
              "name" => "object",
              "short" => "The object type",
              "type" => "`$STRING`",
            },
            {
              "name" => "oracle_id",
              "short" => "A unique ID for this card's oracle identity",
              "type" => "`$STRING`",
            },
            {
              "name" => "oracle_text",
              "short" => "The Oracle text for this card",
              "type" => "`$STRING`",
            },
            {
              "name" => "power",
              "short" => "This card's power (for creatures)",
              "type" => "`$STRING`",
            },
            {
              "name" => "prices",
              "short" => "An object containing daily price information for this card",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "rarity",
              "short" => "This card's rarity",
              "type" => "`$STRING`",
            },
            {
              "name" => "released_at",
              "short" => "The date this card was first released",
              "type" => "`$STRING`",
            },
            {
              "name" => "scryfall_uri",
              "short" => "A link to this card's page on Scryfall's website",
              "type" => "`$STRING`",
            },
            {
              "name" => "set",
              "short" => "This card's set code",
              "type" => "`$STRING`",
            },
            {
              "name" => "set_name",
              "short" => "This card's full set name",
              "type" => "`$STRING`",
            },
            {
              "name" => "total_cards",
              "short" => "The total number of cards found",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "toughness",
              "short" => "This card's toughness (for creatures)",
              "type" => "`$STRING`",
            },
            {
              "name" => "type_line",
              "short" => "The type line of this card",
              "type" => "`$STRING`",
            },
            {
              "name" => "uri",
              "short" => "A link to this card object on Scryfall's API",
              "type" => "`$STRING`",
            },
          ],
          "name" => "card_list",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/cards/collection",
                  "parts" => [
                    "cards",
                    "collection",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "auto",
                        "kind" => "query",
                        "name" => "dir",
                        "orig" => "dir",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => false,
                        "kind" => "query",
                        "name" => "include_extra",
                        "orig" => "include_extra",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "example" => "name",
                        "kind" => "query",
                        "name" => "order",
                        "orig" => "order",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => "c:red pow:3",
                        "kind" => "query",
                        "name" => "q",
                        "orig" => "q",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "cards",
                        "kind" => "query",
                        "name" => "unique",
                        "orig" => "unique",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/cards/search",
                  "parts" => [
                    "cards",
                    "search",
                  ],
                  "select" => {
                    "exist" => [
                      "dir",
                      "include_extra",
                      "order",
                      "page",
                      "q",
                      "unique",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "card_symbol_list" => {
          "fields" => [
            {
              "name" => "appears_in_mana_costs",
              "short" => "True if this symbol appears in mana costs",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "cmc",
              "short" => "The converted mana cost represented by this symbol",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "colors",
              "short" => "The colors of this symbol",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "english",
              "short" => "An English textual description of the symbol",
              "type" => "`$STRING`",
            },
            {
              "name" => "funny",
              "short" => "True if this symbol is only used on funny cards",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "loose_variant",
              "short" => "An alternate version of this symbol",
              "type" => "`$STRING`",
            },
            {
              "name" => "object",
              "short" => "The object type",
              "type" => "`$STRING`",
            },
            {
              "name" => "represents_mana",
              "short" => "True if this is a mana symbol",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "svg_uri",
              "short" => "A URI to an SVG image for this symbol",
              "type" => "`$STRING`",
            },
            {
              "name" => "symbol",
              "short" => "The plaintext symbol",
              "type" => "`$STRING`",
            },
            {
              "name" => "transposable",
              "short" => "True if it's possible to write this symbol backwards",
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "card_symbol_list",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/symbology",
                  "parts" => [
                    "symbology",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "catalog" => {
          "fields" => [
            {
              "name" => "data",
              "short" => "An array of datapoints",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "object",
              "short" => "The object type",
              "type" => "`$STRING`",
            },
            {
              "name" => "total_values",
              "short" => "The number of items in the data array",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "uri",
              "short" => "A link to this catalog on Scryfall's API",
              "type" => "`$STRING`",
            },
          ],
          "name" => "catalog",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "catalog_name",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/catalog/{catalog_name}",
                  "parts" => [
                    "catalog",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "catalog_name" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "mana_cost" => {
          "fields" => [
            {
              "name" => "cmc",
              "short" => "The converted mana cost",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "colorless",
              "short" => "True if this mana cost is colorless",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "colors",
              "short" => "The colors in this mana cost",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "cost",
              "short" => "The normalized cost",
              "type" => "`$STRING`",
            },
            {
              "name" => "monocolored",
              "short" => "True if this mana cost is monocolored",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "multicolored",
              "short" => "True if this mana cost is multicolored",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "object",
              "short" => "The object type",
              "type" => "`$STRING`",
            },
          ],
          "name" => "mana_cost",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "{2}{U}{U}",
                        "kind" => "query",
                        "name" => "cost",
                        "orig" => "cost",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/symbology/parse-mana",
                  "parts" => [
                    "symbology",
                    "parse-mana",
                  ],
                  "select" => {
                    "exist" => [
                      "cost",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.colors`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "migration" => {
          "fields" => [
            {
              "name" => "id",
              "short" => "A unique ID for this migration",
              "type" => "`$STRING`",
            },
            {
              "name" => "migration_strategy",
              "short" => "The type of migration strategy",
              "type" => "`$STRING`",
            },
            {
              "name" => "new_scryfall_id",
              "short" => "The updated Scryfall ID",
              "type" => "`$STRING`",
            },
            {
              "name" => "object",
              "short" => "The object type",
              "type" => "`$STRING`",
            },
            {
              "name" => "old_scryfall_id",
              "short" => "The original Scryfall ID",
              "type" => "`$STRING`",
            },
            {
              "name" => "performed_at",
              "short" => "The date this migration was performed",
              "type" => "`$STRING`",
            },
            {
              "name" => "uri",
              "short" => "A link to this migration on Scryfall's API",
              "type" => "`$STRING`",
            },
          ],
          "name" => "migration",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/migrations",
                  "parts" => [
                    "migrations",
                  ],
                  "select" => {
                    "exist" => [
                      "page",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "ruling" => {
          "fields" => [
            {
              "name" => "comment",
              "short" => "The text of the ruling",
              "type" => "`$STRING`",
            },
            {
              "name" => "object",
              "short" => "The object type",
              "type" => "`$STRING`",
            },
            {
              "name" => "oracle_id",
              "short" => "The Oracle ID of the card this ruling applies to",
              "type" => "`$STRING`",
            },
            {
              "name" => "published_at",
              "short" => "The date this ruling was published",
              "type" => "`$STRING`",
            },
            {
              "name" => "source",
              "short" => "The source of this ruling",
              "type" => "`$STRING`",
            },
          ],
          "name" => "ruling",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "card_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/cards/{id}/rulings",
                  "parts" => [
                    "cards",
                    "{card_id}",
                    "rulings",
                  ],
                  "rename" => {
                    "param" => {
                      "id" => "card_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "card_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "card",
              ],
            ],
          },
        },
        "set" => {
          "fields" => [
            {
              "name" => "card_count",
              "short" => "The number of cards in this set",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "code",
              "short" => "The unique three to five-letter code for this set",
              "type" => "`$STRING`",
            },
            {
              "name" => "digital",
              "short" => "True if this set is only available digitally",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "icon_svg_uri",
              "short" => "A URI to an SVG file for this set's icon",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "A unique ID for this set",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "The English name of the set",
              "type" => "`$STRING`",
            },
            {
              "name" => "released_at",
              "short" => "The date the set was released",
              "type" => "`$STRING`",
            },
            {
              "name" => "scryfall_uri",
              "short" => "A link to this set's page on Scryfall's website",
              "type" => "`$STRING`",
            },
            {
              "name" => "search_uri",
              "short" => "A link to search for cards in this set on Scryfall's API",
              "type" => "`$STRING`",
            },
            {
              "name" => "set_type",
              "short" => "The type of set",
              "type" => "`$STRING`",
            },
            {
              "name" => "uri",
              "short" => "A link to this set object on Scryfall's API",
              "type" => "`$STRING`",
            },
          ],
          "name" => "set",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/sets",
                  "parts" => [
                    "sets",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "m19",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "code",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/sets/{code}",
                  "parts" => [
                    "sets",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "code" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/sets/{id}",
                  "parts" => [
                    "sets",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    ScryfallFeatures.make_feature(name)
  end
end
