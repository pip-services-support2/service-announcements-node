import { AnnouncementsFilePersistence } from '../../src/persistence/AnnouncementsFilePersistence';
import { AnnouncementsPersistenceFixture } from './AnnouncementsPersistenceFixture';

suite('AnnouncementsFilePersistence', ()=> {
    let persistence: AnnouncementsFilePersistence;
    let fixture: AnnouncementsPersistenceFixture;
    
    setup(async () => {
        persistence = new AnnouncementsFilePersistence('./data/Announcements.test.json');

        fixture = new AnnouncementsPersistenceFixture(persistence);
        
        await persistence.open(null);
        await persistence.clear(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Get with Filters', async () => {
        await fixture.testGetWithFilter();
    });

    test('Get Random', async () => {
        await fixture.testGetRandom();
    });

});