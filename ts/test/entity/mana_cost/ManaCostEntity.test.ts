

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cmc":{"a":true,"h":"Cmc","n":"cmc","r":false,"sh":"The converted mana cost","t":"`$NUMBER`","key$":"cmc","index$":0},"colorless":{"a":true,"h":"Colorless","n":"colorless","r":false,"sh":"True if this mana cost is colorless","t":"`$BOOLEAN`","key$":"colorless","index$":1},"colors":{"a":true,"h":"Colors","n":"colors","r":false,"sh":"The colors in this mana cost","t":"`$ARRAY`","key$":"colors","index$":2},"cost":{"a":true,"h":"Cost","n":"cost","r":false,"sh":"The normalized cost","t":"`$STRING`","key$":"cost","index$":3},"monocolored":{"a":true,"h":"Monocolored","n":"monocolored","r":false,"sh":"True if this mana cost is monocolored","t":"`$BOOLEAN`","key$":"monocolored","index$":4},"multicolored":{"a":true,"h":"Multicolored","n":"multicolored","r":false,"sh":"True if this mana cost is multicolored","t":"`$BOOLEAN`","key$":"multicolored","index$":5},"object":{"a":true,"h":"Object","n":"object","r":false,"sh":"The object type","t":"`$STRING`","key$":"object","index$":6}},"name":"mana_cost","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /symbology/parse-mana","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"{2}{U}{U}","k":"query","n":"cost","or":"cost","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/symbology/parse-mana","q":{"exist":["cost"]},"r":{},"s":[{"lit":"symbology"},{"lit":"parse-mana"}],"t":{"req":"`reqdata`","res":"`body.colors`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"mana_cost","name__orig":"mana_cost","Name":"ManaCost","name_":"mana_cost","name-":"mana-cost","NAME":"MANA_COST","index$":5}, {"active":true,"entity":"mana_cost","key$":"BasicManaCostFlow","kind":"basic","name":"BasicManaCostFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"mana_cost_ref01"}}],"index$":0}]}, 'ManaCost', {"GET /symbology/parse-mana":{"protocol":"http","operationId":"parseManaCost","responses":{"200":{"description":"Parsed mana cost","content":{"application/json":{"schema":{"type":"object","description":"A ManaCost object represents a parsed mana cost","properties":{"object":{"description":"The object type","enum":["mana_cost"],"key$":"object","type":"string"},"cost":{"description":"The normalized cost","key$":"cost","type":"string"},"cmc":{"description":"The converted mana cost","key$":"cmc","type":"number"},"colors":{"description":"The colors in this mana cost","items":{"type":"string"},"key$":"colors","type":"array"},"colorless":{"description":"True if this mana cost is colorless","key$":"colorless","type":"boolean"},"monocolored":{"description":"True if this mana cost is monocolored","key$":"monocolored","type":"boolean"},"multicolored":{"description":"True if this mana cost is multicolored","key$":"multicolored","type":"boolean"}},"x-ref":"#/components/schemas/ManaCost","index$":0}}}},"400":{"description":"Invalid mana cost","content":{"application/json":{"schema":{"type":"object","description":"An Error object represents a failure to complete an API request","properties":{"object":{"type":"string","enum":["error"],"description":"The object type"},"status":{"type":"integer","description":"An HTTP status code"},"code":{"type":"string","description":"A computer-friendly error code"},"details":{"type":"string","description":"A human-readable error message"},"type":{"type":"string","description":"A classification of the error type"},"warnings":{"type":"array","items":{"type":"string"},"description":"Non-failure warnings"}},"x-ref":"#/components/schemas/Error"}}}},"429":{"description":"Rate limit exceeded","content":{"application/json":{"schema":{"type":"object","description":"An Error object represents a failure to complete an API request","properties":{"object":{"type":"string","enum":["error"],"description":"The object type"},"status":{"type":"integer","description":"An HTTP status code"},"code":{"type":"string","description":"A computer-friendly error code"},"details":{"type":"string","description":"A human-readable error message"},"type":{"type":"string","description":"A classification of the error type"},"warnings":{"type":"array","items":{"type":"string"},"description":"Non-failure warnings"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"cost","in":"query","description":"The mana cost string to parse","required":true,"schema":{"type":"string"},"example":"{2}{U}{U}","index$":0}],"security":[],"securitySource":"definition"}})
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
  
