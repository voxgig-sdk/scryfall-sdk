import { ScryfallEntityBase } from '../ScryfallEntityBase';
import type { ScryfallSDK } from '../ScryfallSDK';
import type { Control } from '../types';
import type { Migration, MigrationListMatch } from '../ScryfallTypes';
declare class MigrationEntity extends ScryfallEntityBase<Migration> {
    constructor(client: ScryfallSDK, entopts: any);
    make(this: MigrationEntity): MigrationEntity;
    list(this: any, reqmatch?: MigrationListMatch, ctrl?: Control): Promise<MigrationEntity[]>;
}
export { MigrationEntity };
