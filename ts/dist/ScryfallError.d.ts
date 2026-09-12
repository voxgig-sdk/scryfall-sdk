import { Context } from './Context';
declare class ScryfallError extends Error {
    isScryfallError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { ScryfallError };
