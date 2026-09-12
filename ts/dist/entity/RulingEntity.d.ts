import { ScryfallEntityBase } from '../ScryfallEntityBase';
import type { ScryfallSDK } from '../ScryfallSDK';
import type { Control } from '../types';
import type { Ruling, RulingListMatch } from '../ScryfallTypes';
declare class RulingEntity extends ScryfallEntityBase<Ruling> {
    constructor(client: ScryfallSDK, entopts: any);
    make(this: RulingEntity): RulingEntity;
    list(this: any, reqmatch?: RulingListMatch, ctrl?: Control): Promise<RulingEntity[]>;
}
export { RulingEntity };
