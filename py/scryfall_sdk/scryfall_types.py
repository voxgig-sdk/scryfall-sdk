# Typed models for the Scryfall SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class BulkData(TypedDict, total=False):
    content_encoding: str
    content_type: str
    description: str
    download_uri: str
    id: str
    name: str
    object: str
    size: int
    type: str
    updated_at: str


class BulkDataLoadMatch(TypedDict):
    id: str


class BulkDataListMatch(TypedDict, total=False):
    content_encoding: str
    content_type: str
    description: str
    download_uri: str
    id: str
    name: str
    object: str
    size: int
    type: str
    updated_at: str


class Card(TypedDict, total=False):
    artist: str
    cmc: float
    collector_number: str
    color_identity: list
    colors: list
    id: str
    image_uris: dict
    lang: str
    layout: str
    legalities: dict
    loyalty: str
    mana_cost: str
    name: str
    oracle_id: str
    oracle_text: str
    power: str
    prices: dict
    rarity: str
    released_at: str
    scryfall_uri: str
    set: str
    set_name: str
    toughness: str
    type_line: str
    uri: str


class CardLoadMatch(TypedDict):
    id: str


class CardListMatch(TypedDict, total=False):
    exact: str
    fuzzy: str
    set: str


class CardListRequired(TypedDict):
    identifiers: list


class CardList(CardListRequired, total=False):
    artist: str
    cmc: float
    collector_number: str
    color_identity: list
    colors: list
    data: list
    has_more: bool
    id: str
    image_uris: dict
    lang: str
    layout: str
    legalities: dict
    loyalty: str
    mana_cost: str
    name: str
    next_page: str
    object: str
    oracle_id: str
    oracle_text: str
    power: str
    prices: dict
    rarity: str
    released_at: str
    scryfall_uri: str
    set: str
    set_name: str
    total_cards: int
    toughness: str
    type_line: str
    uri: str


class CardListListMatchRequired(TypedDict):
    q: str


class CardListListMatch(CardListListMatchRequired, total=False):
    dir: str
    include_extra: bool
    order: str
    page: int
    unique: str


class CardListCreateDataRequired(TypedDict):
    identifiers: list


class CardListCreateData(CardListCreateDataRequired, total=False):
    artist: str
    cmc: float
    collector_number: str
    color_identity: list
    colors: list
    data: list
    has_more: bool
    id: str
    image_uris: dict
    lang: str
    layout: str
    legalities: dict
    loyalty: str
    mana_cost: str
    name: str
    next_page: str
    object: str
    oracle_id: str
    oracle_text: str
    power: str
    prices: dict
    rarity: str
    released_at: str
    scryfall_uri: str
    set: str
    set_name: str
    total_cards: int
    toughness: str
    type_line: str
    uri: str


class CardSymbolList(TypedDict, total=False):
    appears_in_mana_costs: bool
    cmc: float
    colors: list
    english: str
    funny: bool
    loose_variant: str
    object: str
    represents_mana: bool
    svg_uri: str
    symbol: str
    transposable: bool


class CardSymbolListListMatch(TypedDict, total=False):
    appears_in_mana_costs: bool
    cmc: float
    colors: list
    english: str
    funny: bool
    loose_variant: str
    object: str
    represents_mana: bool
    svg_uri: str
    symbol: str
    transposable: bool


class Catalog(TypedDict, total=False):
    data: list
    id: str
    object: str
    total_values: int
    uri: str


class CatalogLoadMatch(TypedDict):
    id: str


class ManaCost(TypedDict, total=False):
    cmc: float
    colorless: bool
    colors: list
    cost: str
    monocolored: bool
    multicolored: bool
    object: str


class ManaCostListMatch(TypedDict):
    cost: str


class Migration(TypedDict, total=False):
    id: str
    migration_strategy: str
    new_scryfall_id: str
    object: str
    old_scryfall_id: str
    performed_at: str
    uri: str


class MigrationListMatch(TypedDict, total=False):
    page: int


class Ruling(TypedDict, total=False):
    comment: str
    object: str
    oracle_id: str
    published_at: str
    source: str


class RulingListMatch(TypedDict):
    card_id: str


class Set(TypedDict, total=False):
    card_count: int
    code: str
    digital: bool
    icon_svg_uri: str
    id: str
    name: str
    released_at: str
    scryfall_uri: str
    search_uri: str
    set_type: str
    uri: str


class SetLoadMatch(TypedDict):
    id: str


class SetListMatch(TypedDict, total=False):
    card_count: int
    code: str
    digital: bool
    icon_svg_uri: str
    id: str
    name: str
    released_at: str
    scryfall_uri: str
    search_uri: str
    set_type: str
    uri: str
