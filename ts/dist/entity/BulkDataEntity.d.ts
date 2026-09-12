import { ScryfallEntityBase } from '../ScryfallEntityBase';
import type { ScryfallSDK } from '../ScryfallSDK';
import type { Control } from '../types';
import type { BulkData, BulkDataLoadMatch, BulkDataListMatch } from '../ScryfallTypes';
declare class BulkDataEntity extends ScryfallEntityBase<BulkData> {
    constructor(client: ScryfallSDK, entopts: any);
    make(this: BulkDataEntity): BulkDataEntity;
    load(this: any, reqmatch?: BulkDataLoadMatch, ctrl?: Control): Promise<BulkDataEntity>;
    list(this: any, reqmatch?: BulkDataListMatch, ctrl?: Control): Promise<BulkDataEntity[]>;
}
export { BulkDataEntity };
