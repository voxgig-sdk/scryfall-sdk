# Scryfall SDK feature factory

from scryfall_sdk.feature.base_feature import ScryfallBaseFeature
from scryfall_sdk.feature.ratelimit_feature import ScryfallRatelimitFeature
from scryfall_sdk.feature.retry_feature import ScryfallRetryFeature
from scryfall_sdk.feature.test_feature import ScryfallTestFeature
from scryfall_sdk.feature.timeout_feature import ScryfallTimeoutFeature


_FEATURES = {
    "base": lambda: ScryfallBaseFeature(),
    "ratelimit": lambda: ScryfallRatelimitFeature(),
    "retry": lambda: ScryfallRetryFeature(),
    "test": lambda: ScryfallTestFeature(),
    "timeout": lambda: ScryfallTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
