# Scryfall SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module ScryfallFeatures
  def self.make_feature(name)
    case name
    when "base"
      ScryfallBaseFeature.new
    when "test"
      ScryfallTestFeature.new
    else
      ScryfallBaseFeature.new
    end
  end
end
