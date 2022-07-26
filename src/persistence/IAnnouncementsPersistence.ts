import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';
import { IWriter } from 'pip-services3-data-nodex';

import { AnnouncementV1 } from '../data/version1/AnnouncementV1';

export interface IAnnouncementsPersistence
    extends IGetter<AnnouncementV1, string>, IWriter<AnnouncementV1, string>  {
    
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<AnnouncementV1>>;

    getOneRandom(correlationId: string, filter: FilterParams): Promise<AnnouncementV1>;

    getOneById(correlationId: string, id: string): Promise<AnnouncementV1>;

    create(correlationId: string, item: AnnouncementV1): Promise<AnnouncementV1>;

    update(correlationId: string, item: AnnouncementV1): Promise<AnnouncementV1>;

    deleteById(correlationId: string, id: string): Promise<AnnouncementV1>;
}

