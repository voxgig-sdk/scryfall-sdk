-- Scryfall SDK error

local ScryfallError = {}
ScryfallError.__index = ScryfallError


function ScryfallError.new(code, msg, ctx)
  local self = setmetatable({}, ScryfallError)
  self.is_sdk_error = true
  self.sdk = "Scryfall"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ScryfallError:error()
  return self.msg
end


function ScryfallError:__tostring()
  return self.msg
end


return ScryfallError
