

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


describe('MigrationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SCRYFALL_TEST_LIVE=TRUE.
  afterEach(liveDelay('SCRYFALL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ScryfallSDK.test()
    const ent = testsdk.Migration()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SCRYFALL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'migration.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":false,"sh":"A unique ID for this migration","t":"`$STRING`","key$":"id","index$":0},"migration_strategy":{"a":true,"h":"Migration Strategy","n":"migration_strategy","r":false,"sh":"The type of migration strategy","t":"`$STRING`","key$":"migration_strategy","index$":1},"new_scryfall_id":{"a":true,"fo":"uuid","h":"New Scryfall Id","n":"new_scryfall_id","r":false,"sh":"The updated Scryfall ID","t":"`$STRING`","key$":"new_scryfall_id","index$":2},"object":{"a":true,"h":"Object","n":"object","r":false,"sh":"The object type","t":"`$STRING`","key$":"object","index$":3},"old_scryfall_id":{"a":true,"fo":"uuid","h":"Old Scryfall Id","n":"old_scryfall_id","r":false,"sh":"The original Scryfall ID","t":"`$STRING`","key$":"old_scryfall_id","index$":4},"performed_at":{"a":true,"fo":"date-time","h":"Performed At","n":"performed_at","r":false,"sh":"The date this migration was performed","t":"`$STRING`","key$":"performed_at","index$":5},"uri":{"a":true,"fo":"uri","h":"Uri","n":"uri","r":false,"sh":"A link to this migration on Scryfall's API","t":"`$STRING`","key$":"uri","index$":6}},"id":{"field":"id","name":"id"},"name":"migration","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /migrations","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/migrations","q":{"exist":["page"]},"r":{},"s":[{"lit":"migrations"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"migration","name__orig":"migration","Name":"Migration","name_":"migration","name-":"migration","NAME":"MIGRATION","index$":6}, {"active":true,"entity":"migration","key$":"BasicMigrationFlow","kind":"basic","name":"BasicMigrationFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"migration_ref01"}}],"index$":0}]}, 'Migration', {"GET /migrations":{"protocol":"http","operationId":"getCardMigrations","responses":{"200":{"description":"List of card migrations","content":{"application/json":{"schema":{"type":"object","description":"A List object containing Migration objects","properties":{"object":{"description":"The object type","enum":["list"],"key$":"object","type":"string"},"has_more":{"description":"True if this list is paginated and has more pages","key$":"has_more","type":"boolean"},"next_page":{"description":"The URL for the next page of results","format":"uri","key$":"next_page","nullable":true,"type":"string"},"data":{"description":"An array of Migration objects","items":{"description":"A Migration object describes a change in Scryfall's database","properties":{"id":{"description":"A unique ID for this migration","format":"uuid","type":"string","key$":"id"},"migration_strategy":{"description":"The type of migration strategy","type":"string","key$":"migration_strategy"},"new_scryfall_id":{"description":"The updated Scryfall ID","format":"uuid","nullable":true,"type":"string","key$":"new_scryfall_id"},"object":{"description":"The object type","enum":["migration"],"type":"string","key$":"object"},"old_scryfall_id":{"description":"The original Scryfall ID","format":"uuid","type":"string","key$":"old_scryfall_id"},"performed_at":{"description":"The date this migration was performed","format":"date-time","type":"string","key$":"performed_at"},"uri":{"description":"A link to this migration on Scryfall's API","format":"uri","type":"string","key$":"uri"}},"type":"object","x-ref":"#/components/schemas/Migration","index$":0},"key$":"data","type":"array"}},"x-ref":"#/components/schemas/MigrationList"}}}},"429":{"description":"Rate limit exceeded","content":{"application/json":{"schema":{"type":"object","description":"An Error object represents a failure to complete an API request","properties":{"object":{"type":"string","enum":["error"],"description":"The object type"},"status":{"type":"integer","description":"An HTTP status code"},"code":{"type":"string","description":"A computer-friendly error code"},"details":{"type":"string","description":"A human-readable error message"},"type":{"type":"string","description":"A classification of the error type"},"warnings":{"type":"array","items":{"type":"string"},"description":"Non-failure warnings"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"page","in":"query","description":"The page number to return","required":false,"schema":{"type":"integer","minimum":1,"default":1},"index$":0}],"security":[],"securitySource":"definition"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let migration_ref01_data = Object.values(setup.data.existing.migration)[0] as any

    // LIST
    const migration_ref01_ent = client.Migration()
    const migration_ref01_match: any = {}

    const migration_ref01_list = (await migration_ref01_ent.list(migration_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/migration/MigrationTestData.json')

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
    ['migration01','migration02','migration03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SCRYFALL_TEST_MIGRATION_ENTID': idmap,
    'SCRYFALL_TEST_LIVE': 'FALSE',
    'SCRYFALL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SCRYFALL_TEST_MIGRATION_ENTID']

  const live = 'TRUE' === env.SCRYFALL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SCRYFALL_TEST_MIGRATION_ENTID']
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
  
