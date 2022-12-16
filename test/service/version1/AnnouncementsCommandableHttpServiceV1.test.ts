const assert = require('chai').assert;
const restify = require('restify');

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { MultiString } from 'pip-services3-commons-nodex';

import { PartyReferenceV1 } from '../../../src/data/version1/PartyReferenceV1';
import { AnnouncementV1 } from '../../../src/data/version1/AnnouncementV1';
import { AnnouncementsMemoryPersistence } from '../../../src/persistence/AnnouncementsMemoryPersistence';
import { AnnouncementsController } from '../../../src/logic/AnnouncementsController';
import { AnnouncementsCommandableHttpServiceV1 } from '../../../src/services/version1/AnnouncementsCommandableHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let ANNOUNCEMENT1 = <AnnouncementV1>{
    id: '1',
    category: 'maintenance',
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: new MultiString({ en: 'Announcement 1' }),
    content: new MultiString({ en: 'Sample Announcement #1' })
};
let ANNOUNCEMENT2 = <AnnouncementV1>{
    id: '2',
    tags: ['TAG 1'],
    category: 'maintenance',
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: new MultiString({ en: 'Announcement 2' }),
    content: new MultiString({ en: 'Sample Announcement #2' })
};

suite('AnnouncementsCommandableHttpServiceV1', ()=> {
    let service: AnnouncementsCommandableHttpServiceV1;

    let rest: any;

    suiteSetup(async () => {
        let persistence = new AnnouncementsMemoryPersistence();
        let controller = new AnnouncementsController();

        service = new AnnouncementsCommandableHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-announcements', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-announcements', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-announcements', 'service', 'commandable-http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    test('CRUD Operations', async () => {
        let announcement1, announcement2;

        // Create one announcement
        let announcement = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/announcements/create_announcement',
                {
                    announcement: ANNOUNCEMENT1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(announcement);
        assert.equal(announcement.category, ANNOUNCEMENT1.category);
        assert.equal(announcement.content.en, ANNOUNCEMENT1.content.get('en'));

        announcement1 = announcement;

        // Create another announcement
        announcement = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/announcements/create_announcement',
                {
                    announcement: ANNOUNCEMENT2
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(announcement);
        assert.equal(announcement.category, ANNOUNCEMENT2.category);
        assert.equal(announcement.content.en, ANNOUNCEMENT2.content.get('en'));

        announcement2 = announcement;

        // Get all announcements
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/announcements/get_announcements',
                {},
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        }); 

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the announcement
        announcement1.content = new MultiString({ en: 'Updated Content 1' });

        announcement = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/announcements/update_announcement',
                {
                    announcement: announcement1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        }); 

        assert.isObject(announcement);
        assert.equal(announcement.content.en, 'Updated Content 1');
        assert.equal(announcement.category, ANNOUNCEMENT1.category);

        announcement1 = announcement;

        // Delete announcement
        await new Promise<any>((resolve, reject) => {
            rest.post('/v1/announcements/delete_announcement_by_id',
                {
                    announcement_id: announcement1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        }); 

        // Try to get delete announcement
        announcement = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/announcements/get_announcement_by_id',
                {
                    announcement_id: announcement1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        }); 

        // assert.isNull(announcement || null);
    });
});