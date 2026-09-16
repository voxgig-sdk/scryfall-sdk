

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


describe('ManaCostEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SCRYFALL_TEST_LIVE=TRUE.
  afterEach(liveDelay('SCRYFALL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ScryfallSDK.test()
    const ent = testsdk.ManaCost()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SCRYFALL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'mana_cost.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"cmc","req":false,"short":"The converted mana cost","type":"`$NUMBER`","index$":0},{"active":true,"name":"colorless","req":false,"short":"True if this mana cost is colorless","type":"`$BOOLEAN`","index$":1},{"active":true,"name":"colors","req":false,"short":"The colors in this mana cost","type":"`$ARRAY`","index$":2},{"active":true,"name":"cost","req":false,"short":"The normalized cost","type":"`$STRING`","index$":3},{"active":true,"name":"monocolored","req":false,"short":"True if this mana cost is monocolored","type":"`$BOOLEAN`","index$":4},{"active":true,"name":"multicolored","req":false,"short":"True if this mana cost is multicolored","type":"`$BOOLEAN`","index$":5},{"active":true,"name":"object","req":false,"short":"The object type","type":"`$STRING`","index$":6}],"name":"mana_cost","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"{2}{U}{U}","kind":"query","name":"cost","orig":"cost","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /symbology/parse-mana","json":"{\"operationId\":\"parseManaCost\",\"parameters\":[{\"description\":\"The mana cost string to parse\",\"example\":\"{2}{U}{U}\",\"in\":\"query\",\"name\":\"cost\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A ManaCost object represents a parsed mana cost\",\"properties\":{\"cmc\":{\"description\":\"The converted mana cost\",\"type\":\"number\"},\"colorless\":{\"description\":\"True if this mana cost is colorless\",\"type\":\"boolean\"},\"colors\":{\"description\":\"The colors in this mana cost\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"cost\":{\"description\":\"The normalized cost\",\"type\":\"string\"},\"monocolored\":{\"description\":\"True if this mana cost is monocolored\",\"type\":\"boolean\"},\"multicolored\":{\"description\":\"True if this mana cost is multicolored\",\"type\":\"boolean\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"mana_cost\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Parsed mana cost\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Invalid mana cost\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[],\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/symbology/parse-mana","segments":[{"lit":"symbology"},{"lit":"parse-mana"}],"select":{"exist":["cost"]},"transform":{"req":"`reqdata`","res":"`body.colors`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"mana_cost","name__orig":"mana_cost","Name":"ManaCost","name_":"mana_cost","name-":"mana-cost","NAME":"MANA_COST","index$":5}, {"active":true,"entity":"mana_cost","key$":"BasicManaCostFlow","kind":"basic","name":"BasicManaCostFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"mana_cost_ref01"}}],"index$":0}]}, 'ManaCost')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let mana_cost_ref01_data = Object.values(setup.data.existing.mana_cost)[0] as any

    // LIST
    const mana_cost_ref01_ent = client.ManaCost()
    const mana_cost_ref01_match: any = {}

    const mana_cost_ref01_list = (await mana_cost_ref01_ent.list(mana_cost_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/mana_cost/ManaCostTestData.json')

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
    ['mana_cost01','mana_cost02','mana_cost03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SCRYFALL_TEST_MANA_COST_ENTID': idmap,
    'SCRYFALL_TEST_LIVE': 'FALSE',
    'SCRYFALL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SCRYFALL_TEST_MANA_COST_ENTID']

  const live = 'TRUE' === env.SCRYFALL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SCRYFALL_TEST_MANA_COST_ENTID']
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
  
