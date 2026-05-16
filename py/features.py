# Scryfall SDK feature factory

from feature.base_feature import ScryfallBaseFeature
from feature.test_feature import ScryfallTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ScryfallBaseFeature(),
        "test": lambda: ScryfallTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
