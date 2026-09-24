

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"card_count":{"a":true,"h":"Card Count","n":"card_count","r":false,"sh":"The number of cards in this set","t":"`$INTEGER`","key$":"card_count","index$":0},"code":{"a":true,"h":"Code","n":"code","r":false,"sh":"The unique three to five-letter code for this set","t":"`$STRING`","key$":"code","index$":1},"digital":{"a":true,"h":"Digital","n":"digital","r":false,"sh":"True if this set is only available digitally","t":"`$BOOLEAN`","key$":"digital","index$":2},"icon_svg_uri":{"a":true,"fo":"uri","h":"Icon Svg Uri","n":"icon_svg_uri","r":false,"sh":"A URI to an SVG file for this set's icon","t":"`$STRING`","key$":"icon_svg_uri","index$":3},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":false,"sh":"A unique ID for this set","t":"`$STRING`","key$":"id","index$":4},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The English name of the set","t":"`$STRING`","key$":"name","index$":5},"released_at":{"a":true,"fo":"date","h":"Released At","n":"released_at","r":false,"sh":"The date the set was released","t":"`$STRING`","key$":"released_at","index$":6},"scryfall_uri":{"a":true,"fo":"uri","h":"Scryfall Uri","n":"scryfall_uri","r":false,"sh":"A link to this set's page on Scryfall's website","t":"`$STRING`","key$":"scryfall_uri","index$":7},"search_uri":{"a":true,"fo":"uri","h":"Search Uri","n":"search_uri","r":false,"sh":"A link to search for cards in this set on Scryfall's API","t":"`$STRING`","key$":"search_uri","index$":8},"set_type":{"a":true,"h":"Set Type","n":"set_type","r":false,"sh":"The type of set","t":"`$STRING`","key$":"set_type","index$":9},"uri":{"a":true,"fo":"uri","h":"Uri","n":"uri","r":false,"sh":"A link to this set object on Scryfall's API","t":"`$STRING`","key$":"uri","index$":10}},"id":{"field":"id","name":"id"},"name":"set","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /sets","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/sets","q":{},"r":{},"s":[{"lit":"sets"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /sets/{code}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"m19","k":"param","n":"id","or":"code","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/sets/{code}","q":{"exist":["id"]},"r":{"param":{"code":"id"}},"s":[{"lit":"sets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /sets/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/sets/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"sets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"set","name__orig":"set","Name":"Set","name_":"set","name-":"set","NAME":"SET","index$":8}, {"active":true,"entity":"set","key$":"BasicSetFlow","kind":"basic","name":"BasicSetFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"set_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"set_ref01","srcdatavar":"set_ref01_data","suffix":"_dt0"},"m":{"id":"set01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-set_ref01"}}],"index$":1}]}, 'Set', {"GET /sets":{"protocol":"http","operationId":"getAllSets","responses":{"200":{"description":"List of all sets","content":{"application/json":{"schema":{"type":"object","description":"A List object containing Set objects","properties":{"object":{"description":"The object type","enum":["list"],"key$":"object","type":"string"},"has_more":{"description":"True if this list is paginated and has more pages","key$":"has_more","type":"boolean"},"data":{"description":"An array of Set objects","items":{"description":"A Set object represents a group of related Magic cards","properties":{"card_count":{"description":"The number of cards in this set","type":"integer","key$":"card_count"},"code":{"description":"The unique three to five-letter code for this set","type":"string","key$":"code"},"digital":{"description":"True if this set is only available digitally","type":"boolean","key$":"digital"},"icon_svg_uri":{"description":"A URI to an SVG file for this set's icon","format":"uri","type":"string","key$":"icon_svg_uri"},"id":{"description":"A unique ID for this set","format":"uuid","type":"string","key$":"id"},"name":{"description":"The English name of the set","type":"string","key$":"name"},"released_at":{"description":"The date the set was released","format":"date","type":"string","key$":"released_at"},"scryfall_uri":{"description":"A link to this set's page on Scryfall's website","format":"uri","type":"string","key$":"scryfall_uri"},"search_uri":{"description":"A link to search for cards in this set on Scryfall's API","format":"uri","type":"string","key$":"search_uri"},"set_type":{"description":"The type of set","type":"string","key$":"set_type"},"uri":{"description":"A link to this set object on Scryfall's API","format":"uri","type":"string","key$":"uri"}},"type":"object","x-ref":"#/components/schemas/Set","index$":0},"key$":"data","type":"array"}},"x-ref":"#/components/schemas/SetList"}}}},"429":{"description":"Rate limit exceeded","content":{"application/json":{"schema":{"type":"object","description":"An Error object represents a failure to complete an API request","properties":{"object":{"type":"string","enum":["error"],"description":"The object type"},"status":{"type":"integer","description":"An HTTP status code"},"code":{"type":"string","description":"A computer-friendly error code"},"details":{"type":"string","description":"A human-readable error message"},"type":{"type":"string","description":"A classification of the error type"},"warnings":{"type":"array","items":{"type":"string"},"description":"Non-failure warnings"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"security":[],"securitySource":"definition"},"GET /sets/{code}":{"protocol":"http","operationId":"getSetByCode","responses":{"200":{"description":"Set found","content":{"application/json":{"schema":{"type":"object","description":"A Set object represents a group of related Magic cards","properties":{"id":{"description":"A unique ID for this set","format":"uuid","type":"string","key$":"id"},"code":{"description":"The unique three to five-letter code for this set","type":"string","key$":"code"},"name":{"description":"The English name of the set","type":"string","key$":"name"},"uri":{"description":"A link to this set object on Scryfall's API","format":"uri","type":"string","key$":"uri"},"scryfall_uri":{"description":"A link to this set's page on Scryfall's website","format":"uri","type":"string","key$":"scryfall_uri"},"search_uri":{"description":"A link to search for cards in this set on Scryfall's API","format":"uri","type":"string","key$":"search_uri"},"released_at":{"description":"The date the set was released","format":"date","type":"string","key$":"released_at"},"set_type":{"description":"The type of set","type":"string","key$":"set_type"},"card_count":{"description":"The number of cards in this set","type":"integer","key$":"card_count"},"digital":{"description":"True if this set is only available digitally","type":"boolean","key$":"digital"},"icon_svg_uri":{"description":"A URI to an SVG file for this set's icon","format":"uri","type":"string","key$":"icon_svg_uri"}},"x-ref":"#/components/schemas/Set","index$":0}}}},"404":{"description":"Set not found","content":{"application/json":{"schema":{"type":"object","description":"An Error object represents a failure to complete an API request","properties":{"object":{"type":"string","enum":["error"],"description":"The object type"},"status":{"type":"integer","description":"An HTTP status code"},"code":{"type":"string","description":"A computer-friendly error code"},"details":{"type":"string","description":"A human-readable error message"},"type":{"type":"string","description":"A classification of the error type"},"warnings":{"type":"array","items":{"type":"string"},"description":"Non-failure warnings"}},"x-ref":"#/components/schemas/Error"}}}},"429":{"description":"Rate limit exceeded","content":{"application/json":{"schema":{"type":"object","description":"An Error object represents a failure to complete an API request","properties":{"object":{"type":"string","enum":["error"],"description":"The object type"},"status":{"type":"integer","description":"An HTTP status code"},"code":{"type":"string","description":"A computer-friendly error code"},"details":{"type":"string","description":"A human-readable error message"},"type":{"type":"string","description":"A classification of the error type"},"warnings":{"type":"array","items":{"type":"string"},"description":"Non-failure warnings"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"code","in":"path","description":"The three to five-letter set code","required":true,"schema":{"type":"string"},"example":"m19","index$":0}],"security":[],"securitySource":"definition"},"GET /sets/{id}":{"protocol":"http","operationId":"getSetById","responses":{"200":{"description":"Set found","content":{"application/json":{"schema":{"type":"object","description":"A Set object represents a group of related Magic cards","properties":{"id":{"description":"A unique ID for this set","format":"uuid","type":"string","key$":"id"},"code":{"description":"The unique three to five-letter code for this set","type":"string","key$":"code"},"name":{"description":"The English name of the set","type":"string","key$":"name"},"uri":{"description":"A link to this set object on Scryfall's API","format":"uri","type":"string","key$":"uri"},"scryfall_uri":{"description":"A link to this set's page on Scryfall's website","format":"uri","type":"string","key$":"scryfall_uri"},"search_uri":{"description":"A link to search for cards in this set on Scryfall's API","format":"uri","type":"string","key$":"search_uri"},"released_at":{"description":"The date the set was released","format":"date","type":"string","key$":"released_at"},"set_type":{"description":"The type of set","type":"string","key$":"set_type"},"card_count":{"description":"The number of cards in this set","type":"integer","key$":"card_count"},"digital":{"description":"True if this set is only available digitally","type":"boolean","key$":"digital"},"icon_svg_uri":{"description":"A URI to an SVG file for this set's icon","format":"uri","type":"string","key$":"icon_svg_uri"}},"x-ref":"#/components/schemas/Set","index$":0}}}},"404":{"description":"Set not found","content":{"application/json":{"schema":{"type":"object","description":"An Error object represents a failure to complete an API request","properties":{"object":{"type":"string","enum":["error"],"description":"The object type"},"status":{"type":"integer","description":"An HTTP status code"},"code":{"type":"string","description":"A computer-friendly error code"},"details":{"type":"string","description":"A human-readable error message"},"type":{"type":"string","description":"A classification of the error type"},"warnings":{"type":"array","items":{"type":"string"},"description":"Non-failure warnings"}},"x-ref":"#/components/schemas/Error"}}}},"429":{"description":"Rate limit exceeded","content":{"application/json":{"schema":{"type":"object","description":"An Error object represents a failure to complete an API request","properties":{"object":{"type":"string","enum":["error"],"description":"The object type"},"status":{"type":"integer","description":"An HTTP status code"},"code":{"type":"string","description":"A computer-friendly error code"},"details":{"type":"string","description":"A human-readable error message"},"type":{"type":"string","description":"A classification of the error type"},"warnings":{"type":"array","items":{"type":"string"},"description":"Non-failure warnings"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"id","in":"path","description":"The Scryfall ID of the set","required":true,"schema":{"type":"string","format":"uuid"},"index$":0}],"security":[],"securitySource":"definition"}})
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
  
