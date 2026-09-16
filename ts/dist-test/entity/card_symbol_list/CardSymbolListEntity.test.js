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
(0, node_test_1.describe)('CardSymbolListEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SCRYFALL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SCRYFALL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ScryfallSDK.test();
        const ent = testsdk.CardSymbolList();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SCRYFALL_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'card_symbol_list.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "appears_in_mana_costs", "req": false, "short": "True if this symbol appears in mana costs", "type": "`$BOOLEAN`", "index$": 0 }, { "active": true, "name": "cmc", "req": false, "short": "The converted mana cost represented by this symbol", "type": "`$NUMBER`", "index$": 1 }, { "active": true, "name": "colors", "req": false, "short": "The colors of this symbol", "type": "`$ARRAY`", "index$": 2 }, { "active": true, "name": "english", "req": false, "short": "An English textual description of the symbol", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "funny", "req": false, "short": "True if this symbol is only used on funny cards", "type": "`$BOOLEAN`", "index$": 4 }, { "active": true, "name": "loose_variant", "req": false, "short": "An alternate version of this symbol", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "object", "req": false, "short": "The object type", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "represents_mana", "req": false, "short": "True if this is a mana symbol", "type": "`$BOOLEAN`", "index$": 7 }, { "active": true, "format": "uri", "name": "svg_uri", "req": false, "short": "A URI to an SVG image for this symbol", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "symbol", "req": false, "short": "The plaintext symbol", "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "transposable", "req": false, "short": "True if it's possible to write this symbol backwards", "type": "`$BOOLEAN`", "index$": 10 }], "name": "card_symbol_list", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /symbology", "json": "{\"operationId\":\"getAllSymbols\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A List object containing CardSymbol objects\",\"properties\":{\"data\":{\"description\":\"An array of CardSymbol objects\",\"items\":{\"description\":\"A Card Symbol object represents a illustrated symbol that may appear in card's mana cost or Oracle text\",\"properties\":{\"appears_in_mana_costs\":{\"description\":\"True if this symbol appears in mana costs\",\"type\":\"boolean\"},\"cmc\":{\"description\":\"The converted mana cost represented by this symbol\",\"nullable\":true,\"type\":\"number\"},\"colors\":{\"description\":\"The colors of this symbol\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"english\":{\"description\":\"An English textual description of the symbol\",\"type\":\"string\"},\"funny\":{\"description\":\"True if this symbol is only used on funny cards\",\"type\":\"boolean\"},\"loose_variant\":{\"description\":\"An alternate version of this symbol\",\"nullable\":true,\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"card_symbol\"],\"type\":\"string\"},\"represents_mana\":{\"description\":\"True if this is a mana symbol\",\"type\":\"boolean\"},\"svg_uri\":{\"description\":\"A URI to an SVG image for this symbol\",\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"symbol\":{\"description\":\"The plaintext symbol\",\"type\":\"string\"},\"transposable\":{\"description\":\"True if it's possible to write this symbol backwards\",\"type\":\"boolean\"}},\"type\":\"object\"},\"type\":\"array\"},\"has_more\":{\"description\":\"True if this list is paginated and has more pages\",\"type\":\"boolean\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"list\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"List of all card symbols\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[],\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/symbology", "segments": [{ "lit": "symbology" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "card_symbol_list", "name__orig": "card_symbol_list", "Name": "CardSymbolList", "name_": "card_symbol_list", "name-": "card-symbol-list", "NAME": "CARD_SYMBOL_LIST", "index$": 3 }, { "active": true, "entity": "card_symbol_list", "key$": "BasicCardSymbolListFlow", "kind": "basic", "name": "BasicCardSymbolListFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "card_symbol_list_ref01" } }], "index$": 0 }] }, 'CardSymbolList');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let card_symbol_list_ref01_data = Object.values(setup.data.existing.card_symbol_list)[0];
        // LIST
        const card_symbol_list_ref01_ent = client.CardSymbolList();
        const card_symbol_list_ref01_match = {};
        const card_symbol_list_ref01_list = (await card_symbol_list_ref01_ent.list(card_symbol_list_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/card_symbol_list/CardSymbolListTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ScryfallSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['card_symbol_list01', 'card_symbol_list02', 'card_symbol_list03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SCRYFALL_TEST_CARD_SYMBOL_LIST_ENTID': idmap,
        'SCRYFALL_TEST_LIVE': 'FALSE',
        'SCRYFALL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['SCRYFALL_TEST_CARD_SYMBOL_LIST_ENTID'];
    const live = 'TRUE' === env.SCRYFALL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SCRYFALL_TEST_CARD_SYMBOL_LIST_ENTID'];
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
//# sourceMappingURL=CardSymbolListEntity.test.js.map