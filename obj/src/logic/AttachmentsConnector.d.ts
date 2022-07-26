import { IAttachmentsClientV1 } from 'client-attachments-node';
import { AnnouncementV1 } from '../data/version1/AnnouncementV1';
export declare class AttachmentsConnector {
    private _attachmentsClient;
    constructor(attachmentsClient: IAttachmentsClientV1);
    private extractAttachmentIds;
    addAttachments(correlationId: string, announcement: AnnouncementV1): Promise<void>;
    updateAttachments(correlationId: string, oldAnnouncement: AnnouncementV1, newAnnouncement: AnnouncementV1): Promise<void>;
    removeAttachments(correlationId: string, announcement: AnnouncementV1): Promise<void>;
}
