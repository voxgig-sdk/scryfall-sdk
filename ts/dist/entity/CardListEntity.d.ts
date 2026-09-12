import { ScryfallEntityBase } from '../ScryfallEntityBase';
import type { ScryfallSDK } from '../ScryfallSDK';
import type { Control } from '../types';
import type { CardList, CardListListMatch, CardListCreateData } from '../ScryfallTypes';
declare class CardListEntity extends ScryfallEntityBase<CardList> {
    constructor(client: ScryfallSDK, entopts: any);
    make(this: CardListEntity): CardListEntity;
    list(this: any, reqmatch?: CardListListMatch, ctrl?: Control): Promise<CardListEntity[]>;
    create(this: any, reqdata?: CardListCreateData, ctrl?: Control): Promise<CardListEntity>;
}
export { CardListEntity };
