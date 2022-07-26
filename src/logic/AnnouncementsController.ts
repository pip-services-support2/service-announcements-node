import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { TagsProcessor } from 'pip-services3-commons-nodex';
import { NotFoundException } from 'pip-services3-commons-nodex';
import { IAttachmentsClientV1 } from 'client-attachments-node';

import { AnnouncementV1 } from '../data/version1/AnnouncementV1';
import { IAnnouncementsPersistence } from '../persistence/IAnnouncementsPersistence';
import { IAnnouncementsController } from './IAnnouncementsController';
import { AnnouncementsCommandSet } from './AnnouncementsCommandSet';
import { AttachmentsConnector } from './AttachmentsConnector';

export class AnnouncementsController implements IConfigurable, IReferenceable, ICommandable, IAnnouncementsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'service-announcements:persistence:*:*:1.0',
        'dependencies.attachments', 'service-attachments:client:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(AnnouncementsController._defaultConfig);
    private _persistence: IAnnouncementsPersistence;
    private _attachmentsClient: IAttachmentsClientV1;
    private _attachmentsConnector: AttachmentsConnector;
    private _commandSet: AnnouncementsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IAnnouncementsPersistence>('persistence');

        this._attachmentsClient = this._dependencyResolver.getOneOptional<IAttachmentsClientV1>('attachments');
        this._attachmentsConnector = new AttachmentsConnector(this._attachmentsClient);
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new AnnouncementsCommandSet(this);
        return this._commandSet;
    }

    public async getAnnouncements(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<AnnouncementV1>> {
        return await this._persistence.getPageByFilter(correlationId, filter, paging);
    }

    public async getRandomAnnouncement(correlationId: string, filter: FilterParams): Promise<AnnouncementV1> {
        return await this._persistence.getOneRandom(correlationId, filter);
    }

    public async getAnnouncementById(correlationId: string, announcementId: string): Promise<AnnouncementV1> {
        return await this._persistence.getOneById(correlationId, announcementId);
    }

    public async createAnnouncement(correlationId: string, announcement: AnnouncementV1): Promise<AnnouncementV1> {
        let newAnnouncement: AnnouncementV1 = null;

        announcement.create_time = new Date();
        announcement.all_tags = TagsProcessor.extractHashTags(
            '#title.en#title.sp#title.fr#title.de#title.ru#content.en#content.sp#content.fr#content.de#content.ru'
        );

        newAnnouncement = await this._persistence.create(correlationId, announcement);

        await this._attachmentsConnector.addAttachments(correlationId, newAnnouncement);

        return newAnnouncement;
    }

    public async updateAnnouncement(correlationId: string, announcement: AnnouncementV1): Promise<AnnouncementV1> {
        let oldAnnouncement: AnnouncementV1 = null;
        let newAnnouncement: AnnouncementV1 = null;
        
        announcement.all_tags = TagsProcessor.extractHashTags(
            '#title.en#title.sp#title.fr#title.de#title.ru#content.en#content.sp#content.fr#content.de#content.ru'
        );

        oldAnnouncement = await this._persistence.getOneById(correlationId, announcement.id);
        
        if (oldAnnouncement == null) {
            throw new NotFoundException(
                correlationId,
                'ANNOUNCEMENT_NOT_FOUND',
                'Announcement ' + announcement.id + ' was not found'
            ).withDetails('announcement_id', announcement.id);
        }

        newAnnouncement = await this._persistence.update(correlationId, announcement);

        await this._attachmentsConnector.updateAttachments(correlationId, oldAnnouncement, newAnnouncement);

        return newAnnouncement;
    }

    public async deleteAnnouncementById(correlationId: string, announcementId: string): Promise<AnnouncementV1> {
        let oldAnnouncement: AnnouncementV1 = null;

        oldAnnouncement = await this._persistence.deleteById(correlationId, announcementId);

        await this._attachmentsConnector.removeAttachments(correlationId, oldAnnouncement);

        return oldAnnouncement;
    }

}
