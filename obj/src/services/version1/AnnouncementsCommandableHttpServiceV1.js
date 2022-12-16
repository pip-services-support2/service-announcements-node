"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnouncementsCommandableHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class AnnouncementsCommandableHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/announcements');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-announcements', 'controller', 'default', '*', '1.0'));
    }
}
exports.AnnouncementsCommandableHttpServiceV1 = AnnouncementsCommandableHttpServiceV1;
//# sourceMappingURL=AnnouncementsCommandableHttpServiceV1.js.map