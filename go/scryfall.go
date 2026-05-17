package voxgigscryfallsdk

import (
	"github.com/voxgig-sdk/scryfall-sdk/go/core"
	"github.com/voxgig-sdk/scryfall-sdk/go/entity"
	"github.com/voxgig-sdk/scryfall-sdk/go/feature"
	_ "github.com/voxgig-sdk/scryfall-sdk/go/utility"
)

// Type aliases preserve external API.
type ScryfallSDK = core.ScryfallSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ScryfallEntity = core.ScryfallEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ScryfallError = core.ScryfallError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBulkDataEntityFunc = func(client *core.ScryfallSDK, entopts map[string]any) core.ScryfallEntity {
		return entity.NewBulkDataEntity(client, entopts)
	}
	core.NewCardEntityFunc = func(client *core.ScryfallSDK, entopts map[string]any) core.ScryfallEntity {
		return entity.NewCardEntity(client, entopts)
	}
	core.NewCardListEntityFunc = func(client *core.ScryfallSDK, entopts map[string]any) core.ScryfallEntity {
		return entity.NewCardListEntity(client, entopts)
	}
	core.NewCardSymbolListEntityFunc = func(client *core.ScryfallSDK, entopts map[string]any) core.ScryfallEntity {
		return entity.NewCardSymbolListEntity(client, entopts)
	}
	core.NewCatalogEntityFunc = func(client *core.ScryfallSDK, entopts map[string]any) core.ScryfallEntity {
		return entity.NewCatalogEntity(client, entopts)
	}
	core.NewManaCostEntityFunc = func(client *core.ScryfallSDK, entopts map[string]any) core.ScryfallEntity {
		return entity.NewManaCostEntity(client, entopts)
	}
	core.NewMigrationEntityFunc = func(client *core.ScryfallSDK, entopts map[string]any) core.ScryfallEntity {
		return entity.NewMigrationEntity(client, entopts)
	}
	core.NewRulingEntityFunc = func(client *core.ScryfallSDK, entopts map[string]any) core.ScryfallEntity {
		return entity.NewRulingEntity(client, entopts)
	}
	core.NewSetEntityFunc = func(client *core.ScryfallSDK, entopts map[string]any) core.ScryfallEntity {
		return entity.NewSetEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewScryfallSDK = core.NewScryfallSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
