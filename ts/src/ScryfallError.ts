
import { Context } from './Context'


class ScryfallError extends Error {

  isScryfallError = true

  sdk = 'Scryfall'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  ScryfallError
}

