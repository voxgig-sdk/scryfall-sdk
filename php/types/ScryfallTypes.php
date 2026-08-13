<?php
declare(strict_types=1);

// Typed models for the Scryfall SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** BulkData entity data model. */
class BulkData
{
    public ?string $content_encoding = null;
    public ?string $content_type = null;
    public ?string $description = null;
    public ?string $download_uri = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $object = null;
    public ?int $size = null;
    public ?string $type = null;
    public ?string $updated_at = null;
}

/** Request payload for BulkData#load. */
class BulkDataLoadMatch
{
    public string $id;
}

/** Request payload for BulkData#list. */
class BulkDataListMatch
{
    public ?string $content_encoding = null;
    public ?string $content_type = null;
    public ?string $description = null;
    public ?string $download_uri = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $object = null;
    public ?int $size = null;
    public ?string $type = null;
    public ?string $updated_at = null;
}

/** Card entity data model. */
class Card
{
    public ?string $artist = null;
    public ?float $cmc = null;
    public ?string $collector_number = null;
    public ?array $color_identity = null;
    public ?array $colors = null;
    public ?string $id = null;
    public ?array $image_uris = null;
    public ?string $lang = null;
    public ?string $layout = null;
    public ?array $legalities = null;
    public ?string $loyalty = null;
    public ?string $mana_cost = null;
    public ?string $name = null;
    public ?string $oracle_id = null;
    public ?string $oracle_text = null;
    public ?string $power = null;
    public ?array $prices = null;
    public ?string $rarity = null;
    public ?string $released_at = null;
    public ?string $scryfall_uri = null;
    public ?string $set = null;
    public ?string $set_name = null;
    public ?string $toughness = null;
    public ?string $type_line = null;
    public ?string $uri = null;
}

/** Request payload for Card#load. */
class CardLoadMatch
{
    public string $id;
}

/** Request payload for Card#list. */
class CardListMatch
{
    public ?string $artist = null;
    public ?float $cmc = null;
    public ?string $collector_number = null;
    public ?array $color_identity = null;
    public ?array $colors = null;
    public ?string $id = null;
    public ?array $image_uris = null;
    public ?string $lang = null;
    public ?string $layout = null;
    public ?array $legalities = null;
    public ?string $loyalty = null;
    public ?string $mana_cost = null;
    public ?string $name = null;
    public ?string $oracle_id = null;
    public ?string $oracle_text = null;
    public ?string $power = null;
    public ?array $prices = null;
    public ?string $rarity = null;
    public ?string $released_at = null;
    public ?string $scryfall_uri = null;
    public ?string $set = null;
    public ?string $set_name = null;
    public ?string $toughness = null;
    public ?string $type_line = null;
    public ?string $uri = null;
}

/** CardList entity data model. */
class CardList
{
    public ?string $artist = null;
    public ?float $cmc = null;
    public ?string $collector_number = null;
    public ?array $color_identity = null;
    public ?array $colors = null;
    public ?array $data = null;
    public ?bool $has_more = null;
    public ?string $id = null;
    public array $identifiers;
    public ?array $image_uris = null;
    public ?string $lang = null;
    public ?string $layout = null;
    public ?array $legalities = null;
    public ?string $loyalty = null;
    public ?string $mana_cost = null;
    public ?string $name = null;
    public ?string $next_page = null;
    public ?string $object = null;
    public ?string $oracle_id = null;
    public ?string $oracle_text = null;
    public ?string $power = null;
    public ?array $prices = null;
    public ?string $rarity = null;
    public ?string $released_at = null;
    public ?string $scryfall_uri = null;
    public ?string $set = null;
    public ?string $set_name = null;
    public ?int $total_cards = null;
    public ?string $toughness = null;
    public ?string $type_line = null;
    public ?string $uri = null;
}

/** Request payload for CardList#list. */
class CardListListMatch
{
    public ?string $artist = null;
    public ?float $cmc = null;
    public ?string $collector_number = null;
    public ?array $color_identity = null;
    public ?array $colors = null;
    public ?array $data = null;
    public ?bool $has_more = null;
    public ?string $id = null;
    public ?array $identifiers = null;
    public ?array $image_uris = null;
    public ?string $lang = null;
    public ?string $layout = null;
    public ?array $legalities = null;
    public ?string $loyalty = null;
    public ?string $mana_cost = null;
    public ?string $name = null;
    public ?string $next_page = null;
    public ?string $object = null;
    public ?string $oracle_id = null;
    public ?string $oracle_text = null;
    public ?string $power = null;
    public ?array $prices = null;
    public ?string $rarity = null;
    public ?string $released_at = null;
    public ?string $scryfall_uri = null;
    public ?string $set = null;
    public ?string $set_name = null;
    public ?int $total_cards = null;
    public ?string $toughness = null;
    public ?string $type_line = null;
    public ?string $uri = null;
}

/** Request payload for CardList#create. */
class CardListCreateData
{
    public ?string $artist = null;
    public ?float $cmc = null;
    public ?string $collector_number = null;
    public ?array $color_identity = null;
    public ?array $colors = null;
    public ?array $data = null;
    public ?bool $has_more = null;
    public ?string $id = null;
    public array $identifiers;
    public ?array $image_uris = null;
    public ?string $lang = null;
    public ?string $layout = null;
    public ?array $legalities = null;
    public ?string $loyalty = null;
    public ?string $mana_cost = null;
    public ?string $name = null;
    public ?string $next_page = null;
    public ?string $object = null;
    public ?string $oracle_id = null;
    public ?string $oracle_text = null;
    public ?string $power = null;
    public ?array $prices = null;
    public ?string $rarity = null;
    public ?string $released_at = null;
    public ?string $scryfall_uri = null;
    public ?string $set = null;
    public ?string $set_name = null;
    public ?int $total_cards = null;
    public ?string $toughness = null;
    public ?string $type_line = null;
    public ?string $uri = null;
}

/** CardSymbolList entity data model. */
class CardSymbolList
{
    public ?bool $appears_in_mana_costs = null;
    public ?float $cmc = null;
    public ?array $colors = null;
    public ?string $english = null;
    public ?bool $funny = null;
    public ?string $loose_variant = null;
    public ?string $object = null;
    public ?bool $represents_mana = null;
    public ?string $svg_uri = null;
    public ?string $symbol = null;
    public ?bool $transposable = null;
}

/** Request payload for CardSymbolList#list. */
class CardSymbolListListMatch
{
    public ?bool $appears_in_mana_costs = null;
    public ?float $cmc = null;
    public ?array $colors = null;
    public ?string $english = null;
    public ?bool $funny = null;
    public ?string $loose_variant = null;
    public ?string $object = null;
    public ?bool $represents_mana = null;
    public ?string $svg_uri = null;
    public ?string $symbol = null;
    public ?bool $transposable = null;
}

/** Catalog entity data model. */
class Catalog
{
    public ?array $data = null;
    public ?string $object = null;
    public ?int $total_values = null;
    public ?string $uri = null;
}

/** Request payload for Catalog#load. */
class CatalogLoadMatch
{
    public string $id;
}

/** ManaCost entity data model. */
class ManaCost
{
    public ?float $cmc = null;
    public ?bool $colorless = null;
    public ?array $colors = null;
    public ?string $cost = null;
    public ?bool $monocolored = null;
    public ?bool $multicolored = null;
    public ?string $object = null;
}

/** Request payload for ManaCost#list. */
class ManaCostListMatch
{
    public ?float $cmc = null;
    public ?bool $colorless = null;
    public ?array $colors = null;
    public ?string $cost = null;
    public ?bool $monocolored = null;
    public ?bool $multicolored = null;
    public ?string $object = null;
}

/** Migration entity data model. */
class Migration
{
    public ?string $id = null;
    public ?string $migration_strategy = null;
    public ?string $new_scryfall_id = null;
    public ?string $object = null;
    public ?string $old_scryfall_id = null;
    public ?string $performed_at = null;
    public ?string $uri = null;
}

/** Request payload for Migration#list. */
class MigrationListMatch
{
    public ?string $id = null;
    public ?string $migration_strategy = null;
    public ?string $new_scryfall_id = null;
    public ?string $object = null;
    public ?string $old_scryfall_id = null;
    public ?string $performed_at = null;
    public ?string $uri = null;
}

/** Ruling entity data model. */
class Ruling
{
    public ?string $comment = null;
    public ?string $object = null;
    public ?string $oracle_id = null;
    public ?string $published_at = null;
    public ?string $source = null;
}

/** Request payload for Ruling#list. */
class RulingListMatch
{
    public string $card_id;
}

/** Set entity data model. */
class Set
{
    public ?int $card_count = null;
    public ?string $code = null;
    public ?bool $digital = null;
    public ?string $icon_svg_uri = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $released_at = null;
    public ?string $scryfall_uri = null;
    public ?string $search_uri = null;
    public ?string $set_type = null;
    public ?string $uri = null;
}

/** Request payload for Set#load. */
class SetLoadMatch
{
    public string $id;
}

/** Request payload for Set#list. */
class SetListMatch
{
    public ?int $card_count = null;
    public ?string $code = null;
    public ?bool $digital = null;
    public ?string $icon_svg_uri = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $released_at = null;
    public ?string $scryfall_uri = null;
    public ?string $search_uri = null;
    public ?string $set_type = null;
    public ?string $uri = null;
}

