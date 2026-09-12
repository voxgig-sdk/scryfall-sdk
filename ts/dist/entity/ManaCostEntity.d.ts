import { ScryfallEntityBase } from '../ScryfallEntityBase';
import type { ScryfallSDK } from '../ScryfallSDK';
import type { Control } from '../types';
import type { ManaCost, ManaCostListMatch } from '../ScryfallTypes';
declare class ManaCostEntity extends ScryfallEntityBase<ManaCost> {
    constructor(client: ScryfallSDK, entopts: any);
    make(this: ManaCostEntity): ManaCostEntity;
    list(this: any, reqmatch?: ManaCostListMatch, ctrl?: Control): Promise<ManaCostEntity[]>;
}
export { ManaCostEntity };
