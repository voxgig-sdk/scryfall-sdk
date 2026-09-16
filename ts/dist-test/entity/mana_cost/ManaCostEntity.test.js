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
(0, node_test_1.describe)('ManaCostEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SCRYFALL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SCRYFALL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ScryfallSDK.test();
        const ent = testsdk.ManaCost();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SCRYFALL_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'mana_cost.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "cmc", "req": false, "short": "The converted mana cost", "type": "`$NUMBER`", "index$": 0 }, { "active": true, "name": "colorless", "req": false, "short": "True if this mana cost is colorless", "type": "`$BOOLEAN`", "index$": 1 }, { "active": true, "name": "colors", "req": false, "short": "The colors in this mana cost", "type": "`$ARRAY`", "index$": 2 }, { "active": true, "name": "cost", "req": false, "short": "The normalized cost", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "monocolored", "req": false, "short": "True if this mana cost is monocolored", "type": "`$BOOLEAN`", "index$": 4 }, { "active": true, "name": "multicolored", "req": false, "short": "True if this mana cost is multicolored", "type": "`$BOOLEAN`", "index$": 5 }, { "active": true, "name": "object", "req": false, "short": "The object type", "type": "`$STRING`", "index$": 6 }], "name": "mana_cost", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "{2}{U}{U}", "kind": "query", "name": "cost", "orig": "cost", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /symbology/parse-mana", "json": "{\"operationId\":\"parseManaCost\",\"parameters\":[{\"description\":\"The mana cost string to parse\",\"example\":\"{2}{U}{U}\",\"in\":\"query\",\"name\":\"cost\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A ManaCost object represents a parsed mana cost\",\"properties\":{\"cmc\":{\"description\":\"The converted mana cost\",\"type\":\"number\"},\"colorless\":{\"description\":\"True if this mana cost is colorless\",\"type\":\"boolean\"},\"colors\":{\"description\":\"The colors in this mana cost\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"cost\":{\"description\":\"The normalized cost\",\"type\":\"string\"},\"monocolored\":{\"description\":\"True if this mana cost is monocolored\",\"type\":\"boolean\"},\"multicolored\":{\"description\":\"True if this mana cost is multicolored\",\"type\":\"boolean\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"mana_cost\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Parsed mana cost\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Invalid mana cost\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[],\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/symbology/parse-mana", "segments": [{ "lit": "symbology" }, { "lit": "parse-mana" }], "select": { "exist": ["cost"] }, "transform": { "req": "`reqdata`", "res": "`body.colors`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "mana_cost", "name__orig": "mana_cost", "Name": "ManaCost", "name_": "mana_cost", "name-": "mana-cost", "NAME": "MANA_COST", "index$": 5 }, { "active": true, "entity": "mana_cost", "key$": "BasicManaCostFlow", "kind": "basic", "name": "BasicManaCostFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "mana_cost_ref01" } }], "index$": 0 }] }, 'ManaCost');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let mana_cost_ref01_data = Object.values(setup.data.existing.mana_cost)[0];
        // LIST
        const mana_cost_ref01_ent = client.ManaCost();
        const mana_cost_ref01_match = {};
        const mana_cost_ref01_list = (await mana_cost_ref01_ent.list(mana_cost_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/mana_cost/ManaCostTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ScryfallSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['mana_cost01', 'mana_cost02', 'mana_cost03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SCRYFALL_TEST_MANA_COST_ENTID': idmap,
        'SCRYFALL_TEST_LIVE': 'FALSE',
        'SCRYFALL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['SCRYFALL_TEST_MANA_COST_ENTID'];
    const live = 'TRUE' === env.SCRYFALL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SCRYFALL_TEST_MANA_COST_ENTID'];
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
//# sourceMappingURL=ManaCostEntity.test.js.map