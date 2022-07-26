const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { MultiString } from 'pip-services3-commons-nodex';

import { IAnnouncementsPersistence } from '../../src/persistence/IAnnouncementsPersistence';
import { AnnouncementV1 } from '../../src/data/version1/AnnouncementV1';
import { PartyReferenceV1 } from '../../src/data/version1/PartyReferenceV1';

let ANNOUNCEMENT1 = <AnnouncementV1>{
    id: '1',
    category: 'maintenance',
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: new MultiString({ en: 'Announcement 1' }),
    content: new MultiString({ en: 'Sample Announcement #1' }),
    status: 'new'
};
let ANNOUNCEMENT2 = <AnnouncementV1>{
    id: '2',
    tags: ['TAG 1'],
    all_tags: ['tag1'],
    category: 'maintenance',
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: new MultiString({ en: 'Announcement 2' }),
    content: new MultiString({ en: 'Sample Announcement #2' }),
    status: 'new'
};
let ANNOUNCEMENT3 = <AnnouncementV1>{
    id: '3',
    tags: ['Tag 1', 'tag 2'],
    all_tags: ['tag1', 'tag2'],
    category: 'maintenance',
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: new MultiString({ en: 'Announcement 3' }),
    content: new MultiString({ en: 'Sample Announcement #3' }),
    status: 'translating'
};

export class AnnouncementsPersistenceFixture {
    private _persistence: IAnnouncementsPersistence;
    
    constructor(persistence: IAnnouncementsPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public async createAnnouncements() {
        // Create one announcement
        let announcement = await this._persistence.create(null, ANNOUNCEMENT1);

        assert.isObject(announcement);
        assert.equal(announcement.status, 'new');
        assert.equal(announcement.category, ANNOUNCEMENT1.category);
        // assert.equal(announcement.content, ANNOUNCEMENT1.content);

        // Create another announcement
        announcement = await this._persistence.create(null, ANNOUNCEMENT2);

        assert.isObject(announcement);
        assert.equal(announcement.status, 'new');
        assert.equal(announcement.category, ANNOUNCEMENT2.category);
        // assert.equal(announcement.content, ANNOUNCEMENT2.content);

        announcement = await this._persistence.create(null, ANNOUNCEMENT3);

        assert.isObject(announcement);
        assert.equal(announcement.status, ANNOUNCEMENT3.status);
        assert.equal(announcement.category, ANNOUNCEMENT3.category);
        // assert.equal(announcement.content, ANNOUNCEMENT3.content);
    }
                
    public async testCrudOperations() {
        let announcement1: AnnouncementV1;

        // Create items
        await this.createAnnouncements();

        // Get all announcements
        let page = await this._persistence.getPageByFilter(
            null,
            new FilterParams(),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        announcement1 = page.data[0];

        // Update the announcement
        announcement1.content = new MultiString({ en: 'Updated Content 1' });

        let announcement = await this._persistence.update(null, announcement1);
        
        assert.isObject(announcement);
        //assert.equal(announcement.content.get('en'), 'Updated Content 1');
        assert.equal(announcement.category, announcement1.category);

        // Delete announcement
        await this._persistence.deleteById(null, announcement1.id);

        // Try to get delete announcement
        announcement = await this._persistence.getOneById(null, announcement1.id);

        assert.isNull(announcement || null);
    }

    public async testGetWithFilter() {

        // Create announcements
        await this.createAnnouncements();

        // Get announcements filtered by tags
        let page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                tags: ['tag1']
            }),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Get announcements filtered by status
        page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                status: ANNOUNCEMENT3.status
            }),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 1);
    }

    public async testGetRandom() {
        // Create announcements
        await this.createAnnouncements();

        // Get random announcement filtered by tags
        let announcement = await this._persistence.getOneRandom(
            null,
            FilterParams.fromValue({
                tags: ['tag1'],
                status: 'new'
            })
        );

        assert.isObject(announcement);
        assert.equal(ANNOUNCEMENT2.id, announcement.id);
    }
}
