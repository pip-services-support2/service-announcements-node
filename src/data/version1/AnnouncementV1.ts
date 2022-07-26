import { IStringIdentifiable } from 'pip-services3-commons-nodex';
import { MultiString } from 'pip-services3-commons-nodex';

import { LocationV1 } from './LocationV1';
import { AttachmentV1 } from './AttachmentV1';
import { PartyReferenceV1 } from './PartyReferenceV1';

export class AnnouncementV1 implements IStringIdentifiable {

    public constructor(id: string, category: string, app?: string,
        creator?: PartyReferenceV1, title?: MultiString, content?: MultiString) {
        this.id = id;
        this.category = category;
        this.app = app;
        this.creator = creator;
        this.title = title;
        this.content = content;

        this.pics = [];
        this.docs = [];
        this.create_time = new Date();
    }

    /* Identification */
    public id: string;
    public category: string;
    public app?: string;

    /* Automatically managed fields */
    public creator: PartyReferenceV1;
    public create_time: Date;

    /* Content */
    public title?: MultiString;
    public content?: MultiString;
    public location?: LocationV1;
    public start_time?: Date;
    public end_time?: Date;
    public pics?: AttachmentV1[];
    public docs?: AttachmentV1[];

    /* Search */
    public tags?: string[];
    public all_tags?: string[];

    /* Status */
    public status?: string;
    public importance?: number;

    /* Custom fields */
    public custom_hdr?: any;
    public custom_dat?: any;
}
