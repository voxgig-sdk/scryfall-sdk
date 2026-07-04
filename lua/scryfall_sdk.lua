-- Scryfall SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local ScryfallSDK = {}
ScryfallSDK.__index = ScryfallSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

ScryfallSDK._make_feature = _make_feature


function ScryfallSDK.new(options)
  local self = setmetatable({}, ScryfallSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features from config.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local feature_items = vs.items(feature_opts)
    if feature_items ~= nil then
      for _, item in ipairs(feature_items) do
        local fname = item[1]
        local fopts = helpers.to_map(item[2])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

  -- #BuildFeatures

  return self
end


function ScryfallSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function ScryfallSDK:get_utility()
  return Utility.copy(self._utility)
end


function ScryfallSDK:get_root_ctx()
  return self._rootctx
end


function ScryfallSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function ScryfallSDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



-- Idiomatic facade: client:bulk_data():list() / client:bulk_data():load({ id = ... })
function ScryfallSDK:bulk_data(data)
  local EntityMod = require("entity.bulk_data_entity")
  if data == nil then
    if self._bulk_data == nil then
      self._bulk_data = EntityMod.new(self, nil)
    end
    return self._bulk_data
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:bulk_data() instead.
function ScryfallSDK:BulkData(data)
  local EntityMod = require("entity.bulk_data_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:card():list() / client:card():load({ id = ... })
function ScryfallSDK:card(data)
  local EntityMod = require("entity.card_entity")
  if data == nil then
    if self._card == nil then
      self._card = EntityMod.new(self, nil)
    end
    return self._card
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:card() instead.
function ScryfallSDK:Card(data)
  local EntityMod = require("entity.card_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:card_list():list() / client:card_list():load({ id = ... })
function ScryfallSDK:card_list(data)
  local EntityMod = require("entity.card_list_entity")
  if data == nil then
    if self._card_list == nil then
      self._card_list = EntityMod.new(self, nil)
    end
    return self._card_list
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:card_list() instead.
function ScryfallSDK:CardList(data)
  local EntityMod = require("entity.card_list_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:card_symbol_list():list() / client:card_symbol_list():load({ id = ... })
function ScryfallSDK:card_symbol_list(data)
  local EntityMod = require("entity.card_symbol_list_entity")
  if data == nil then
    if self._card_symbol_list == nil then
      self._card_symbol_list = EntityMod.new(self, nil)
    end
    return self._card_symbol_list
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:card_symbol_list() instead.
function ScryfallSDK:CardSymbolList(data)
  local EntityMod = require("entity.card_symbol_list_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:catalog():list() / client:catalog():load({ id = ... })
function ScryfallSDK:catalog(data)
  local EntityMod = require("entity.catalog_entity")
  if data == nil then
    if self._catalog == nil then
      self._catalog = EntityMod.new(self, nil)
    end
    return self._catalog
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:catalog() instead.
function ScryfallSDK:Catalog(data)
  local EntityMod = require("entity.catalog_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:mana_cost():list() / client:mana_cost():load({ id = ... })
function ScryfallSDK:mana_cost(data)
  local EntityMod = require("entity.mana_cost_entity")
  if data == nil then
    if self._mana_cost == nil then
      self._mana_cost = EntityMod.new(self, nil)
    end
    return self._mana_cost
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:mana_cost() instead.
function ScryfallSDK:ManaCost(data)
  local EntityMod = require("entity.mana_cost_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:migration():list() / client:migration():load({ id = ... })
function ScryfallSDK:migration(data)
  local EntityMod = require("entity.migration_entity")
  if data == nil then
    if self._migration == nil then
      self._migration = EntityMod.new(self, nil)
    end
    return self._migration
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:migration() instead.
function ScryfallSDK:Migration(data)
  local EntityMod = require("entity.migration_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ruling():list() / client:ruling():load({ id = ... })
function ScryfallSDK:ruling(data)
  local EntityMod = require("entity.ruling_entity")
  if data == nil then
    if self._ruling == nil then
      self._ruling = EntityMod.new(self, nil)
    end
    return self._ruling
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:ruling() instead.
function ScryfallSDK:Ruling(data)
  local EntityMod = require("entity.ruling_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:set():list() / client:set():load({ id = ... })
function ScryfallSDK:set(data)
  local EntityMod = require("entity.set_entity")
  if data == nil then
    if self._set == nil then
      self._set = EntityMod.new(self, nil)
    end
    return self._set
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:set() instead.
function ScryfallSDK:Set(data)
  local EntityMod = require("entity.set_entity")
  return EntityMod.new(self, data)
end




function ScryfallSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = ScryfallSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return ScryfallSDK
