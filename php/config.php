<?php
declare(strict_types=1);

// Scryfall SDK configuration

class ScryfallConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Scryfall",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.scryfall.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "bulk_data" => [],
                    "card" => [],
                    "card_list" => [],
                    "card_symbol_list" => [],
                    "catalog" => [],
                    "mana_cost" => [],
                    "migration" => [],
                    "ruling" => [],
                    "set" => [],
                ],
            ],
            "entity" => [
        'bulk_data' => [
          'fields' => [
            [
              'name' => 'content_encoding',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'content_type',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'download_uri',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'object',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'size',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'type',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'updated_at',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'bulk_data',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/bulk-data',
                  'parts' => [
                    'bulk-data',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/bulk-data/{id}',
                  'parts' => [
                    'bulk-data',
                    '{id}',
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'card' => [
          'fields' => [
            [
              'name' => 'artist',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'cmc',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'collector_number',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'color_identity',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'colors',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'image_uris',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'lang',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'layout',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'legalities',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'loyalty',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'mana_cost',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'oracle_id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'oracle_text',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'power',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'prices',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'rarity',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'released_at',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'scryfall_uri',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'set',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'set_name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'toughness',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type_line',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'uri',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'card',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'Lightning Bolt',
                        'kind' => 'query',
                        'name' => 'exact',
                        'orig' => 'exact',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'aust com',
                        'kind' => 'query',
                        'name' => 'fuzzy',
                        'orig' => 'fuzzy',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'm19',
                        'kind' => 'query',
                        'name' => 'set',
                        'orig' => 'set',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cards/named',
                  'parts' => [
                    'cards',
                    'named',
                  ],
                  'select' => [
                    '$action' => 'named',
                    'exist' => [
                      'exact',
                      'fuzzy',
                      'set',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'q',
                        'orig' => 'q',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cards/random',
                  'parts' => [
                    'cards',
                    'random',
                  ],
                  'select' => [
                    '$action' => 'random',
                    'exist' => [
                      'q',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => '683a5707-cddb-494d-9b41-51b4584ded69',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cards/{id}',
                  'parts' => [
                    'cards',
                    '{id}',
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'card_list' => [
          'fields' => [
            [
              'name' => 'artist',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'cmc',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'collector_number',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'color_identity',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'colors',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'data',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'has_more',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'identifiers',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'image_uris',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'lang',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'layout',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'legalities',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'loyalty',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'mana_cost',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'next_page',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'object',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'oracle_id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'oracle_text',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'power',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'prices',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'rarity',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'released_at',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'scryfall_uri',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'set',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'set_name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'total_cards',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'toughness',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type_line',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'uri',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'card_list',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/cards/collection',
                  'parts' => [
                    'cards',
                    'collection',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'auto',
                        'kind' => 'query',
                        'name' => 'dir',
                        'orig' => 'dir',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'include_extra',
                        'orig' => 'include_extra',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 'name',
                        'kind' => 'query',
                        'name' => 'order',
                        'orig' => 'order',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'c:red pow:3',
                        'kind' => 'query',
                        'name' => 'q',
                        'orig' => 'q',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'cards',
                        'kind' => 'query',
                        'name' => 'unique',
                        'orig' => 'unique',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cards/search',
                  'parts' => [
                    'cards',
                    'search',
                  ],
                  'select' => [
                    'exist' => [
                      'dir',
                      'include_extra',
                      'order',
                      'page',
                      'q',
                      'unique',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'card_symbol_list' => [
          'fields' => [
            [
              'name' => 'appears_in_mana_costs',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'cmc',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'colors',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'english',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'funny',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'loose_variant',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'object',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'represents_mana',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'svg_uri',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'symbol',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'transposable',
              'type' => '`$BOOLEAN`',
            ],
          ],
          'name' => 'card_symbol_list',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/symbology',
                  'parts' => [
                    'symbology',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'catalog' => [
          'fields' => [
            [
              'name' => 'data',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'object',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'total_values',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'uri',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'catalog',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'catalog_name',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/catalog/{catalog_name}',
                  'parts' => [
                    'catalog',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'catalog_name' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'mana_cost' => [
          'fields' => [
            [
              'name' => 'cmc',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'colorless',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'colors',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'cost',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'monocolored',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'multicolored',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'object',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'mana_cost',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '{2}{U}{U}',
                        'kind' => 'query',
                        'name' => 'cost',
                        'orig' => 'cost',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/symbology/parse-mana',
                  'parts' => [
                    'symbology',
                    'parse-mana',
                  ],
                  'select' => [
                    'exist' => [
                      'cost',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.colors`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'migration' => [
          'fields' => [
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'migration_strategy',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'new_scryfall_id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'object',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'old_scryfall_id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'performed_at',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'uri',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'migration',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/migrations',
                  'parts' => [
                    'migrations',
                  ],
                  'select' => [
                    'exist' => [
                      'page',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'ruling' => [
          'fields' => [
            [
              'name' => 'comment',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'object',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'oracle_id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'published_at',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'source',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'ruling',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'card_id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cards/{id}/rulings',
                  'parts' => [
                    'cards',
                    '{card_id}',
                    'rulings',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'card_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'card_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'card',
              ],
            ],
          ],
        ],
        'set' => [
          'fields' => [
            [
              'name' => 'card_count',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'digital',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'icon_svg_uri',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'released_at',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'scryfall_uri',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'search_uri',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'set_type',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'uri',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'set',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/sets',
                  'parts' => [
                    'sets',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'm19',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'code',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/sets/{code}',
                  'parts' => [
                    'sets',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'code' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/sets/{id}',
                  'parts' => [
                    'sets',
                    '{id}',
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return ScryfallFeatures::make_feature($name);
    }
}
