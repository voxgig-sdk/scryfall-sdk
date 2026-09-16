

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


describe('RulingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SCRYFALL_TEST_LIVE=TRUE.
  afterEach(liveDelay('SCRYFALL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ScryfallSDK.test()
    const ent = testsdk.Ruling()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SCRYFALL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ruling.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"comment","req":false,"short":"The text of the ruling","type":"`$STRING`","index$":0},{"active":true,"name":"object","req":false,"short":"The object type","type":"`$STRING`","index$":1},{"active":true,"format":"uuid","name":"oracle_id","req":false,"short":"The Oracle ID of the card this ruling applies to","type":"`$STRING`","index$":2},{"active":true,"format":"date","name":"published_at","req":false,"short":"The date this ruling was published","type":"`$STRING`","index$":3},{"active":true,"name":"source","req":false,"short":"The source of this ruling","type":"`$STRING`","index$":4}],"name":"ruling","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"card_id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /cards/{id}/rulings","json":"{\"operationId\":\"getCardRulings\",\"parameters\":[{\"description\":\"The Scryfall ID of the card\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A List object containing Ruling objects\",\"properties\":{\"data\":{\"description\":\"An array of Ruling objects\",\"items\":{\"description\":\"Rulings represent Oracle rulings and errata issued by Wizards of the Coast\",\"properties\":{\"comment\":{\"description\":\"The text of the ruling\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"ruling\"],\"type\":\"string\"},\"oracle_id\":{\"description\":\"The Oracle ID of the card this ruling applies to\",\"format\":\"uuid\",\"type\":\"string\"},\"published_at\":{\"description\":\"The date this ruling was published\",\"format\":\"date\",\"type\":\"string\"},\"source\":{\"description\":\"The source of this ruling\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"has_more\":{\"description\":\"True if this list is paginated and has more pages\",\"type\":\"boolean\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"list\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"List of rulings\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Card not found\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[],\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cards/{id}/rulings","rename":{"param":{"id":"card_id"}},"segments":[{"lit":"cards"},{"var":"card_id"},{"lit":"rulings"}],"select":{"exist":["card_id"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["card"]]},"key$":"ruling","name__orig":"ruling","Name":"Ruling","name_":"ruling","name-":"ruling","NAME":"RULING","index$":7}, {"active":true,"entity":"ruling","key$":"BasicRulingFlow","kind":"basic","name":"BasicRulingFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{"card_id":"card01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"ruling_ref01"}}],"index$":0}]}, 'Ruling')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let ruling_ref01_data = Object.values(setup.data.existing.ruling)[0] as any

    // LIST
    const ruling_ref01_ent = client.Ruling()
    const ruling_ref01_match: any = {}
    ruling_ref01_match['card_id'] = setup.idmap['card01']

    const ruling_ref01_list = (await ruling_ref01_ent.list(ruling_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/ruling/RulingTestData.json')

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
    ['ruling01','ruling02','ruling03','card01','card02','card03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SCRYFALL_TEST_RULING_ENTID': idmap,
    'SCRYFALL_TEST_LIVE': 'FALSE',
    'SCRYFALL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SCRYFALL_TEST_RULING_ENTID']

  const live = 'TRUE' === env.SCRYFALL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SCRYFALL_TEST_RULING_ENTID']
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
  
