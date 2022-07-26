import { ReferenceV1 } from 'client-attachments-node';
import { IAttachmentsClientV1 } from 'client-attachments-node';

import { AnnouncementV1 } from '../data/version1/AnnouncementV1';

export class AttachmentsConnector {
    private _attachmentsClient: IAttachmentsClientV1

    public constructor(attachmentsClient: IAttachmentsClientV1) {
        this._attachmentsClient = attachmentsClient;
    }

    private extractAttachmentIds(announcement: AnnouncementV1): string[] {
        let ids: string[] = [];

        for (let pic of announcement.pics) {
            if (pic)
                ids.push(pic.id);
        }

        for (let doc of announcement.docs) {
            if (doc.id)
                ids.push(doc.id);
        }

        return ids;
    }

    public async addAttachments(correlationId: string, announcement: AnnouncementV1): Promise<void> {
        
        if (this._attachmentsClient == null || announcement == null)
            return;

        let ids = this.extractAttachmentIds(announcement);
        let reference = new ReferenceV1(announcement.id, 'announcement');
        await this._attachmentsClient.addAttachments(correlationId, reference, ids)
    }

    public async updateAttachments(correlationId: string, oldAnnouncement: AnnouncementV1, newAnnouncement: AnnouncementV1): Promise<void> {
        if (this._attachmentsClient == null || oldAnnouncement == null || newAnnouncement == null)
            return;

        let oldIds = this.extractAttachmentIds(oldAnnouncement);
        let newIds = this.extractAttachmentIds(newAnnouncement);
        let reference = new ReferenceV1(newAnnouncement.id, 'announcement');
        await this._attachmentsClient.updateAttachments(correlationId, reference, oldIds, newIds);
    }

    public async removeAttachments(correlationId: string, announcement: AnnouncementV1): Promise<void> {
        if (this._attachmentsClient == null || announcement == null)
            return;

        let ids = this.extractAttachmentIds(announcement);
        let reference = new ReferenceV1(announcement.id, 'announcement');
        await this._attachmentsClient.removeAttachments(correlationId, reference, ids);
    }
}