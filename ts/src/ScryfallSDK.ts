// Scryfall Ts SDK

import { BulkDataEntity } from './entity/BulkDataEntity'
import { CardEntity } from './entity/CardEntity'
import { CardListEntity } from './entity/CardListEntity'
import { CardSymbolListEntity } from './entity/CardSymbolListEntity'
import { CatalogEntity } from './entity/CatalogEntity'
import { ManaCostEntity } from './entity/ManaCostEntity'
import { MigrationEntity } from './entity/MigrationEntity'
import { RulingEntity } from './entity/RulingEntity'
import { SetEntity } from './entity/SetEntity'

export type * from './ScryfallTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { ScryfallEntityBase } from './ScryfallEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class ScryfallSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _bulk_data?: BulkDataEntity

  // Idiomatic facade: `client.bulk_data.list()` / `client.bulk_data.load({ id })`.
  get bulk_data(): BulkDataEntity {
    return (this._bulk_data ??= new BulkDataEntity(this, undefined))
  }

  /** @deprecated Use `client.bulk_data` instead. */
  BulkData(data?: any) {
    const self = this
    return new BulkDataEntity(self,data)
  }


  _card?: CardEntity

  // Idiomatic facade: `client.card.list()` / `client.card.load({ id })`.
  get card(): CardEntity {
    return (this._card ??= new CardEntity(this, undefined))
  }

  /** @deprecated Use `client.card` instead. */
  Card(data?: any) {
    const self = this
    return new CardEntity(self,data)
  }


  _card_list?: CardListEntity

  // Idiomatic facade: `client.card_list.list()` / `client.card_list.load({ id })`.
  get card_list(): CardListEntity {
    return (this._card_list ??= new CardListEntity(this, undefined))
  }

  /** @deprecated Use `client.card_list` instead. */
  CardList(data?: any) {
    const self = this
    return new CardListEntity(self,data)
  }


  _card_symbol_list?: CardSymbolListEntity

  // Idiomatic facade: `client.card_symbol_list.list()` / `client.card_symbol_list.load({ id })`.
  get card_symbol_list(): CardSymbolListEntity {
    return (this._card_symbol_list ??= new CardSymbolListEntity(this, undefined))
  }

  /** @deprecated Use `client.card_symbol_list` instead. */
  CardSymbolList(data?: any) {
    const self = this
    return new CardSymbolListEntity(self,data)
  }


  _catalog?: CatalogEntity

  // Idiomatic facade: `client.catalog.list()` / `client.catalog.load({ id })`.
  get catalog(): CatalogEntity {
    return (this._catalog ??= new CatalogEntity(this, undefined))
  }

  /** @deprecated Use `client.catalog` instead. */
  Catalog(data?: any) {
    const self = this
    return new CatalogEntity(self,data)
  }


  _mana_cost?: ManaCostEntity

  // Idiomatic facade: `client.mana_cost.list()` / `client.mana_cost.load({ id })`.
  get mana_cost(): ManaCostEntity {
    return (this._mana_cost ??= new ManaCostEntity(this, undefined))
  }

  /** @deprecated Use `client.mana_cost` instead. */
  ManaCost(data?: any) {
    const self = this
    return new ManaCostEntity(self,data)
  }


  _migration?: MigrationEntity

  // Idiomatic facade: `client.migration.list()` / `client.migration.load({ id })`.
  get migration(): MigrationEntity {
    return (this._migration ??= new MigrationEntity(this, undefined))
  }

  /** @deprecated Use `client.migration` instead. */
  Migration(data?: any) {
    const self = this
    return new MigrationEntity(self,data)
  }


  _ruling?: RulingEntity

  // Idiomatic facade: `client.ruling.list()` / `client.ruling.load({ id })`.
  get ruling(): RulingEntity {
    return (this._ruling ??= new RulingEntity(this, undefined))
  }

  /** @deprecated Use `client.ruling` instead. */
  Ruling(data?: any) {
    const self = this
    return new RulingEntity(self,data)
  }


  _set?: SetEntity

  // Idiomatic facade: `client.set.list()` / `client.set.load({ id })`.
  get set(): SetEntity {
    return (this._set ??= new SetEntity(this, undefined))
  }

  /** @deprecated Use `client.set` instead. */
  Set(data?: any) {
    const self = this
    return new SetEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new ScryfallSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return ScryfallSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'Scryfall' }
  }

  toString() {
    return 'Scryfall ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = ScryfallSDK


export {
  stdutil,

  BaseFeature,
  ScryfallEntityBase,

  ScryfallSDK,
  SDK,
}


