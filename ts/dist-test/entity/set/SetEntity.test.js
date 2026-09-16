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
(0, node_test_1.describe)('SetEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SCRYFALL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SCRYFALL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ScryfallSDK.test();
        const ent = testsdk.Set();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SCRYFALL_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'set.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "card_count", "req": false, "short": "The number of cards in this set", "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "code", "req": false, "short": "The unique three to five-letter code for this set", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "digital", "req": false, "short": "True if this set is only available digitally", "type": "`$BOOLEAN`", "index$": 2 }, { "active": true, "format": "uri", "name": "icon_svg_uri", "req": false, "short": "A URI to an SVG file for this set's icon", "type": "`$STRING`", "index$": 3 }, { "active": true, "format": "uuid", "name": "id", "req": false, "short": "A unique ID for this set", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "name", "req": false, "short": "The English name of the set", "type": "`$STRING`", "index$": 5 }, { "active": true, "format": "date", "name": "released_at", "req": false, "short": "The date the set was released", "type": "`$STRING`", "index$": 6 }, { "active": true, "format": "uri", "name": "scryfall_uri", "req": false, "short": "A link to this set's page on Scryfall's website", "type": "`$STRING`", "index$": 7 }, { "active": true, "format": "uri", "name": "search_uri", "req": false, "short": "A link to search for cards in this set on Scryfall's API", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "set_type", "req": false, "short": "The type of set", "type": "`$STRING`", "index$": 9 }, { "active": true, "format": "uri", "name": "uri", "req": false, "short": "A link to this set object on Scryfall's API", "type": "`$STRING`", "index$": 10 }], "id": { "field": "id", "name": "id" }, "name": "set", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /sets", "json": "{\"operationId\":\"getAllSets\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A List object containing Set objects\",\"properties\":{\"data\":{\"description\":\"An array of Set objects\",\"items\":{\"description\":\"A Set object represents a group of related Magic cards\",\"properties\":{\"card_count\":{\"description\":\"The number of cards in this set\",\"type\":\"integer\"},\"code\":{\"description\":\"The unique three to five-letter code for this set\",\"type\":\"string\"},\"digital\":{\"description\":\"True if this set is only available digitally\",\"type\":\"boolean\"},\"icon_svg_uri\":{\"description\":\"A URI to an SVG file for this set's icon\",\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"A unique ID for this set\",\"format\":\"uuid\",\"type\":\"string\"},\"name\":{\"description\":\"The English name of the set\",\"type\":\"string\"},\"released_at\":{\"description\":\"The date the set was released\",\"format\":\"date\",\"type\":\"string\"},\"scryfall_uri\":{\"description\":\"A link to this set's page on Scryfall's website\",\"format\":\"uri\",\"type\":\"string\"},\"search_uri\":{\"description\":\"A link to search for cards in this set on Scryfall's API\",\"format\":\"uri\",\"type\":\"string\"},\"set_type\":{\"description\":\"The type of set\",\"type\":\"string\"},\"uri\":{\"description\":\"A link to this set object on Scryfall's API\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"has_more\":{\"description\":\"True if this list is paginated and has more pages\",\"type\":\"boolean\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"list\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"List of all sets\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[],\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/sets", "segments": [{ "lit": "sets" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "m19", "kind": "param", "name": "id", "orig": "code", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /sets/{code}", "json": "{\"operationId\":\"getSetByCode\",\"parameters\":[{\"description\":\"The three to five-letter set code\",\"example\":\"m19\",\"in\":\"path\",\"name\":\"code\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A Set object represents a group of related Magic cards\",\"properties\":{\"card_count\":{\"description\":\"The number of cards in this set\",\"type\":\"integer\"},\"code\":{\"description\":\"The unique three to five-letter code for this set\",\"type\":\"string\"},\"digital\":{\"description\":\"True if this set is only available digitally\",\"type\":\"boolean\"},\"icon_svg_uri\":{\"description\":\"A URI to an SVG file for this set's icon\",\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"A unique ID for this set\",\"format\":\"uuid\",\"type\":\"string\"},\"name\":{\"description\":\"The English name of the set\",\"type\":\"string\"},\"released_at\":{\"description\":\"The date the set was released\",\"format\":\"date\",\"type\":\"string\"},\"scryfall_uri\":{\"description\":\"A link to this set's page on Scryfall's website\",\"format\":\"uri\",\"type\":\"string\"},\"search_uri\":{\"description\":\"A link to search for cards in this set on Scryfall's API\",\"format\":\"uri\",\"type\":\"string\"},\"set_type\":{\"description\":\"The type of set\",\"type\":\"string\"},\"uri\":{\"description\":\"A link to this set object on Scryfall's API\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Set found\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Set not found\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[],\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/sets/{code}", "rename": { "param": { "code": "id" } }, "segments": [{ "lit": "sets" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /sets/{id}", "json": "{\"operationId\":\"getSetById\",\"parameters\":[{\"description\":\"The Scryfall ID of the set\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A Set object represents a group of related Magic cards\",\"properties\":{\"card_count\":{\"description\":\"The number of cards in this set\",\"type\":\"integer\"},\"code\":{\"description\":\"The unique three to five-letter code for this set\",\"type\":\"string\"},\"digital\":{\"description\":\"True if this set is only available digitally\",\"type\":\"boolean\"},\"icon_svg_uri\":{\"description\":\"A URI to an SVG file for this set's icon\",\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"A unique ID for this set\",\"format\":\"uuid\",\"type\":\"string\"},\"name\":{\"description\":\"The English name of the set\",\"type\":\"string\"},\"released_at\":{\"description\":\"The date the set was released\",\"format\":\"date\",\"type\":\"string\"},\"scryfall_uri\":{\"description\":\"A link to this set's page on Scryfall's website\",\"format\":\"uri\",\"type\":\"string\"},\"search_uri\":{\"description\":\"A link to search for cards in this set on Scryfall's API\",\"format\":\"uri\",\"type\":\"string\"},\"set_type\":{\"description\":\"The type of set\",\"type\":\"string\"},\"uri\":{\"description\":\"A link to this set object on Scryfall's API\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Set found\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Set not found\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[],\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/sets/{id}", "segments": [{ "lit": "sets" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "set", "name__orig": "set", "Name": "Set", "name_": "set", "name-": "set", "NAME": "SET", "index$": 8 }, { "active": true, "entity": "set", "key$": "BasicSetFlow", "kind": "basic", "name": "BasicSetFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "set_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "set_ref01", "srcdatavar": "set_ref01_data", "suffix": "_dt0" }, "match": { "id": "set01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-set_ref01" } }], "index$": 1 }] }, 'Set');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let set_ref01_data = Object.values(setup.data.existing.set)[0];
        // LIST
        const set_ref01_ent = client.Set();
        const set_ref01_match = {};
        const set_ref01_list = (await set_ref01_ent.list(set_ref01_match)).map((e) => e.data());
        // LOAD
        const set_ref01_match_dt0 = {};
        set_ref01_match_dt0.id = set_ref01_data.id;
        const set_ref01_data_dt0 = (await set_ref01_ent.load(set_ref01_match_dt0)).data();
        (0, node_assert_1.default)(set_ref01_data_dt0.id === set_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/set/SetTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ScryfallSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['set01', 'set02', 'set03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SCRYFALL_TEST_SET_ENTID': idmap,
        'SCRYFALL_TEST_LIVE': 'FALSE',
        'SCRYFALL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['SCRYFALL_TEST_SET_ENTID'];
    const live = 'TRUE' === env.SCRYFALL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SCRYFALL_TEST_SET_ENTID'];
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
//# sourceMappingURL=SetEntity.test.js.map