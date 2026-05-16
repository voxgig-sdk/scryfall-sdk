<?php
declare(strict_types=1);

// Scryfall SDK exists test

require_once __DIR__ . '/../scryfall_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = ScryfallSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
