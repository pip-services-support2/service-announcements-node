"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnouncementsServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const AnnouncementsMongoDbPersistence_1 = require("../persistence/AnnouncementsMongoDbPersistence");
const AnnouncementsFilePersistence_1 = require("../persistence/AnnouncementsFilePersistence");
const AnnouncementsMemoryPersistence_1 = require("../persistence/AnnouncementsMemoryPersistence");
const AnnouncementsController_1 = require("../logic/AnnouncementsController");
const AnnouncementsHttpServiceV1_1 = require("../services/version1/AnnouncementsHttpServiceV1");
class AnnouncementsServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(AnnouncementsServiceFactory.MemoryPersistenceDescriptor, AnnouncementsMemoryPersistence_1.AnnouncementsMemoryPersistence);
        this.registerAsType(AnnouncementsServiceFactory.FilePersistenceDescriptor, AnnouncementsFilePersistence_1.AnnouncementsFilePersistence);
        this.registerAsType(AnnouncementsServiceFactory.MongoDbPersistenceDescriptor, AnnouncementsMongoDbPersistence_1.AnnouncementsMongoDbPersistence);
        this.registerAsType(AnnouncementsServiceFactory.ControllerDescriptor, AnnouncementsController_1.AnnouncementsController);
        this.registerAsType(AnnouncementsServiceFactory.HttpServiceDescriptor, AnnouncementsHttpServiceV1_1.AnnouncementsHttpServiceV1);
    }
}
exports.AnnouncementsServiceFactory = AnnouncementsServiceFactory;
AnnouncementsServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-announcements", "factory", "default", "default", "1.0");
AnnouncementsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-announcements", "persistence", "memory", "*", "1.0");
AnnouncementsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-announcements", "persistence", "file", "*", "1.0");
AnnouncementsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-announcements", "persistence", "mongodb", "*", "1.0");
AnnouncementsServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-announcements", "controller", "default", "*", "1.0");
AnnouncementsServiceFactory.HttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-announcements", "service", "http", "*", "1.0");
//# sourceMappingURL=AnnouncementsServiceFactory.js.map