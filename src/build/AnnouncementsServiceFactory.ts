import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { AnnouncementsMongoDbPersistence } from '../persistence/AnnouncementsMongoDbPersistence';
import { AnnouncementsFilePersistence } from '../persistence/AnnouncementsFilePersistence';
import { AnnouncementsMemoryPersistence } from '../persistence/AnnouncementsMemoryPersistence';
import { AnnouncementsController } from '../logic/AnnouncementsController';
import { AnnouncementsCommandableHttpServiceV1 } from '../services/version1/AnnouncementsCommandableHttpServiceV1';

export class AnnouncementsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-announcements", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("service-announcements", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("service-announcements", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("service-announcements", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("service-announcements", "controller", "default", "*", "1.0");
	public static CmdHttpServiceDescriptor = new Descriptor("service-announcements", "service", "commandable-http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(AnnouncementsServiceFactory.MemoryPersistenceDescriptor, AnnouncementsMemoryPersistence);
		this.registerAsType(AnnouncementsServiceFactory.FilePersistenceDescriptor, AnnouncementsFilePersistence);
		this.registerAsType(AnnouncementsServiceFactory.MongoDbPersistenceDescriptor, AnnouncementsMongoDbPersistence);
		this.registerAsType(AnnouncementsServiceFactory.ControllerDescriptor, AnnouncementsController);
		this.registerAsType(AnnouncementsServiceFactory.CmdHttpServiceDescriptor, AnnouncementsCommandableHttpServiceV1);
	}
	
}
