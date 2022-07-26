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
exports.AnnouncementsController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const AnnouncementsCommandSet_1 = require("./AnnouncementsCommandSet");
const AttachmentsConnector_1 = require("./AttachmentsConnector");
class AnnouncementsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(AnnouncementsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
        this._attachmentsClient = this._dependencyResolver.getOneOptional('attachments');
        this._attachmentsConnector = new AttachmentsConnector_1.AttachmentsConnector(this._attachmentsClient);
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new AnnouncementsCommandSet_1.AnnouncementsCommandSet(this);
        return this._commandSet;
    }
    getAnnouncements(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getPageByFilter(correlationId, filter, paging);
        });
    }
    getRandomAnnouncement(correlationId, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getOneRandom(correlationId, filter);
        });
    }
    getAnnouncementById(correlationId, announcementId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getOneById(correlationId, announcementId);
        });
    }
    createAnnouncement(correlationId, announcement) {
        return __awaiter(this, void 0, void 0, function* () {
            let newAnnouncement = null;
            announcement.create_time = new Date();
            announcement.all_tags = pip_services3_commons_nodex_3.TagsProcessor.extractHashTags('#title.en#title.sp#title.fr#title.de#title.ru#content.en#content.sp#content.fr#content.de#content.ru');
            newAnnouncement = yield this._persistence.create(correlationId, announcement);
            yield this._attachmentsConnector.addAttachments(correlationId, newAnnouncement);
            return newAnnouncement;
        });
    }
    updateAnnouncement(correlationId, announcement) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldAnnouncement = null;
            let newAnnouncement = null;
            announcement.all_tags = pip_services3_commons_nodex_3.TagsProcessor.extractHashTags('#title.en#title.sp#title.fr#title.de#title.ru#content.en#content.sp#content.fr#content.de#content.ru');
            oldAnnouncement = yield this._persistence.getOneById(correlationId, announcement.id);
            if (oldAnnouncement == null) {
                throw new pip_services3_commons_nodex_4.NotFoundException(correlationId, 'ANNOUNCEMENT_NOT_FOUND', 'Announcement ' + announcement.id + ' was not found').withDetails('announcement_id', announcement.id);
            }
            newAnnouncement = yield this._persistence.update(correlationId, announcement);
            yield this._attachmentsConnector.updateAttachments(correlationId, oldAnnouncement, newAnnouncement);
            return newAnnouncement;
        });
    }
    deleteAnnouncementById(correlationId, announcementId) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldAnnouncement = null;
            oldAnnouncement = yield this._persistence.deleteById(correlationId, announcementId);
            yield this._attachmentsConnector.removeAttachments(correlationId, oldAnnouncement);
            return oldAnnouncement;
        });
    }
}
exports.AnnouncementsController = AnnouncementsController;
AnnouncementsController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.persistence', 'service-announcements:persistence:*:*:1.0', 'dependencies.attachments', 'service-attachments:client:*:*:1.0');
//# sourceMappingURL=AnnouncementsController.js.map