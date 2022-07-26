"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.AnnouncementsLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const AnnouncementsServiceFactory_1 = require("../build/AnnouncementsServiceFactory");
class AnnouncementsLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("announcements", "System announcements function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-announcements', 'controller', 'default', '*', '*'));
        this._factories.add(new AnnouncementsServiceFactory_1.AnnouncementsServiceFactory());
    }
}
exports.AnnouncementsLambdaFunction = AnnouncementsLambdaFunction;
exports.handler = new AnnouncementsLambdaFunction().getHandler();
//# sourceMappingURL=AnnouncementsLambdaFunction.js.map