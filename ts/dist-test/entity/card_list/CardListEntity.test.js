"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CardListEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SCRYFALL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SCRYFALL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ScryfallSDK.test();
        const ent = testsdk.CardList();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SCRYFALL_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'card_list.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "artist": { "a": true, "h": "Artist", "n": "artist", "r": false, "sh": "The name of the illustrator of this card", "t": "`$STRING`", "key$": "artist", "index$": 0 }, "cmc": { "a": true, "h": "Cmc", "n": "cmc", "r": false, "sh": "The card's converted mana cost", "t": "`$NUMBER`", "key$": "cmc", "index$": 1 }, "collector_number": { "a": true, "h": "Collector Number", "n": "collector_number", "r": false, "sh": "This card's collector number", "t": "`$STRING`", "key$": "collector_number", "index$": 2 }, "color_identity": { "a": true, "h": "Color Identity", "n": "color_identity", "r": false, "sh": "This card's color identity", "t": "`$ARRAY`", "key$": "color_identity", "index$": 3 }, "colors": { "a": true, "h": "Colors", "n": "colors", "r": false, "sh": "This card's colors", "t": "`$ARRAY`", "key$": "colors", "index$": 4 }, "data": { "a": true, "h": "Data", "n": "data", "r": false, "sh": "An array of the requested objects", "t": "`$ARRAY`", "key$": "data", "index$": 5 }, "has_more": { "a": true, "h": "Has More", "n": "has_more", "r": false, "sh": "True if this list is paginated and has more pages", "t": "`$BOOLEAN`", "key$": "has_more", "index$": 6 }, "id": { "a": true, "fo": "uuid", "h": "Id", "n": "id", "r": false, "sh": "A unique ID for this card in Scryfall's database", "t": "`$STRING`", "key$": "id", "index$": 7 }, "identifiers": { "a": true, "h": "Identifiers", "n": "identifiers", "r": true, "t": "`$ARRAY`", "key$": "identifiers", "index$": 8 }, "image_uris": { "a": true, "h": "Image Uris", "n": "image_uris", "r": false, "sh": "An object containing URIs to this card's imagery", "t": "`$OBJECT`", "key$": "image_uris", "index$": 9 }, "lang": { "a": true, "h": "Lang", "n": "lang", "r": false, "sh": "The language code for this printing", "t": "`$STRING`", "key$": "lang", "index$": 10 }, "layout": { "a": true, "h": "Layout", "n": "layout", "r": false, "sh": "A code for this card's layout", "t": "`$STRING`", "key$": "layout", "index$": 11 }, "legalities": { "a": true, "h": "Legalities", "n": "legalities", "r": false, "sh": "An object describing the legality of this card", "t": "`$OBJECT`", "key$": "legalities", "index$": 12 }, "loyalty": { "a": true, "h": "Loyalty", "n": "loyalty", "r": false, "sh": "This card's loyalty (for planeswalkers)", "t": "`$STRING`", "key$": "loyalty", "index$": 13 }, "mana_cost": { "a": true, "h": "Mana Cost", "n": "mana_cost", "r": false, "sh": "The mana cost for this card", "t": "`$STRING`", "key$": "mana_cost", "index$": 14 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "The name of this card", "t": "`$STRING`", "key$": "name", "index$": 15 }, "next_page": { "a": true, "fo": "uri", "h": "Next Page", "n": "next_page", "r": false, "sh": "The URL for the next page of results", "t": "`$STRING`", "key$": "next_page", "index$": 16 }, "object": { "a": true, "h": "Object", "n": "object", "r": false, "sh": "The object type", "t": "`$STRING`", "key$": "object", "index$": 17 }, "oracle_id": { "a": true, "fo": "uuid", "h": "Oracle Id", "n": "oracle_id", "r": false, "sh": "A unique ID for this card's oracle identity", "t": "`$STRING`", "key$": "oracle_id", "index$": 18 }, "oracle_text": { "a": true, "h": "Oracle Text", "n": "oracle_text", "r": false, "sh": "The Oracle text for this card", "t": "`$STRING`", "key$": "oracle_text", "index$": 19 }, "power": { "a": true, "h": "Power", "n": "power", "r": false, "sh": "This card's power (for creatures)", "t": "`$STRING`", "key$": "power", "index$": 20 }, "prices": { "a": true, "h": "Prices", "n": "prices", "r": false, "sh": "An object containing daily price information for this card", "t": "`$OBJECT`", "key$": "prices", "index$": 21 }, "rarity": { "a": true, "h": "Rarity", "n": "rarity", "r": false, "sh": "This card's rarity", "t": "`$STRING`", "key$": "rarity", "index$": 22 }, "released_at": { "a": true, "fo": "date", "h": "Released At", "n": "released_at", "r": false, "sh": "The date this card was first released", "t": "`$STRING`", "key$": "released_at", "index$": 23 }, "scryfall_uri": { "a": true, "fo": "uri", "h": "Scryfall Uri", "n": "scryfall_uri", "r": false, "sh": "A link to this card's page on Scryfall's website", "t": "`$STRING`", "key$": "scryfall_uri", "index$": 24 }, "set": { "a": true, "h": "Set", "n": "set", "r": false, "sh": "This card's set code", "t": "`$STRING`", "key$": "set", "index$": 25 }, "set_name": { "a": true, "h": "Set Name", "n": "set_name", "r": false, "sh": "This card's full set name", "t": "`$STRING`", "key$": "set_name", "index$": 26 }, "total_cards": { "a": true, "h": "Total Cards", "n": "total_cards", "r": false, "sh": "The total number of cards found", "t": "`$INTEGER`", "key$": "total_cards", "index$": 27 }, "toughness": { "a": true, "h": "Toughness", "n": "toughness", "r": false, "sh": "This card's toughness (for creatures)", "t": "`$STRING`", "key$": "toughness", "index$": 28 }, "type_line": { "a": true, "h": "Type Line", "n": "type_line", "r": false, "sh": "The type line of this card", "t": "`$STRING`", "key$": "type_line", "index$": 29 }, "uri": { "a": true, "fo": "uri", "h": "Uri", "n": "uri", "r": false, "sh": "A link to this card object on Scryfall's API", "t": "`$STRING`", "key$": "uri", "index$": 30 } }, "id": { "field": "id", "name": "id" }, "name": "card_list", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /cards/collection", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/cards/collection", "q": {}, "r": {}, "s": [{ "lit": "cards" }, { "lit": "collection" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /cards/search", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "auto", "k": "query", "n": "dir", "or": "dir", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": false, "k": "query", "n": "include_extra", "or": "include_extra", "r": false, "t": "`$BOOLEAN`", "index$": 1 }, { "a": true, "ex": "name", "k": "query", "n": "order", "or": "order", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "ex": "c:red pow:3", "k": "query", "n": "q", "or": "q", "r": true, "t": "`$STRING`", "index$": 4 }, { "a": true, "ex": "cards", "k": "query", "n": "unique", "or": "unique", "r": false, "t": "`$STRING`", "index$": 5 }] }, "k": "http", "m": "GET", "o": "/cards/search", "q": { "exist": ["dir", "include_extra", "order", "page", "q", "unique"] }, "r": {}, "s": [{ "lit": "cards" }, { "lit": "search" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "card_list", "name__orig": "card_list", "Name": "CardList", "name_": "card_list", "name-": "card-list", "NAME": "CARD_LIST", "index$": 2 }, { "active": true, "entity": "card_list", "key$": "BasicCardListFlow", "kind": "basic", "name": "BasicCardListFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "card_list_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "card_list_ref01" } }], "index$": 1 }] }, 'CardList', { "POST /cards/collection": { "protocol": "http", "operationId": "getCardCollection", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "identifiers": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "string", "format": "uuid" }, "name": { "type": "string" }, "set": { "type": "string" }, "collector_number": { "type": "string" } } }, "maxItems": 75, "key$": "identifiers" } }, "required": ["identifiers"], "index$": 1 } } } }, "responses": { "200": { "description": "Collection of cards", "content": { "application/json": { "schema": { "type": "object", "description": "A List object containing Card objects", "properties": { "object": { "description": "The object type", "enum": ["list"], "key$": "object", "type": "string" }, "total_cards": { "description": "The total number of cards found", "key$": "total_cards", "type": "integer" }, "has_more": { "description": "True if this list is paginated and has more pages", "key$": "has_more", "type": "boolean" }, "next_page": { "description": "The URL for the next page of results", "format": "uri", "key$": "next_page", "nullable": true, "type": "string" }, "data": { "description": "An array of the requested objects", "items": { "description": "Card objects represent individual Magic: The Gathering cards", "properties": { "artist": { "description": "The name of the illustrator of this card", "key$": "artist", "type": "string" }, "cmc": { "description": "The card's converted mana cost", "key$": "cmc", "type": "number" }, "collector_number": { "description": "This card's collector number", "key$": "collector_number", "type": "string" }, "color_identity": { "description": "This card's color identity", "items": { "type": "string" }, "key$": "color_identity", "type": "array" }, "colors": { "description": "This card's colors", "items": { "type": "string" }, "key$": "colors", "type": "array" }, "id": { "description": "A unique ID for this card in Scryfall's database", "format": "uuid", "key$": "id", "type": "string" }, "image_uris": { "description": "An object containing URIs to this card's imagery", "key$": "image_uris", "properties": { "art_crop": { "format": "uri", "type": "string" }, "border_crop": { "format": "uri", "type": "string" }, "large": { "format": "uri", "type": "string" }, "normal": { "format": "uri", "type": "string" }, "png": { "format": "uri", "type": "string" }, "small": { "format": "uri", "type": "string" } }, "type": "object" }, "lang": { "description": "The language code for this printing", "key$": "lang", "type": "string" }, "layout": { "description": "A code for this card's layout", "key$": "layout", "type": "string" }, "legalities": { "additionalProperties": { "enum": ["legal", "not_legal", "restricted", "banned"], "type": "string" }, "description": "An object describing the legality of this card", "key$": "legalities", "type": "object" }, "loyalty": { "description": "This card's loyalty (for planeswalkers)", "key$": "loyalty", "type": "string" }, "mana_cost": { "description": "The mana cost for this card", "key$": "mana_cost", "type": "string" }, "name": { "description": "The name of this card", "key$": "name", "type": "string" }, "oracle_id": { "description": "A unique ID for this card's oracle identity", "format": "uuid", "key$": "oracle_id", "type": "string" }, "oracle_text": { "description": "The Oracle text for this card", "key$": "oracle_text", "type": "string" }, "power": { "description": "This card's power (for creatures)", "key$": "power", "type": "string" }, "prices": { "description": "An object containing daily price information for this card", "key$": "prices", "properties": { "eur": { "nullable": true, "type": "string" }, "tix": { "nullable": true, "type": "string" }, "usd": { "nullable": true, "type": "string" }, "usd_foil": { "nullable": true, "type": "string" } }, "type": "object" }, "rarity": { "description": "This card's rarity", "enum": ["common", "uncommon", "rare", "mythic", "special", "bonus"], "key$": "rarity", "type": "string" }, "released_at": { "description": "The date this card was first released", "format": "date", "key$": "released_at", "type": "string" }, "scryfall_uri": { "description": "A link to this card's page on Scryfall's website", "format": "uri", "key$": "scryfall_uri", "type": "string" }, "set": { "description": "This card's set code", "key$": "set", "type": "string" }, "set_name": { "description": "This card's full set name", "key$": "set_name", "type": "string" }, "toughness": { "description": "This card's toughness (for creatures)", "key$": "toughness", "type": "string" }, "type_line": { "description": "The type line of this card", "key$": "type_line", "type": "string" }, "uri": { "description": "A link to this card object on Scryfall's API", "format": "uri", "key$": "uri", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/Card", "index$": 0 }, "key$": "data", "type": "array" } }, "x-ref": "#/components/schemas/CardList", "index$": 0 } } } }, "400": { "description": "Bad request", "content": { "application/json": { "schema": { "type": "object", "description": "An Error object represents a failure to complete an API request", "properties": { "object": { "type": "string", "enum": ["error"], "description": "The object type" }, "status": { "type": "integer", "description": "An HTTP status code" }, "code": { "type": "string", "description": "A computer-friendly error code" }, "details": { "type": "string", "description": "A human-readable error message" }, "type": { "type": "string", "description": "A classification of the error type" }, "warnings": { "type": "array", "items": { "type": "string" }, "description": "Non-failure warnings" } }, "x-ref": "#/components/schemas/Error" } } } }, "429": { "description": "Rate limit exceeded", "content": { "application/json": { "schema": { "type": "object", "description": "An Error object represents a failure to complete an API request", "properties": { "object": { "type": "string", "enum": ["error"], "description": "The object type" }, "status": { "type": "integer", "description": "An HTTP status code" }, "code": { "type": "string", "description": "A computer-friendly error code" }, "details": { "type": "string", "description": "A human-readable error message" }, "type": { "type": "string", "description": "A classification of the error type" }, "warnings": { "type": "array", "items": { "type": "string" }, "description": "Non-failure warnings" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [], "security": [], "securitySource": "definition" }, "GET /cards/search": { "protocol": "http", "operationId": "searchCards", "responses": { "200": { "description": "Successful search results", "content": { "application/json": { "schema": { "type": "object", "description": "A List object containing Card objects", "properties": { "object": { "description": "The object type", "enum": ["list"], "key$": "object", "type": "string" }, "total_cards": { "description": "The total number of cards found", "key$": "total_cards", "type": "integer" }, "has_more": { "description": "True if this list is paginated and has more pages", "key$": "has_more", "type": "boolean" }, "next_page": { "description": "The URL for the next page of results", "format": "uri", "key$": "next_page", "nullable": true, "type": "string" }, "data": { "description": "An array of the requested objects", "items": { "description": "Card objects represent individual Magic: The Gathering cards", "properties": { "artist": { "description": "The name of the illustrator of this card", "key$": "artist", "type": "string" }, "cmc": { "description": "The card's converted mana cost", "key$": "cmc", "type": "number" }, "collector_number": { "description": "This card's collector number", "key$": "collector_number", "type": "string" }, "color_identity": { "description": "This card's color identity", "items": { "type": "string" }, "key$": "color_identity", "type": "array" }, "colors": { "description": "This card's colors", "items": { "type": "string" }, "key$": "colors", "type": "array" }, "id": { "description": "A unique ID for this card in Scryfall's database", "format": "uuid", "key$": "id", "type": "string" }, "image_uris": { "description": "An object containing URIs to this card's imagery", "key$": "image_uris", "properties": { "art_crop": { "format": "uri", "type": "string" }, "border_crop": { "format": "uri", "type": "string" }, "large": { "format": "uri", "type": "string" }, "normal": { "format": "uri", "type": "string" }, "png": { "format": "uri", "type": "string" }, "small": { "format": "uri", "type": "string" } }, "type": "object" }, "lang": { "description": "The language code for this printing", "key$": "lang", "type": "string" }, "layout": { "description": "A code for this card's layout", "key$": "layout", "type": "string" }, "legalities": { "additionalProperties": { "enum": ["legal", "not_legal", "restricted", "banned"], "type": "string" }, "description": "An object describing the legality of this card", "key$": "legalities", "type": "object" }, "loyalty": { "description": "This card's loyalty (for planeswalkers)", "key$": "loyalty", "type": "string" }, "mana_cost": { "description": "The mana cost for this card", "key$": "mana_cost", "type": "string" }, "name": { "description": "The name of this card", "key$": "name", "type": "string" }, "oracle_id": { "description": "A unique ID for this card's oracle identity", "format": "uuid", "key$": "oracle_id", "type": "string" }, "oracle_text": { "description": "The Oracle text for this card", "key$": "oracle_text", "type": "string" }, "power": { "description": "This card's power (for creatures)", "key$": "power", "type": "string" }, "prices": { "description": "An object containing daily price information for this card", "key$": "prices", "properties": { "eur": { "nullable": true, "type": "string" }, "tix": { "nullable": true, "type": "string" }, "usd": { "nullable": true, "type": "string" }, "usd_foil": { "nullable": true, "type": "string" } }, "type": "object" }, "rarity": { "description": "This card's rarity", "enum": ["common", "uncommon", "rare", "mythic", "special", "bonus"], "key$": "rarity", "type": "string" }, "released_at": { "description": "The date this card was first released", "format": "date", "key$": "released_at", "type": "string" }, "scryfall_uri": { "description": "A link to this card's page on Scryfall's website", "format": "uri", "key$": "scryfall_uri", "type": "string" }, "set": { "description": "This card's set code", "key$": "set", "type": "string" }, "set_name": { "description": "This card's full set name", "key$": "set_name", "type": "string" }, "toughness": { "description": "This card's toughness (for creatures)", "key$": "toughness", "type": "string" }, "type_line": { "description": "The type line of this card", "key$": "type_line", "type": "string" }, "uri": { "description": "A link to this card object on Scryfall's API", "format": "uri", "key$": "uri", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/Card", "index$": 0 }, "key$": "data", "type": "array" } }, "x-ref": "#/components/schemas/CardList" } } } }, "400": { "description": "Bad request - invalid search query", "content": { "application/json": { "schema": { "type": "object", "description": "An Error object represents a failure to complete an API request", "properties": { "object": { "type": "string", "enum": ["error"], "description": "The object type" }, "status": { "type": "integer", "description": "An HTTP status code" }, "code": { "type": "string", "description": "A computer-friendly error code" }, "details": { "type": "string", "description": "A human-readable error message" }, "type": { "type": "string", "description": "A classification of the error type" }, "warnings": { "type": "array", "items": { "type": "string" }, "description": "Non-failure warnings" } }, "x-ref": "#/components/schemas/Error" } } } }, "429": { "description": "Rate limit exceeded", "content": { "application/json": { "schema": { "type": "object", "description": "An Error object represents a failure to complete an API request", "properties": { "object": { "type": "string", "enum": ["error"], "description": "The object type" }, "status": { "type": "integer", "description": "An HTTP status code" }, "code": { "type": "string", "description": "A computer-friendly error code" }, "details": { "type": "string", "description": "A human-readable error message" }, "type": { "type": "string", "description": "A classification of the error type" }, "warnings": { "type": "array", "items": { "type": "string" }, "description": "Non-failure warnings" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "q", "in": "query", "description": "The fulltext search query", "required": true, "schema": { "type": "string" }, "example": "c:red pow:3", "index$": 0 }, { "name": "unique", "in": "query", "description": "The strategy for omitting similar cards", "required": false, "schema": { "type": "string", "enum": ["cards", "art", "prints"], "default": "cards" }, "index$": 1 }, { "name": "order", "in": "query", "description": "The method to sort returned cards", "required": false, "schema": { "type": "string", "enum": ["name", "set", "released", "rarity", "color", "usd", "tix", "eur", "cmc", "power", "toughness", "edhrec", "artist"], "default": "name" }, "index$": 2 }, { "name": "dir", "in": "query", "description": "The direction to sort cards", "required": false, "schema": { "type": "string", "enum": ["auto", "asc", "desc"], "default": "auto" }, "index$": 3 }, { "name": "include_extras", "in": "query", "description": "If true, extra cards (tokens, planes, etc) will be included", "required": false, "schema": { "type": "boolean", "default": false }, "index$": 4 }, { "name": "page", "in": "query", "description": "The page number to return", "required": false, "schema": { "type": "integer", "minimum": 1, "default": 1 }, "index$": 5 }], "security": [], "securitySource": "definition" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const card_list_ref01_ent = client.CardList();
        let card_list_ref01_data = setup.data.new.card_list['card_list_ref01'];
        card_list_ref01_data = (await card_list_ref01_ent.create(card_list_ref01_data)).data();
        (0, node_assert_1.default)(null != card_list_ref01_data.id);
        // LIST
        const card_list_ref01_match = {};
        const card_list_ref01_list = (await card_list_ref01_ent.list(card_list_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(card_list_ref01_list, { id: card_list_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/card_list/CardListTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ScryfallSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['card_list01', 'card_list02', 'card_list03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SCRYFALL_TEST_CARD_LIST_ENTID': idmap,
        'SCRYFALL_TEST_LIVE': 'FALSE',
        'SCRYFALL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['SCRYFALL_TEST_CARD_LIST_ENTID'];
    const live = 'TRUE' === env.SCRYFALL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SCRYFALL_TEST_CARD_LIST_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.ScryfallSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.SCRYFALL_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=CardListEntity.test.js.map