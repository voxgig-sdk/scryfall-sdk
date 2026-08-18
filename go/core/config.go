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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "content_type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "download_uri",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "object",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "size",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updated_at",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cmc",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "collector_number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "color_identity",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "colors",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "image_uris",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "lang",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "layout",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "legalities",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "loyalty",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mana_cost",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "oracle_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "oracle_text",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "power",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "prices",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "rarity",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "released_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "scryfall_uri",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "set",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "set_name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "toughness",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type_line",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uri",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cmc",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "collector_number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "color_identity",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "colors",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "has_more",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "identifiers",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "image_uris",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "lang",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "layout",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "legalities",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "loyalty",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mana_cost",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "next_page",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "object",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "oracle_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "oracle_text",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "power",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "prices",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "rarity",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "released_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "scryfall_uri",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "set",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "set_name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "total_cards",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "toughness",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type_line",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uri",
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
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "cmc",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "colors",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "english",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "funny",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "loose_variant",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "object",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "represents_mana",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "svg_uri",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "symbol",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "transposable",
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
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "object",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "total_values",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "uri",
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
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "colorless",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "colors",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "cost",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "monocolored",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "multicolored",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "object",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "migration_strategy",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "new_scryfall_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "object",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "old_scryfall_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "performed_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uri",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "object",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "oracle_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "published_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source",
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
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "digital",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "icon_svg_uri",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "released_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "scryfall_uri",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "search_uri",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "set_type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uri",
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
