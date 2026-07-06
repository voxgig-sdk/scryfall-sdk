// Typed models for the Scryfall SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// BulkData is the typed data model for the bulk_data entity.
type BulkData struct {
	ContentEncoding *string `json:"content_encoding,omitempty"`
	ContentType *string `json:"content_type,omitempty"`
	Description *string `json:"description,omitempty"`
	DownloadUri *string `json:"download_uri,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Object *string `json:"object,omitempty"`
	Size *int `json:"size,omitempty"`
	Type *string `json:"type,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// BulkDataLoadMatch is the typed request payload for BulkData.LoadTyped.
type BulkDataLoadMatch struct {
	Id string `json:"id"`
}

// BulkDataListMatch is the typed request payload for BulkData.ListTyped.
type BulkDataListMatch struct {
	ContentEncoding *string `json:"content_encoding,omitempty"`
	ContentType *string `json:"content_type,omitempty"`
	Description *string `json:"description,omitempty"`
	DownloadUri *string `json:"download_uri,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Object *string `json:"object,omitempty"`
	Size *int `json:"size,omitempty"`
	Type *string `json:"type,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// Card is the typed data model for the card entity.
type Card struct {
	Artist *string `json:"artist,omitempty"`
	Cmc *float64 `json:"cmc,omitempty"`
	CollectorNumber *string `json:"collector_number,omitempty"`
	Color *[]any `json:"color,omitempty"`
	ColorIdentity *[]any `json:"color_identity,omitempty"`
	Id *string `json:"id,omitempty"`
	ImageUri *map[string]any `json:"image_uri,omitempty"`
	Lang *string `json:"lang,omitempty"`
	Layout *string `json:"layout,omitempty"`
	Legality *map[string]any `json:"legality,omitempty"`
	Loyalty *string `json:"loyalty,omitempty"`
	ManaCost *string `json:"mana_cost,omitempty"`
	Name *string `json:"name,omitempty"`
	OracleId *string `json:"oracle_id,omitempty"`
	OracleText *string `json:"oracle_text,omitempty"`
	Power *string `json:"power,omitempty"`
	Price *map[string]any `json:"price,omitempty"`
	Rarity *string `json:"rarity,omitempty"`
	ReleasedAt *string `json:"released_at,omitempty"`
	ScryfallUri *string `json:"scryfall_uri,omitempty"`
	Set *string `json:"set,omitempty"`
	SetName *string `json:"set_name,omitempty"`
	Toughness *string `json:"toughness,omitempty"`
	TypeLine *string `json:"type_line,omitempty"`
	Uri *string `json:"uri,omitempty"`
}

// CardLoadMatch is the typed request payload for Card.LoadTyped.
type CardLoadMatch struct {
	Id string `json:"id"`
}

// CardListMatch is the typed request payload for Card.ListTyped.
type CardListMatch struct {
	Artist *string `json:"artist,omitempty"`
	Cmc *float64 `json:"cmc,omitempty"`
	CollectorNumber *string `json:"collector_number,omitempty"`
	Color *[]any `json:"color,omitempty"`
	ColorIdentity *[]any `json:"color_identity,omitempty"`
	Id *string `json:"id,omitempty"`
	ImageUri *map[string]any `json:"image_uri,omitempty"`
	Lang *string `json:"lang,omitempty"`
	Layout *string `json:"layout,omitempty"`
	Legality *map[string]any `json:"legality,omitempty"`
	Loyalty *string `json:"loyalty,omitempty"`
	ManaCost *string `json:"mana_cost,omitempty"`
	Name *string `json:"name,omitempty"`
	OracleId *string `json:"oracle_id,omitempty"`
	OracleText *string `json:"oracle_text,omitempty"`
	Power *string `json:"power,omitempty"`
	Price *map[string]any `json:"price,omitempty"`
	Rarity *string `json:"rarity,omitempty"`
	ReleasedAt *string `json:"released_at,omitempty"`
	ScryfallUri *string `json:"scryfall_uri,omitempty"`
	Set *string `json:"set,omitempty"`
	SetName *string `json:"set_name,omitempty"`
	Toughness *string `json:"toughness,omitempty"`
	TypeLine *string `json:"type_line,omitempty"`
	Uri *string `json:"uri,omitempty"`
}

// CardList is the typed data model for the card_list entity.
type CardList struct {
	Artist *string `json:"artist,omitempty"`
	Cmc *float64 `json:"cmc,omitempty"`
	CollectorNumber *string `json:"collector_number,omitempty"`
	Color *[]any `json:"color,omitempty"`
	ColorIdentity *[]any `json:"color_identity,omitempty"`
	Data *[]any `json:"data,omitempty"`
	HasMore *bool `json:"has_more,omitempty"`
	Id *string `json:"id,omitempty"`
	Identifier []any `json:"identifier"`
	ImageUri *map[string]any `json:"image_uri,omitempty"`
	Lang *string `json:"lang,omitempty"`
	Layout *string `json:"layout,omitempty"`
	Legality *map[string]any `json:"legality,omitempty"`
	Loyalty *string `json:"loyalty,omitempty"`
	ManaCost *string `json:"mana_cost,omitempty"`
	Name *string `json:"name,omitempty"`
	NextPage *string `json:"next_page,omitempty"`
	Object *string `json:"object,omitempty"`
	OracleId *string `json:"oracle_id,omitempty"`
	OracleText *string `json:"oracle_text,omitempty"`
	Power *string `json:"power,omitempty"`
	Price *map[string]any `json:"price,omitempty"`
	Rarity *string `json:"rarity,omitempty"`
	ReleasedAt *string `json:"released_at,omitempty"`
	ScryfallUri *string `json:"scryfall_uri,omitempty"`
	Set *string `json:"set,omitempty"`
	SetName *string `json:"set_name,omitempty"`
	TotalCard *int `json:"total_card,omitempty"`
	Toughness *string `json:"toughness,omitempty"`
	TypeLine *string `json:"type_line,omitempty"`
	Uri *string `json:"uri,omitempty"`
}

// CardListListMatch is the typed request payload for CardList.ListTyped.
type CardListListMatch struct {
	Artist *string `json:"artist,omitempty"`
	Cmc *float64 `json:"cmc,omitempty"`
	CollectorNumber *string `json:"collector_number,omitempty"`
	Color *[]any `json:"color,omitempty"`
	ColorIdentity *[]any `json:"color_identity,omitempty"`
	Data *[]any `json:"data,omitempty"`
	HasMore *bool `json:"has_more,omitempty"`
	Id *string `json:"id,omitempty"`
	Identifier *[]any `json:"identifier,omitempty"`
	ImageUri *map[string]any `json:"image_uri,omitempty"`
	Lang *string `json:"lang,omitempty"`
	Layout *string `json:"layout,omitempty"`
	Legality *map[string]any `json:"legality,omitempty"`
	Loyalty *string `json:"loyalty,omitempty"`
	ManaCost *string `json:"mana_cost,omitempty"`
	Name *string `json:"name,omitempty"`
	NextPage *string `json:"next_page,omitempty"`
	Object *string `json:"object,omitempty"`
	OracleId *string `json:"oracle_id,omitempty"`
	OracleText *string `json:"oracle_text,omitempty"`
	Power *string `json:"power,omitempty"`
	Price *map[string]any `json:"price,omitempty"`
	Rarity *string `json:"rarity,omitempty"`
	ReleasedAt *string `json:"released_at,omitempty"`
	ScryfallUri *string `json:"scryfall_uri,omitempty"`
	Set *string `json:"set,omitempty"`
	SetName *string `json:"set_name,omitempty"`
	TotalCard *int `json:"total_card,omitempty"`
	Toughness *string `json:"toughness,omitempty"`
	TypeLine *string `json:"type_line,omitempty"`
	Uri *string `json:"uri,omitempty"`
}

// CardListCreateData is the typed request payload for CardList.CreateTyped.
type CardListCreateData struct {
	Artist *string `json:"artist,omitempty"`
	Cmc *float64 `json:"cmc,omitempty"`
	CollectorNumber *string `json:"collector_number,omitempty"`
	Color *[]any `json:"color,omitempty"`
	ColorIdentity *[]any `json:"color_identity,omitempty"`
	Data *[]any `json:"data,omitempty"`
	HasMore *bool `json:"has_more,omitempty"`
	Id *string `json:"id,omitempty"`
	Identifier []any `json:"identifier"`
	ImageUri *map[string]any `json:"image_uri,omitempty"`
	Lang *string `json:"lang,omitempty"`
	Layout *string `json:"layout,omitempty"`
	Legality *map[string]any `json:"legality,omitempty"`
	Loyalty *string `json:"loyalty,omitempty"`
	ManaCost *string `json:"mana_cost,omitempty"`
	Name *string `json:"name,omitempty"`
	NextPage *string `json:"next_page,omitempty"`
	Object *string `json:"object,omitempty"`
	OracleId *string `json:"oracle_id,omitempty"`
	OracleText *string `json:"oracle_text,omitempty"`
	Power *string `json:"power,omitempty"`
	Price *map[string]any `json:"price,omitempty"`
	Rarity *string `json:"rarity,omitempty"`
	ReleasedAt *string `json:"released_at,omitempty"`
	ScryfallUri *string `json:"scryfall_uri,omitempty"`
	Set *string `json:"set,omitempty"`
	SetName *string `json:"set_name,omitempty"`
	TotalCard *int `json:"total_card,omitempty"`
	Toughness *string `json:"toughness,omitempty"`
	TypeLine *string `json:"type_line,omitempty"`
	Uri *string `json:"uri,omitempty"`
}

// CardSymbolList is the typed data model for the card_symbol_list entity.
type CardSymbolList struct {
	AppearsInManaCost *bool `json:"appears_in_mana_cost,omitempty"`
	Cmc *float64 `json:"cmc,omitempty"`
	Color *[]any `json:"color,omitempty"`
	English *string `json:"english,omitempty"`
	Funny *bool `json:"funny,omitempty"`
	LooseVariant *string `json:"loose_variant,omitempty"`
	Object *string `json:"object,omitempty"`
	RepresentsMana *bool `json:"represents_mana,omitempty"`
	SvgUri *string `json:"svg_uri,omitempty"`
	Symbol *string `json:"symbol,omitempty"`
	Transposable *bool `json:"transposable,omitempty"`
}

// CardSymbolListListMatch is the typed request payload for CardSymbolList.ListTyped.
type CardSymbolListListMatch struct {
	AppearsInManaCost *bool `json:"appears_in_mana_cost,omitempty"`
	Cmc *float64 `json:"cmc,omitempty"`
	Color *[]any `json:"color,omitempty"`
	English *string `json:"english,omitempty"`
	Funny *bool `json:"funny,omitempty"`
	LooseVariant *string `json:"loose_variant,omitempty"`
	Object *string `json:"object,omitempty"`
	RepresentsMana *bool `json:"represents_mana,omitempty"`
	SvgUri *string `json:"svg_uri,omitempty"`
	Symbol *string `json:"symbol,omitempty"`
	Transposable *bool `json:"transposable,omitempty"`
}

// Catalog is the typed data model for the catalog entity.
type Catalog struct {
	Data *[]any `json:"data,omitempty"`
	Object *string `json:"object,omitempty"`
	TotalValue *int `json:"total_value,omitempty"`
	Uri *string `json:"uri,omitempty"`
}

// CatalogLoadMatch is the typed request payload for Catalog.LoadTyped.
type CatalogLoadMatch struct {
	Id string `json:"id"`
}

// ManaCost is the typed data model for the mana_cost entity.
type ManaCost struct {
	Cmc *float64 `json:"cmc,omitempty"`
	Color *[]any `json:"color,omitempty"`
	Colorless *bool `json:"colorless,omitempty"`
	Cost *string `json:"cost,omitempty"`
	Monocolored *bool `json:"monocolored,omitempty"`
	Multicolored *bool `json:"multicolored,omitempty"`
	Object *string `json:"object,omitempty"`
}

// ManaCostListMatch is the typed request payload for ManaCost.ListTyped.
type ManaCostListMatch struct {
	Cmc *float64 `json:"cmc,omitempty"`
	Color *[]any `json:"color,omitempty"`
	Colorless *bool `json:"colorless,omitempty"`
	Cost *string `json:"cost,omitempty"`
	Monocolored *bool `json:"monocolored,omitempty"`
	Multicolored *bool `json:"multicolored,omitempty"`
	Object *string `json:"object,omitempty"`
}

// Migration is the typed data model for the migration entity.
type Migration struct {
	Id *string `json:"id,omitempty"`
	MigrationStrategy *string `json:"migration_strategy,omitempty"`
	NewScryfallId *string `json:"new_scryfall_id,omitempty"`
	Object *string `json:"object,omitempty"`
	OldScryfallId *string `json:"old_scryfall_id,omitempty"`
	PerformedAt *string `json:"performed_at,omitempty"`
	Uri *string `json:"uri,omitempty"`
}

// MigrationListMatch is the typed request payload for Migration.ListTyped.
type MigrationListMatch struct {
	Id *string `json:"id,omitempty"`
	MigrationStrategy *string `json:"migration_strategy,omitempty"`
	NewScryfallId *string `json:"new_scryfall_id,omitempty"`
	Object *string `json:"object,omitempty"`
	OldScryfallId *string `json:"old_scryfall_id,omitempty"`
	PerformedAt *string `json:"performed_at,omitempty"`
	Uri *string `json:"uri,omitempty"`
}

// Ruling is the typed data model for the ruling entity.
type Ruling struct {
	Comment *string `json:"comment,omitempty"`
	Object *string `json:"object,omitempty"`
	OracleId *string `json:"oracle_id,omitempty"`
	PublishedAt *string `json:"published_at,omitempty"`
	Source *string `json:"source,omitempty"`
}

// RulingListMatch is the typed request payload for Ruling.ListTyped.
type RulingListMatch struct {
	CardId string `json:"card_id"`
}

// Set is the typed data model for the set entity.
type Set struct {
	CardCount *int `json:"card_count,omitempty"`
	Code *string `json:"code,omitempty"`
	Digital *bool `json:"digital,omitempty"`
	IconSvgUri *string `json:"icon_svg_uri,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	ReleasedAt *string `json:"released_at,omitempty"`
	ScryfallUri *string `json:"scryfall_uri,omitempty"`
	SearchUri *string `json:"search_uri,omitempty"`
	SetType *string `json:"set_type,omitempty"`
	Uri *string `json:"uri,omitempty"`
}

// SetLoadMatch is the typed request payload for Set.LoadTyped.
type SetLoadMatch struct {
	Id string `json:"id"`
}

// SetListMatch is the typed request payload for Set.ListTyped.
type SetListMatch struct {
	CardCount *int `json:"card_count,omitempty"`
	Code *string `json:"code,omitempty"`
	Digital *bool `json:"digital,omitempty"`
	IconSvgUri *string `json:"icon_svg_uri,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	ReleasedAt *string `json:"released_at,omitempty"`
	ScryfallUri *string `json:"scryfall_uri,omitempty"`
	SearchUri *string `json:"search_uri,omitempty"`
	SetType *string `json:"set_type,omitempty"`
	Uri *string `json:"uri,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
