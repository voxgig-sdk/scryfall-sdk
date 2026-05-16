<?php
declare(strict_types=1);

// Scryfall SDK utility: feature_add

class ScryfallFeatureAdd
{
    public static function call(ScryfallContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
