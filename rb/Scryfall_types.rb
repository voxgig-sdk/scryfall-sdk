# frozen_string_literal: true

# Typed models for the Scryfall SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# BulkData entity data model.
#
# @!attribute [rw] content_encoding
#   @return [String, nil]
#
# @!attribute [rw] content_type
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] download_uri
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
BulkData = Struct.new(
  :content_encoding,
  :content_type,
  :description,
  :download_uri,
  :id,
  :name,
  :object,
  :size,
  :type,
  :updated_at,
  keyword_init: true
)

# Request payload for BulkData#load.
#
# @!attribute [rw] id
#   @return [String]
BulkDataLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for BulkData#list.
#
# @!attribute [rw] content_encoding
#   @return [String, nil]
#
# @!attribute [rw] content_type
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] download_uri
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
BulkDataListMatch = Struct.new(
  :content_encoding,
  :content_type,
  :description,
  :download_uri,
  :id,
  :name,
  :object,
  :size,
  :type,
  :updated_at,
  keyword_init: true
)

# Card entity data model.
#
# @!attribute [rw] artist
#   @return [String, nil]
#
# @!attribute [rw] cmc
#   @return [Float, nil]
#
# @!attribute [rw] collector_number
#   @return [String, nil]
#
# @!attribute [rw] color_identity
#   @return [Array, nil]
#
# @!attribute [rw] colors
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image_uris
#   @return [Hash, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] layout
#   @return [String, nil]
#
# @!attribute [rw] legalities
#   @return [Hash, nil]
#
# @!attribute [rw] loyalty
#   @return [String, nil]
#
# @!attribute [rw] mana_cost
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] oracle_id
#   @return [String, nil]
#
# @!attribute [rw] oracle_text
#   @return [String, nil]
#
# @!attribute [rw] power
#   @return [String, nil]
#
# @!attribute [rw] prices
#   @return [Hash, nil]
#
# @!attribute [rw] rarity
#   @return [String, nil]
#
# @!attribute [rw] released_at
#   @return [String, nil]
#
# @!attribute [rw] scryfall_uri
#   @return [String, nil]
#
# @!attribute [rw] set
#   @return [String, nil]
#
# @!attribute [rw] set_name
#   @return [String, nil]
#
# @!attribute [rw] toughness
#   @return [String, nil]
#
# @!attribute [rw] type_line
#   @return [String, nil]
#
# @!attribute [rw] uri
#   @return [String, nil]
Card = Struct.new(
  :artist,
  :cmc,
  :collector_number,
  :color_identity,
  :colors,
  :id,
  :image_uris,
  :lang,
  :layout,
  :legalities,
  :loyalty,
  :mana_cost,
  :name,
  :oracle_id,
  :oracle_text,
  :power,
  :prices,
  :rarity,
  :released_at,
  :scryfall_uri,
  :set,
  :set_name,
  :toughness,
  :type_line,
  :uri,
  keyword_init: true
)

# Request payload for Card#load.
#
# @!attribute [rw] id
#   @return [String]
CardLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Card#list.
#
# @!attribute [rw] artist
#   @return [String, nil]
#
# @!attribute [rw] cmc
#   @return [Float, nil]
#
# @!attribute [rw] collector_number
#   @return [String, nil]
#
# @!attribute [rw] color_identity
#   @return [Array, nil]
#
# @!attribute [rw] colors
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image_uris
#   @return [Hash, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] layout
#   @return [String, nil]
#
# @!attribute [rw] legalities
#   @return [Hash, nil]
#
# @!attribute [rw] loyalty
#   @return [String, nil]
#
# @!attribute [rw] mana_cost
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] oracle_id
#   @return [String, nil]
#
# @!attribute [rw] oracle_text
#   @return [String, nil]
#
# @!attribute [rw] power
#   @return [String, nil]
#
# @!attribute [rw] prices
#   @return [Hash, nil]
#
# @!attribute [rw] rarity
#   @return [String, nil]
#
# @!attribute [rw] released_at
#   @return [String, nil]
#
# @!attribute [rw] scryfall_uri
#   @return [String, nil]
#
# @!attribute [rw] set
#   @return [String, nil]
#
# @!attribute [rw] set_name
#   @return [String, nil]
#
# @!attribute [rw] toughness
#   @return [String, nil]
#
# @!attribute [rw] type_line
#   @return [String, nil]
#
# @!attribute [rw] uri
#   @return [String, nil]
CardListMatch = Struct.new(
  :artist,
  :cmc,
  :collector_number,
  :color_identity,
  :colors,
  :id,
  :image_uris,
  :lang,
  :layout,
  :legalities,
  :loyalty,
  :mana_cost,
  :name,
  :oracle_id,
  :oracle_text,
  :power,
  :prices,
  :rarity,
  :released_at,
  :scryfall_uri,
  :set,
  :set_name,
  :toughness,
  :type_line,
  :uri,
  keyword_init: true
)

# CardList entity data model.
#
# @!attribute [rw] artist
#   @return [String, nil]
#
# @!attribute [rw] cmc
#   @return [Float, nil]
#
# @!attribute [rw] collector_number
#   @return [String, nil]
#
# @!attribute [rw] color_identity
#   @return [Array, nil]
#
# @!attribute [rw] colors
#   @return [Array, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] has_more
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] identifiers
#   @return [Array]
#
# @!attribute [rw] image_uris
#   @return [Hash, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] layout
#   @return [String, nil]
#
# @!attribute [rw] legalities
#   @return [Hash, nil]
#
# @!attribute [rw] loyalty
#   @return [String, nil]
#
# @!attribute [rw] mana_cost
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] next_page
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] oracle_id
#   @return [String, nil]
#
# @!attribute [rw] oracle_text
#   @return [String, nil]
#
# @!attribute [rw] power
#   @return [String, nil]
#
# @!attribute [rw] prices
#   @return [Hash, nil]
#
# @!attribute [rw] rarity
#   @return [String, nil]
#
# @!attribute [rw] released_at
#   @return [String, nil]
#
# @!attribute [rw] scryfall_uri
#   @return [String, nil]
#
# @!attribute [rw] set
#   @return [String, nil]
#
# @!attribute [rw] set_name
#   @return [String, nil]
#
# @!attribute [rw] total_cards
#   @return [Integer, nil]
#
# @!attribute [rw] toughness
#   @return [String, nil]
#
# @!attribute [rw] type_line
#   @return [String, nil]
#
# @!attribute [rw] uri
#   @return [String, nil]
CardList = Struct.new(
  :artist,
  :cmc,
  :collector_number,
  :color_identity,
  :colors,
  :data,
  :has_more,
  :id,
  :identifiers,
  :image_uris,
  :lang,
  :layout,
  :legalities,
  :loyalty,
  :mana_cost,
  :name,
  :next_page,
  :object,
  :oracle_id,
  :oracle_text,
  :power,
  :prices,
  :rarity,
  :released_at,
  :scryfall_uri,
  :set,
  :set_name,
  :total_cards,
  :toughness,
  :type_line,
  :uri,
  keyword_init: true
)

# Request payload for CardList#list.
#
# @!attribute [rw] artist
#   @return [String, nil]
#
# @!attribute [rw] cmc
#   @return [Float, nil]
#
# @!attribute [rw] collector_number
#   @return [String, nil]
#
# @!attribute [rw] color_identity
#   @return [Array, nil]
#
# @!attribute [rw] colors
#   @return [Array, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] has_more
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] identifiers
#   @return [Array, nil]
#
# @!attribute [rw] image_uris
#   @return [Hash, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] layout
#   @return [String, nil]
#
# @!attribute [rw] legalities
#   @return [Hash, nil]
#
# @!attribute [rw] loyalty
#   @return [String, nil]
#
# @!attribute [rw] mana_cost
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] next_page
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] oracle_id
#   @return [String, nil]
#
# @!attribute [rw] oracle_text
#   @return [String, nil]
#
# @!attribute [rw] power
#   @return [String, nil]
#
# @!attribute [rw] prices
#   @return [Hash, nil]
#
# @!attribute [rw] rarity
#   @return [String, nil]
#
# @!attribute [rw] released_at
#   @return [String, nil]
#
# @!attribute [rw] scryfall_uri
#   @return [String, nil]
#
# @!attribute [rw] set
#   @return [String, nil]
#
# @!attribute [rw] set_name
#   @return [String, nil]
#
# @!attribute [rw] total_cards
#   @return [Integer, nil]
#
# @!attribute [rw] toughness
#   @return [String, nil]
#
# @!attribute [rw] type_line
#   @return [String, nil]
#
# @!attribute [rw] uri
#   @return [String, nil]
CardListListMatch = Struct.new(
  :artist,
  :cmc,
  :collector_number,
  :color_identity,
  :colors,
  :data,
  :has_more,
  :id,
  :identifiers,
  :image_uris,
  :lang,
  :layout,
  :legalities,
  :loyalty,
  :mana_cost,
  :name,
  :next_page,
  :object,
  :oracle_id,
  :oracle_text,
  :power,
  :prices,
  :rarity,
  :released_at,
  :scryfall_uri,
  :set,
  :set_name,
  :total_cards,
  :toughness,
  :type_line,
  :uri,
  keyword_init: true
)

# Request payload for CardList#create.
#
# @!attribute [rw] artist
#   @return [String, nil]
#
# @!attribute [rw] cmc
#   @return [Float, nil]
#
# @!attribute [rw] collector_number
#   @return [String, nil]
#
# @!attribute [rw] color_identity
#   @return [Array, nil]
#
# @!attribute [rw] colors
#   @return [Array, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] has_more
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] identifiers
#   @return [Array]
#
# @!attribute [rw] image_uris
#   @return [Hash, nil]
#
# @!attribute [rw] lang
#   @return [String, nil]
#
# @!attribute [rw] layout
#   @return [String, nil]
#
# @!attribute [rw] legalities
#   @return [Hash, nil]
#
# @!attribute [rw] loyalty
#   @return [String, nil]
#
# @!attribute [rw] mana_cost
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] next_page
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] oracle_id
#   @return [String, nil]
#
# @!attribute [rw] oracle_text
#   @return [String, nil]
#
# @!attribute [rw] power
#   @return [String, nil]
#
# @!attribute [rw] prices
#   @return [Hash, nil]
#
# @!attribute [rw] rarity
#   @return [String, nil]
#
# @!attribute [rw] released_at
#   @return [String, nil]
#
# @!attribute [rw] scryfall_uri
#   @return [String, nil]
#
# @!attribute [rw] set
#   @return [String, nil]
#
# @!attribute [rw] set_name
#   @return [String, nil]
#
# @!attribute [rw] total_cards
#   @return [Integer, nil]
#
# @!attribute [rw] toughness
#   @return [String, nil]
#
# @!attribute [rw] type_line
#   @return [String, nil]
#
# @!attribute [rw] uri
#   @return [String, nil]
CardListCreateData = Struct.new(
  :artist,
  :cmc,
  :collector_number,
  :color_identity,
  :colors,
  :data,
  :has_more,
  :id,
  :identifiers,
  :image_uris,
  :lang,
  :layout,
  :legalities,
  :loyalty,
  :mana_cost,
  :name,
  :next_page,
  :object,
  :oracle_id,
  :oracle_text,
  :power,
  :prices,
  :rarity,
  :released_at,
  :scryfall_uri,
  :set,
  :set_name,
  :total_cards,
  :toughness,
  :type_line,
  :uri,
  keyword_init: true
)

# CardSymbolList entity data model.
#
# @!attribute [rw] appears_in_mana_costs
#   @return [Boolean, nil]
#
# @!attribute [rw] cmc
#   @return [Float, nil]
#
# @!attribute [rw] colors
#   @return [Array, nil]
#
# @!attribute [rw] english
#   @return [String, nil]
#
# @!attribute [rw] funny
#   @return [Boolean, nil]
#
# @!attribute [rw] loose_variant
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] represents_mana
#   @return [Boolean, nil]
#
# @!attribute [rw] svg_uri
#   @return [String, nil]
#
# @!attribute [rw] symbol
#   @return [String, nil]
#
# @!attribute [rw] transposable
#   @return [Boolean, nil]
CardSymbolList = Struct.new(
  :appears_in_mana_costs,
  :cmc,
  :colors,
  :english,
  :funny,
  :loose_variant,
  :object,
  :represents_mana,
  :svg_uri,
  :symbol,
  :transposable,
  keyword_init: true
)

# Request payload for CardSymbolList#list.
#
# @!attribute [rw] appears_in_mana_costs
#   @return [Boolean, nil]
#
# @!attribute [rw] cmc
#   @return [Float, nil]
#
# @!attribute [rw] colors
#   @return [Array, nil]
#
# @!attribute [rw] english
#   @return [String, nil]
#
# @!attribute [rw] funny
#   @return [Boolean, nil]
#
# @!attribute [rw] loose_variant
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] represents_mana
#   @return [Boolean, nil]
#
# @!attribute [rw] svg_uri
#   @return [String, nil]
#
# @!attribute [rw] symbol
#   @return [String, nil]
#
# @!attribute [rw] transposable
#   @return [Boolean, nil]
CardSymbolListListMatch = Struct.new(
  :appears_in_mana_costs,
  :cmc,
  :colors,
  :english,
  :funny,
  :loose_variant,
  :object,
  :represents_mana,
  :svg_uri,
  :symbol,
  :transposable,
  keyword_init: true
)

# Catalog entity data model.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] total_values
#   @return [Integer, nil]
#
# @!attribute [rw] uri
#   @return [String, nil]
Catalog = Struct.new(
  :data,
  :id,
  :object,
  :total_values,
  :uri,
  keyword_init: true
)

# Request payload for Catalog#load.
#
# @!attribute [rw] id
#   @return [String]
CatalogLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# ManaCost entity data model.
#
# @!attribute [rw] cmc
#   @return [Float, nil]
#
# @!attribute [rw] colorless
#   @return [Boolean, nil]
#
# @!attribute [rw] colors
#   @return [Array, nil]
#
# @!attribute [rw] cost
#   @return [String, nil]
#
# @!attribute [rw] monocolored
#   @return [Boolean, nil]
#
# @!attribute [rw] multicolored
#   @return [Boolean, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
ManaCost = Struct.new(
  :cmc,
  :colorless,
  :colors,
  :cost,
  :monocolored,
  :multicolored,
  :object,
  keyword_init: true
)

# Request payload for ManaCost#list.
#
# @!attribute [rw] cmc
#   @return [Float, nil]
#
# @!attribute [rw] colorless
#   @return [Boolean, nil]
#
# @!attribute [rw] colors
#   @return [Array, nil]
#
# @!attribute [rw] cost
#   @return [String, nil]
#
# @!attribute [rw] monocolored
#   @return [Boolean, nil]
#
# @!attribute [rw] multicolored
#   @return [Boolean, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
ManaCostListMatch = Struct.new(
  :cmc,
  :colorless,
  :colors,
  :cost,
  :monocolored,
  :multicolored,
  :object,
  keyword_init: true
)

# Migration entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] migration_strategy
#   @return [String, nil]
#
# @!attribute [rw] new_scryfall_id
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] old_scryfall_id
#   @return [String, nil]
#
# @!attribute [rw] performed_at
#   @return [String, nil]
#
# @!attribute [rw] uri
#   @return [String, nil]
Migration = Struct.new(
  :id,
  :migration_strategy,
  :new_scryfall_id,
  :object,
  :old_scryfall_id,
  :performed_at,
  :uri,
  keyword_init: true
)

# Request payload for Migration#list.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] migration_strategy
#   @return [String, nil]
#
# @!attribute [rw] new_scryfall_id
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] old_scryfall_id
#   @return [String, nil]
#
# @!attribute [rw] performed_at
#   @return [String, nil]
#
# @!attribute [rw] uri
#   @return [String, nil]
MigrationListMatch = Struct.new(
  :id,
  :migration_strategy,
  :new_scryfall_id,
  :object,
  :old_scryfall_id,
  :performed_at,
  :uri,
  keyword_init: true
)

# Ruling entity data model.
#
# @!attribute [rw] comment
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] oracle_id
#   @return [String, nil]
#
# @!attribute [rw] published_at
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
Ruling = Struct.new(
  :comment,
  :object,
  :oracle_id,
  :published_at,
  :source,
  keyword_init: true
)

# Request payload for Ruling#list.
#
# @!attribute [rw] card_id
#   @return [String]
RulingListMatch = Struct.new(
  :card_id,
  keyword_init: true
)

# Set entity data model.
#
# @!attribute [rw] card_count
#   @return [Integer, nil]
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] digital
#   @return [Boolean, nil]
#
# @!attribute [rw] icon_svg_uri
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] released_at
#   @return [String, nil]
#
# @!attribute [rw] scryfall_uri
#   @return [String, nil]
#
# @!attribute [rw] search_uri
#   @return [String, nil]
#
# @!attribute [rw] set_type
#   @return [String, nil]
#
# @!attribute [rw] uri
#   @return [String, nil]
SetType = Struct.new(
  :card_count,
  :code,
  :digital,
  :icon_svg_uri,
  :id,
  :name,
  :released_at,
  :scryfall_uri,
  :search_uri,
  :set_type,
  :uri,
  keyword_init: true
)

# Request payload for Set#load.
#
# @!attribute [rw] id
#   @return [String]
SetLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Set#list.
#
# @!attribute [rw] card_count
#   @return [Integer, nil]
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] digital
#   @return [Boolean, nil]
#
# @!attribute [rw] icon_svg_uri
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] released_at
#   @return [String, nil]
#
# @!attribute [rw] scryfall_uri
#   @return [String, nil]
#
# @!attribute [rw] search_uri
#   @return [String, nil]
#
# @!attribute [rw] set_type
#   @return [String, nil]
#
# @!attribute [rw] uri
#   @return [String, nil]
SetListMatch = Struct.new(
  :card_count,
  :code,
  :digital,
  :icon_svg_uri,
  :id,
  :name,
  :released_at,
  :scryfall_uri,
  :search_uri,
  :set_type,
  :uri,
  keyword_init: true
)

