<?php
declare(strict_types=1);

// Scryfall SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ScryfallMakeContext
{
    public static function call(array $ctxmap, ?ScryfallContext $basectx): ScryfallContext
    {
        return new ScryfallContext($ctxmap, $basectx);
    }
}
