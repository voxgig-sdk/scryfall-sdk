package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/scryfall-sdk"
	"github.com/voxgig-sdk/scryfall-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestCardSymbolListEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CardSymbolList(nil)
		if ent == nil {
			t.Fatal("expected non-nil CardSymbolListEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := card_symbol_listBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "card_symbol_list." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set SCRYFALL_TEST_CARD_SYMBOL_LIST_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		cardSymbolListRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.card_symbol_list", setup.data)))
		var cardSymbolListRef01Data map[string]any
		if len(cardSymbolListRef01DataRaw) > 0 {
			cardSymbolListRef01Data = core.ToMapAny(cardSymbolListRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = cardSymbolListRef01Data

		// LIST
		cardSymbolListRef01Ent := client.CardSymbolList(nil)
		cardSymbolListRef01Match := map[string]any{}

		cardSymbolListRef01ListResult, err := cardSymbolListRef01Ent.List(cardSymbolListRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, cardSymbolListRef01ListOk := cardSymbolListRef01ListResult.([]any)
		if !cardSymbolListRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", cardSymbolListRef01ListResult)
		}

	})
}

func card_symbol_listBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "card_symbol_list", "CardSymbolListTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read card_symbol_list test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse card_symbol_list test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"card_symbol_list01", "card_symbol_list02", "card_symbol_list03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("SCRYFALL_TEST_CARD_SYMBOL_LIST_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"SCRYFALL_TEST_CARD_SYMBOL_LIST_ENTID": idmap,
		"SCRYFALL_TEST_LIVE":      "FALSE",
		"SCRYFALL_TEST_EXPLAIN":   "FALSE",
		"SCRYFALL_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["SCRYFALL_TEST_CARD_SYMBOL_LIST_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["SCRYFALL_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["SCRYFALL_APIKEY"],
			},
			extra,
		})
		client = sdk.NewScryfallSDK(core.ToMapAny(mergedOpts))
	}

	live := env["SCRYFALL_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["SCRYFALL_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
