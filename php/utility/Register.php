<?php
declare(strict_types=1);

// Scryfall SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

ScryfallUtility::setRegistrar(function (ScryfallUtility $u): void {
    $u->clean = [ScryfallClean::class, 'call'];
    $u->done = [ScryfallDone::class, 'call'];
    $u->make_error = [ScryfallMakeError::class, 'call'];
    $u->feature_add = [ScryfallFeatureAdd::class, 'call'];
    $u->feature_hook = [ScryfallFeatureHook::class, 'call'];
    $u->feature_init = [ScryfallFeatureInit::class, 'call'];
    $u->fetcher = [ScryfallFetcher::class, 'call'];
    $u->make_fetch_def = [ScryfallMakeFetchDef::class, 'call'];
    $u->make_context = [ScryfallMakeContext::class, 'call'];
    $u->make_options = [ScryfallMakeOptions::class, 'call'];
    $u->make_request = [ScryfallMakeRequest::class, 'call'];
    $u->make_response = [ScryfallMakeResponse::class, 'call'];
    $u->make_result = [ScryfallMakeResult::class, 'call'];
    $u->make_point = [ScryfallMakePoint::class, 'call'];
    $u->make_spec = [ScryfallMakeSpec::class, 'call'];
    $u->make_url = [ScryfallMakeUrl::class, 'call'];
    $u->param = [ScryfallParam::class, 'call'];
    $u->prepare_auth = [ScryfallPrepareAuth::class, 'call'];
    $u->prepare_body = [ScryfallPrepareBody::class, 'call'];
    $u->prepare_headers = [ScryfallPrepareHeaders::class, 'call'];
    $u->prepare_method = [ScryfallPrepareMethod::class, 'call'];
    $u->prepare_params = [ScryfallPrepareParams::class, 'call'];
    $u->prepare_path = [ScryfallPreparePath::class, 'call'];
    $u->prepare_query = [ScryfallPrepareQuery::class, 'call'];
    $u->result_basic = [ScryfallResultBasic::class, 'call'];
    $u->result_body = [ScryfallResultBody::class, 'call'];
    $u->result_headers = [ScryfallResultHeaders::class, 'call'];
    $u->transform_request = [ScryfallTransformRequest::class, 'call'];
    $u->transform_response = [ScryfallTransformResponse::class, 'call'];
});
