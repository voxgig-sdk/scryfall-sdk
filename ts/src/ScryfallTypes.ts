// Typed models for the Scryfall SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface BulkData {
  content_encoding?: string
  content_type?: string
  description?: string
  download_uri?: string
  id?: string
  name?: string
  object?: string
  size?: number
  type?: string
  updated_at?: string
}

export interface BulkDataLoadMatch {
  id: string
}

export interface BulkDataListMatch {
  content_encoding?: string
  content_type?: string
  description?: string
  download_uri?: string
  id?: string
  name?: string
  object?: string
  size?: number
  type?: string
  updated_at?: string
}

export interface Card {
  artist?: string
  cmc?: number
  collector_number?: string
  color_identity?: any[]
  colors?: any[]
  id?: string
  image_uris?: Record<string, any>
  lang?: string
  layout?: string
  legalities?: Record<string, any>
  loyalty?: string
  mana_cost?: string
  name?: string
  oracle_id?: string
  oracle_text?: string
  power?: string
  prices?: Record<string, any>
  rarity?: string
  released_at?: string
  scryfall_uri?: string
  set?: string
  set_name?: string
  toughness?: string
  type_line?: string
  uri?: string
}

export interface CardLoadMatch {
  id: string
}

export interface CardListMatch {
  artist?: string
  cmc?: number
  collector_number?: string
  color_identity?: any[]
  colors?: any[]
  id?: string
  image_uris?: Record<string, any>
  lang?: string
  layout?: string
  legalities?: Record<string, any>
  loyalty?: string
  mana_cost?: string
  name?: string
  oracle_id?: string
  oracle_text?: string
  power?: string
  prices?: Record<string, any>
  rarity?: string
  released_at?: string
  scryfall_uri?: string
  set?: string
  set_name?: string
  toughness?: string
  type_line?: string
  uri?: string

  // Selects a custom action instead of the plain list:
  //   'named' | 'random'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface CardList {
  artist?: string
  cmc?: number
  collector_number?: string
  color_identity?: any[]
  colors?: any[]
  data?: any[]
  has_more?: boolean
  id?: string
  identifiers: any[]
  image_uris?: Record<string, any>
  lang?: string
  layout?: string
  legalities?: Record<string, any>
  loyalty?: string
  mana_cost?: string
  name?: string
  next_page?: string
  object?: string
  oracle_id?: string
  oracle_text?: string
  power?: string
  prices?: Record<string, any>
  rarity?: string
  released_at?: string
  scryfall_uri?: string
  set?: string
  set_name?: string
  total_cards?: number
  toughness?: string
  type_line?: string
  uri?: string
}

export interface CardListListMatch {
  artist?: string
  cmc?: number
  collector_number?: string
  color_identity?: any[]
  colors?: any[]
  data?: any[]
  has_more?: boolean
  id?: string
  identifiers?: any[]
  image_uris?: Record<string, any>
  lang?: string
  layout?: string
  legalities?: Record<string, any>
  loyalty?: string
  mana_cost?: string
  name?: string
  next_page?: string
  object?: string
  oracle_id?: string
  oracle_text?: string
  power?: string
  prices?: Record<string, any>
  rarity?: string
  released_at?: string
  scryfall_uri?: string
  set?: string
  set_name?: string
  total_cards?: number
  toughness?: string
  type_line?: string
  uri?: string
}

export interface CardListCreateData {
  artist?: string
  cmc?: number
  collector_number?: string
  color_identity?: any[]
  colors?: any[]
  data?: any[]
  has_more?: boolean
  id?: string
  identifiers: any[]
  image_uris?: Record<string, any>
  lang?: string
  layout?: string
  legalities?: Record<string, any>
  loyalty?: string
  mana_cost?: string
  name?: string
  next_page?: string
  object?: string
  oracle_id?: string
  oracle_text?: string
  power?: string
  prices?: Record<string, any>
  rarity?: string
  released_at?: string
  scryfall_uri?: string
  set?: string
  set_name?: string
  total_cards?: number
  toughness?: string
  type_line?: string
  uri?: string
}

export interface CardSymbolList {
  appears_in_mana_costs?: boolean
  cmc?: number
  colors?: any[]
  english?: string
  funny?: boolean
  loose_variant?: string
  object?: string
  represents_mana?: boolean
  svg_uri?: string
  symbol?: string
  transposable?: boolean
}

export interface CardSymbolListListMatch {
  appears_in_mana_costs?: boolean
  cmc?: number
  colors?: any[]
  english?: string
  funny?: boolean
  loose_variant?: string
  object?: string
  represents_mana?: boolean
  svg_uri?: string
  symbol?: string
  transposable?: boolean
}

export interface Catalog {
  data?: any[]
  object?: string
  total_values?: number
  uri?: string
}

export interface CatalogLoadMatch {
  id: string
}

export interface ManaCost {
  cmc?: number
  colorless?: boolean
  colors?: any[]
  cost?: string
  monocolored?: boolean
  multicolored?: boolean
  object?: string
}

export interface ManaCostListMatch {
  cmc?: number
  colorless?: boolean
  colors?: any[]
  cost?: string
  monocolored?: boolean
  multicolored?: boolean
  object?: string
}

export interface Migration {
  id?: string
  migration_strategy?: string
  new_scryfall_id?: string
  object?: string
  old_scryfall_id?: string
  performed_at?: string
  uri?: string
}

export interface MigrationListMatch {
  id?: string
  migration_strategy?: string
  new_scryfall_id?: string
  object?: string
  old_scryfall_id?: string
  performed_at?: string
  uri?: string
}

export interface Ruling {
  comment?: string
  object?: string
  oracle_id?: string
  published_at?: string
  source?: string
}

export interface RulingListMatch {
  card_id: string
}

export interface Set {
  card_count?: number
  code?: string
  digital?: boolean
  icon_svg_uri?: string
  id?: string
  name?: string
  released_at?: string
  scryfall_uri?: string
  search_uri?: string
  set_type?: string
  uri?: string
}

export interface SetLoadMatch {
  id: string
}

export interface SetListMatch {
  card_count?: number
  code?: string
  digital?: boolean
  icon_svg_uri?: string
  id?: string
  name?: string
  released_at?: string
  scryfall_uri?: string
  search_uri?: string
  set_type?: string
  uri?: string
}

