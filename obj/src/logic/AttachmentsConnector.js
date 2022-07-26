"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentsConnector = void 0;
const client_attachments_node_1 = require("client-attachments-node");
class AttachmentsConnector {
    constructor(attachmentsClient) {
        this._attachmentsClient = attachmentsClient;
    }
    extractAttachmentIds(announcement) {
        let ids = [];
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
    addAttachments(correlationId, announcement) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._attachmentsClient == null || announcement == null)
                return;
            let ids = this.extractAttachmentIds(announcement);
            let reference = new client_attachments_node_1.ReferenceV1(announcement.id, 'announcement');
            yield this._attachmentsClient.addAttachments(correlationId, reference, ids);
        });
    }
    updateAttachments(correlationId, oldAnnouncement, newAnnouncement) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._attachmentsClient == null || oldAnnouncement == null || newAnnouncement == null)
                return;
            let oldIds = this.extractAttachmentIds(oldAnnouncement);
            let newIds = this.extractAttachmentIds(newAnnouncement);
            let reference = new client_attachments_node_1.ReferenceV1(newAnnouncement.id, 'announcement');
            yield this._attachmentsClient.updateAttachments(correlationId, reference, oldIds, newIds);
        });
    }
    removeAttachments(correlationId, announcement) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._attachmentsClient == null || announcement == null)
                return;
            let ids = this.extractAttachmentIds(announcement);
            let reference = new client_attachments_node_1.ReferenceV1(announcement.id, 'announcement');
            yield this._attachmentsClient.removeAttachments(correlationId, reference, ids);
        });
    }
}
exports.AttachmentsConnector = AttachmentsConnector;
//# sourceMappingURL=AttachmentsConnector.js.map