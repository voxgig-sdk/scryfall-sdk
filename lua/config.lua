-- Scryfall SDK configuration

local function make_config()
  return {
    main = {
      name = "Scryfall",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://api.scryfall.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["bulk_data"] = {},
        ["card"] = {},
        ["card_list"] = {},
        ["card_symbol_list"] = {},
        ["catalog"] = {},
        ["mana_cost"] = {},
        ["migration"] = {},
        ["ruling"] = {},
        ["set"] = {},
      },
    },
    entity = {
      ["bulk_data"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "content_encoding",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "content_type",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "description",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "download_uri",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "name",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "object",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 6,
          },
          {
            ["active"] = true,
            ["name"] = "size",
            ["req"] = false,
            ["type"] = "`$INTEGER`",
            ["index$"] = 7,
          },
          {
            ["active"] = true,
            ["name"] = "type",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 8,
          },
          {
            ["active"] = true,
            ["name"] = "updated_at",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 9,
          },
        },
        ["name"] = "bulk_data",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {},
                ["method"] = "GET",
                ["orig"] = "/bulk-data",
                ["parts"] = {
                  "bulk-data",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "list",
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/bulk-data/{id}",
                ["parts"] = {
                  "bulk-data",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["card"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "artist",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "cmc",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "collector_number",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "color",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "color_identity",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "image_uri",
            ["req"] = false,
            ["type"] = "`$OBJECT`",
            ["index$"] = 6,
          },
          {
            ["active"] = true,
            ["name"] = "lang",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 7,
          },
          {
            ["active"] = true,
            ["name"] = "layout",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 8,
          },
          {
            ["active"] = true,
            ["name"] = "legality",
            ["req"] = false,
            ["type"] = "`$OBJECT`",
            ["index$"] = 9,
          },
          {
            ["active"] = true,
            ["name"] = "loyalty",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 10,
          },
          {
            ["active"] = true,
            ["name"] = "mana_cost",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 11,
          },
          {
            ["active"] = true,
            ["name"] = "name",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 12,
          },
          {
            ["active"] = true,
            ["name"] = "oracle_id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 13,
          },
          {
            ["active"] = true,
            ["name"] = "oracle_text",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 14,
          },
          {
            ["active"] = true,
            ["name"] = "power",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 15,
          },
          {
            ["active"] = true,
            ["name"] = "price",
            ["req"] = false,
            ["type"] = "`$OBJECT`",
            ["index$"] = 16,
          },
          {
            ["active"] = true,
            ["name"] = "rarity",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 17,
          },
          {
            ["active"] = true,
            ["name"] = "released_at",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 18,
          },
          {
            ["active"] = true,
            ["name"] = "scryfall_uri",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 19,
          },
          {
            ["active"] = true,
            ["name"] = "set",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 20,
          },
          {
            ["active"] = true,
            ["name"] = "set_name",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 21,
          },
          {
            ["active"] = true,
            ["name"] = "toughness",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 22,
          },
          {
            ["active"] = true,
            ["name"] = "type_line",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 23,
          },
          {
            ["active"] = true,
            ["name"] = "uri",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 24,
          },
        },
        ["name"] = "card",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["example"] = "Lightning Bolt",
                      ["kind"] = "query",
                      ["name"] = "exact",
                      ["orig"] = "exact",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = "aust com",
                      ["kind"] = "query",
                      ["name"] = "fuzzy",
                      ["orig"] = "fuzzy",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = "m19",
                      ["kind"] = "query",
                      ["name"] = "set",
                      ["orig"] = "set",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/cards/named",
                ["parts"] = {
                  "cards",
                  "named",
                },
                ["select"] = {
                  ["$action"] = "named",
                  ["exist"] = {
                    "exact",
                    "fuzzy",
                    "set",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/cards/random",
                ["parts"] = {
                  "cards",
                  "random",
                },
                ["select"] = {
                  ["$action"] = "random",
                  ["exist"] = {
                    "q",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 1,
              },
            },
            ["key$"] = "list",
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["example"] = "683a5707-cddb-494d-9b41-51b4584ded69",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/cards/{id}",
                ["parts"] = {
                  "cards",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["card_list"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "artist",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "cmc",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "collector_number",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "color",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "color_identity",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "data",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "has_more",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 6,
          },
          {
            ["active"] = true,
            ["name"] = "id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 7,
          },
          {
            ["active"] = true,
            ["name"] = "identifier",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["index$"] = 8,
          },
          {
            ["active"] = true,
            ["name"] = "image_uri",
            ["req"] = false,
            ["type"] = "`$OBJECT`",
            ["index$"] = 9,
          },
          {
            ["active"] = true,
            ["name"] = "lang",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 10,
          },
          {
            ["active"] = true,
            ["name"] = "layout",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 11,
          },
          {
            ["active"] = true,
            ["name"] = "legality",
            ["req"] = false,
            ["type"] = "`$OBJECT`",
            ["index$"] = 12,
          },
          {
            ["active"] = true,
            ["name"] = "loyalty",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 13,
          },
          {
            ["active"] = true,
            ["name"] = "mana_cost",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 14,
          },
          {
            ["active"] = true,
            ["name"] = "name",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 15,
          },
          {
            ["active"] = true,
            ["name"] = "next_page",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 16,
          },
          {
            ["active"] = true,
            ["name"] = "object",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 17,
          },
          {
            ["active"] = true,
            ["name"] = "oracle_id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 18,
          },
          {
            ["active"] = true,
            ["name"] = "oracle_text",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 19,
          },
          {
            ["active"] = true,
            ["name"] = "power",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 20,
          },
          {
            ["active"] = true,
            ["name"] = "price",
            ["req"] = false,
            ["type"] = "`$OBJECT`",
            ["index$"] = 21,
          },
          {
            ["active"] = true,
            ["name"] = "rarity",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 22,
          },
          {
            ["active"] = true,
            ["name"] = "released_at",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 23,
          },
          {
            ["active"] = true,
            ["name"] = "scryfall_uri",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 24,
          },
          {
            ["active"] = true,
            ["name"] = "set",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 25,
          },
          {
            ["active"] = true,
            ["name"] = "set_name",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 26,
          },
          {
            ["active"] = true,
            ["name"] = "total_card",
            ["req"] = false,
            ["type"] = "`$INTEGER`",
            ["index$"] = 27,
          },
          {
            ["active"] = true,
            ["name"] = "toughness",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 28,
          },
          {
            ["active"] = true,
            ["name"] = "type_line",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 29,
          },
          {
            ["active"] = true,
            ["name"] = "uri",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 30,
          },
        },
        ["name"] = "card_list",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {},
                ["method"] = "POST",
                ["orig"] = "/cards/collection",
                ["parts"] = {
                  "cards",
                  "collection",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "create",
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["example"] = "auto",
                      ["kind"] = "query",
                      ["name"] = "dir",
                      ["orig"] = "dir",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = false,
                      ["kind"] = "query",
                      ["name"] = "include_extra",
                      ["orig"] = "include_extra",
                      ["reqd"] = false,
                      ["type"] = "`$BOOLEAN`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = "name",
                      ["kind"] = "query",
                      ["name"] = "order",
                      ["orig"] = "order",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["reqd"] = false,
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = "c:red pow:3",
                      ["kind"] = "query",
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = "cards",
                      ["kind"] = "query",
                      ["name"] = "unique",
                      ["orig"] = "unique",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/cards/search",
                ["parts"] = {
                  "cards",
                  "search",
                },
                ["select"] = {
                  ["exist"] = {
                    "dir",
                    "include_extra",
                    "order",
                    "page",
                    "q",
                    "unique",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "list",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["card_symbol_list"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "appears_in_mana_cost",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "cmc",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "color",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "english",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "funny",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "loose_variant",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "object",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 6,
          },
          {
            ["active"] = true,
            ["name"] = "represents_mana",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 7,
          },
          {
            ["active"] = true,
            ["name"] = "svg_uri",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 8,
          },
          {
            ["active"] = true,
            ["name"] = "symbol",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 9,
          },
          {
            ["active"] = true,
            ["name"] = "transposable",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 10,
          },
        },
        ["name"] = "card_symbol_list",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {},
                ["method"] = "GET",
                ["orig"] = "/symbology",
                ["parts"] = {
                  "symbology",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "list",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["catalog"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "data",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "object",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "total_value",
            ["req"] = false,
            ["type"] = "`$INTEGER`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "uri",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 3,
          },
        },
        ["name"] = "catalog",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "catalog_name",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/catalog/{catalog_name}",
                ["parts"] = {
                  "catalog",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["catalog_name"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["mana_cost"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "cmc",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "color",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "colorless",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "cost",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "monocolored",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "multicolored",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "object",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 6,
          },
        },
        ["name"] = "mana_cost",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["example"] = "{2}{U}{U}",
                      ["kind"] = "query",
                      ["name"] = "cost",
                      ["orig"] = "cost",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/symbology/parse-mana",
                ["parts"] = {
                  "symbology",
                  "parse-mana",
                },
                ["select"] = {
                  ["exist"] = {
                    "cost",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "list",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["migration"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "migration_strategy",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "new_scryfall_id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "object",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "old_scryfall_id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "performed_at",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "uri",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 6,
          },
        },
        ["name"] = "migration",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["reqd"] = false,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/migrations",
                ["parts"] = {
                  "migrations",
                },
                ["select"] = {
                  ["exist"] = {
                    "page",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "list",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["ruling"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "comment",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "object",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "oracle_id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "published_at",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "source",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 4,
          },
        },
        ["name"] = "ruling",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "card_id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/cards/{id}/rulings",
                ["parts"] = {
                  "cards",
                  "{card_id}",
                  "rulings",
                },
                ["rename"] = {
                  ["param"] = {
                    ["id"] = "card_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "card_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "list",
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "card",
            },
          },
        },
      },
      ["set"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "card_count",
            ["req"] = false,
            ["type"] = "`$INTEGER`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "code",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "digital",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "icon_svg_uri",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "name",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "released_at",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 6,
          },
          {
            ["active"] = true,
            ["name"] = "scryfall_uri",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 7,
          },
          {
            ["active"] = true,
            ["name"] = "search_uri",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 8,
          },
          {
            ["active"] = true,
            ["name"] = "set_type",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 9,
          },
          {
            ["active"] = true,
            ["name"] = "uri",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 10,
          },
        },
        ["name"] = "set",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {},
                ["method"] = "GET",
                ["orig"] = "/sets",
                ["parts"] = {
                  "sets",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "list",
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["example"] = "m19",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "code",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/sets/{code}",
                ["parts"] = {
                  "sets",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["code"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/sets/{id}",
                ["parts"] = {
                  "sets",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 1,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
