<?php
declare(strict_types=1);

// Scryfall SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class ScryfallFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ScryfallBaseFeature();
            case "test":
                return new ScryfallTestFeature();
            default:
                return new ScryfallBaseFeature();
        }
    }
}
