const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { MultiString } from 'pip-services3-commons-nodex';

import { PartyReferenceV1 } from '../../src/data/version1/PartyReferenceV1';
import { AnnouncementV1 } from '../../src/data/version1/AnnouncementV1';
import { AnnouncementsLambdaFunction } from '../../src/container/AnnouncementsLambdaFunction';

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

suite('AnnouncementsLambdaFunction', ()=> {
    let lambda: AnnouncementsLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-announcements:persistence:memory:default:1.0',
            'controller.descriptor', 'service-announcements:controller:default:default:1.0'
        );

        lambda = new AnnouncementsLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await  lambda.close(null);
    });
    
    test('CRUD Operations', async () => {
        let announcement1, announcement2;

        // Create one announcement
        let announcement = await lambda.act(
            {
                role: 'announcements',
                cmd: 'create_announcement',
                announcement: ANNOUNCEMENT1
            }
        );

        assert.isObject(announcement);
        assert.equal(announcement.category, ANNOUNCEMENT1.category);
        assert.equal(announcement.content.en, ANNOUNCEMENT1.content.get('en'));

        announcement1 = announcement;

        // Create another announcement
        announcement = await lambda.act(
            {
                role: 'announcements',
                cmd: 'create_announcement',
                announcement: ANNOUNCEMENT2
            }
        );

        assert.isObject(announcement);
        assert.equal(announcement.category, ANNOUNCEMENT2.category);
        assert.equal(announcement.content.en, ANNOUNCEMENT2.content.get('en'));

        announcement2 = announcement;

        // Get all announcements
        let page = await lambda.act(
            {
                role: 'announcements',
                cmd: 'get_announcements'
            }
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the announcement
        announcement1.content = new MultiString({ en: 'Updated Content 1' });

        announcement = await lambda.act(
            {
                role: 'announcements',
                cmd: 'update_announcement',
                announcement: announcement1
            }
        );

        assert.isObject(announcement);
        assert.equal(announcement.content.en, 'Updated Content 1');
        assert.equal(announcement.category, ANNOUNCEMENT1.category);

        announcement1 = announcement;

        // Delete announcement
        await lambda.act(
            {
                role: 'announcements',
                cmd: 'delete_announcement_by_id',
                announcement_id: announcement1.id
            }
        );

        // Try to get delete announcement
        announcement = await lambda.act(
            {
                role: 'announcements',
                cmd: 'get_announcement_by_id',
                announcement_id: announcement1.id
            }
        );

        assert.isNull(announcement || null);
    });
});