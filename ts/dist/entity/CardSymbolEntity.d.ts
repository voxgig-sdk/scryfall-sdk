import { ScryfallEntityBase } from '../ScryfallEntityBase';
import type { ScryfallSDK } from '../ScryfallSDK';
import type { Control } from '../types';
import type { CardSymbol, CardSymbolListMatch } from '../ScryfallTypes';
declare class CardSymbolEntity extends ScryfallEntityBase<CardSymbol> {
    constructor(client: ScryfallSDK, entopts: any);
    make(this: CardSymbolEntity): CardSymbolEntity;
    list(this: any, reqmatch?: CardSymbolListMatch, ctrl?: Control): Promise<CardSymbolEntity[]>;
}
export { CardSymbolEntity };
