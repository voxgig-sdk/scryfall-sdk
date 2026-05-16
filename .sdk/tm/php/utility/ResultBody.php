<?php
declare(strict_types=1);

// Scryfall SDK utility: result_body

class ScryfallResultBody
{
    public static function call(ScryfallContext $ctx): ?ScryfallResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
