# Scryfall SDK utility: feature_add
module ScryfallUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
