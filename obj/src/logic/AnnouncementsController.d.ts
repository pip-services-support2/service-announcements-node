import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { AnnouncementV1 } from '../data/version1/AnnouncementV1';
import { IAnnouncementsController } from './IAnnouncementsController';
export declare class AnnouncementsController implements IConfigurable, IReferenceable, ICommandable, IAnnouncementsController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _attachmentsClient;
    private _attachmentsConnector;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getAnnouncements(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<AnnouncementV1>>;
    getRandomAnnouncement(correlationId: string, filter: FilterParams): Promise<AnnouncementV1>;
    getAnnouncementById(correlationId: string, announcementId: string): Promise<AnnouncementV1>;
    createAnnouncement(correlationId: string, announcement: AnnouncementV1): Promise<AnnouncementV1>;
    updateAnnouncement(correlationId: string, announcement: AnnouncementV1): Promise<AnnouncementV1>;
    deleteAnnouncementById(correlationId: string, announcementId: string): Promise<AnnouncementV1>;
}
