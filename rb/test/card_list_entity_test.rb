# CardList entity test

require "minitest/autorun"
require "json"
require_relative "../Scryfall_sdk"
require_relative "runner"

class CardListEntityTest < Minitest::Test
  def test_create_instance
    testsdk = ScryfallSDK.test(nil, nil)
    ent = testsdk.CardList(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = card_list_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "card_list." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set SCRYFALL_TEST_CARD_LIST_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    card_list_ref01_ent = client.CardList(nil)
    card_list_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.card_list"), "card_list_ref01"))

    card_list_ref01_data_result = card_list_ref01_ent.create(card_list_ref01_data, nil)
    card_list_ref01_data = Helpers.to_map(card_list_ref01_data_result)
    assert !card_list_ref01_data.nil?
    assert !card_list_ref01_data["id"].nil?

    # LIST
    card_list_ref01_match = {}

    card_list_ref01_list_result = card_list_ref01_ent.list(card_list_ref01_match, nil)
    assert card_list_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(card_list_ref01_list_result),
      { "id" => card_list_ref01_data["id"] })
    assert !Vs.isempty(found_item)

  end
end

def card_list_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "card_list", "CardListTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ScryfallSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["card_list01", "card_list02", "card_list03"],
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
  entid_env_raw = ENV["SCRYFALL_TEST_CARD_LIST_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "SCRYFALL_TEST_CARD_LIST_ENTID" => idmap,
    "SCRYFALL_TEST_LIVE" => "FALSE",
    "SCRYFALL_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["SCRYFALL_TEST_CARD_LIST_ENTID"])
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
