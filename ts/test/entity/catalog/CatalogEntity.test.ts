

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


describe('CatalogEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SCRYFALL_TEST_LIVE=TRUE.
  afterEach(liveDelay('SCRYFALL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ScryfallSDK.test()
    const ent = testsdk.Catalog()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SCRYFALL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'catalog.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":false,"sh":"An array of datapoints","t":"`$ARRAY`","key$":"data","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"object":{"a":true,"h":"Object","n":"object","r":false,"sh":"The object type","t":"`$STRING`","key$":"object","index$":2},"total_values":{"a":true,"h":"Total Values","n":"total_values","r":false,"sh":"The number of items in the data array","t":"`$INTEGER`","key$":"total_values","index$":3},"uri":{"a":true,"fo":"uri","h":"Uri","n":"uri","r":false,"sh":"A link to this catalog on Scryfall's API","t":"`$STRING`","key$":"uri","index$":4}},"id":{"field":"id","name":"id"},"name":"catalog","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /catalog/{catalog_name}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"catalog_name","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/catalog/{catalog_name}","q":{"exist":["id"]},"r":{"param":{"catalog_name":"id"}},"s":[{"lit":"catalog"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"catalog","name__orig":"catalog","Name":"Catalog","name_":"catalog","name-":"catalog","NAME":"CATALOG","index$":4}, {"active":true,"entity":"catalog","key$":"BasicCatalogFlow","kind":"basic","name":"BasicCatalogFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"catalog_ref01","srcdatavar":"catalog_ref01_data","suffix":"_dt0"},"m":{"id":"catalog01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-catalog_ref01"}}],"index$":0}]}, 'Catalog', {"GET /catalog/{catalog_name}":{"protocol":"http","operationId":"getCatalog","responses":{"200":{"description":"Catalog values","content":{"application/json":{"schema":{"type":"object","description":"A Catalog object contains an array of Magic datapoints","properties":{"object":{"type":"string","enum":["catalog"],"description":"The object type","key$":"object"},"uri":{"type":"string","format":"uri","description":"A link to this catalog on Scryfall's API","key$":"uri"},"total_values":{"type":"integer","description":"The number of items in the data array","key$":"total_values"},"data":{"type":"array","items":{"type":"string"},"description":"An array of datapoints","key$":"data"}},"x-ref":"#/components/schemas/Catalog","index$":0}}}},"404":{"description":"Catalog not found","content":{"application/json":{"schema":{"type":"object","description":"An Error object represents a failure to complete an API request","properties":{"object":{"type":"string","enum":["error"],"description":"The object type"},"status":{"type":"integer","description":"An HTTP status code"},"code":{"type":"string","description":"A computer-friendly error code"},"details":{"type":"string","description":"A human-readable error message"},"type":{"type":"string","description":"A classification of the error type"},"warnings":{"type":"array","items":{"type":"string"},"description":"Non-failure warnings"}},"x-ref":"#/components/schemas/Error"}}}},"429":{"description":"Rate limit exceeded","content":{"application/json":{"schema":{"type":"object","description":"An Error object represents a failure to complete an API request","properties":{"object":{"type":"string","enum":["error"],"description":"The object type"},"status":{"type":"integer","description":"An HTTP status code"},"code":{"type":"string","description":"A computer-friendly error code"},"details":{"type":"string","description":"A human-readable error message"},"type":{"type":"string","description":"A classification of the error type"},"warnings":{"type":"array","items":{"type":"string"},"description":"Non-failure warnings"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"catalog_name","in":"path","description":"The catalog type to retrieve","required":true,"schema":{"type":"string","enum":["card-names","artist-names","word-bank","creature-types","planeswalker-types","land-types","artifact-types","enchantment-types","spell-types","powers","toughnesses","loyalties","watermarks","keyword-abilities","keyword-actions","ability-words"]},"index$":0}],"security":[],"securitySource":"definition"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let catalog_ref01_data = Object.values(setup.data.existing.catalog)[0] as any

    // LOAD
    const catalog_ref01_ent = client.Catalog()
    const catalog_ref01_match_dt0: any = {}
    catalog_ref01_match_dt0.id = catalog_ref01_data.id
    const catalog_ref01_data_dt0 = (await catalog_ref01_ent.load(catalog_ref01_match_dt0)).data()
    assert(catalog_ref01_data_dt0.id === catalog_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/catalog/CatalogTestData.json')

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
    ['catalog01','catalog02','catalog03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SCRYFALL_TEST_CATALOG_ENTID': idmap,
    'SCRYFALL_TEST_LIVE': 'FALSE',
    'SCRYFALL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SCRYFALL_TEST_CATALOG_ENTID']

  const live = 'TRUE' === env.SCRYFALL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SCRYFALL_TEST_CATALOG_ENTID']
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
  
