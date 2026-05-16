package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBulkDataEntityFunc func(client *ScryfallSDK, entopts map[string]any) ScryfallEntity

var NewCardEntityFunc func(client *ScryfallSDK, entopts map[string]any) ScryfallEntity

var NewCardListEntityFunc func(client *ScryfallSDK, entopts map[string]any) ScryfallEntity

var NewCardSymbolListEntityFunc func(client *ScryfallSDK, entopts map[string]any) ScryfallEntity

var NewCatalogEntityFunc func(client *ScryfallSDK, entopts map[string]any) ScryfallEntity

var NewManaCostEntityFunc func(client *ScryfallSDK, entopts map[string]any) ScryfallEntity

var NewMigrationEntityFunc func(client *ScryfallSDK, entopts map[string]any) ScryfallEntity

var NewRulingEntityFunc func(client *ScryfallSDK, entopts map[string]any) ScryfallEntity

var NewSetEntityFunc func(client *ScryfallSDK, entopts map[string]any) ScryfallEntity

