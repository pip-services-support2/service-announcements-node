import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';
import { AnnouncementV1 } from '../data/version1/AnnouncementV1';
import { IAnnouncementsPersistence } from './IAnnouncementsPersistence';
export declare class AnnouncementsMemoryPersistence extends IdentifiableMemoryPersistence<AnnouncementV1, string> implements IAnnouncementsPersistence {
    constructor();
    private matchString;
    private matchMultiString;
    private matchSearch;
    private contains;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<AnnouncementV1>>;
    getOneRandom(correlationId: string, filter: FilterParams): Promise<AnnouncementV1>;
}
