# Card entity test

require "minitest/autorun"
require "json"
require_relative "../Scryfall_sdk"
require_relative "runner"

class CardEntityTest < Minitest::Test
  def test_create_instance
    testsdk = ScryfallSDK.test(nil, nil)
    ent = testsdk.Card(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = card_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "card." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set SCRYFALL_TEST_CARD_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    card_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.card")))
    card_ref01_data = nil
    if card_ref01_data_raw.length > 0
      card_ref01_data = Helpers.to_map(card_ref01_data_raw[0][1])
    end

    # LIST
    card_ref01_ent = client.Card(nil)
    card_ref01_match = {}

    card_ref01_list_result = card_ref01_ent.list(card_ref01_match, nil)
    assert card_ref01_list_result.is_a?(Array)

    # LOAD
    card_ref01_match_dt0 = {
      "id" => card_ref01_data["id"],
    }
    card_ref01_data_dt0_loaded = card_ref01_ent.load(card_ref01_match_dt0, nil)
    card_ref01_data_dt0_load_result = Helpers.to_map(card_ref01_data_dt0_loaded)
    assert !card_ref01_data_dt0_load_result.nil?
    assert_equal card_ref01_data_dt0_load_result["id"], card_ref01_data["id"]

  end
end

def card_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "card", "CardTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ScryfallSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["card01", "card02", "card03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["SCRYFALL_TEST_CARD_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "SCRYFALL_TEST_CARD_ENTID" => idmap,
    "SCRYFALL_TEST_LIVE" => "FALSE",
    "SCRYFALL_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["SCRYFALL_TEST_CARD_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["SCRYFALL_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = ScryfallSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["SCRYFALL_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["SCRYFALL_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
