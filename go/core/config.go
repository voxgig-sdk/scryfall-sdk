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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
				"card_symbol": map[string]any{},
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
						"title": "Content Encoding",
						"type": "`$STRING`",
						"short": "The Content-Encoding encoding for this file",
					},
					map[string]any{
						"name": "content_type",
						"title": "Content Type",
						"type": "`$STRING`",
						"short": "The MIME type of this file",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "A human-readable description for this file",
					},
					map[string]any{
						"name": "download_uri",
						"title": "Download Uri",
						"type": "`$STRING`",
						"short": "The URI that hosts this bulk file",
						"format": "uri",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "A unique ID for this bulk data file",
						"format": "uuid",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "A human-readable name for this file",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"short": "The object type",
					},
					map[string]any{
						"name": "size",
						"title": "Size",
						"type": "`$INTEGER`",
						"short": "The size of this file in bytes",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "The type of bulk data",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"short": "The time this file was last updated",
						"format": "date-time",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "bulk_data",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/bulk-data",
								"segments": []any{
									map[string]any{
										"lit": "bulk-data",
									},
								},
								"parts": []any{
									"bulk-data",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/bulk-data/{id}",
								"segments": []any{
									map[string]any{
										"lit": "bulk-data",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"bulk-data",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Artist",
						"type": "`$STRING`",
						"short": "The name of the illustrator of this card",
					},
					map[string]any{
						"name": "cmc",
						"title": "Cmc",
						"type": "`$NUMBER`",
						"short": "The card's converted mana cost",
					},
					map[string]any{
						"name": "collector_number",
						"title": "Collector Number",
						"type": "`$STRING`",
						"short": "This card's collector number",
					},
					map[string]any{
						"name": "color_identity",
						"title": "Color Identity",
						"type": "`$ARRAY`",
						"short": "This card's color identity",
					},
					map[string]any{
						"name": "colors",
						"title": "Colors",
						"type": "`$ARRAY`",
						"short": "This card's colors",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "A unique ID for this card in Scryfall's database",
						"format": "uuid",
					},
					map[string]any{
						"name": "image_uris",
						"title": "Image Uris",
						"type": "`$OBJECT`",
						"short": "An object containing URIs to this card's imagery",
					},
					map[string]any{
						"name": "lang",
						"title": "Lang",
						"type": "`$STRING`",
						"short": "The language code for this printing",
					},
					map[string]any{
						"name": "layout",
						"title": "Layout",
						"type": "`$STRING`",
						"short": "A code for this card's layout",
					},
					map[string]any{
						"name": "legalities",
						"title": "Legalities",
						"type": "`$OBJECT`",
						"short": "An object describing the legality of this card",
					},
					map[string]any{
						"name": "loyalty",
						"title": "Loyalty",
						"type": "`$STRING`",
						"short": "This card's loyalty (for planeswalkers)",
					},
					map[string]any{
						"name": "mana_cost",
						"title": "Mana Cost",
						"type": "`$STRING`",
						"short": "The mana cost for this card",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The name of this card",
					},
					map[string]any{
						"name": "oracle_id",
						"title": "Oracle Id",
						"type": "`$STRING`",
						"short": "A unique ID for this card's oracle identity",
						"format": "uuid",
					},
					map[string]any{
						"name": "oracle_text",
						"title": "Oracle Text",
						"type": "`$STRING`",
						"short": "The Oracle text for this card",
					},
					map[string]any{
						"name": "power",
						"title": "Power",
						"type": "`$STRING`",
						"short": "This card's power (for creatures)",
					},
					map[string]any{
						"name": "prices",
						"title": "Prices",
						"type": "`$OBJECT`",
						"short": "An object containing daily price information for this card",
					},
					map[string]any{
						"name": "rarity",
						"title": "Rarity",
						"type": "`$STRING`",
						"short": "This card's rarity",
					},
					map[string]any{
						"name": "released_at",
						"title": "Released At",
						"type": "`$STRING`",
						"short": "The date this card was first released",
						"format": "date",
					},
					map[string]any{
						"name": "scryfall_uri",
						"title": "Scryfall Uri",
						"type": "`$STRING`",
						"short": "A link to this card's page on Scryfall's website",
						"format": "uri",
					},
					map[string]any{
						"name": "set",
						"title": "Set",
						"type": "`$STRING`",
						"short": "This card's set code",
					},
					map[string]any{
						"name": "set_name",
						"title": "Set Name",
						"type": "`$STRING`",
						"short": "This card's full set name",
					},
					map[string]any{
						"name": "toughness",
						"title": "Toughness",
						"type": "`$STRING`",
						"short": "This card's toughness (for creatures)",
					},
					map[string]any{
						"name": "type_line",
						"title": "Type Line",
						"type": "`$STRING`",
						"short": "The type line of this card",
					},
					map[string]any{
						"name": "uri",
						"title": "Uri",
						"type": "`$STRING`",
						"short": "A link to this card object on Scryfall's API",
						"format": "uri",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "card",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/cards/named",
								"segments": []any{
									map[string]any{
										"lit": "cards",
									},
									map[string]any{
										"lit": "named",
									},
								},
								"parts": []any{
									"cards",
									"named",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "exact",
											"orig": "exact",
											"type": "`$STRING`",
											"kind": "query",
											"example": "Lightning Bolt",
										},
										map[string]any{
											"name": "fuzzy",
											"orig": "fuzzy",
											"type": "`$STRING`",
											"kind": "query",
											"example": "aust com",
										},
										map[string]any{
											"name": "set",
											"orig": "set",
											"type": "`$STRING`",
											"kind": "query",
											"example": "m19",
										},
									},
								},
								"select": map[string]any{
									"$action": "named",
									"exist": []any{
										"exact",
										"fuzzy",
										"set",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/cards/random",
								"segments": []any{
									map[string]any{
										"lit": "cards",
									},
									map[string]any{
										"lit": "random",
									},
								},
								"parts": []any{
									"cards",
									"random",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "random",
									"exist": []any{
										"q",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/cards/{id}",
								"segments": []any{
									map[string]any{
										"lit": "cards",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"cards",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "683a5707-cddb-494d-9b41-51b4584ded69",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Artist",
						"type": "`$STRING`",
						"short": "The name of the illustrator of this card",
					},
					map[string]any{
						"name": "cmc",
						"title": "Cmc",
						"type": "`$NUMBER`",
						"short": "The card's converted mana cost",
					},
					map[string]any{
						"name": "collector_number",
						"title": "Collector Number",
						"type": "`$STRING`",
						"short": "This card's collector number",
					},
					map[string]any{
						"name": "color_identity",
						"title": "Color Identity",
						"type": "`$ARRAY`",
						"short": "This card's color identity",
					},
					map[string]any{
						"name": "colors",
						"title": "Colors",
						"type": "`$ARRAY`",
						"short": "This card's colors",
					},
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$ARRAY`",
						"short": "An array of the requested objects",
					},
					map[string]any{
						"name": "has_more",
						"title": "Has More",
						"type": "`$BOOLEAN`",
						"short": "True if this list is paginated and has more pages",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "A unique ID for this card in Scryfall's database",
						"format": "uuid",
					},
					map[string]any{
						"name": "identifiers",
						"title": "Identifiers",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "image_uris",
						"title": "Image Uris",
						"type": "`$OBJECT`",
						"short": "An object containing URIs to this card's imagery",
					},
					map[string]any{
						"name": "lang",
						"title": "Lang",
						"type": "`$STRING`",
						"short": "The language code for this printing",
					},
					map[string]any{
						"name": "layout",
						"title": "Layout",
						"type": "`$STRING`",
						"short": "A code for this card's layout",
					},
					map[string]any{
						"name": "legalities",
						"title": "Legalities",
						"type": "`$OBJECT`",
						"short": "An object describing the legality of this card",
					},
					map[string]any{
						"name": "loyalty",
						"title": "Loyalty",
						"type": "`$STRING`",
						"short": "This card's loyalty (for planeswalkers)",
					},
					map[string]any{
						"name": "mana_cost",
						"title": "Mana Cost",
						"type": "`$STRING`",
						"short": "The mana cost for this card",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The name of this card",
					},
					map[string]any{
						"name": "next_page",
						"title": "Next Page",
						"type": "`$STRING`",
						"short": "The URL for the next page of results",
						"format": "uri",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"short": "The object type",
					},
					map[string]any{
						"name": "oracle_id",
						"title": "Oracle Id",
						"type": "`$STRING`",
						"short": "A unique ID for this card's oracle identity",
						"format": "uuid",
					},
					map[string]any{
						"name": "oracle_text",
						"title": "Oracle Text",
						"type": "`$STRING`",
						"short": "The Oracle text for this card",
					},
					map[string]any{
						"name": "power",
						"title": "Power",
						"type": "`$STRING`",
						"short": "This card's power (for creatures)",
					},
					map[string]any{
						"name": "prices",
						"title": "Prices",
						"type": "`$OBJECT`",
						"short": "An object containing daily price information for this card",
					},
					map[string]any{
						"name": "rarity",
						"title": "Rarity",
						"type": "`$STRING`",
						"short": "This card's rarity",
					},
					map[string]any{
						"name": "released_at",
						"title": "Released At",
						"type": "`$STRING`",
						"short": "The date this card was first released",
						"format": "date",
					},
					map[string]any{
						"name": "scryfall_uri",
						"title": "Scryfall Uri",
						"type": "`$STRING`",
						"short": "A link to this card's page on Scryfall's website",
						"format": "uri",
					},
					map[string]any{
						"name": "set",
						"title": "Set",
						"type": "`$STRING`",
						"short": "This card's set code",
					},
					map[string]any{
						"name": "set_name",
						"title": "Set Name",
						"type": "`$STRING`",
						"short": "This card's full set name",
					},
					map[string]any{
						"name": "total_cards",
						"title": "Total Cards",
						"type": "`$INTEGER`",
						"short": "The total number of cards found",
					},
					map[string]any{
						"name": "toughness",
						"title": "Toughness",
						"type": "`$STRING`",
						"short": "This card's toughness (for creatures)",
					},
					map[string]any{
						"name": "type_line",
						"title": "Type Line",
						"type": "`$STRING`",
						"short": "The type line of this card",
					},
					map[string]any{
						"name": "uri",
						"title": "Uri",
						"type": "`$STRING`",
						"short": "A link to this card object on Scryfall's API",
						"format": "uri",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "card_list",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/cards/collection",
								"segments": []any{
									map[string]any{
										"lit": "cards",
									},
									map[string]any{
										"lit": "collection",
									},
								},
								"parts": []any{
									"cards",
									"collection",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/cards/search",
								"segments": []any{
									map[string]any{
										"lit": "cards",
									},
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"cards",
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "dir",
											"orig": "dir",
											"type": "`$STRING`",
											"kind": "query",
											"example": "auto",
										},
										map[string]any{
											"name": "include_extra",
											"orig": "include_extra",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
										map[string]any{
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
											"kind": "query",
											"example": "name",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "c:red pow:3",
										},
										map[string]any{
											"name": "unique",
											"orig": "unique",
											"type": "`$STRING`",
											"kind": "query",
											"example": "cards",
										},
									},
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
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"card_symbol": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "appears_in_mana_costs",
						"title": "Appears In Mana Costs",
						"type": "`$BOOLEAN`",
						"short": "True if this symbol appears in mana costs",
					},
					map[string]any{
						"name": "cmc",
						"title": "Cmc",
						"type": "`$NUMBER`",
						"short": "The converted mana cost represented by this symbol",
					},
					map[string]any{
						"name": "colors",
						"title": "Colors",
						"type": "`$ARRAY`",
						"short": "The colors of this symbol",
					},
					map[string]any{
						"name": "english",
						"title": "English",
						"type": "`$STRING`",
						"short": "An English textual description of the symbol",
					},
					map[string]any{
						"name": "funny",
						"title": "Funny",
						"type": "`$BOOLEAN`",
						"short": "True if this symbol is only used on funny cards",
					},
					map[string]any{
						"name": "loose_variant",
						"title": "Loose Variant",
						"type": "`$STRING`",
						"short": "An alternate version of this symbol",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"short": "The object type",
					},
					map[string]any{
						"name": "represents_mana",
						"title": "Represents Mana",
						"type": "`$BOOLEAN`",
						"short": "True if this is a mana symbol",
					},
					map[string]any{
						"name": "svg_uri",
						"title": "Svg Uri",
						"type": "`$STRING`",
						"short": "A URI to an SVG image for this symbol",
						"format": "uri",
					},
					map[string]any{
						"name": "symbol",
						"title": "Symbol",
						"type": "`$STRING`",
						"short": "The plaintext symbol",
					},
					map[string]any{
						"name": "transposable",
						"title": "Transposable",
						"type": "`$BOOLEAN`",
						"short": "True if it's possible to write this symbol backwards",
					},
				},
				"name": "card_symbol",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/symbology",
								"segments": []any{
									map[string]any{
										"lit": "symbology",
									},
								},
								"parts": []any{
									"symbology",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Data",
						"type": "`$ARRAY`",
						"short": "An array of datapoints",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"short": "The object type",
					},
					map[string]any{
						"name": "total_values",
						"title": "Total Values",
						"type": "`$INTEGER`",
						"short": "The number of items in the data array",
					},
					map[string]any{
						"name": "uri",
						"title": "Uri",
						"type": "`$STRING`",
						"short": "A link to this catalog on Scryfall's API",
						"format": "uri",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "catalog",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/catalog/{catalog_name}",
								"segments": []any{
									map[string]any{
										"lit": "catalog",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"catalog",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"catalog_name": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "catalog_name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Cmc",
						"type": "`$NUMBER`",
						"short": "The converted mana cost",
					},
					map[string]any{
						"name": "colorless",
						"title": "Colorless",
						"type": "`$BOOLEAN`",
						"short": "True if this mana cost is colorless",
					},
					map[string]any{
						"name": "colors",
						"title": "Colors",
						"type": "`$ARRAY`",
						"short": "The colors in this mana cost",
					},
					map[string]any{
						"name": "cost",
						"title": "Cost",
						"type": "`$STRING`",
						"short": "The normalized cost",
					},
					map[string]any{
						"name": "monocolored",
						"title": "Monocolored",
						"type": "`$BOOLEAN`",
						"short": "True if this mana cost is monocolored",
					},
					map[string]any{
						"name": "multicolored",
						"title": "Multicolored",
						"type": "`$BOOLEAN`",
						"short": "True if this mana cost is multicolored",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"short": "The object type",
					},
				},
				"name": "mana_cost",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/symbology/parse-mana",
								"segments": []any{
									map[string]any{
										"lit": "symbology",
									},
									map[string]any{
										"lit": "parse-mana",
									},
								},
								"parts": []any{
									"symbology",
									"parse-mana",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.colors`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cost",
											"orig": "cost",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "{2}{U}{U}",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cost",
									},
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
						"title": "Id",
						"type": "`$STRING`",
						"short": "A unique ID for this migration",
						"format": "uuid",
					},
					map[string]any{
						"name": "migration_strategy",
						"title": "Migration Strategy",
						"type": "`$STRING`",
						"short": "The type of migration strategy",
					},
					map[string]any{
						"name": "new_scryfall_id",
						"title": "New Scryfall Id",
						"type": "`$STRING`",
						"short": "The updated Scryfall ID",
						"format": "uuid",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"short": "The object type",
					},
					map[string]any{
						"name": "old_scryfall_id",
						"title": "Old Scryfall Id",
						"type": "`$STRING`",
						"short": "The original Scryfall ID",
						"format": "uuid",
					},
					map[string]any{
						"name": "performed_at",
						"title": "Performed At",
						"type": "`$STRING`",
						"short": "The date this migration was performed",
						"format": "date-time",
					},
					map[string]any{
						"name": "uri",
						"title": "Uri",
						"type": "`$STRING`",
						"short": "A link to this migration on Scryfall's API",
						"format": "uri",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "migration",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/migrations",
								"segments": []any{
									map[string]any{
										"lit": "migrations",
									},
								},
								"parts": []any{
									"migrations",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page",
									},
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
						"title": "Comment",
						"type": "`$STRING`",
						"short": "The text of the ruling",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"short": "The object type",
					},
					map[string]any{
						"name": "oracle_id",
						"title": "Oracle Id",
						"type": "`$STRING`",
						"short": "The Oracle ID of the card this ruling applies to",
						"format": "uuid",
					},
					map[string]any{
						"name": "published_at",
						"title": "Published At",
						"type": "`$STRING`",
						"short": "The date this ruling was published",
						"format": "date",
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$STRING`",
						"short": "The source of this ruling",
					},
				},
				"name": "ruling",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/cards/{id}/rulings",
								"segments": []any{
									map[string]any{
										"lit": "cards",
									},
									map[string]any{
										"var": "card_id",
									},
									map[string]any{
										"lit": "rulings",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "card_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"card_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.card",
						},
					},
				},
			},
			"set": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "card_count",
						"title": "Card Count",
						"type": "`$INTEGER`",
						"short": "The number of cards in this set",
					},
					map[string]any{
						"name": "code",
						"title": "Code",
						"type": "`$STRING`",
						"short": "The unique three to five-letter code for this set",
					},
					map[string]any{
						"name": "digital",
						"title": "Digital",
						"type": "`$BOOLEAN`",
						"short": "True if this set is only available digitally",
					},
					map[string]any{
						"name": "icon_svg_uri",
						"title": "Icon Svg Uri",
						"type": "`$STRING`",
						"short": "A URI to an SVG file for this set's icon",
						"format": "uri",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "A unique ID for this set",
						"format": "uuid",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The English name of the set",
					},
					map[string]any{
						"name": "released_at",
						"title": "Released At",
						"type": "`$STRING`",
						"short": "The date the set was released",
						"format": "date",
					},
					map[string]any{
						"name": "scryfall_uri",
						"title": "Scryfall Uri",
						"type": "`$STRING`",
						"short": "A link to this set's page on Scryfall's website",
						"format": "uri",
					},
					map[string]any{
						"name": "search_uri",
						"title": "Search Uri",
						"type": "`$STRING`",
						"short": "A link to search for cards in this set on Scryfall's API",
						"format": "uri",
					},
					map[string]any{
						"name": "set_type",
						"title": "Set Type",
						"type": "`$STRING`",
						"short": "The type of set",
					},
					map[string]any{
						"name": "uri",
						"title": "Uri",
						"type": "`$STRING`",
						"short": "A link to this set object on Scryfall's API",
						"format": "uri",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "set",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/sets",
								"segments": []any{
									map[string]any{
										"lit": "sets",
									},
								},
								"parts": []any{
									"sets",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/sets/{code}",
								"segments": []any{
									map[string]any{
										"lit": "sets",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"sets",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"code": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "code",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "m19",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/sets/{id}",
								"segments": []any{
									map[string]any{
										"lit": "sets",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"sets",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
