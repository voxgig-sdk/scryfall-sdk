

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"data","req":false,"short":"An array of datapoints","type":"`$ARRAY`","index$":0},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"object","req":false,"short":"The object type","type":"`$STRING`","index$":2},{"active":true,"name":"total_values","req":false,"short":"The number of items in the data array","type":"`$INTEGER`","index$":3},{"active":true,"format":"uri","name":"uri","req":false,"short":"A link to this catalog on Scryfall's API","type":"`$STRING`","index$":4}],"id":{"field":"id","name":"id"},"name":"catalog","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"catalog_name","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /catalog/{catalog_name}","json":"{\"operationId\":\"getCatalog\",\"parameters\":[{\"description\":\"The catalog type to retrieve\",\"in\":\"path\",\"name\":\"catalog_name\",\"required\":true,\"schema\":{\"enum\":[\"card-names\",\"artist-names\",\"word-bank\",\"creature-types\",\"planeswalker-types\",\"land-types\",\"artifact-types\",\"enchantment-types\",\"spell-types\",\"powers\",\"toughnesses\",\"loyalties\",\"watermarks\",\"keyword-abilities\",\"keyword-actions\",\"ability-words\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A Catalog object contains an array of Magic datapoints\",\"properties\":{\"data\":{\"description\":\"An array of datapoints\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"catalog\"],\"type\":\"string\"},\"total_values\":{\"description\":\"The number of items in the data array\",\"type\":\"integer\"},\"uri\":{\"description\":\"A link to this catalog on Scryfall's API\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Catalog values\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Catalog not found\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[],\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/catalog/{catalog_name}","rename":{"param":{"catalog_name":"id"}},"segments":[{"lit":"catalog"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"catalog","name__orig":"catalog","Name":"Catalog","name_":"catalog","name-":"catalog","NAME":"CATALOG","index$":4}, {"active":true,"entity":"catalog","key$":"BasicCatalogFlow","kind":"basic","name":"BasicCatalogFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"catalog_ref01","srcdatavar":"catalog_ref01_data","suffix":"_dt0"},"match":{"id":"catalog01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-catalog_ref01"}}],"index$":0}]}, 'Catalog')
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
  
