# Scryfall SDK exists test

require "minitest/autorun"
require_relative "../Scryfall_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ScryfallSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
