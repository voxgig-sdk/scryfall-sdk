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
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
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
          "card_symbol" => {},
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
              "title" => "Content Encoding",
              "type" => "`$STRING`",
              "short" => "The Content-Encoding encoding for this file",
            },
            {
              "name" => "content_type",
              "title" => "Content Type",
              "type" => "`$STRING`",
              "short" => "The MIME type of this file",
            },
            {
              "name" => "description",
              "title" => "Description",
              "type" => "`$STRING`",
              "short" => "A human-readable description for this file",
            },
            {
              "name" => "download_uri",
              "title" => "Download Uri",
              "type" => "`$STRING`",
              "short" => "The URI that hosts this bulk file",
              "format" => "uri",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
              "short" => "A unique ID for this bulk data file",
              "format" => "uuid",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "A human-readable name for this file",
            },
            {
              "name" => "object",
              "title" => "Object",
              "type" => "`$STRING`",
              "short" => "The object type",
            },
            {
              "name" => "size",
              "title" => "Size",
              "type" => "`$INTEGER`",
              "short" => "The size of this file in bytes",
            },
            {
              "name" => "type",
              "title" => "Type",
              "type" => "`$STRING`",
              "short" => "The type of bulk data",
            },
            {
              "name" => "updated_at",
              "title" => "Updated At",
              "type" => "`$STRING`",
              "short" => "The time this file was last updated",
              "format" => "date-time",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "bulk_data",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/bulk-data",
                  "segments" => [
                    {
                      "lit" => "bulk-data",
                    },
                  ],
                  "parts" => [
                    "bulk-data",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/bulk-data/{id}",
                  "segments" => [
                    {
                      "lit" => "bulk-data",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "bulk-data",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
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
              "title" => "Artist",
              "type" => "`$STRING`",
              "short" => "The name of the illustrator of this card",
            },
            {
              "name" => "cmc",
              "title" => "Cmc",
              "type" => "`$NUMBER`",
              "short" => "The card's converted mana cost",
            },
            {
              "name" => "collector_number",
              "title" => "Collector Number",
              "type" => "`$STRING`",
              "short" => "This card's collector number",
            },
            {
              "name" => "color_identity",
              "title" => "Color Identity",
              "type" => "`$ARRAY`",
              "short" => "This card's color identity",
            },
            {
              "name" => "colors",
              "title" => "Colors",
              "type" => "`$ARRAY`",
              "short" => "This card's colors",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
              "short" => "A unique ID for this card in Scryfall's database",
              "format" => "uuid",
            },
            {
              "name" => "image_uris",
              "title" => "Image Uris",
              "type" => "`$OBJECT`",
              "short" => "An object containing URIs to this card's imagery",
            },
            {
              "name" => "lang",
              "title" => "Lang",
              "type" => "`$STRING`",
              "short" => "The language code for this printing",
            },
            {
              "name" => "layout",
              "title" => "Layout",
              "type" => "`$STRING`",
              "short" => "A code for this card's layout",
            },
            {
              "name" => "legalities",
              "title" => "Legalities",
              "type" => "`$OBJECT`",
              "short" => "An object describing the legality of this card",
            },
            {
              "name" => "loyalty",
              "title" => "Loyalty",
              "type" => "`$STRING`",
              "short" => "This card's loyalty (for planeswalkers)",
            },
            {
              "name" => "mana_cost",
              "title" => "Mana Cost",
              "type" => "`$STRING`",
              "short" => "The mana cost for this card",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "The name of this card",
            },
            {
              "name" => "oracle_id",
              "title" => "Oracle Id",
              "type" => "`$STRING`",
              "short" => "A unique ID for this card's oracle identity",
              "format" => "uuid",
            },
            {
              "name" => "oracle_text",
              "title" => "Oracle Text",
              "type" => "`$STRING`",
              "short" => "The Oracle text for this card",
            },
            {
              "name" => "power",
              "title" => "Power",
              "type" => "`$STRING`",
              "short" => "This card's power (for creatures)",
            },
            {
              "name" => "prices",
              "title" => "Prices",
              "type" => "`$OBJECT`",
              "short" => "An object containing daily price information for this card",
            },
            {
              "name" => "rarity",
              "title" => "Rarity",
              "type" => "`$STRING`",
              "short" => "This card's rarity",
            },
            {
              "name" => "released_at",
              "title" => "Released At",
              "type" => "`$STRING`",
              "short" => "The date this card was first released",
              "format" => "date",
            },
            {
              "name" => "scryfall_uri",
              "title" => "Scryfall Uri",
              "type" => "`$STRING`",
              "short" => "A link to this card's page on Scryfall's website",
              "format" => "uri",
            },
            {
              "name" => "set",
              "title" => "Set",
              "type" => "`$STRING`",
              "short" => "This card's set code",
            },
            {
              "name" => "set_name",
              "title" => "Set Name",
              "type" => "`$STRING`",
              "short" => "This card's full set name",
            },
            {
              "name" => "toughness",
              "title" => "Toughness",
              "type" => "`$STRING`",
              "short" => "This card's toughness (for creatures)",
            },
            {
              "name" => "type_line",
              "title" => "Type Line",
              "type" => "`$STRING`",
              "short" => "The type line of this card",
            },
            {
              "name" => "uri",
              "title" => "Uri",
              "type" => "`$STRING`",
              "short" => "A link to this card object on Scryfall's API",
              "format" => "uri",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "card",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/cards/named",
                  "segments" => [
                    {
                      "lit" => "cards",
                    },
                    {
                      "lit" => "named",
                    },
                  ],
                  "parts" => [
                    "cards",
                    "named",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "exact",
                        "orig" => "exact",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "Lightning Bolt",
                      },
                      {
                        "name" => "fuzzy",
                        "orig" => "fuzzy",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "aust com",
                      },
                      {
                        "name" => "set",
                        "orig" => "set",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "m19",
                      },
                    ],
                  },
                  "select" => {
                    "$action" => "named",
                    "exist" => [
                      "exact",
                      "fuzzy",
                      "set",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/cards/random",
                  "segments" => [
                    {
                      "lit" => "cards",
                    },
                    {
                      "lit" => "random",
                    },
                  ],
                  "parts" => [
                    "cards",
                    "random",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "q",
                        "orig" => "q",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "$action" => "random",
                    "exist" => [
                      "q",
                    ],
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/cards/{id}",
                  "segments" => [
                    {
                      "lit" => "cards",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "cards",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "683a5707-cddb-494d-9b41-51b4584ded69",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
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
              "title" => "Artist",
              "type" => "`$STRING`",
              "short" => "The name of the illustrator of this card",
            },
            {
              "name" => "cmc",
              "title" => "Cmc",
              "type" => "`$NUMBER`",
              "short" => "The card's converted mana cost",
            },
            {
              "name" => "collector_number",
              "title" => "Collector Number",
              "type" => "`$STRING`",
              "short" => "This card's collector number",
            },
            {
              "name" => "color_identity",
              "title" => "Color Identity",
              "type" => "`$ARRAY`",
              "short" => "This card's color identity",
            },
            {
              "name" => "colors",
              "title" => "Colors",
              "type" => "`$ARRAY`",
              "short" => "This card's colors",
            },
            {
              "name" => "data",
              "title" => "Data",
              "type" => "`$ARRAY`",
              "short" => "An array of the requested objects",
            },
            {
              "name" => "has_more",
              "title" => "Has More",
              "type" => "`$BOOLEAN`",
              "short" => "True if this list is paginated and has more pages",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
              "short" => "A unique ID for this card in Scryfall's database",
              "format" => "uuid",
            },
            {
              "name" => "identifiers",
              "title" => "Identifiers",
              "type" => "`$ARRAY`",
              "req" => true,
            },
            {
              "name" => "image_uris",
              "title" => "Image Uris",
              "type" => "`$OBJECT`",
              "short" => "An object containing URIs to this card's imagery",
            },
            {
              "name" => "lang",
              "title" => "Lang",
              "type" => "`$STRING`",
              "short" => "The language code for this printing",
            },
            {
              "name" => "layout",
              "title" => "Layout",
              "type" => "`$STRING`",
              "short" => "A code for this card's layout",
            },
            {
              "name" => "legalities",
              "title" => "Legalities",
              "type" => "`$OBJECT`",
              "short" => "An object describing the legality of this card",
            },
            {
              "name" => "loyalty",
              "title" => "Loyalty",
              "type" => "`$STRING`",
              "short" => "This card's loyalty (for planeswalkers)",
            },
            {
              "name" => "mana_cost",
              "title" => "Mana Cost",
              "type" => "`$STRING`",
              "short" => "The mana cost for this card",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "The name of this card",
            },
            {
              "name" => "next_page",
              "title" => "Next Page",
              "type" => "`$STRING`",
              "short" => "The URL for the next page of results",
              "format" => "uri",
            },
            {
              "name" => "object",
              "title" => "Object",
              "type" => "`$STRING`",
              "short" => "The object type",
            },
            {
              "name" => "oracle_id",
              "title" => "Oracle Id",
              "type" => "`$STRING`",
              "short" => "A unique ID for this card's oracle identity",
              "format" => "uuid",
            },
            {
              "name" => "oracle_text",
              "title" => "Oracle Text",
              "type" => "`$STRING`",
              "short" => "The Oracle text for this card",
            },
            {
              "name" => "power",
              "title" => "Power",
              "type" => "`$STRING`",
              "short" => "This card's power (for creatures)",
            },
            {
              "name" => "prices",
              "title" => "Prices",
              "type" => "`$OBJECT`",
              "short" => "An object containing daily price information for this card",
            },
            {
              "name" => "rarity",
              "title" => "Rarity",
              "type" => "`$STRING`",
              "short" => "This card's rarity",
            },
            {
              "name" => "released_at",
              "title" => "Released At",
              "type" => "`$STRING`",
              "short" => "The date this card was first released",
              "format" => "date",
            },
            {
              "name" => "scryfall_uri",
              "title" => "Scryfall Uri",
              "type" => "`$STRING`",
              "short" => "A link to this card's page on Scryfall's website",
              "format" => "uri",
            },
            {
              "name" => "set",
              "title" => "Set",
              "type" => "`$STRING`",
              "short" => "This card's set code",
            },
            {
              "name" => "set_name",
              "title" => "Set Name",
              "type" => "`$STRING`",
              "short" => "This card's full set name",
            },
            {
              "name" => "total_cards",
              "title" => "Total Cards",
              "type" => "`$INTEGER`",
              "short" => "The total number of cards found",
            },
            {
              "name" => "toughness",
              "title" => "Toughness",
              "type" => "`$STRING`",
              "short" => "This card's toughness (for creatures)",
            },
            {
              "name" => "type_line",
              "title" => "Type Line",
              "type" => "`$STRING`",
              "short" => "The type line of this card",
            },
            {
              "name" => "uri",
              "title" => "Uri",
              "type" => "`$STRING`",
              "short" => "A link to this card object on Scryfall's API",
              "format" => "uri",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "card_list",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/cards/collection",
                  "segments" => [
                    {
                      "lit" => "cards",
                    },
                    {
                      "lit" => "collection",
                    },
                  ],
                  "parts" => [
                    "cards",
                    "collection",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/cards/search",
                  "segments" => [
                    {
                      "lit" => "cards",
                    },
                    {
                      "lit" => "search",
                    },
                  ],
                  "parts" => [
                    "cards",
                    "search",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "dir",
                        "orig" => "dir",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "auto",
                      },
                      {
                        "name" => "include_extra",
                        "orig" => "include_extra",
                        "type" => "`$BOOLEAN`",
                        "kind" => "query",
                        "example" => false,
                      },
                      {
                        "name" => "order",
                        "orig" => "order",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "name",
                      },
                      {
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 1,
                      },
                      {
                        "name" => "q",
                        "orig" => "q",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "c:red pow:3",
                      },
                      {
                        "name" => "unique",
                        "orig" => "unique",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "cards",
                      },
                    ],
                  },
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
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "card_symbol" => {
          "fields" => [
            {
              "name" => "appears_in_mana_costs",
              "title" => "Appears In Mana Costs",
              "type" => "`$BOOLEAN`",
              "short" => "True if this symbol appears in mana costs",
            },
            {
              "name" => "cmc",
              "title" => "Cmc",
              "type" => "`$NUMBER`",
              "short" => "The converted mana cost represented by this symbol",
            },
            {
              "name" => "colors",
              "title" => "Colors",
              "type" => "`$ARRAY`",
              "short" => "The colors of this symbol",
            },
            {
              "name" => "english",
              "title" => "English",
              "type" => "`$STRING`",
              "short" => "An English textual description of the symbol",
            },
            {
              "name" => "funny",
              "title" => "Funny",
              "type" => "`$BOOLEAN`",
              "short" => "True if this symbol is only used on funny cards",
            },
            {
              "name" => "loose_variant",
              "title" => "Loose Variant",
              "type" => "`$STRING`",
              "short" => "An alternate version of this symbol",
            },
            {
              "name" => "object",
              "title" => "Object",
              "type" => "`$STRING`",
              "short" => "The object type",
            },
            {
              "name" => "represents_mana",
              "title" => "Represents Mana",
              "type" => "`$BOOLEAN`",
              "short" => "True if this is a mana symbol",
            },
            {
              "name" => "svg_uri",
              "title" => "Svg Uri",
              "type" => "`$STRING`",
              "short" => "A URI to an SVG image for this symbol",
              "format" => "uri",
            },
            {
              "name" => "symbol",
              "title" => "Symbol",
              "type" => "`$STRING`",
              "short" => "The plaintext symbol",
            },
            {
              "name" => "transposable",
              "title" => "Transposable",
              "type" => "`$BOOLEAN`",
              "short" => "True if it's possible to write this symbol backwards",
            },
          ],
          "name" => "card_symbol",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/symbology",
                  "segments" => [
                    {
                      "lit" => "symbology",
                    },
                  ],
                  "parts" => [
                    "symbology",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {},
                  "select" => {},
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
              "title" => "Data",
              "type" => "`$ARRAY`",
              "short" => "An array of datapoints",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "object",
              "title" => "Object",
              "type" => "`$STRING`",
              "short" => "The object type",
            },
            {
              "name" => "total_values",
              "title" => "Total Values",
              "type" => "`$INTEGER`",
              "short" => "The number of items in the data array",
            },
            {
              "name" => "uri",
              "title" => "Uri",
              "type" => "`$STRING`",
              "short" => "A link to this catalog on Scryfall's API",
              "format" => "uri",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "catalog",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/catalog/{catalog_name}",
                  "segments" => [
                    {
                      "lit" => "catalog",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "catalog",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "catalog_name" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "catalog_name",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
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
              "title" => "Cmc",
              "type" => "`$NUMBER`",
              "short" => "The converted mana cost",
            },
            {
              "name" => "colorless",
              "title" => "Colorless",
              "type" => "`$BOOLEAN`",
              "short" => "True if this mana cost is colorless",
            },
            {
              "name" => "colors",
              "title" => "Colors",
              "type" => "`$ARRAY`",
              "short" => "The colors in this mana cost",
            },
            {
              "name" => "cost",
              "title" => "Cost",
              "type" => "`$STRING`",
              "short" => "The normalized cost",
            },
            {
              "name" => "monocolored",
              "title" => "Monocolored",
              "type" => "`$BOOLEAN`",
              "short" => "True if this mana cost is monocolored",
            },
            {
              "name" => "multicolored",
              "title" => "Multicolored",
              "type" => "`$BOOLEAN`",
              "short" => "True if this mana cost is multicolored",
            },
            {
              "name" => "object",
              "title" => "Object",
              "type" => "`$STRING`",
              "short" => "The object type",
            },
          ],
          "name" => "mana_cost",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/symbology/parse-mana",
                  "segments" => [
                    {
                      "lit" => "symbology",
                    },
                    {
                      "lit" => "parse-mana",
                    },
                  ],
                  "parts" => [
                    "symbology",
                    "parse-mana",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.colors`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "cost",
                        "orig" => "cost",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "{2}{U}{U}",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "cost",
                    ],
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
              "title" => "Id",
              "type" => "`$STRING`",
              "short" => "A unique ID for this migration",
              "format" => "uuid",
            },
            {
              "name" => "migration_strategy",
              "title" => "Migration Strategy",
              "type" => "`$STRING`",
              "short" => "The type of migration strategy",
            },
            {
              "name" => "new_scryfall_id",
              "title" => "New Scryfall Id",
              "type" => "`$STRING`",
              "short" => "The updated Scryfall ID",
              "format" => "uuid",
            },
            {
              "name" => "object",
              "title" => "Object",
              "type" => "`$STRING`",
              "short" => "The object type",
            },
            {
              "name" => "old_scryfall_id",
              "title" => "Old Scryfall Id",
              "type" => "`$STRING`",
              "short" => "The original Scryfall ID",
              "format" => "uuid",
            },
            {
              "name" => "performed_at",
              "title" => "Performed At",
              "type" => "`$STRING`",
              "short" => "The date this migration was performed",
              "format" => "date-time",
            },
            {
              "name" => "uri",
              "title" => "Uri",
              "type" => "`$STRING`",
              "short" => "A link to this migration on Scryfall's API",
              "format" => "uri",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "migration",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/migrations",
                  "segments" => [
                    {
                      "lit" => "migrations",
                    },
                  ],
                  "parts" => [
                    "migrations",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 1,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "page",
                    ],
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
              "title" => "Comment",
              "type" => "`$STRING`",
              "short" => "The text of the ruling",
            },
            {
              "name" => "object",
              "title" => "Object",
              "type" => "`$STRING`",
              "short" => "The object type",
            },
            {
              "name" => "oracle_id",
              "title" => "Oracle Id",
              "type" => "`$STRING`",
              "short" => "The Oracle ID of the card this ruling applies to",
              "format" => "uuid",
            },
            {
              "name" => "published_at",
              "title" => "Published At",
              "type" => "`$STRING`",
              "short" => "The date this ruling was published",
              "format" => "date",
            },
            {
              "name" => "source",
              "title" => "Source",
              "type" => "`$STRING`",
              "short" => "The source of this ruling",
            },
          ],
          "name" => "ruling",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/cards/{id}/rulings",
                  "segments" => [
                    {
                      "lit" => "cards",
                    },
                    {
                      "var" => "card_id",
                    },
                    {
                      "lit" => "rulings",
                    },
                  ],
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
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "card_id",
                        "orig" => "id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "card_id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "$.main.kit.entity.card",
              ],
            ],
          },
        },
        "set" => {
          "fields" => [
            {
              "name" => "card_count",
              "title" => "Card Count",
              "type" => "`$INTEGER`",
              "short" => "The number of cards in this set",
            },
            {
              "name" => "code",
              "title" => "Code",
              "type" => "`$STRING`",
              "short" => "The unique three to five-letter code for this set",
            },
            {
              "name" => "digital",
              "title" => "Digital",
              "type" => "`$BOOLEAN`",
              "short" => "True if this set is only available digitally",
            },
            {
              "name" => "icon_svg_uri",
              "title" => "Icon Svg Uri",
              "type" => "`$STRING`",
              "short" => "A URI to an SVG file for this set's icon",
              "format" => "uri",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
              "short" => "A unique ID for this set",
              "format" => "uuid",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "The English name of the set",
            },
            {
              "name" => "released_at",
              "title" => "Released At",
              "type" => "`$STRING`",
              "short" => "The date the set was released",
              "format" => "date",
            },
            {
              "name" => "scryfall_uri",
              "title" => "Scryfall Uri",
              "type" => "`$STRING`",
              "short" => "A link to this set's page on Scryfall's website",
              "format" => "uri",
            },
            {
              "name" => "search_uri",
              "title" => "Search Uri",
              "type" => "`$STRING`",
              "short" => "A link to search for cards in this set on Scryfall's API",
              "format" => "uri",
            },
            {
              "name" => "set_type",
              "title" => "Set Type",
              "type" => "`$STRING`",
              "short" => "The type of set",
            },
            {
              "name" => "uri",
              "title" => "Uri",
              "type" => "`$STRING`",
              "short" => "A link to this set object on Scryfall's API",
              "format" => "uri",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "set",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/sets",
                  "segments" => [
                    {
                      "lit" => "sets",
                    },
                  ],
                  "parts" => [
                    "sets",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/sets/{code}",
                  "segments" => [
                    {
                      "lit" => "sets",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "sets",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "code" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "code",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "m19",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/sets/{id}",
                  "segments" => [
                    {
                      "lit" => "sets",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "sets",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
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
