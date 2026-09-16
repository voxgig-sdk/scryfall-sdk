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
(0, node_test_1.describe)('BulkDataEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SCRYFALL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SCRYFALL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ScryfallSDK.test();
        const ent = testsdk.BulkData();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SCRYFALL_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'bulk_data.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "content_encoding", "req": false, "short": "The Content-Encoding encoding for this file", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "content_type", "req": false, "short": "The MIME type of this file", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "description", "req": false, "short": "A human-readable description for this file", "type": "`$STRING`", "index$": 2 }, { "active": true, "format": "uri", "name": "download_uri", "req": false, "short": "The URI that hosts this bulk file", "type": "`$STRING`", "index$": 3 }, { "active": true, "format": "uuid", "name": "id", "req": false, "short": "A unique ID for this bulk data file", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "name", "req": false, "short": "A human-readable name for this file", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "object", "req": false, "short": "The object type", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "size", "req": false, "short": "The size of this file in bytes", "type": "`$INTEGER`", "index$": 7 }, { "active": true, "name": "type", "req": false, "short": "The type of bulk data", "type": "`$STRING`", "index$": 8 }, { "active": true, "format": "date-time", "name": "updated_at", "req": false, "short": "The time this file was last updated", "type": "`$STRING`", "index$": 9 }], "id": { "field": "id", "name": "id" }, "name": "bulk_data", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /bulk-data", "json": "{\"operationId\":\"getBulkData\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A List object containing BulkData objects\",\"properties\":{\"data\":{\"description\":\"An array of BulkData objects\",\"items\":{\"description\":\"A Bulk Data object contains information about a bulk data file\",\"properties\":{\"content_encoding\":{\"description\":\"The Content-Encoding encoding for this file\",\"type\":\"string\"},\"content_type\":{\"description\":\"The MIME type of this file\",\"type\":\"string\"},\"description\":{\"description\":\"A human-readable description for this file\",\"type\":\"string\"},\"download_uri\":{\"description\":\"The URI that hosts this bulk file\",\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"A unique ID for this bulk data file\",\"format\":\"uuid\",\"type\":\"string\"},\"name\":{\"description\":\"A human-readable name for this file\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"bulk_data\"],\"type\":\"string\"},\"size\":{\"description\":\"The size of this file in bytes\",\"type\":\"integer\"},\"type\":{\"description\":\"The type of bulk data\",\"type\":\"string\"},\"updated_at\":{\"description\":\"The time this file was last updated\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"has_more\":{\"description\":\"True if this list is paginated and has more pages\",\"type\":\"boolean\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"list\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"List of bulk data files\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[],\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/bulk-data", "segments": [{ "lit": "bulk-data" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /bulk-data/{id}", "json": "{\"operationId\":\"getBulkDataById\",\"parameters\":[{\"description\":\"The Scryfall ID of the bulk data file\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A Bulk Data object contains information about a bulk data file\",\"properties\":{\"content_encoding\":{\"description\":\"The Content-Encoding encoding for this file\",\"type\":\"string\"},\"content_type\":{\"description\":\"The MIME type of this file\",\"type\":\"string\"},\"description\":{\"description\":\"A human-readable description for this file\",\"type\":\"string\"},\"download_uri\":{\"description\":\"The URI that hosts this bulk file\",\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"A unique ID for this bulk data file\",\"format\":\"uuid\",\"type\":\"string\"},\"name\":{\"description\":\"A human-readable name for this file\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"bulk_data\"],\"type\":\"string\"},\"size\":{\"description\":\"The size of this file in bytes\",\"type\":\"integer\"},\"type\":{\"description\":\"The type of bulk data\",\"type\":\"string\"},\"updated_at\":{\"description\":\"The time this file was last updated\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bulk data file information\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Bulk data file not found\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[],\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/bulk-data/{id}", "segments": [{ "lit": "bulk-data" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "bulk_data", "name__orig": "bulk_data", "Name": "BulkData", "name_": "bulk_data", "name-": "bulk-data", "NAME": "BULK_DATA", "index$": 0 }, { "active": true, "entity": "bulk_data", "key$": "BasicBulkDataFlow", "kind": "basic", "name": "BasicBulkDataFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "bulk_data_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "bulk_data_ref01", "srcdatavar": "bulk_data_ref01_data", "suffix": "_dt0" }, "match": { "id": "bulk_data01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-bulk_data_ref01" } }], "index$": 1 }] }, 'BulkData');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let bulk_data_ref01_data = Object.values(setup.data.existing.bulk_data)[0];
        // LIST
        const bulk_data_ref01_ent = client.BulkData();
        const bulk_data_ref01_match = {};
        const bulk_data_ref01_list = (await bulk_data_ref01_ent.list(bulk_data_ref01_match)).map((e) => e.data());
        // LOAD
        const bulk_data_ref01_match_dt0 = {};
        bulk_data_ref01_match_dt0.id = bulk_data_ref01_data.id;
        const bulk_data_ref01_data_dt0 = (await bulk_data_ref01_ent.load(bulk_data_ref01_match_dt0)).data();
        (0, node_assert_1.default)(bulk_data_ref01_data_dt0.id === bulk_data_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/bulk_data/BulkDataTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ScryfallSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['bulk_data01', 'bulk_data02', 'bulk_data03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SCRYFALL_TEST_BULK_DATA_ENTID': idmap,
        'SCRYFALL_TEST_LIVE': 'FALSE',
        'SCRYFALL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['SCRYFALL_TEST_BULK_DATA_ENTID'];
    const live = 'TRUE' === env.SCRYFALL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SCRYFALL_TEST_BULK_DATA_ENTID'];
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
//# sourceMappingURL=BulkDataEntity.test.js.map