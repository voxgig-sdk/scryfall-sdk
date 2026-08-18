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

func TestBulkDataEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.BulkData(nil)
		if ent == nil {
			t.Fatal("expected non-nil BulkDataEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"bulk_data": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.BulkData(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.BulkData(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := bulk_dataBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "bulk_data." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set SCRYFALL_TEST_BULK_DATA_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		bulkDataRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.bulk_data", setup.data)))
		var bulkDataRef01Data map[string]any
		if len(bulkDataRef01DataRaw) > 0 {
			bulkDataRef01Data = core.ToMapAny(bulkDataRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = bulkDataRef01Data

		// LIST
		bulkDataRef01Ent := client.BulkData(nil)
		bulkDataRef01Match := map[string]any{}

		bulkDataRef01ListResult, err := bulkDataRef01Ent.List(bulkDataRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, bulkDataRef01ListOk := bulkDataRef01ListResult.([]any)
		if !bulkDataRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", bulkDataRef01ListResult)
		}

		// LOAD
		bulkDataRef01MatchDt0 := map[string]any{
			"id": bulkDataRef01Data["id"],
		}
		bulkDataRef01DataDt0Loaded, err := bulkDataRef01Ent.Load(bulkDataRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		bulkDataRef01DataDt0LoadResult := core.ToMapAny(entityData(bulkDataRef01DataDt0Loaded))
		if bulkDataRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if bulkDataRef01DataDt0LoadResult["id"] != bulkDataRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func bulk_dataBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "bulk_data", "BulkDataTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read bulk_data test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse bulk_data test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"bulk_data01", "bulk_data02", "bulk_data03"},
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
	entidEnvRaw := os.Getenv("SCRYFALL_TEST_BULK_DATA_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"SCRYFALL_TEST_BULK_DATA_ENTID": idmap,
		"SCRYFALL_TEST_LIVE":      "FALSE",
		"SCRYFALL_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["SCRYFALL_TEST_BULK_DATA_ENTID"])
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
