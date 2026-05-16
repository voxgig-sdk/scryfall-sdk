<?php
declare(strict_types=1);

// Scryfall SDK utility: result_headers

class ScryfallResultHeaders
{
    public static function call(ScryfallContext $ctx): ?ScryfallResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
