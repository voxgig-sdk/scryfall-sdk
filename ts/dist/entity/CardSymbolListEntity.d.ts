import { ScryfallEntityBase } from '../ScryfallEntityBase';
import type { ScryfallSDK } from '../ScryfallSDK';
import type { Control } from '../types';
import type { CardSymbolList, CardSymbolListListMatch } from '../ScryfallTypes';
declare class CardSymbolListEntity extends ScryfallEntityBase<CardSymbolList> {
    constructor(client: ScryfallSDK, entopts: any);
    make(this: CardSymbolListEntity): CardSymbolListEntity;
    list(this: any, reqmatch?: CardSymbolListListMatch, ctrl?: Control): Promise<CardSymbolListEntity[]>;
}
export { CardSymbolListEntity };
