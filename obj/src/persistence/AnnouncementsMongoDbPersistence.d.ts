import { DataPage, FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';
import { AnnouncementV1 } from '../data/version1/AnnouncementV1';
import { IAnnouncementsPersistence } from './IAnnouncementsPersistence';
export declare class AnnouncementsMongoDbPersistence extends IdentifiableMongoDbPersistence<AnnouncementV1, string> implements IAnnouncementsPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<AnnouncementV1>>;
    getOneRandom(correlationId: string, filter: FilterParams): Promise<AnnouncementV1>;
}
