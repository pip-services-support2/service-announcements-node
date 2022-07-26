"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class LocationV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('name', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('pos', null);
    }
}
exports.LocationV1Schema = LocationV1Schema;
//# sourceMappingURL=LocationV1Schema.js.map