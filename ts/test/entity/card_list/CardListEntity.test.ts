

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


describe('CardListEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SCRYFALL_TEST_LIVE=TRUE.
  afterEach(liveDelay('SCRYFALL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ScryfallSDK.test()
    const ent = testsdk.CardList()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SCRYFALL_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'card_list.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"artist","req":false,"short":"The name of the illustrator of this card","type":"`$STRING`","index$":0},{"active":true,"name":"cmc","req":false,"short":"The card's converted mana cost","type":"`$NUMBER`","index$":1},{"active":true,"name":"collector_number","req":false,"short":"This card's collector number","type":"`$STRING`","index$":2},{"active":true,"name":"color_identity","req":false,"short":"This card's color identity","type":"`$ARRAY`","index$":3},{"active":true,"name":"colors","req":false,"short":"This card's colors","type":"`$ARRAY`","index$":4},{"active":true,"name":"data","req":false,"short":"An array of the requested objects","type":"`$ARRAY`","index$":5},{"active":true,"name":"has_more","req":false,"short":"True if this list is paginated and has more pages","type":"`$BOOLEAN`","index$":6},{"active":true,"format":"uuid","name":"id","req":false,"short":"A unique ID for this card in Scryfall's database","type":"`$STRING`","index$":7},{"active":true,"name":"identifiers","req":true,"type":"`$ARRAY`","index$":8},{"active":true,"name":"image_uris","req":false,"short":"An object containing URIs to this card's imagery","type":"`$OBJECT`","index$":9},{"active":true,"name":"lang","req":false,"short":"The language code for this printing","type":"`$STRING`","index$":10},{"active":true,"name":"layout","req":false,"short":"A code for this card's layout","type":"`$STRING`","index$":11},{"active":true,"name":"legalities","req":false,"short":"An object describing the legality of this card","type":"`$OBJECT`","index$":12},{"active":true,"name":"loyalty","req":false,"short":"This card's loyalty (for planeswalkers)","type":"`$STRING`","index$":13},{"active":true,"name":"mana_cost","req":false,"short":"The mana cost for this card","type":"`$STRING`","index$":14},{"active":true,"name":"name","req":false,"short":"The name of this card","type":"`$STRING`","index$":15},{"active":true,"format":"uri","name":"next_page","req":false,"short":"The URL for the next page of results","type":"`$STRING`","index$":16},{"active":true,"name":"object","req":false,"short":"The object type","type":"`$STRING`","index$":17},{"active":true,"format":"uuid","name":"oracle_id","req":false,"short":"A unique ID for this card's oracle identity","type":"`$STRING`","index$":18},{"active":true,"name":"oracle_text","req":false,"short":"The Oracle text for this card","type":"`$STRING`","index$":19},{"active":true,"name":"power","req":false,"short":"This card's power (for creatures)","type":"`$STRING`","index$":20},{"active":true,"name":"prices","req":false,"short":"An object containing daily price information for this card","type":"`$OBJECT`","index$":21},{"active":true,"name":"rarity","req":false,"short":"This card's rarity","type":"`$STRING`","index$":22},{"active":true,"format":"date","name":"released_at","req":false,"short":"The date this card was first released","type":"`$STRING`","index$":23},{"active":true,"format":"uri","name":"scryfall_uri","req":false,"short":"A link to this card's page on Scryfall's website","type":"`$STRING`","index$":24},{"active":true,"name":"set","req":false,"short":"This card's set code","type":"`$STRING`","index$":25},{"active":true,"name":"set_name","req":false,"short":"This card's full set name","type":"`$STRING`","index$":26},{"active":true,"name":"total_cards","req":false,"short":"The total number of cards found","type":"`$INTEGER`","index$":27},{"active":true,"name":"toughness","req":false,"short":"This card's toughness (for creatures)","type":"`$STRING`","index$":28},{"active":true,"name":"type_line","req":false,"short":"The type line of this card","type":"`$STRING`","index$":29},{"active":true,"format":"uri","name":"uri","req":false,"short":"A link to this card object on Scryfall's API","type":"`$STRING`","index$":30}],"id":{"field":"id","name":"id"},"name":"card_list","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /cards/collection","json":"{\"operationId\":\"getCardCollection\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"identifiers\":{\"items\":{\"properties\":{\"collector_number\":{\"type\":\"string\"},\"id\":{\"format\":\"uuid\",\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"set\":{\"type\":\"string\"}},\"type\":\"object\"},\"maxItems\":75,\"type\":\"array\"}},\"required\":[\"identifiers\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A List object containing Card objects\",\"properties\":{\"data\":{\"description\":\"An array of the requested objects\",\"items\":{\"description\":\"Card objects represent individual Magic: The Gathering cards\",\"properties\":{\"artist\":{\"description\":\"The name of the illustrator of this card\",\"type\":\"string\"},\"cmc\":{\"description\":\"The card's converted mana cost\",\"type\":\"number\"},\"collector_number\":{\"description\":\"This card's collector number\",\"type\":\"string\"},\"color_identity\":{\"description\":\"This card's color identity\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"colors\":{\"description\":\"This card's colors\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"id\":{\"description\":\"A unique ID for this card in Scryfall's database\",\"format\":\"uuid\",\"type\":\"string\"},\"image_uris\":{\"description\":\"An object containing URIs to this card's imagery\",\"properties\":{\"art_crop\":{\"format\":\"uri\",\"type\":\"string\"},\"border_crop\":{\"format\":\"uri\",\"type\":\"string\"},\"large\":{\"format\":\"uri\",\"type\":\"string\"},\"normal\":{\"format\":\"uri\",\"type\":\"string\"},\"png\":{\"format\":\"uri\",\"type\":\"string\"},\"small\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"lang\":{\"description\":\"The language code for this printing\",\"type\":\"string\"},\"layout\":{\"description\":\"A code for this card's layout\",\"type\":\"string\"},\"legalities\":{\"additionalProperties\":{\"enum\":[\"legal\",\"not_legal\",\"restricted\",\"banned\"],\"type\":\"string\"},\"description\":\"An object describing the legality of this card\",\"type\":\"object\"},\"loyalty\":{\"description\":\"This card's loyalty (for planeswalkers)\",\"type\":\"string\"},\"mana_cost\":{\"description\":\"The mana cost for this card\",\"type\":\"string\"},\"name\":{\"description\":\"The name of this card\",\"type\":\"string\"},\"oracle_id\":{\"description\":\"A unique ID for this card's oracle identity\",\"format\":\"uuid\",\"type\":\"string\"},\"oracle_text\":{\"description\":\"The Oracle text for this card\",\"type\":\"string\"},\"power\":{\"description\":\"This card's power (for creatures)\",\"type\":\"string\"},\"prices\":{\"description\":\"An object containing daily price information for this card\",\"properties\":{\"eur\":{\"nullable\":true,\"type\":\"string\"},\"tix\":{\"nullable\":true,\"type\":\"string\"},\"usd\":{\"nullable\":true,\"type\":\"string\"},\"usd_foil\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"rarity\":{\"description\":\"This card's rarity\",\"enum\":[\"common\",\"uncommon\",\"rare\",\"mythic\",\"special\",\"bonus\"],\"type\":\"string\"},\"released_at\":{\"description\":\"The date this card was first released\",\"format\":\"date\",\"type\":\"string\"},\"scryfall_uri\":{\"description\":\"A link to this card's page on Scryfall's website\",\"format\":\"uri\",\"type\":\"string\"},\"set\":{\"description\":\"This card's set code\",\"type\":\"string\"},\"set_name\":{\"description\":\"This card's full set name\",\"type\":\"string\"},\"toughness\":{\"description\":\"This card's toughness (for creatures)\",\"type\":\"string\"},\"type_line\":{\"description\":\"The type line of this card\",\"type\":\"string\"},\"uri\":{\"description\":\"A link to this card object on Scryfall's API\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"has_more\":{\"description\":\"True if this list is paginated and has more pages\",\"type\":\"boolean\"},\"next_page\":{\"description\":\"The URL for the next page of results\",\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"list\"],\"type\":\"string\"},\"total_cards\":{\"description\":\"The total number of cards found\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Collection of cards\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Bad request\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[],\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/cards/collection","segments":[{"lit":"cards"},{"lit":"collection"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"auto","kind":"query","name":"dir","orig":"dir","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":false,"kind":"query","name":"include_extra","orig":"include_extra","reqd":false,"type":"`$BOOLEAN`","index$":1},{"active":true,"example":"name","kind":"query","name":"order","orig":"order","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":3},{"active":true,"example":"c:red pow:3","kind":"query","name":"q","orig":"q","reqd":true,"type":"`$STRING`","index$":4},{"active":true,"example":"cards","kind":"query","name":"unique","orig":"unique","reqd":false,"type":"`$STRING`","index$":5}]},"contract":{"id":"GET /cards/search","json":"{\"operationId\":\"searchCards\",\"parameters\":[{\"description\":\"The fulltext search query\",\"example\":\"c:red pow:3\",\"in\":\"query\",\"name\":\"q\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The strategy for omitting similar cards\",\"in\":\"query\",\"name\":\"unique\",\"required\":false,\"schema\":{\"default\":\"cards\",\"enum\":[\"cards\",\"art\",\"prints\"],\"type\":\"string\"}},{\"description\":\"The method to sort returned cards\",\"in\":\"query\",\"name\":\"order\",\"required\":false,\"schema\":{\"default\":\"name\",\"enum\":[\"name\",\"set\",\"released\",\"rarity\",\"color\",\"usd\",\"tix\",\"eur\",\"cmc\",\"power\",\"toughness\",\"edhrec\",\"artist\"],\"type\":\"string\"}},{\"description\":\"The direction to sort cards\",\"in\":\"query\",\"name\":\"dir\",\"required\":false,\"schema\":{\"default\":\"auto\",\"enum\":[\"auto\",\"asc\",\"desc\"],\"type\":\"string\"}},{\"description\":\"If true, extra cards (tokens, planes, etc) will be included\",\"in\":\"query\",\"name\":\"include_extras\",\"required\":false,\"schema\":{\"default\":false,\"type\":\"boolean\"}},{\"description\":\"The page number to return\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A List object containing Card objects\",\"properties\":{\"data\":{\"description\":\"An array of the requested objects\",\"items\":{\"description\":\"Card objects represent individual Magic: The Gathering cards\",\"properties\":{\"artist\":{\"description\":\"The name of the illustrator of this card\",\"type\":\"string\"},\"cmc\":{\"description\":\"The card's converted mana cost\",\"type\":\"number\"},\"collector_number\":{\"description\":\"This card's collector number\",\"type\":\"string\"},\"color_identity\":{\"description\":\"This card's color identity\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"colors\":{\"description\":\"This card's colors\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"id\":{\"description\":\"A unique ID for this card in Scryfall's database\",\"format\":\"uuid\",\"type\":\"string\"},\"image_uris\":{\"description\":\"An object containing URIs to this card's imagery\",\"properties\":{\"art_crop\":{\"format\":\"uri\",\"type\":\"string\"},\"border_crop\":{\"format\":\"uri\",\"type\":\"string\"},\"large\":{\"format\":\"uri\",\"type\":\"string\"},\"normal\":{\"format\":\"uri\",\"type\":\"string\"},\"png\":{\"format\":\"uri\",\"type\":\"string\"},\"small\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"lang\":{\"description\":\"The language code for this printing\",\"type\":\"string\"},\"layout\":{\"description\":\"A code for this card's layout\",\"type\":\"string\"},\"legalities\":{\"additionalProperties\":{\"enum\":[\"legal\",\"not_legal\",\"restricted\",\"banned\"],\"type\":\"string\"},\"description\":\"An object describing the legality of this card\",\"type\":\"object\"},\"loyalty\":{\"description\":\"This card's loyalty (for planeswalkers)\",\"type\":\"string\"},\"mana_cost\":{\"description\":\"The mana cost for this card\",\"type\":\"string\"},\"name\":{\"description\":\"The name of this card\",\"type\":\"string\"},\"oracle_id\":{\"description\":\"A unique ID for this card's oracle identity\",\"format\":\"uuid\",\"type\":\"string\"},\"oracle_text\":{\"description\":\"The Oracle text for this card\",\"type\":\"string\"},\"power\":{\"description\":\"This card's power (for creatures)\",\"type\":\"string\"},\"prices\":{\"description\":\"An object containing daily price information for this card\",\"properties\":{\"eur\":{\"nullable\":true,\"type\":\"string\"},\"tix\":{\"nullable\":true,\"type\":\"string\"},\"usd\":{\"nullable\":true,\"type\":\"string\"},\"usd_foil\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"rarity\":{\"description\":\"This card's rarity\",\"enum\":[\"common\",\"uncommon\",\"rare\",\"mythic\",\"special\",\"bonus\"],\"type\":\"string\"},\"released_at\":{\"description\":\"The date this card was first released\",\"format\":\"date\",\"type\":\"string\"},\"scryfall_uri\":{\"description\":\"A link to this card's page on Scryfall's website\",\"format\":\"uri\",\"type\":\"string\"},\"set\":{\"description\":\"This card's set code\",\"type\":\"string\"},\"set_name\":{\"description\":\"This card's full set name\",\"type\":\"string\"},\"toughness\":{\"description\":\"This card's toughness (for creatures)\",\"type\":\"string\"},\"type_line\":{\"description\":\"The type line of this card\",\"type\":\"string\"},\"uri\":{\"description\":\"A link to this card object on Scryfall's API\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"has_more\":{\"description\":\"True if this list is paginated and has more pages\",\"type\":\"boolean\"},\"next_page\":{\"description\":\"The URL for the next page of results\",\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"list\"],\"type\":\"string\"},\"total_cards\":{\"description\":\"The total number of cards found\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful search results\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid search query\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An Error object represents a failure to complete an API request\",\"properties\":{\"code\":{\"description\":\"A computer-friendly error code\",\"type\":\"string\"},\"details\":{\"description\":\"A human-readable error message\",\"type\":\"string\"},\"object\":{\"description\":\"The object type\",\"enum\":[\"error\"],\"type\":\"string\"},\"status\":{\"description\":\"An HTTP status code\",\"type\":\"integer\"},\"type\":{\"description\":\"A classification of the error type\",\"type\":\"string\"},\"warnings\":{\"description\":\"Non-failure warnings\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[],\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cards/search","segments":[{"lit":"cards"},{"lit":"search"}],"select":{"exist":["dir","include_extra","order","page","q","unique"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"card_list","name__orig":"card_list","Name":"CardList","name_":"card_list","name-":"card-list","NAME":"CARD_LIST","index$":2}, {"active":true,"entity":"card_list","key$":"BasicCardListFlow","kind":"basic","name":"BasicCardListFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"card_list_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"card_list_ref01"}}],"index$":1}]}, 'CardList')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const card_list_ref01_ent = client.CardList()
    let card_list_ref01_data = setup.data.new.card_list['card_list_ref01']

    card_list_ref01_data = (await card_list_ref01_ent.create(card_list_ref01_data)).data()
    assert(null != card_list_ref01_data.id)


    // LIST
    const card_list_ref01_match: any = {}

    const card_list_ref01_list = (await card_list_ref01_ent.list(card_list_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(card_list_ref01_list, { id: card_list_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/card_list/CardListTestData.json')

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
    ['card_list01','card_list02','card_list03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SCRYFALL_TEST_CARD_LIST_ENTID': idmap,
    'SCRYFALL_TEST_LIVE': 'FALSE',
    'SCRYFALL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SCRYFALL_TEST_CARD_LIST_ENTID']

  const live = 'TRUE' === env.SCRYFALL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SCRYFALL_TEST_CARD_LIST_ENTID']
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
  
