package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/scryfall-sdk/go"
	"github.com/voxgig-sdk/scryfall-sdk/go/core"

	vs "github.com/voxgig-sdk/scryfall-sdk/go/utility/struct"
)

func TestCatalogEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Catalog(nil)
		if ent == nil {
			t.Fatal("expected non-nil CatalogEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := catalogBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "catalog." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set SCRYFALL_TEST_CATALOG_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		catalogRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.catalog", setup.data)))
		var catalogRef01Data map[string]any
		if len(catalogRef01DataRaw) > 0 {
			catalogRef01Data = core.ToMapAny(catalogRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = catalogRef01Data

		// LOAD
		catalogRef01Ent := client.Catalog(nil)
		catalogRef01MatchDt0 := map[string]any{
			"id": catalogRef01Data["id"],
		}
		catalogRef01DataDt0Loaded, err := catalogRef01Ent.Load(catalogRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		catalogRef01DataDt0LoadResult := core.ToMapAny(entityData(catalogRef01DataDt0Loaded))
		if catalogRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if catalogRef01DataDt0LoadResult["id"] != catalogRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func catalogBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "catalog", "CatalogTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read catalog test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse catalog test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"catalog01", "catalog02", "catalog03"},
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
	entidEnvRaw := os.Getenv("SCRYFALL_TEST_CATALOG_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"SCRYFALL_TEST_CATALOG_ENTID": idmap,
		"SCRYFALL_TEST_LIVE":      "FALSE",
		"SCRYFALL_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["SCRYFALL_TEST_CATALOG_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["SCRYFALL_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
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
