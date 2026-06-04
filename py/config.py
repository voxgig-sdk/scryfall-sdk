# Scryfall SDK configuration


def make_config():
    return {
        "main": {
            "name": "Scryfall",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.scryfall.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "bulk_data": {},
                "card": {},
                "card_list": {},
                "card_symbol_list": {},
                "catalog": {},
                "mana_cost": {},
                "migration": {},
                "ruling": {},
                "set": {},
            },
        },
        "entity": {
      "bulk_data": {
        "fields": [
          {
            "name": "content_encoding",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "content_type",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "description",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "download_uri",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "object",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "size",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "type",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 8,
          },
          {
            "name": "updated_at",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 9,
          },
        ],
        "name": "bulk_data",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "method": "GET",
                "orig": "/bulk-data",
                "parts": [
                  "bulk-data",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/bulk-data/{id}",
                "parts": [
                  "bulk-data",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "card": {
        "fields": [
          {
            "name": "artist",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "cmc",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "collector_number",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "color",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "color_identity",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "image_uri",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "lang",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "layout",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 8,
          },
          {
            "name": "legality",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 9,
          },
          {
            "name": "loyalty",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 10,
          },
          {
            "name": "mana_cost",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 11,
          },
          {
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 12,
          },
          {
            "name": "oracle_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 13,
          },
          {
            "name": "oracle_text",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 14,
          },
          {
            "name": "power",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 15,
          },
          {
            "name": "price",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 16,
          },
          {
            "name": "rarity",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 17,
          },
          {
            "name": "released_at",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 18,
          },
          {
            "name": "scryfall_uri",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 19,
          },
          {
            "name": "set",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 20,
          },
          {
            "name": "set_name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 21,
          },
          {
            "name": "toughness",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 22,
          },
          {
            "name": "type_line",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 23,
          },
          {
            "name": "uri",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 24,
          },
        ],
        "name": "card",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "Lightning Bolt",
                      "kind": "query",
                      "name": "exact",
                      "orig": "exact",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "aust com",
                      "kind": "query",
                      "name": "fuzzy",
                      "orig": "fuzzy",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "m19",
                      "kind": "query",
                      "name": "set",
                      "orig": "set",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/cards/named",
                "parts": [
                  "cards",
                  "named",
                ],
                "select": {
                  "$action": "named",
                  "exist": [
                    "exact",
                    "fuzzy",
                    "set",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/cards/random",
                "parts": [
                  "cards",
                  "random",
                ],
                "select": {
                  "$action": "random",
                  "exist": [
                    "q",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 1,
              },
            ],
            "input": "data",
            "key$": "list",
          },
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "683a5707-cddb-494d-9b41-51b4584ded69",
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/cards/{id}",
                "parts": [
                  "cards",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "card_list": {
        "fields": [
          {
            "name": "artist",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "cmc",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "collector_number",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "color",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "color_identity",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "data",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "has_more",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "identifier",
            "req": True,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 8,
          },
          {
            "name": "image_uri",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 9,
          },
          {
            "name": "lang",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 10,
          },
          {
            "name": "layout",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 11,
          },
          {
            "name": "legality",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 12,
          },
          {
            "name": "loyalty",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 13,
          },
          {
            "name": "mana_cost",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 14,
          },
          {
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 15,
          },
          {
            "name": "next_page",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 16,
          },
          {
            "name": "object",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 17,
          },
          {
            "name": "oracle_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 18,
          },
          {
            "name": "oracle_text",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 19,
          },
          {
            "name": "power",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 20,
          },
          {
            "name": "price",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 21,
          },
          {
            "name": "rarity",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 22,
          },
          {
            "name": "released_at",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 23,
          },
          {
            "name": "scryfall_uri",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 24,
          },
          {
            "name": "set",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 25,
          },
          {
            "name": "set_name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 26,
          },
          {
            "name": "total_card",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 27,
          },
          {
            "name": "toughness",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 28,
          },
          {
            "name": "type_line",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 29,
          },
          {
            "name": "uri",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 30,
          },
        ],
        "name": "card_list",
        "op": {
          "create": {
            "name": "create",
            "points": [
              {
                "method": "POST",
                "orig": "/cards/collection",
                "parts": [
                  "cards",
                  "collection",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "create",
          },
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "auto",
                      "kind": "query",
                      "name": "dir",
                      "orig": "dir",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": False,
                      "kind": "query",
                      "name": "include_extra",
                      "orig": "include_extra",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                      "active": True,
                    },
                    {
                      "example": "name",
                      "kind": "query",
                      "name": "order",
                      "orig": "order",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "example": "c:red pow:3",
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "cards",
                      "kind": "query",
                      "name": "unique",
                      "orig": "unique",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/cards/search",
                "parts": [
                  "cards",
                  "search",
                ],
                "select": {
                  "exist": [
                    "dir",
                    "include_extra",
                    "order",
                    "page",
                    "q",
                    "unique",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "card_symbol_list": {
        "fields": [
          {
            "name": "appears_in_mana_cost",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "cmc",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "color",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "english",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "funny",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "loose_variant",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "object",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "represents_mana",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "svg_uri",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 8,
          },
          {
            "name": "symbol",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 9,
          },
          {
            "name": "transposable",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 10,
          },
        ],
        "name": "card_symbol_list",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "method": "GET",
                "orig": "/symbology",
                "parts": [
                  "symbology",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "catalog": {
        "fields": [
          {
            "name": "data",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "object",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "total_value",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "uri",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
        ],
        "name": "catalog",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "catalog_name",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/catalog/{catalog_name}",
                "parts": [
                  "catalog",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "catalog_name": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "mana_cost": {
        "fields": [
          {
            "name": "cmc",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "color",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "colorless",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "cost",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "monocolored",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "multicolored",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "object",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 6,
          },
        ],
        "name": "mana_cost",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "{2}{U}{U}",
                      "kind": "query",
                      "name": "cost",
                      "orig": "cost",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/symbology/parse-mana",
                "parts": [
                  "symbology",
                  "parse-mana",
                ],
                "select": {
                  "exist": [
                    "cost",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "migration": {
        "fields": [
          {
            "name": "id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "migration_strategy",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "new_scryfall_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "object",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "old_scryfall_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "performed_at",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "uri",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 6,
          },
        ],
        "name": "migration",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/migrations",
                "parts": [
                  "migrations",
                ],
                "select": {
                  "exist": [
                    "page",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "ruling": {
        "fields": [
          {
            "name": "comment",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "object",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "oracle_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "published_at",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "source",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
        ],
        "name": "ruling",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "card_id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/cards/{id}/rulings",
                "parts": [
                  "cards",
                  "{card_id}",
                  "rulings",
                ],
                "rename": {
                  "param": {
                    "id": "card_id",
                  },
                },
                "select": {
                  "exist": [
                    "card_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [
            [
              "card",
            ],
          ],
        },
      },
      "set": {
        "fields": [
          {
            "name": "card_count",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "code",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "digital",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "icon_svg_uri",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "released_at",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "scryfall_uri",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "search_uri",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 8,
          },
          {
            "name": "set_type",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 9,
          },
          {
            "name": "uri",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 10,
          },
        ],
        "name": "set",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "method": "GET",
                "orig": "/sets",
                "parts": [
                  "sets",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "m19",
                      "kind": "param",
                      "name": "id",
                      "orig": "code",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/sets/{code}",
                "parts": [
                  "sets",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "code": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/sets/{id}",
                "parts": [
                  "sets",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 1,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
