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

export type BulkDataListMatch = Partial<BulkData>

export interface Card {
  artist?: string
  cmc?: number
  collector_number?: string
  color?: any[]
  color_identity?: any[]
  id?: string
  image_uri?: Record<string, any>
  lang?: string
  layout?: string
  legality?: Record<string, any>
  loyalty?: string
  mana_cost?: string
  name?: string
  oracle_id?: string
  oracle_text?: string
  power?: string
  price?: Record<string, any>
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

export type CardListMatch = Partial<Card>

export interface CardList {
  artist?: string
  cmc?: number
  collector_number?: string
  color?: any[]
  color_identity?: any[]
  data?: any[]
  has_more?: boolean
  id?: string
  identifier: any[]
  image_uri?: Record<string, any>
  lang?: string
  layout?: string
  legality?: Record<string, any>
  loyalty?: string
  mana_cost?: string
  name?: string
  next_page?: string
  object?: string
  oracle_id?: string
  oracle_text?: string
  power?: string
  price?: Record<string, any>
  rarity?: string
  released_at?: string
  scryfall_uri?: string
  set?: string
  set_name?: string
  total_card?: number
  toughness?: string
  type_line?: string
  uri?: string
}

export type CardListListMatch = Partial<CardList>

export type CardListCreateData = Partial<CardList>

export interface CardSymbolList {
  appears_in_mana_cost?: boolean
  cmc?: number
  color?: any[]
  english?: string
  funny?: boolean
  loose_variant?: string
  object?: string
  represents_mana?: boolean
  svg_uri?: string
  symbol?: string
  transposable?: boolean
}

export type CardSymbolListListMatch = Partial<CardSymbolList>

export interface Catalog {
  data?: any[]
  object?: string
  total_value?: number
  uri?: string
}

export interface CatalogLoadMatch {
  id: string
}

export interface ManaCost {
  cmc?: number
  color?: any[]
  colorless?: boolean
  cost?: string
  monocolored?: boolean
  multicolored?: boolean
  object?: string
}

export type ManaCostListMatch = Partial<ManaCost>

export interface Migration {
  id?: string
  migration_strategy?: string
  new_scryfall_id?: string
  object?: string
  old_scryfall_id?: string
  performed_at?: string
  uri?: string
}

export type MigrationListMatch = Partial<Migration>

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

export type SetListMatch = Partial<Set>

