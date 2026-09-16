

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"uuid","name":"id","req":false,"short":"A unique ID for this migration","type":"`$STRING`","index$":0},{"active":true,"name":"migration_strategy","req":false,"short":"The type of migration strategy","type":"`$STRING`","index$":1},{"active":true,"format":"uuid","name":"new_scryfall_id","req":false,"short":"The updated Scryfall ID","type":"`$STRING`","index$":2},{"active":true,"name":"object","req":false,"short":"The object type","type":"`$STRING`","index$":3},{"active":true,"format":"uuid","name":"old_scryfall_id","req":false,"short":"The original Scryfall ID","type":"`$STRING`","index$":4},{"active":true,"format":"date-time","name":"performed_at","req":false,"short":"The date this migration was performed","type":"`$STRING`","index$":5},{"active":true,"format":"uri","name":"uri","req":false,"short":"A link to this migration on Scryfall's API","type":"`$STRING`","index$":6}],"id":{"field":"id","name":"id"},"name":"migration","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /migrations","json":"{\"operationId\":\"getCardMigrations\",\"parameters\":[{\"description\":\"The page number to return\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A List object containing Migration objects\",\"properties\":{\"data\":{\"description\":\"An array of Migration objects\",\"items\":{\"description\":\"A Migration object describes a change in Scryfall's database\",\"properties\":{\"id\":{\"description\":\"A unique ID for this migration\",\"format\":\"uuid\",\"type\":\"string\"},\"migration_strategy\":{\"description\":\"The type of migration strategy\",\"type\":\"string\"},\"new_scryfall_id\":{\"description\":\"The updated Scryfall ID\",\"format\":\"uuid\",\"nullable\":true,\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"migration\"],\"type\":\"string\"},\"old_scryfall_id\":{\"description\":\"The original Scryfall ID\",\"format\":\"uuid\",\"type\":\"string\"},\"performed_at\":{\"description\":\"The date this migration was performed\",\"format\":\"date-time\",\"type\":\"string\"},\"uri\":{\"description\":\"A link to this migration on Scryfall's API\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"has_more\":{\"description\":\"True if this list is paginated and has more pages\",\"type\":\"boolean\"},\"next_page\":{\"description\":\"The URL for the next page of results\",\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"list\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"List of card migrations\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[],\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/migrations","segments":[{"lit":"migrations"}],"select":{"exist":["page"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"migration","name__orig":"migration","Name":"Migration","name_":"migration","name-":"migration","NAME":"MIGRATION","index$":6}, {"active":true,"entity":"migration","key$":"BasicMigrationFlow","kind":"basic","name":"BasicMigrationFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"migration_ref01"}}],"index$":0}]}, 'Migration')
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
  
