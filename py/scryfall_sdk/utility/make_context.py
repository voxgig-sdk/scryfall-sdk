# Scryfall SDK utility: make_context

from scryfall_sdk.core.context import ScryfallContext


def make_context_util(ctxmap, basectx):
    return ScryfallContext(ctxmap, basectx)
