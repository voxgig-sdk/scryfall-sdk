import { ScryfallEntityBase } from '../ScryfallEntityBase';
import type { ScryfallSDK } from '../ScryfallSDK';
import type { Control } from '../types';
import type { SetType, SetLoadMatch, SetListMatch } from '../ScryfallTypes';
declare class SetEntity extends ScryfallEntityBase<SetType> {
    constructor(client: ScryfallSDK, entopts: any);
    make(this: SetEntity): SetEntity;
    load(this: any, reqmatch?: SetLoadMatch, ctrl?: Control): Promise<SetEntity>;
    list(this: any, reqmatch?: SetListMatch, ctrl?: Control): Promise<SetEntity[]>;
}
export { SetEntity };
