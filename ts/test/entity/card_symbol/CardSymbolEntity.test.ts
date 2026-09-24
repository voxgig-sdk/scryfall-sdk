

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


describe('CardSymbolEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SCRYFALL_TEST_LIVE=TRUE.
  afterEach(liveDelay('SCRYFALL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ScryfallSDK.test()
    const ent = testsdk.CardSymbol()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SCRYFALL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'card_symbol.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"appears_in_mana_costs":{"a":true,"h":"Appears In Mana Costs","n":"appears_in_mana_costs","r":false,"sh":"True if this symbol appears in mana costs","t":"`$BOOLEAN`","key$":"appears_in_mana_costs","index$":0},"cmc":{"a":true,"h":"Cmc","n":"cmc","r":false,"sh":"The converted mana cost represented by this symbol","t":"`$NUMBER`","key$":"cmc","index$":1},"colors":{"a":true,"h":"Colors","n":"colors","r":false,"sh":"The colors of this symbol","t":"`$ARRAY`","key$":"colors","index$":2},"english":{"a":true,"h":"English","n":"english","r":false,"sh":"An English textual description of the symbol","t":"`$STRING`","key$":"english","index$":3},"funny":{"a":true,"h":"Funny","n":"funny","r":false,"sh":"True if this symbol is only used on funny cards","t":"`$BOOLEAN`","key$":"funny","index$":4},"loose_variant":{"a":true,"h":"Loose Variant","n":"loose_variant","r":false,"sh":"An alternate version of this symbol","t":"`$STRING`","key$":"loose_variant","index$":5},"object":{"a":true,"h":"Object","n":"object","r":false,"sh":"The object type","t":"`$STRING`","key$":"object","index$":6},"represents_mana":{"a":true,"h":"Represents Mana","n":"represents_mana","r":false,"sh":"True if this is a mana symbol","t":"`$BOOLEAN`","key$":"represents_mana","index$":7},"svg_uri":{"a":true,"fo":"uri","h":"Svg Uri","n":"svg_uri","r":false,"sh":"A URI to an SVG image for this symbol","t":"`$STRING`","key$":"svg_uri","index$":8},"symbol":{"a":true,"h":"Symbol","n":"symbol","r":false,"sh":"The plaintext symbol","t":"`$STRING`","key$":"symbol","index$":9},"transposable":{"a":true,"h":"Transposable","n":"transposable","r":false,"sh":"True if it's possible to write this symbol backwards","t":"`$BOOLEAN`","key$":"transposable","index$":10}},"name":"card_symbol","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /symbology","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/symbology","q":{},"r":{},"s":[{"lit":"symbology"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"card_symbol","name__orig":"card_symbol","Name":"CardSymbol","name_":"card_symbol","name-":"card-symbol","NAME":"CARD_SYMBOL","index$":3}, {"active":true,"entity":"card_symbol","key$":"BasicCardSymbolFlow","kind":"basic","name":"BasicCardSymbolFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"card_symbol_ref01"}}],"index$":0}]}, 'CardSymbol', {"GET /symbology":{"protocol":"http","operationId":"getAllSymbols","responses":{"200":{"description":"List of all card symbols","content":{"application/json":{"schema":{"type":"object","description":"A List object containing CardSymbol objects","properties":{"object":{"description":"The object type","enum":["list"],"key$":"object","type":"string"},"has_more":{"description":"True if this list is paginated and has more pages","key$":"has_more","type":"boolean"},"data":{"description":"An array of CardSymbol objects","items":{"description":"A Card Symbol object represents a illustrated symbol that may appear in card's mana cost or Oracle text","properties":{"appears_in_mana_costs":{"description":"True if this symbol appears in mana costs","type":"boolean","key$":"appears_in_mana_costs"},"cmc":{"description":"The converted mana cost represented by this symbol","nullable":true,"type":"number","key$":"cmc"},"colors":{"description":"The colors of this symbol","items":{"type":"string"},"type":"array","key$":"colors"},"english":{"description":"An English textual description of the symbol","type":"string","key$":"english"},"funny":{"description":"True if this symbol is only used on funny cards","type":"boolean","key$":"funny"},"loose_variant":{"description":"An alternate version of this symbol","nullable":true,"type":"string","key$":"loose_variant"},"object":{"description":"The object type","enum":["card_symbol"],"type":"string","key$":"object"},"represents_mana":{"description":"True if this is a mana symbol","type":"boolean","key$":"represents_mana"},"svg_uri":{"description":"A URI to an SVG image for this symbol","format":"uri","nullable":true,"type":"string","key$":"svg_uri"},"symbol":{"description":"The plaintext symbol","type":"string","key$":"symbol"},"transposable":{"description":"True if it's possible to write this symbol backwards","type":"boolean","key$":"transposable"}},"type":"object","x-ref":"#/components/schemas/CardSymbol","index$":0},"key$":"data","type":"array"}},"x-ref":"#/components/schemas/CardSymbolList"}}}},"429":{"description":"Rate limit exceeded","content":{"application/json":{"schema":{"type":"object","description":"An Error object represents a failure to complete an API request","properties":{"object":{"type":"string","enum":["error"],"description":"The object type"},"status":{"type":"integer","description":"An HTTP status code"},"code":{"type":"string","description":"A computer-friendly error code"},"details":{"type":"string","description":"A human-readable error message"},"type":{"type":"string","description":"A classification of the error type"},"warnings":{"type":"array","items":{"type":"string"},"description":"Non-failure warnings"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"security":[],"securitySource":"definition"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let card_symbol_ref01_data = Object.values(setup.data.existing.card_symbol)[0] as any

    // LIST
    const card_symbol_ref01_ent = client.CardSymbol()
    const card_symbol_ref01_match: any = {}

    const card_symbol_ref01_list = (await card_symbol_ref01_ent.list(card_symbol_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/card_symbol/CardSymbolTestData.json')

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
    ['card_symbol01','card_symbol02','card_symbol03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SCRYFALL_TEST_CARD_SYMBOL_ENTID': idmap,
    'SCRYFALL_TEST_LIVE': 'FALSE',
    'SCRYFALL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SCRYFALL_TEST_CARD_SYMBOL_ENTID']

  const live = 'TRUE' === env.SCRYFALL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SCRYFALL_TEST_CARD_SYMBOL_ENTID']
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
  
