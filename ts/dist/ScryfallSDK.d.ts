import { BulkDataEntity } from './entity/BulkDataEntity';
import { CardEntity } from './entity/CardEntity';
import { CardListEntity } from './entity/CardListEntity';
import { CardSymbolListEntity } from './entity/CardSymbolListEntity';
import { CatalogEntity } from './entity/CatalogEntity';
import { ManaCostEntity } from './entity/ManaCostEntity';
import { MigrationEntity } from './entity/MigrationEntity';
import { RulingEntity } from './entity/RulingEntity';
import { SetEntity } from './entity/SetEntity';
export type * from './ScryfallTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { ScryfallEntityBase } from './ScryfallEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class ScryfallSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    BulkData(entopts?: Record<string, any>): BulkDataEntity;
    Card(entopts?: Record<string, any>): CardEntity;
    CardList(entopts?: Record<string, any>): CardListEntity;
    CardSymbolList(entopts?: Record<string, any>): CardSymbolListEntity;
    Catalog(entopts?: Record<string, any>): CatalogEntity;
    ManaCost(entopts?: Record<string, any>): ManaCostEntity;
    Migration(entopts?: Record<string, any>): MigrationEntity;
    Ruling(entopts?: Record<string, any>): RulingEntity;
    Set(entopts?: Record<string, any>): SetEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): ScryfallSDK;
    tester(testopts?: any, sdkopts?: any): ScryfallSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof ScryfallSDK;
export { stdutil, config, BaseFeature, ScryfallEntityBase, ScryfallSDK, SDK, };
