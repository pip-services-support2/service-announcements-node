import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class AnnouncementsCommandableHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/announcements');
        this._dependencyResolver.put('controller', new Descriptor('service-announcements', 'controller', 'default', '*', '1.0'));
    }
}