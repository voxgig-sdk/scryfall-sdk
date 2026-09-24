"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScryfallError = void 0;
class ScryfallError extends Error {
    isScryfallError = true;
    sdk = 'Scryfall';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.ScryfallError = ScryfallError;
//# sourceMappingURL=ScryfallError.js.map