

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"comment":{"a":true,"h":"Comment","n":"comment","r":false,"sh":"The text of the ruling","t":"`$STRING`","key$":"comment","index$":0},"object":{"a":true,"h":"Object","n":"object","r":false,"sh":"The object type","t":"`$STRING`","key$":"object","index$":1},"oracle_id":{"a":true,"fo":"uuid","h":"Oracle Id","n":"oracle_id","r":false,"sh":"The Oracle ID of the card this ruling applies to","t":"`$STRING`","key$":"oracle_id","index$":2},"published_at":{"a":true,"fo":"date","h":"Published At","n":"published_at","r":false,"sh":"The date this ruling was published","t":"`$STRING`","key$":"published_at","index$":3},"source":{"a":true,"h":"Source","n":"source","r":false,"sh":"The source of this ruling","t":"`$STRING`","key$":"source","index$":4}},"name":"ruling","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /cards/{id}/rulings","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"card_id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/cards/{id}/rulings","q":{"exist":["card_id"]},"r":{"param":{"id":"card_id"}},"s":[{"lit":"cards"},{"var":"card_id"},{"lit":"rulings"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.card"]]},"key$":"ruling","name__orig":"ruling","Name":"Ruling","name_":"ruling","name-":"ruling","NAME":"RULING","index$":7}, {"active":true,"entity":"ruling","key$":"BasicRulingFlow","kind":"basic","name":"BasicRulingFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"card_id":"card01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"ruling_ref01"}}],"index$":0}]}, 'Ruling', {"GET /cards/{id}/rulings":{"protocol":"http","operationId":"getCardRulings","responses":{"200":{"description":"List of rulings","content":{"application/json":{"schema":{"type":"object","description":"A List object containing Ruling objects","properties":{"object":{"description":"The object type","enum":["list"],"key$":"object","type":"string"},"has_more":{"description":"True if this list is paginated and has more pages","key$":"has_more","type":"boolean"},"data":{"description":"An array of Ruling objects","items":{"description":"Rulings represent Oracle rulings and errata issued by Wizards of the Coast","properties":{"comment":{"description":"The text of the ruling","type":"string","key$":"comment"},"object":{"description":"The object type","enum":["ruling"],"type":"string","key$":"object"},"oracle_id":{"description":"The Oracle ID of the card this ruling applies to","format":"uuid","type":"string","key$":"oracle_id"},"published_at":{"description":"The date this ruling was published","format":"date","type":"string","key$":"published_at"},"source":{"description":"The source of this ruling","type":"string","key$":"source"}},"type":"object","x-ref":"#/components/schemas/Ruling","index$":0},"key$":"data","type":"array"}},"x-ref":"#/components/schemas/RulingList"}}}},"404":{"description":"Card not found","content":{"application/json":{"schema":{"type":"object","description":"An Error object represents a failure to complete an API request","properties":{"object":{"type":"string","enum":["error"],"description":"The object type"},"status":{"type":"integer","description":"An HTTP status code"},"code":{"type":"string","description":"A computer-friendly error code"},"details":{"type":"string","description":"A human-readable error message"},"type":{"type":"string","description":"A classification of the error type"},"warnings":{"type":"array","items":{"type":"string"},"description":"Non-failure warnings"}},"x-ref":"#/components/schemas/Error"}}}},"429":{"description":"Rate limit exceeded","content":{"application/json":{"schema":{"type":"object","description":"An Error object represents a failure to complete an API request","properties":{"object":{"type":"string","enum":["error"],"description":"The object type"},"status":{"type":"integer","description":"An HTTP status code"},"code":{"type":"string","description":"A computer-friendly error code"},"details":{"type":"string","description":"A human-readable error message"},"type":{"type":"string","description":"A classification of the error type"},"warnings":{"type":"array","items":{"type":"string"},"description":"Non-failure warnings"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"id","in":"path","description":"The Scryfall ID of the card","required":true,"schema":{"type":"string","format":"uuid"},"index$":0}],"security":[],"securitySource":"definition"}})
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
  
