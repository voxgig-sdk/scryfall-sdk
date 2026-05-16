# ProjectName SDK exists test

import pytest
from scryfall_sdk import ScryfallSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ScryfallSDK.test(None, None)
        assert testsdk is not None
