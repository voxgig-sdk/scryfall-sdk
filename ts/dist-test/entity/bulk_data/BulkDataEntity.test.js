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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "content_encoding": { "a": true, "h": "Content Encoding", "n": "content_encoding", "r": false, "sh": "The Content-Encoding encoding for this file", "t": "`$STRING`", "key$": "content_encoding", "index$": 0 }, "content_type": { "a": true, "h": "Content Type", "n": "content_type", "r": false, "sh": "The MIME type of this file", "t": "`$STRING`", "key$": "content_type", "index$": 1 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "A human-readable description for this file", "t": "`$STRING`", "key$": "description", "index$": 2 }, "download_uri": { "a": true, "fo": "uri", "h": "Download Uri", "n": "download_uri", "r": false, "sh": "The URI that hosts this bulk file", "t": "`$STRING`", "key$": "download_uri", "index$": 3 }, "id": { "a": true, "fo": "uuid", "h": "Id", "n": "id", "r": false, "sh": "A unique ID for this bulk data file", "t": "`$STRING`", "key$": "id", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "A human-readable name for this file", "t": "`$STRING`", "key$": "name", "index$": 5 }, "object": { "a": true, "h": "Object", "n": "object", "r": false, "sh": "The object type", "t": "`$STRING`", "key$": "object", "index$": 6 }, "size": { "a": true, "h": "Size", "n": "size", "r": false, "sh": "The size of this file in bytes", "t": "`$INTEGER`", "key$": "size", "index$": 7 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "The type of bulk data", "t": "`$STRING`", "key$": "type", "index$": 8 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "sh": "The time this file was last updated", "t": "`$STRING`", "key$": "updated_at", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "bulk_data", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /bulk-data", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/bulk-data", "q": {}, "r": {}, "s": [{ "lit": "bulk-data" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /bulk-data/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/bulk-data/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "bulk-data" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "bulk_data", "name__orig": "bulk_data", "Name": "BulkData", "name_": "bulk_data", "name-": "bulk-data", "NAME": "BULK_DATA", "index$": 0 }, { "active": true, "entity": "bulk_data", "key$": "BasicBulkDataFlow", "kind": "basic", "name": "BasicBulkDataFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "bulk_data_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "bulk_data_ref01", "srcdatavar": "bulk_data_ref01_data", "suffix": "_dt0" }, "m": { "id": "bulk_data01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-bulk_data_ref01" } }], "index$": 1 }] }, 'BulkData', { "GET /bulk-data": { "protocol": "http", "operationId": "getBulkData", "responses": { "200": { "description": "List of bulk data files", "content": { "application/json": { "schema": { "type": "object", "description": "A List object containing BulkData objects", "properties": { "object": { "description": "The object type", "enum": ["list"], "key$": "object", "type": "string" }, "has_more": { "description": "True if this list is paginated and has more pages", "key$": "has_more", "type": "boolean" }, "data": { "description": "An array of BulkData objects", "items": { "description": "A Bulk Data object contains information about a bulk data file", "properties": { "content_encoding": { "description": "The Content-Encoding encoding for this file", "type": "string", "key$": "content_encoding" }, "content_type": { "description": "The MIME type of this file", "type": "string", "key$": "content_type" }, "description": { "description": "A human-readable description for this file", "type": "string", "key$": "description" }, "download_uri": { "description": "The URI that hosts this bulk file", "format": "uri", "type": "string", "key$": "download_uri" }, "id": { "description": "A unique ID for this bulk data file", "format": "uuid", "type": "string", "key$": "id" }, "name": { "description": "A human-readable name for this file", "type": "string", "key$": "name" }, "object": { "description": "The object type", "enum": ["bulk_data"], "type": "string", "key$": "object" }, "size": { "description": "The size of this file in bytes", "type": "integer", "key$": "size" }, "type": { "description": "The type of bulk data", "type": "string", "key$": "type" }, "updated_at": { "description": "The time this file was last updated", "format": "date-time", "type": "string", "key$": "updated_at" } }, "type": "object", "x-ref": "#/components/schemas/BulkData", "index$": 0 }, "key$": "data", "type": "array" } }, "x-ref": "#/components/schemas/BulkDataList" } } } }, "429": { "description": "Rate limit exceeded", "content": { "application/json": { "schema": { "type": "object", "description": "An Error object represents a failure to complete an API request", "properties": { "object": { "type": "string", "enum": ["error"], "description": "The object type" }, "status": { "type": "integer", "description": "An HTTP status code" }, "code": { "type": "string", "description": "A computer-friendly error code" }, "details": { "type": "string", "description": "A human-readable error message" }, "type": { "type": "string", "description": "A classification of the error type" }, "warnings": { "type": "array", "items": { "type": "string" }, "description": "Non-failure warnings" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [], "security": [], "securitySource": "definition" }, "GET /bulk-data/{id}": { "protocol": "http", "operationId": "getBulkDataById", "responses": { "200": { "description": "Bulk data file information", "content": { "application/json": { "schema": { "type": "object", "description": "A Bulk Data object contains information about a bulk data file", "properties": { "object": { "description": "The object type", "enum": ["bulk_data"], "type": "string", "key$": "object" }, "id": { "description": "A unique ID for this bulk data file", "format": "uuid", "type": "string", "key$": "id" }, "type": { "description": "The type of bulk data", "type": "string", "key$": "type" }, "name": { "description": "A human-readable name for this file", "type": "string", "key$": "name" }, "description": { "description": "A human-readable description for this file", "type": "string", "key$": "description" }, "download_uri": { "description": "The URI that hosts this bulk file", "format": "uri", "type": "string", "key$": "download_uri" }, "updated_at": { "description": "The time this file was last updated", "format": "date-time", "type": "string", "key$": "updated_at" }, "size": { "description": "The size of this file in bytes", "type": "integer", "key$": "size" }, "content_type": { "description": "The MIME type of this file", "type": "string", "key$": "content_type" }, "content_encoding": { "description": "The Content-Encoding encoding for this file", "type": "string", "key$": "content_encoding" } }, "x-ref": "#/components/schemas/BulkData", "index$": 0 } } } }, "404": { "description": "Bulk data file not found", "content": { "application/json": { "schema": { "type": "object", "description": "An Error object represents a failure to complete an API request", "properties": { "object": { "type": "string", "enum": ["error"], "description": "The object type" }, "status": { "type": "integer", "description": "An HTTP status code" }, "code": { "type": "string", "description": "A computer-friendly error code" }, "details": { "type": "string", "description": "A human-readable error message" }, "type": { "type": "string", "description": "A classification of the error type" }, "warnings": { "type": "array", "items": { "type": "string" }, "description": "Non-failure warnings" } }, "x-ref": "#/components/schemas/Error" } } } }, "429": { "description": "Rate limit exceeded", "content": { "application/json": { "schema": { "type": "object", "description": "An Error object represents a failure to complete an API request", "properties": { "object": { "type": "string", "enum": ["error"], "description": "The object type" }, "status": { "type": "integer", "description": "An HTTP status code" }, "code": { "type": "string", "description": "A computer-friendly error code" }, "details": { "type": "string", "description": "A human-readable error message" }, "type": { "type": "string", "description": "A classification of the error type" }, "warnings": { "type": "array", "items": { "type": "string" }, "description": "Non-failure warnings" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "id", "in": "path", "description": "The Scryfall ID of the bulk data file", "required": true, "schema": { "type": "string", "format": "uuid" }, "index$": 0 }], "security": [], "securitySource": "definition" } });
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