import { ScryfallEntityBase } from '../ScryfallEntityBase';
import type { ScryfallSDK } from '../ScryfallSDK';
import type { Control } from '../types';
import type { Catalog, CatalogLoadMatch } from '../ScryfallTypes';
declare class CatalogEntity extends ScryfallEntityBase<Catalog> {
    constructor(client: ScryfallSDK, entopts: any);
    make(this: CatalogEntity): CatalogEntity;
    load(this: any, reqmatch?: CatalogLoadMatch, ctrl?: Control): Promise<CatalogEntity>;
}
export { CatalogEntity };
