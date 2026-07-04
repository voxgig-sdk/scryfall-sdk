# Typed models for the Scryfall SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class BulkData:
    content_encoding: Optional[str] = None
    content_type: Optional[str] = None
    description: Optional[str] = None
    download_uri: Optional[str] = None
    id: Optional[str] = None
    name: Optional[str] = None
    object: Optional[str] = None
    size: Optional[int] = None
    type: Optional[str] = None
    updated_at: Optional[str] = None


@dataclass
class BulkDataLoadMatch:
    id: str


@dataclass
class BulkDataListMatch:
    content_encoding: Optional[str] = None
    content_type: Optional[str] = None
    description: Optional[str] = None
    download_uri: Optional[str] = None
    id: Optional[str] = None
    name: Optional[str] = None
    object: Optional[str] = None
    size: Optional[int] = None
    type: Optional[str] = None
    updated_at: Optional[str] = None


@dataclass
class Card:
    artist: Optional[str] = None
    cmc: Optional[float] = None
    collector_number: Optional[str] = None
    color: Optional[list] = None
    color_identity: Optional[list] = None
    id: Optional[str] = None
    image_uri: Optional[dict] = None
    lang: Optional[str] = None
    layout: Optional[str] = None
    legality: Optional[dict] = None
    loyalty: Optional[str] = None
    mana_cost: Optional[str] = None
    name: Optional[str] = None
    oracle_id: Optional[str] = None
    oracle_text: Optional[str] = None
    power: Optional[str] = None
    price: Optional[dict] = None
    rarity: Optional[str] = None
    released_at: Optional[str] = None
    scryfall_uri: Optional[str] = None
    set: Optional[str] = None
    set_name: Optional[str] = None
    toughness: Optional[str] = None
    type_line: Optional[str] = None
    uri: Optional[str] = None


@dataclass
class CardLoadMatch:
    id: str


@dataclass
class CardListMatch:
    artist: Optional[str] = None
    cmc: Optional[float] = None
    collector_number: Optional[str] = None
    color: Optional[list] = None
    color_identity: Optional[list] = None
    id: Optional[str] = None
    image_uri: Optional[dict] = None
    lang: Optional[str] = None
    layout: Optional[str] = None
    legality: Optional[dict] = None
    loyalty: Optional[str] = None
    mana_cost: Optional[str] = None
    name: Optional[str] = None
    oracle_id: Optional[str] = None
    oracle_text: Optional[str] = None
    power: Optional[str] = None
    price: Optional[dict] = None
    rarity: Optional[str] = None
    released_at: Optional[str] = None
    scryfall_uri: Optional[str] = None
    set: Optional[str] = None
    set_name: Optional[str] = None
    toughness: Optional[str] = None
    type_line: Optional[str] = None
    uri: Optional[str] = None


@dataclass
class CardList:
    identifier: list
    artist: Optional[str] = None
    cmc: Optional[float] = None
    collector_number: Optional[str] = None
    color: Optional[list] = None
    color_identity: Optional[list] = None
    data: Optional[list] = None
    has_more: Optional[bool] = None
    id: Optional[str] = None
    image_uri: Optional[dict] = None
    lang: Optional[str] = None
    layout: Optional[str] = None
    legality: Optional[dict] = None
    loyalty: Optional[str] = None
    mana_cost: Optional[str] = None
    name: Optional[str] = None
    next_page: Optional[str] = None
    object: Optional[str] = None
    oracle_id: Optional[str] = None
    oracle_text: Optional[str] = None
    power: Optional[str] = None
    price: Optional[dict] = None
    rarity: Optional[str] = None
    released_at: Optional[str] = None
    scryfall_uri: Optional[str] = None
    set: Optional[str] = None
    set_name: Optional[str] = None
    total_card: Optional[int] = None
    toughness: Optional[str] = None
    type_line: Optional[str] = None
    uri: Optional[str] = None


@dataclass
class CardListListMatch:
    artist: Optional[str] = None
    cmc: Optional[float] = None
    collector_number: Optional[str] = None
    color: Optional[list] = None
    color_identity: Optional[list] = None
    data: Optional[list] = None
    has_more: Optional[bool] = None
    id: Optional[str] = None
    identifier: Optional[list] = None
    image_uri: Optional[dict] = None
    lang: Optional[str] = None
    layout: Optional[str] = None
    legality: Optional[dict] = None
    loyalty: Optional[str] = None
    mana_cost: Optional[str] = None
    name: Optional[str] = None
    next_page: Optional[str] = None
    object: Optional[str] = None
    oracle_id: Optional[str] = None
    oracle_text: Optional[str] = None
    power: Optional[str] = None
    price: Optional[dict] = None
    rarity: Optional[str] = None
    released_at: Optional[str] = None
    scryfall_uri: Optional[str] = None
    set: Optional[str] = None
    set_name: Optional[str] = None
    total_card: Optional[int] = None
    toughness: Optional[str] = None
    type_line: Optional[str] = None
    uri: Optional[str] = None


@dataclass
class CardListCreateData:
    artist: Optional[str] = None
    cmc: Optional[float] = None
    collector_number: Optional[str] = None
    color: Optional[list] = None
    color_identity: Optional[list] = None
    data: Optional[list] = None
    has_more: Optional[bool] = None
    id: Optional[str] = None
    identifier: Optional[list] = None
    image_uri: Optional[dict] = None
    lang: Optional[str] = None
    layout: Optional[str] = None
    legality: Optional[dict] = None
    loyalty: Optional[str] = None
    mana_cost: Optional[str] = None
    name: Optional[str] = None
    next_page: Optional[str] = None
    object: Optional[str] = None
    oracle_id: Optional[str] = None
    oracle_text: Optional[str] = None
    power: Optional[str] = None
    price: Optional[dict] = None
    rarity: Optional[str] = None
    released_at: Optional[str] = None
    scryfall_uri: Optional[str] = None
    set: Optional[str] = None
    set_name: Optional[str] = None
    total_card: Optional[int] = None
    toughness: Optional[str] = None
    type_line: Optional[str] = None
    uri: Optional[str] = None


@dataclass
class CardSymbolList:
    appears_in_mana_cost: Optional[bool] = None
    cmc: Optional[float] = None
    color: Optional[list] = None
    english: Optional[str] = None
    funny: Optional[bool] = None
    loose_variant: Optional[str] = None
    object: Optional[str] = None
    represents_mana: Optional[bool] = None
    svg_uri: Optional[str] = None
    symbol: Optional[str] = None
    transposable: Optional[bool] = None


@dataclass
class CardSymbolListListMatch:
    appears_in_mana_cost: Optional[bool] = None
    cmc: Optional[float] = None
    color: Optional[list] = None
    english: Optional[str] = None
    funny: Optional[bool] = None
    loose_variant: Optional[str] = None
    object: Optional[str] = None
    represents_mana: Optional[bool] = None
    svg_uri: Optional[str] = None
    symbol: Optional[str] = None
    transposable: Optional[bool] = None


@dataclass
class Catalog:
    data: Optional[list] = None
    object: Optional[str] = None
    total_value: Optional[int] = None
    uri: Optional[str] = None


@dataclass
class CatalogLoadMatch:
    id: str


@dataclass
class ManaCost:
    cmc: Optional[float] = None
    color: Optional[list] = None
    colorless: Optional[bool] = None
    cost: Optional[str] = None
    monocolored: Optional[bool] = None
    multicolored: Optional[bool] = None
    object: Optional[str] = None


@dataclass
class ManaCostListMatch:
    cmc: Optional[float] = None
    color: Optional[list] = None
    colorless: Optional[bool] = None
    cost: Optional[str] = None
    monocolored: Optional[bool] = None
    multicolored: Optional[bool] = None
    object: Optional[str] = None


@dataclass
class Migration:
    id: Optional[str] = None
    migration_strategy: Optional[str] = None
    new_scryfall_id: Optional[str] = None
    object: Optional[str] = None
    old_scryfall_id: Optional[str] = None
    performed_at: Optional[str] = None
    uri: Optional[str] = None


@dataclass
class MigrationListMatch:
    id: Optional[str] = None
    migration_strategy: Optional[str] = None
    new_scryfall_id: Optional[str] = None
    object: Optional[str] = None
    old_scryfall_id: Optional[str] = None
    performed_at: Optional[str] = None
    uri: Optional[str] = None


@dataclass
class Ruling:
    comment: Optional[str] = None
    object: Optional[str] = None
    oracle_id: Optional[str] = None
    published_at: Optional[str] = None
    source: Optional[str] = None


@dataclass
class RulingListMatch:
    card_id: str


@dataclass
class Set:
    card_count: Optional[int] = None
    code: Optional[str] = None
    digital: Optional[bool] = None
    icon_svg_uri: Optional[str] = None
    id: Optional[str] = None
    name: Optional[str] = None
    released_at: Optional[str] = None
    scryfall_uri: Optional[str] = None
    search_uri: Optional[str] = None
    set_type: Optional[str] = None
    uri: Optional[str] = None


@dataclass
class SetLoadMatch:
    id: str


@dataclass
class SetListMatch:
    card_count: Optional[int] = None
    code: Optional[str] = None
    digital: Optional[bool] = None
    icon_svg_uri: Optional[str] = None
    id: Optional[str] = None
    name: Optional[str] = None
    released_at: Optional[str] = None
    scryfall_uri: Optional[str] = None
    search_uri: Optional[str] = None
    set_type: Optional[str] = None
    uri: Optional[str] = None

