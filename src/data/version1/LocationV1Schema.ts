import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class LocationV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withRequiredProperty('name', TypeCode.String);
        this.withOptionalProperty('pos', null);
    }
}