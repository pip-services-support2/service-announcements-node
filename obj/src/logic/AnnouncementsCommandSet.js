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
exports.AnnouncementsCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const AnnouncementV1Schema_1 = require("../data/version1/AnnouncementV1Schema");
class AnnouncementsCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetAnnouncementsCommand());
        this.addCommand(this.makeGetRandomAnnouncementCommand());
        this.addCommand(this.makeGetAnnouncementByIdCommand());
        this.addCommand(this.makeCreateAnnouncementCommand());
        this.addCommand(this.makeUpdateAnnouncementCommand());
        this.addCommand(this.makeDeleteAnnouncementByIdCommand());
    }
    makeGetAnnouncementsCommand() {
        return new pip_services3_commons_nodex_2.Command("get_announcements", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_8.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getAnnouncements(correlationId, filter, paging);
        }));
    }
    makeGetRandomAnnouncementCommand() {
        return new pip_services3_commons_nodex_2.Command("get_random_announcement", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            return yield this._logic.getRandomAnnouncement(correlationId, filter);
        }));
    }
    makeGetAnnouncementByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("get_announcement_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('announcement_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let announcementId = args.getAsNullableString("announcement_id");
            return yield this._logic.getAnnouncementById(correlationId, announcementId);
        }));
    }
    makeCreateAnnouncementCommand() {
        return new pip_services3_commons_nodex_2.Command("create_announcement", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('announcement', new AnnouncementV1Schema_1.AnnouncementV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let announcement = args.get("announcement");
            return yield this._logic.createAnnouncement(correlationId, announcement);
        }));
    }
    makeUpdateAnnouncementCommand() {
        return new pip_services3_commons_nodex_2.Command("update_announcement", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('announcement', new AnnouncementV1Schema_1.AnnouncementV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let announcement = args.get("announcement");
            return yield this._logic.updateAnnouncement(correlationId, announcement);
        }));
    }
    makeDeleteAnnouncementByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("delete_announcement_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('announcement_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let announcementId = args.getAsNullableString("announcement_id");
            return yield this._logic.deleteAnnouncementById(correlationId, announcementId);
        }));
    }
}
exports.AnnouncementsCommandSet = AnnouncementsCommandSet;
//# sourceMappingURL=AnnouncementsCommandSet.js.map