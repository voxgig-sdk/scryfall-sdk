# Scryfall SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import ScryfallUtility
from core.spec import ScryfallSpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import ScryfallBaseFeature
from features import _make_feature


class ScryfallSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = ScryfallUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return ScryfallUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = ScryfallSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    @property
    def bulk_data(self):
        """Idiomatic facade: client.bulk_data.list() / client.bulk_data.load({"id": ...})."""
        from entity.bulk_data_entity import BulkDataEntity
        cached = getattr(self, "_bulk_data", None)
        if cached is None:
            cached = BulkDataEntity(self, None)
            self._bulk_data = cached
        return cached

    def BulkData(self, data=None):
        # Deprecated: use client.bulk_data instead.
        from entity.bulk_data_entity import BulkDataEntity
        return BulkDataEntity(self, data)


    @property
    def card(self):
        """Idiomatic facade: client.card.list() / client.card.load({"id": ...})."""
        from entity.card_entity import CardEntity
        cached = getattr(self, "_card", None)
        if cached is None:
            cached = CardEntity(self, None)
            self._card = cached
        return cached

    def Card(self, data=None):
        # Deprecated: use client.card instead.
        from entity.card_entity import CardEntity
        return CardEntity(self, data)


    @property
    def card_list(self):
        """Idiomatic facade: client.card_list.list() / client.card_list.load({"id": ...})."""
        from entity.card_list_entity import CardListEntity
        cached = getattr(self, "_card_list", None)
        if cached is None:
            cached = CardListEntity(self, None)
            self._card_list = cached
        return cached

    def CardList(self, data=None):
        # Deprecated: use client.card_list instead.
        from entity.card_list_entity import CardListEntity
        return CardListEntity(self, data)


    @property
    def card_symbol_list(self):
        """Idiomatic facade: client.card_symbol_list.list() / client.card_symbol_list.load({"id": ...})."""
        from entity.card_symbol_list_entity import CardSymbolListEntity
        cached = getattr(self, "_card_symbol_list", None)
        if cached is None:
            cached = CardSymbolListEntity(self, None)
            self._card_symbol_list = cached
        return cached

    def CardSymbolList(self, data=None):
        # Deprecated: use client.card_symbol_list instead.
        from entity.card_symbol_list_entity import CardSymbolListEntity
        return CardSymbolListEntity(self, data)


    @property
    def catalog(self):
        """Idiomatic facade: client.catalog.list() / client.catalog.load({"id": ...})."""
        from entity.catalog_entity import CatalogEntity
        cached = getattr(self, "_catalog", None)
        if cached is None:
            cached = CatalogEntity(self, None)
            self._catalog = cached
        return cached

    def Catalog(self, data=None):
        # Deprecated: use client.catalog instead.
        from entity.catalog_entity import CatalogEntity
        return CatalogEntity(self, data)


    @property
    def mana_cost(self):
        """Idiomatic facade: client.mana_cost.list() / client.mana_cost.load({"id": ...})."""
        from entity.mana_cost_entity import ManaCostEntity
        cached = getattr(self, "_mana_cost", None)
        if cached is None:
            cached = ManaCostEntity(self, None)
            self._mana_cost = cached
        return cached

    def ManaCost(self, data=None):
        # Deprecated: use client.mana_cost instead.
        from entity.mana_cost_entity import ManaCostEntity
        return ManaCostEntity(self, data)


    @property
    def migration(self):
        """Idiomatic facade: client.migration.list() / client.migration.load({"id": ...})."""
        from entity.migration_entity import MigrationEntity
        cached = getattr(self, "_migration", None)
        if cached is None:
            cached = MigrationEntity(self, None)
            self._migration = cached
        return cached

    def Migration(self, data=None):
        # Deprecated: use client.migration instead.
        from entity.migration_entity import MigrationEntity
        return MigrationEntity(self, data)


    @property
    def ruling(self):
        """Idiomatic facade: client.ruling.list() / client.ruling.load({"id": ...})."""
        from entity.ruling_entity import RulingEntity
        cached = getattr(self, "_ruling", None)
        if cached is None:
            cached = RulingEntity(self, None)
            self._ruling = cached
        return cached

    def Ruling(self, data=None):
        # Deprecated: use client.ruling instead.
        from entity.ruling_entity import RulingEntity
        return RulingEntity(self, data)


    @property
    def set(self):
        """Idiomatic facade: client.set.list() / client.set.load({"id": ...})."""
        from entity.set_entity import SetEntity
        cached = getattr(self, "_set", None)
        if cached is None:
            cached = SetEntity(self, None)
            self._set = cached
        return cached

    def Set(self, data=None):
        # Deprecated: use client.set instead.
        from entity.set_entity import SetEntity
        return SetEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk
