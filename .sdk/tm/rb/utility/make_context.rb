# Scryfall SDK utility: make_context
require_relative '../core/context'
module ScryfallUtilities
  MakeContext = ->(ctxmap, basectx) {
    ScryfallContext.new(ctxmap, basectx)
  }
end
