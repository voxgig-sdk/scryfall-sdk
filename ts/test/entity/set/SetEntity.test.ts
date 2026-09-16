

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ScryfallSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('SetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SCRYFALL_TEST_LIVE=TRUE.
  afterEach(liveDelay('SCRYFALL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ScryfallSDK.test()
    const ent = testsdk.Set()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SCRYFALL_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'set.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"card_count","req":false,"short":"The number of cards in this set","type":"`$INTEGER`","index$":0},{"active":true,"name":"code","req":false,"short":"The unique three to five-letter code for this set","type":"`$STRING`","index$":1},{"active":true,"name":"digital","req":false,"short":"True if this set is only available digitally","type":"`$BOOLEAN`","index$":2},{"active":true,"format":"uri","name":"icon_svg_uri","req":false,"short":"A URI to an SVG file for this set's icon","type":"`$STRING`","index$":3},{"active":true,"format":"uuid","name":"id","req":false,"short":"A unique ID for this set","type":"`$STRING`","index$":4},{"active":true,"name":"name","req":false,"short":"The English name of the set","type":"`$STRING`","index$":5},{"active":true,"format":"date","name":"released_at","req":false,"short":"The date the set was released","type":"`$STRING`","index$":6},{"active":true,"format":"uri","name":"scryfall_uri","req":false,"short":"A link to this set's page on Scryfall's website","type":"`$STRING`","index$":7},{"active":true,"format":"uri","name":"search_uri","req":false,"short":"A link to search for cards in this set on Scryfall's API","type":"`$STRING`","index$":8},{"active":true,"name":"set_type","req":false,"short":"The type of set","type":"`$STRING`","index$":9},{"active":true,"format":"uri","name":"uri","req":false,"short":"A link to this set object on Scryfall's API","type":"`$STRING`","index$":10}],"id":{"field":"id","name":"id"},"name":"set","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /sets","json":"{\"operationId\":\"getAllSets\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A List object containing Set objects\",\"properties\":{\"data\":{\"description\":\"An array of Set objects\",\"items\":{\"description\":\"A Set object represents a group of related Magic cards\",\"properties\":{\"card_count\":{\"description\":\"The number of cards in this set\",\"type\":\"integer\"},\"code\":{\"description\":\"The unique three to five-letter code for this set\",\"type\":\"string\"},\"digital\":{\"description\":\"True if this set is only available digitally\",\"type\":\"boolean\"},\"icon_svg_uri\":{\"description\":\"A URI to an SVG file for this set's icon\",\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"A unique ID for this set\",\"format\":\"uuid\",\"type\":\"string\"},\"name\":{\"description\":\"The English name of the set\",\"type\":\"string\"},\"released_at\":{\"description\":\"The date the set was released\",\"format\":\"date\",\"type\":\"string\"},\"scryfall_uri\":{\"description\":\"A link to this set's page on Scryfall's website\",\"format\":\"uri\",\"type\":\"string\"},\"search_uri\":{\"description\":\"A link to search for cards in this set on Scryfall's API\",\"format\":\"uri\",\"type\":\"string\"},\"set_type\":{\"description\":\"The type of set\",\"type\":\"string\"},\"uri\":{\"description\":\"A link to this set object on Scryfall's API\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"has_more\":{\"description\":\"True if this list is paginated and has more pages\",\"type\":\"boolean\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"list\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"List of all sets\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[],\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/sets","segments":[{"lit":"sets"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"m19","kind":"param","name":"id","orig":"code","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /sets/{code}","json":"{\"operationId\":\"getSetByCode\",\"parameters\":[{\"description\":\"The three to five-letter set code\",\"example\":\"m19\",\"in\":\"path\",\"name\":\"code\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A Set object represents a group of related Magic cards\",\"properties\":{\"card_count\":{\"description\":\"The number of cards in this set\",\"type\":\"integer\"},\"code\":{\"description\":\"The unique three to five-letter code for this set\",\"type\":\"string\"},\"digital\":{\"description\":\"True if this set is only available digitally\",\"type\":\"boolean\"},\"icon_svg_uri\":{\"description\":\"A URI to an SVG file for this set's icon\",\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"A unique ID for this set\",\"format\":\"uuid\",\"type\":\"string\"},\"name\":{\"description\":\"The English name of the set\",\"type\":\"string\"},\"released_at\":{\"description\":\"The date the set was released\",\"format\":\"date\",\"type\":\"string\"},\"scryfall_uri\":{\"description\":\"A link to this set's page on Scryfall's website\",\"format\":\"uri\",\"type\":\"string\"},\"search_uri\":{\"description\":\"A link to search for cards in this set on Scryfall's API\",\"format\":\"uri\",\"type\":\"string\"},\"set_type\":{\"description\":\"The type of set\",\"type\":\"string\"},\"uri\":{\"description\":\"A link to this set object on Scryfall's API\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Set found\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Set not found\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[],\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/sets/{code}","rename":{"param":{"code":"id"}},"segments":[{"lit":"sets"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /sets/{id}","json":"{\"operationId\":\"getSetById\",\"parameters\":[{\"description\":\"The Scryfall ID of the set\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A Set object represents a group of related Magic cards\",\"properties\":{\"card_count\":{\"description\":\"The number of cards in this set\",\"type\":\"integer\"},\"code\":{\"description\":\"The unique three to five-letter code for this set\",\"type\":\"string\"},\"digital\":{\"description\":\"True if this set is only available digitally\",\"type\":\"boolean\"},\"icon_svg_uri\":{\"description\":\"A URI to an SVG file for this set's icon\",\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"description\":\"A unique ID for this set\",\"format\":\"uuid\",\"type\":\"string\"},\"name\":{\"description\":\"The English name of the set\",\"type\":\"string\"},\"released_at\":{\"description\":\"The date the set was released\",\"format\":\"date\",\"type\":\"string\"},\"scryfall_uri\":{\"description\":\"A link to this set's page on Scryfall's website\",\"format\":\"uri\",\"type\":\"string\"},\"search_uri\":{\"description\":\"A link to search for cards in this set on Scryfall's API\",\"format\":\"uri\",\"type\":\"string\"},\"set_type\":{\"description\":\"The type of set\",\"type\":\"string\"},\"uri\":{\"description\":\"A link to this set object on Scryfall's API\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Set found\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Set not found\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[],\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/sets/{id}","segments":[{"lit":"sets"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"set","name__orig":"set","Name":"Set","name_":"set","name-":"set","NAME":"SET","index$":8}, {"active":true,"entity":"set","key$":"BasicSetFlow","kind":"basic","name":"BasicSetFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"set_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"set_ref01","srcdatavar":"set_ref01_data","suffix":"_dt0"},"match":{"id":"set01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-set_ref01"}}],"index$":1}]}, 'Set')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let set_ref01_data = Object.values(setup.data.existing.set)[0] as any

    // LIST
    const set_ref01_ent = client.Set()
    const set_ref01_match: any = {}

    const set_ref01_list = (await set_ref01_ent.list(set_ref01_match)).map((e: any) => e.data())


    // LOAD
    const set_ref01_match_dt0: any = {}
    set_ref01_match_dt0.id = set_ref01_data.id
    const set_ref01_data_dt0 = (await set_ref01_ent.load(set_ref01_match_dt0)).data()
    assert(set_ref01_data_dt0.id === set_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/set/SetTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ScryfallSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['set01','set02','set03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SCRYFALL_TEST_SET_ENTID': idmap,
    'SCRYFALL_TEST_LIVE': 'FALSE',
    'SCRYFALL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SCRYFALL_TEST_SET_ENTID']

  const live = 'TRUE' === env.SCRYFALL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SCRYFALL_TEST_SET_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ScryfallSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
