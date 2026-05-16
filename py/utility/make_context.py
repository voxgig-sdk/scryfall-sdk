# Scryfall SDK utility: make_context

from core.context import ScryfallContext


def make_context_util(ctxmap, basectx):
    return ScryfallContext(ctxmap, basectx)
