# Scryfall SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ScryfallUtility.registrar = ->(u) {
  u.clean = ScryfallUtilities::Clean
  u.done = ScryfallUtilities::Done
  u.make_error = ScryfallUtilities::MakeError
  u.feature_add = ScryfallUtilities::FeatureAdd
  u.feature_hook = ScryfallUtilities::FeatureHook
  u.feature_init = ScryfallUtilities::FeatureInit
  u.fetcher = ScryfallUtilities::Fetcher
  u.make_fetch_def = ScryfallUtilities::MakeFetchDef
  u.make_context = ScryfallUtilities::MakeContext
  u.make_options = ScryfallUtilities::MakeOptions
  u.make_request = ScryfallUtilities::MakeRequest
  u.make_response = ScryfallUtilities::MakeResponse
  u.make_result = ScryfallUtilities::MakeResult
  u.make_point = ScryfallUtilities::MakePoint
  u.make_spec = ScryfallUtilities::MakeSpec
  u.make_url = ScryfallUtilities::MakeUrl
  u.param = ScryfallUtilities::Param
  u.prepare_auth = ScryfallUtilities::PrepareAuth
  u.prepare_body = ScryfallUtilities::PrepareBody
  u.prepare_headers = ScryfallUtilities::PrepareHeaders
  u.prepare_method = ScryfallUtilities::PrepareMethod
  u.prepare_params = ScryfallUtilities::PrepareParams
  u.prepare_path = ScryfallUtilities::PreparePath
  u.prepare_query = ScryfallUtilities::PrepareQuery
  u.graphql_body = ScryfallUtilities::GraphqlBody
  u.graphql_errors = ScryfallUtilities::GraphqlErrors
  u.result_basic = ScryfallUtilities::ResultBasic
  u.result_body = ScryfallUtilities::ResultBody
  u.result_headers = ScryfallUtilities::ResultHeaders
  u.transform_request = ScryfallUtilities::TransformRequest
  u.transform_response = ScryfallUtilities::TransformResponse
}
