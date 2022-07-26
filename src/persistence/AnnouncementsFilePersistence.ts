import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';

import { AnnouncementsMemoryPersistence } from './AnnouncementsMemoryPersistence';
import { AnnouncementV1 } from '../data/version1/AnnouncementV1';

export class AnnouncementsFilePersistence extends AnnouncementsMemoryPersistence {
	protected _persister: JsonFilePersister<AnnouncementV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<AnnouncementV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}