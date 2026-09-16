# Scryfall SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ScryfallFeatures
  def self.make_feature(name)
    case name
    when "base"
      ScryfallBaseFeature.new
    when "ratelimit"
      ScryfallRatelimitFeature.new
    when "retry"
      ScryfallRetryFeature.new
    when "test"
      ScryfallTestFeature.new
    when "timeout"
      ScryfallTimeoutFeature.new
    else
      ScryfallBaseFeature.new
    end
  end
end
