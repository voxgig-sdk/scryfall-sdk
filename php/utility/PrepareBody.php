<?php
declare(strict_types=1);

// Scryfall SDK utility: prepare_body

class ScryfallPrepareBody
{
    public static function call(ScryfallContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
