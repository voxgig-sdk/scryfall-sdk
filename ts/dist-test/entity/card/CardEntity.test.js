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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CardEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SCRYFALL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SCRYFALL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ScryfallSDK.test();
        const ent = testsdk.Card();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SCRYFALL_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'card.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "artist", "req": false, "short": "The name of the illustrator of this card", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "cmc", "req": false, "short": "The card's converted mana cost", "type": "`$NUMBER`", "index$": 1 }, { "active": true, "name": "collector_number", "req": false, "short": "This card's collector number", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "color_identity", "req": false, "short": "This card's color identity", "type": "`$ARRAY`", "index$": 3 }, { "active": true, "name": "colors", "req": false, "short": "This card's colors", "type": "`$ARRAY`", "index$": 4 }, { "active": true, "format": "uuid", "name": "id", "req": false, "short": "A unique ID for this card in Scryfall's database", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "image_uris", "req": false, "short": "An object containing URIs to this card's imagery", "type": "`$OBJECT`", "index$": 6 }, { "active": true, "name": "lang", "req": false, "short": "The language code for this printing", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "layout", "req": false, "short": "A code for this card's layout", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "legalities", "req": false, "short": "An object describing the legality of this card", "type": "`$OBJECT`", "index$": 9 }, { "active": true, "name": "loyalty", "req": false, "short": "This card's loyalty (for planeswalkers)", "type": "`$STRING`", "index$": 10 }, { "active": true, "name": "mana_cost", "req": false, "short": "The mana cost for this card", "type": "`$STRING`", "index$": 11 }, { "active": true, "name": "name", "req": false, "short": "The name of this card", "type": "`$STRING`", "index$": 12 }, { "active": true, "format": "uuid", "name": "oracle_id", "req": false, "short": "A unique ID for this card's oracle identity", "type": "`$STRING`", "index$": 13 }, { "active": true, "name": "oracle_text", "req": false, "short": "The Oracle text for this card", "type": "`$STRING`", "index$": 14 }, { "active": true, "name": "power", "req": false, "short": "This card's power (for creatures)", "type": "`$STRING`", "index$": 15 }, { "active": true, "name": "prices", "req": false, "short": "An object containing daily price information for this card", "type": "`$OBJECT`", "index$": 16 }, { "active": true, "name": "rarity", "req": false, "short": "This card's rarity", "type": "`$STRING`", "index$": 17 }, { "active": true, "format": "date", "name": "released_at", "req": false, "short": "The date this card was first released", "type": "`$STRING`", "index$": 18 }, { "active": true, "format": "uri", "name": "scryfall_uri", "req": false, "short": "A link to this card's page on Scryfall's website", "type": "`$STRING`", "index$": 19 }, { "active": true, "name": "set", "req": false, "short": "This card's set code", "type": "`$STRING`", "index$": 20 }, { "active": true, "name": "set_name", "req": false, "short": "This card's full set name", "type": "`$STRING`", "index$": 21 }, { "active": true, "name": "toughness", "req": false, "short": "This card's toughness (for creatures)", "type": "`$STRING`", "index$": 22 }, { "active": true, "name": "type_line", "req": false, "short": "The type line of this card", "type": "`$STRING`", "index$": 23 }, { "active": true, "format": "uri", "name": "uri", "req": false, "short": "A link to this card object on Scryfall's API", "type": "`$STRING`", "index$": 24 }], "id": { "field": "id", "name": "id" }, "name": "card", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "Lightning Bolt", "kind": "query", "name": "exact", "orig": "exact", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "aust com", "kind": "query", "name": "fuzzy", "orig": "fuzzy", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": "m19", "kind": "query", "name": "set", "orig": "set", "reqd": false, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /cards/named", "json": "{\"operationId\":\"getCardByName\",\"parameters\":[{\"description\":\"The exact card name to search for\",\"example\":\"Lightning Bolt\",\"in\":\"query\",\"name\":\"exact\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"A fuzzy card name to search for\",\"example\":\"aust com\",\"in\":\"query\",\"name\":\"fuzzy\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"A set code to limit the search to one set\",\"example\":\"m19\",\"in\":\"query\",\"name\":\"set\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Card objects represent individual Magic: The Gathering cards\",\"properties\":{\"artist\":{\"description\":\"The name of the illustrator of this card\",\"type\":\"string\"},\"cmc\":{\"description\":\"The card's converted mana cost\",\"type\":\"number\"},\"collector_number\":{\"description\":\"This card's collector number\",\"type\":\"string\"},\"color_identity\":{\"description\":\"This card's color identity\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"colors\":{\"description\":\"This card's colors\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"id\":{\"description\":\"A unique ID for this card in Scryfall's database\",\"format\":\"uuid\",\"type\":\"string\"},\"image_uris\":{\"description\":\"An object containing URIs to this card's imagery\",\"properties\":{\"art_crop\":{\"format\":\"uri\",\"type\":\"string\"},\"border_crop\":{\"format\":\"uri\",\"type\":\"string\"},\"large\":{\"format\":\"uri\",\"type\":\"string\"},\"normal\":{\"format\":\"uri\",\"type\":\"string\"},\"png\":{\"format\":\"uri\",\"type\":\"string\"},\"small\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"lang\":{\"description\":\"The language code for this printing\",\"type\":\"string\"},\"layout\":{\"description\":\"A code for this card's layout\",\"type\":\"string\"},\"legalities\":{\"additionalProperties\":{\"enum\":[\"legal\",\"not_legal\",\"restricted\",\"banned\"],\"type\":\"string\"},\"description\":\"An object describing the legality of this card\",\"type\":\"object\"},\"loyalty\":{\"description\":\"This card's loyalty (for planeswalkers)\",\"type\":\"string\"},\"mana_cost\":{\"description\":\"The mana cost for this card\",\"type\":\"string\"},\"name\":{\"description\":\"The name of this card\",\"type\":\"string\"},\"oracle_id\":{\"description\":\"A unique ID for this card's oracle identity\",\"format\":\"uuid\",\"type\":\"string\"},\"oracle_text\":{\"description\":\"The Oracle text for this card\",\"type\":\"string\"},\"power\":{\"description\":\"This card's power (for creatures)\",\"type\":\"string\"},\"prices\":{\"description\":\"An object containing daily price information for this card\",\"properties\":{\"eur\":{\"nullable\":true,\"type\":\"string\"},\"tix\":{\"nullable\":true,\"type\":\"string\"},\"usd\":{\"nullable\":true,\"type\":\"string\"},\"usd_foil\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"rarity\":{\"description\":\"This card's rarity\",\"enum\":[\"common\",\"uncommon\",\"rare\",\"mythic\",\"special\",\"bonus\"],\"type\":\"string\"},\"released_at\":{\"description\":\"The date this card was first released\",\"format\":\"date\",\"type\":\"string\"},\"scryfall_uri\":{\"description\":\"A link to this card's page on Scryfall's website\",\"format\":\"uri\",\"type\":\"string\"},\"set\":{\"description\":\"This card's set code\",\"type\":\"string\"},\"set_name\":{\"description\":\"This card's full set name\",\"type\":\"string\"},\"toughness\":{\"description\":\"This card's toughness (for creatures)\",\"type\":\"string\"},\"type_line\":{\"description\":\"The type line of this card\",\"type\":\"string\"},\"uri\":{\"description\":\"A link to this card object on Scryfall's API\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Card found\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Card not found\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[],\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/cards/named", "segments": [{ "lit": "cards" }, { "lit": "named" }], "select": { "$action": "named", "exist": ["exact", "fuzzy", "set"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "q", "orig": "q", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /cards/random", "json": "{\"operationId\":\"getRandomCard\",\"parameters\":[{\"description\":\"An optional fulltext search query to filter the pool of random cards\",\"in\":\"query\",\"name\":\"q\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Card objects represent individual Magic: The Gathering cards\",\"properties\":{\"artist\":{\"description\":\"The name of the illustrator of this card\",\"type\":\"string\"},\"cmc\":{\"description\":\"The card's converted mana cost\",\"type\":\"number\"},\"collector_number\":{\"description\":\"This card's collector number\",\"type\":\"string\"},\"color_identity\":{\"description\":\"This card's color identity\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"colors\":{\"description\":\"This card's colors\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"id\":{\"description\":\"A unique ID for this card in Scryfall's database\",\"format\":\"uuid\",\"type\":\"string\"},\"image_uris\":{\"description\":\"An object containing URIs to this card's imagery\",\"properties\":{\"art_crop\":{\"format\":\"uri\",\"type\":\"string\"},\"border_crop\":{\"format\":\"uri\",\"type\":\"string\"},\"large\":{\"format\":\"uri\",\"type\":\"string\"},\"normal\":{\"format\":\"uri\",\"type\":\"string\"},\"png\":{\"format\":\"uri\",\"type\":\"string\"},\"small\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"lang\":{\"description\":\"The language code for this printing\",\"type\":\"string\"},\"layout\":{\"description\":\"A code for this card's layout\",\"type\":\"string\"},\"legalities\":{\"additionalProperties\":{\"enum\":[\"legal\",\"not_legal\",\"restricted\",\"banned\"],\"type\":\"string\"},\"description\":\"An object describing the legality of this card\",\"type\":\"object\"},\"loyalty\":{\"description\":\"This card's loyalty (for planeswalkers)\",\"type\":\"string\"},\"mana_cost\":{\"description\":\"The mana cost for this card\",\"type\":\"string\"},\"name\":{\"description\":\"The name of this card\",\"type\":\"string\"},\"oracle_id\":{\"description\":\"A unique ID for this card's oracle identity\",\"format\":\"uuid\",\"type\":\"string\"},\"oracle_text\":{\"description\":\"The Oracle text for this card\",\"type\":\"string\"},\"power\":{\"description\":\"This card's power (for creatures)\",\"type\":\"string\"},\"prices\":{\"description\":\"An object containing daily price information for this card\",\"properties\":{\"eur\":{\"nullable\":true,\"type\":\"string\"},\"tix\":{\"nullable\":true,\"type\":\"string\"},\"usd\":{\"nullable\":true,\"type\":\"string\"},\"usd_foil\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"rarity\":{\"description\":\"This card's rarity\",\"enum\":[\"common\",\"uncommon\",\"rare\",\"mythic\",\"special\",\"bonus\"],\"type\":\"string\"},\"released_at\":{\"description\":\"The date this card was first released\",\"format\":\"date\",\"type\":\"string\"},\"scryfall_uri\":{\"description\":\"A link to this card's page on Scryfall's website\",\"format\":\"uri\",\"type\":\"string\"},\"set\":{\"description\":\"This card's set code\",\"type\":\"string\"},\"set_name\":{\"description\":\"This card's full set name\",\"type\":\"string\"},\"toughness\":{\"description\":\"This card's toughness (for creatures)\",\"type\":\"string\"},\"type_line\":{\"description\":\"The type line of this card\",\"type\":\"string\"},\"uri\":{\"description\":\"A link to this card object on Scryfall's API\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Random card\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[],\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/cards/random", "segments": [{ "lit": "cards" }, { "lit": "random" }], "select": { "$action": "random", "exist": ["q"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "683a5707-cddb-494d-9b41-51b4584ded69", "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /cards/{id}", "json": "{\"operationId\":\"getCardById\",\"parameters\":[{\"description\":\"The Scryfall ID of the card\",\"example\":\"683a5707-cddb-494d-9b41-51b4584ded69\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Card objects represent individual Magic: The Gathering cards\",\"properties\":{\"artist\":{\"description\":\"The name of the illustrator of this card\",\"type\":\"string\"},\"cmc\":{\"description\":\"The card's converted mana cost\",\"type\":\"number\"},\"collector_number\":{\"description\":\"This card's collector number\",\"type\":\"string\"},\"color_identity\":{\"description\":\"This card's color identity\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"colors\":{\"description\":\"This card's colors\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"id\":{\"description\":\"A unique ID for this card in Scryfall's database\",\"format\":\"uuid\",\"type\":\"string\"},\"image_uris\":{\"description\":\"An object containing URIs to this card's imagery\",\"properties\":{\"art_crop\":{\"format\":\"uri\",\"type\":\"string\"},\"border_crop\":{\"format\":\"uri\",\"type\":\"string\"},\"large\":{\"format\":\"uri\",\"type\":\"string\"},\"normal\":{\"format\":\"uri\",\"type\":\"string\"},\"png\":{\"format\":\"uri\",\"type\":\"string\"},\"small\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"lang\":{\"description\":\"The language code for this printing\",\"type\":\"string\"},\"layout\":{\"description\":\"A code for this card's layout\",\"type\":\"string\"},\"legalities\":{\"additionalProperties\":{\"enum\":[\"legal\",\"not_legal\",\"restricted\",\"banned\"],\"type\":\"string\"},\"description\":\"An object describing the legality of this card\",\"type\":\"object\"},\"loyalty\":{\"description\":\"This card's loyalty (for planeswalkers)\",\"type\":\"string\"},\"mana_cost\":{\"description\":\"The mana cost for this card\",\"type\":\"string\"},\"name\":{\"description\":\"The name of this card\",\"type\":\"string\"},\"oracle_id\":{\"description\":\"A unique ID for this card's oracle identity\",\"format\":\"uuid\",\"type\":\"string\"},\"oracle_text\":{\"description\":\"The Oracle text for this card\",\"type\":\"string\"},\"power\":{\"description\":\"This card's power (for creatures)\",\"type\":\"string\"},\"prices\":{\"description\":\"An object containing daily price information for this card\",\"properties\":{\"eur\":{\"nullable\":true,\"type\":\"string\"},\"tix\":{\"nullable\":true,\"type\":\"string\"},\"usd\":{\"nullable\":true,\"type\":\"string\"},\"usd_foil\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"rarity\":{\"description\":\"This card's rarity\",\"enum\":[\"common\",\"uncommon\",\"rare\",\"mythic\",\"special\",\"bonus\"],\"type\":\"string\"},\"released_at\":{\"description\":\"The date this card was first released\",\"format\":\"date\",\"type\":\"string\"},\"scryfall_uri\":{\"description\":\"A link to this card's page on Scryfall's website\",\"format\":\"uri\",\"type\":\"string\"},\"set\":{\"description\":\"This card's set code\",\"type\":\"string\"},\"set_name\":{\"description\":\"This card's full set name\",\"type\":\"string\"},\"toughness\":{\"description\":\"This card's toughness (for creatures)\",\"type\":\"string\"},\"type_line\":{\"description\":\"The type line of this card\",\"type\":\"string\"},\"uri\":{\"description\":\"A link to this card object on Scryfall's API\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Card found\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Card not found\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[],\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/cards/{id}", "segments": [{ "lit": "cards" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "card", "name__orig": "card", "Name": "Card", "name_": "card", "name-": "card", "NAME": "CARD", "index$": 1 }, { "active": true, "entity": "card", "key$": "BasicCardFlow", "kind": "basic", "name": "BasicCardFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "card_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "card_ref01", "srcdatavar": "card_ref01_data", "suffix": "_dt0" }, "match": { "id": "card01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-card_ref01" } }], "index$": 1 }] }, 'Card');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let card_ref01_data = Object.values(setup.data.existing.card)[0];
        // LIST
        const card_ref01_ent = client.Card();
        const card_ref01_match = {};
        const card_ref01_list = (await card_ref01_ent.list(card_ref01_match)).map((e) => e.data());
        // LOAD
        const card_ref01_match_dt0 = {};
        card_ref01_match_dt0.id = card_ref01_data.id;
        const card_ref01_data_dt0 = (await card_ref01_ent.load(card_ref01_match_dt0)).data();
        (0, node_assert_1.default)(card_ref01_data_dt0.id === card_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/card/CardTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ScryfallSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['card01', 'card02', 'card03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SCRYFALL_TEST_CARD_ENTID': idmap,
        'SCRYFALL_TEST_LIVE': 'FALSE',
        'SCRYFALL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['SCRYFALL_TEST_CARD_ENTID'];
    const live = 'TRUE' === env.SCRYFALL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SCRYFALL_TEST_CARD_ENTID'];
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
//# sourceMappingURL=CardEntity.test.js.map