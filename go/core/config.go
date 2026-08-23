package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Scryfall",
			"slug": "scryfall",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.scryfall.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"bulk_data": map[string]any{},
				"card": map[string]any{},
				"card_list": map[string]any{},
				"card_symbol_list": map[string]any{},
				"catalog": map[string]any{},
				"mana_cost": map[string]any{},
				"migration": map[string]any{},
				"ruling": map[string]any{},
				"set": map[string]any{},
			},
		},
		"entity": map[string]any{
			"bulk_data": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "content_encoding",
						"short": "The Content-Encoding encoding for this file",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "content_type",
						"short": "The MIME type of this file",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "A human-readable description for this file",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "download_uri",
						"short": "The URI that hosts this bulk file",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "A unique ID for this bulk data file",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "A human-readable name for this file",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "object",
						"short": "The object type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "size",
						"short": "The size of this file in bytes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "type",
						"short": "The type of bulk data",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updated_at",
						"short": "The time this file was last updated",
						"type": "`$STRING`",
					},
				},
				"name": "bulk_data",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/bulk-data",
								"parts": []any{
									"bulk-data",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/bulk-data/{id}",
								"parts": []any{
									"bulk-data",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"card": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "artist",
						"short": "The name of the illustrator of this card",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cmc",
						"short": "The card's converted mana cost",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "collector_number",
						"short": "This card's collector number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "color_identity",
						"short": "This card's color identity",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "colors",
						"short": "This card's colors",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"short": "A unique ID for this card in Scryfall's database",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "image_uris",
						"short": "An object containing URIs to this card's imagery",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "lang",
						"short": "The language code for this printing",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "layout",
						"short": "A code for this card's layout",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "legalities",
						"short": "An object describing the legality of this card",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "loyalty",
						"short": "This card's loyalty (for planeswalkers)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mana_cost",
						"short": "The mana cost for this card",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "The name of this card",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "oracle_id",
						"short": "A unique ID for this card's oracle identity",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "oracle_text",
						"short": "The Oracle text for this card",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "power",
						"short": "This card's power (for creatures)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "prices",
						"short": "An object containing daily price information for this card",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "rarity",
						"short": "This card's rarity",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "released_at",
						"short": "The date this card was first released",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "scryfall_uri",
						"short": "A link to this card's page on Scryfall's website",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "set",
						"short": "This card's set code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "set_name",
						"short": "This card's full set name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "toughness",
						"short": "This card's toughness (for creatures)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type_line",
						"short": "The type line of this card",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uri",
						"short": "A link to this card object on Scryfall's API",
						"type": "`$STRING`",
					},
				},
				"name": "card",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "Lightning Bolt",
											"kind": "query",
											"name": "exact",
											"orig": "exact",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "aust com",
											"kind": "query",
											"name": "fuzzy",
											"orig": "fuzzy",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "m19",
											"kind": "query",
											"name": "set",
											"orig": "set",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cards/named",
								"parts": []any{
									"cards",
									"named",
								},
								"select": map[string]any{
									"$action": "named",
									"exist": []any{
										"exact",
										"fuzzy",
										"set",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cards/random",
								"parts": []any{
									"cards",
									"random",
								},
								"select": map[string]any{
									"$action": "random",
									"exist": []any{
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "683a5707-cddb-494d-9b41-51b4584ded69",
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cards/{id}",
								"parts": []any{
									"cards",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"card_list": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "artist",
						"short": "The name of the illustrator of this card",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cmc",
						"short": "The card's converted mana cost",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "collector_number",
						"short": "This card's collector number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "color_identity",
						"short": "This card's color identity",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "colors",
						"short": "This card's colors",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "data",
						"short": "An array of the requested objects",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "has_more",
						"short": "True if this list is paginated and has more pages",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"short": "A unique ID for this card in Scryfall's database",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "identifiers",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "image_uris",
						"short": "An object containing URIs to this card's imagery",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "lang",
						"short": "The language code for this printing",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "layout",
						"short": "A code for this card's layout",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "legalities",
						"short": "An object describing the legality of this card",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "loyalty",
						"short": "This card's loyalty (for planeswalkers)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mana_cost",
						"short": "The mana cost for this card",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "The name of this card",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "next_page",
						"short": "The URL for the next page of results",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "object",
						"short": "The object type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "oracle_id",
						"short": "A unique ID for this card's oracle identity",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "oracle_text",
						"short": "The Oracle text for this card",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "power",
						"short": "This card's power (for creatures)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "prices",
						"short": "An object containing daily price information for this card",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "rarity",
						"short": "This card's rarity",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "released_at",
						"short": "The date this card was first released",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "scryfall_uri",
						"short": "A link to this card's page on Scryfall's website",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "set",
						"short": "This card's set code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "set_name",
						"short": "This card's full set name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "total_cards",
						"short": "The total number of cards found",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "toughness",
						"short": "This card's toughness (for creatures)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type_line",
						"short": "The type line of this card",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uri",
						"short": "A link to this card object on Scryfall's API",
						"type": "`$STRING`",
					},
				},
				"name": "card_list",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/cards/collection",
								"parts": []any{
									"cards",
									"collection",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "auto",
											"kind": "query",
											"name": "dir",
											"orig": "dir",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "include_extra",
											"orig": "include_extra",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": "name",
											"kind": "query",
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "c:red pow:3",
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "cards",
											"kind": "query",
											"name": "unique",
											"orig": "unique",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cards/search",
								"parts": []any{
									"cards",
									"search",
								},
								"select": map[string]any{
									"exist": []any{
										"dir",
										"include_extra",
										"order",
										"page",
										"q",
										"unique",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"card_symbol_list": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "appears_in_mana_costs",
						"short": "True if this symbol appears in mana costs",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "cmc",
						"short": "The converted mana cost represented by this symbol",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "colors",
						"short": "The colors of this symbol",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "english",
						"short": "An English textual description of the symbol",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "funny",
						"short": "True if this symbol is only used on funny cards",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "loose_variant",
						"short": "An alternate version of this symbol",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "object",
						"short": "The object type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "represents_mana",
						"short": "True if this is a mana symbol",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "svg_uri",
						"short": "A URI to an SVG image for this symbol",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "symbol",
						"short": "The plaintext symbol",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "transposable",
						"short": "True if it's possible to write this symbol backwards",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "card_symbol_list",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/symbology",
								"parts": []any{
									"symbology",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"catalog": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"short": "An array of datapoints",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "object",
						"short": "The object type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "total_values",
						"short": "The number of items in the data array",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "uri",
						"short": "A link to this catalog on Scryfall's API",
						"type": "`$STRING`",
					},
				},
				"name": "catalog",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "catalog_name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/catalog/{catalog_name}",
								"parts": []any{
									"catalog",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"catalog_name": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"mana_cost": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cmc",
						"short": "The converted mana cost",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "colorless",
						"short": "True if this mana cost is colorless",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "colors",
						"short": "The colors in this mana cost",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "cost",
						"short": "The normalized cost",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "monocolored",
						"short": "True if this mana cost is monocolored",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "multicolored",
						"short": "True if this mana cost is multicolored",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "object",
						"short": "The object type",
						"type": "`$STRING`",
					},
				},
				"name": "mana_cost",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "{2}{U}{U}",
											"kind": "query",
											"name": "cost",
											"orig": "cost",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/symbology/parse-mana",
								"parts": []any{
									"symbology",
									"parse-mana",
								},
								"select": map[string]any{
									"exist": []any{
										"cost",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.colors`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"migration": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"short": "A unique ID for this migration",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "migration_strategy",
						"short": "The type of migration strategy",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "new_scryfall_id",
						"short": "The updated Scryfall ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "object",
						"short": "The object type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "old_scryfall_id",
						"short": "The original Scryfall ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "performed_at",
						"short": "The date this migration was performed",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uri",
						"short": "A link to this migration on Scryfall's API",
						"type": "`$STRING`",
					},
				},
				"name": "migration",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/migrations",
								"parts": []any{
									"migrations",
								},
								"select": map[string]any{
									"exist": []any{
										"page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"ruling": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "comment",
						"short": "The text of the ruling",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "object",
						"short": "The object type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "oracle_id",
						"short": "The Oracle ID of the card this ruling applies to",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "published_at",
						"short": "The date this ruling was published",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source",
						"short": "The source of this ruling",
						"type": "`$STRING`",
					},
				},
				"name": "ruling",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "card_id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cards/{id}/rulings",
								"parts": []any{
									"cards",
									"{card_id}",
									"rulings",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "card_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"card_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"card",
						},
					},
				},
			},
			"set": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "card_count",
						"short": "The number of cards in this set",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "code",
						"short": "The unique three to five-letter code for this set",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "digital",
						"short": "True if this set is only available digitally",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "icon_svg_uri",
						"short": "A URI to an SVG file for this set's icon",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "A unique ID for this set",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "The English name of the set",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "released_at",
						"short": "The date the set was released",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "scryfall_uri",
						"short": "A link to this set's page on Scryfall's website",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "search_uri",
						"short": "A link to search for cards in this set on Scryfall's API",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "set_type",
						"short": "The type of set",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uri",
						"short": "A link to this set object on Scryfall's API",
						"type": "`$STRING`",
					},
				},
				"name": "set",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/sets",
								"parts": []any{
									"sets",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "m19",
											"kind": "param",
											"name": "id",
											"orig": "code",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/sets/{code}",
								"parts": []any{
									"sets",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"code": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/sets/{id}",
								"parts": []any{
									"sets",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
