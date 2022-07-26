import { AnnouncementsMemoryPersistence } from '../../src/persistence/AnnouncementsMemoryPersistence';
import { AnnouncementsPersistenceFixture } from './AnnouncementsPersistenceFixture';

suite('AnnouncementsMemoryPersistence', ()=> {
    let persistence: AnnouncementsMemoryPersistence;
    let fixture: AnnouncementsPersistenceFixture;
    
    setup(async () => {
        persistence = new AnnouncementsMemoryPersistence();
        fixture = new AnnouncementsPersistenceFixture(persistence);
        
        await persistence.open(null);
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