import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { AnnouncementsServiceFactory } from '../build/AnnouncementsServiceFactory';

export class AnnouncementsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("announcements", "System announcements function");
        this._dependencyResolver.put('controller', new Descriptor('service-announcements', 'controller', 'default', '*', '*'));
        this._factories.add(new AnnouncementsServiceFactory());
    }
}

export const handler = new AnnouncementsLambdaFunction().getHandler();