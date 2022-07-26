import { DataPage, FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { TagsProcessor } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';

import { AnnouncementV1 } from '../data/version1/AnnouncementV1';
import { IAnnouncementsPersistence } from './IAnnouncementsPersistence';

export class AnnouncementsMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<AnnouncementV1, string> 
    implements IAnnouncementsPersistence {

    constructor() {
        super('announcements');
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let criteria = [];

        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ 'title.en': { $regex: searchRegex } });
            searchCriteria.push({ 'title.sp': { $regex: searchRegex } });
            searchCriteria.push({ 'title.fr': { $regex: searchRegex } });
            searchCriteria.push({ 'title.de': { $regex: searchRegex } });
            searchCriteria.push({ 'title.ru': { $regex: searchRegex } });
            searchCriteria.push({ 'content.en': { $regex: searchRegex } });
            searchCriteria.push({ 'content.sp': { $regex: searchRegex } });
            searchCriteria.push({ 'content.fr': { $regex: searchRegex } });
            searchCriteria.push({ 'content.de': { $regex: searchRegex } });
            searchCriteria.push({ 'content.ru': { $regex: searchRegex } });
            searchCriteria.push({ 'location.name': { $regex: searchRegex } });
            searchCriteria.push({ 'creator.name': { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        let category = filter.getAsNullableString('category');
        if (category != null)
            criteria.push({ category: category });

        let app = filter.getAsNullableString('app');
        if (app != null)
            criteria.push({ app: app });

        let status = filter.getAsNullableString('status');
        if (status != null)
            criteria.push({ status: status });

        // Search by tags
        let tags = filter.getAsObject('tags');
        if (tags) {
            let searchTags = TagsProcessor.compressTags([tags]);
            criteria.push({ all_tags: { $in: searchTags } });
        }

        let fromCreateTime = filter.getAsNullableDateTime('from_create_time');
        if (fromCreateTime != null)
            criteria.push({ create_time: { $gte: fromCreateTime } });

        let toCreateTime = filter.getAsNullableDateTime('to_create_time');
        if (toCreateTime != null)
            criteria.push({ create_time: { $lt: toCreateTime } });

        return criteria.length > 0 ? { $and: criteria } : {};
    }

    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<AnnouncementV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, '-create_time', null);
    }

    public async getOneRandom(correlationId: string, filter: FilterParams): Promise<AnnouncementV1> {
        return await  super.getOneRandom(correlationId, this.composeFilter(filter));
    }
}
