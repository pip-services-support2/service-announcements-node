import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';

import { AnnouncementV1Schema } from '../data/version1/AnnouncementV1Schema';
import { IAnnouncementsController } from './IAnnouncementsController';

export class AnnouncementsCommandSet extends CommandSet {
    private _logic: IAnnouncementsController;

	constructor(logic: IAnnouncementsController) {
		super();

		this._logic = logic;

		// Register commands to the database
		this.addCommand(this.makeGetAnnouncementsCommand());
		this.addCommand(this.makeGetRandomAnnouncementCommand());
		this.addCommand(this.makeGetAnnouncementByIdCommand());
		this.addCommand(this.makeCreateAnnouncementCommand());
		this.addCommand(this.makeUpdateAnnouncementCommand());
		this.addCommand(this.makeDeleteAnnouncementByIdCommand());
	}

	private makeGetAnnouncementsCommand(): ICommand {
		return new Command(
			"get_announcements",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
			async (correlationId: string, args: Parameters) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				let paging = PagingParams.fromValue(args.get("paging"));
				return await this._logic.getAnnouncements(correlationId, filter, paging);
			}
		);
	}

	private makeGetRandomAnnouncementCommand(): ICommand {
		return new Command(
			"get_random_announcement",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema()),
			async (correlationId: string, args: Parameters) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				return await this._logic.getRandomAnnouncement(correlationId, filter);
			}
		);
	}

	private makeGetAnnouncementByIdCommand(): ICommand {
		return new Command(
			"get_announcement_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('announcement_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
				let announcementId = args.getAsNullableString("announcement_id");
				return await  this._logic.getAnnouncementById(correlationId, announcementId);
			}
		);
	}

	private makeCreateAnnouncementCommand(): ICommand {
		return new Command(
			"create_announcement",
			new ObjectSchema(true)
				.withRequiredProperty('announcement', new AnnouncementV1Schema()),
			async (correlationId: string, args: Parameters) => {
				let announcement = args.get("announcement");
				return await this._logic.createAnnouncement(correlationId, announcement);
			}
		);
	}

	private makeUpdateAnnouncementCommand(): ICommand {
		return new Command(
			"update_announcement",
			new ObjectSchema(true)
				.withRequiredProperty('announcement', new AnnouncementV1Schema()),
			async (correlationId: string, args: Parameters) => {
				let announcement = args.get("announcement");
				return await this._logic.updateAnnouncement(correlationId, announcement);
			}
		);
	}

	private makeDeleteAnnouncementByIdCommand(): ICommand {
		return new Command(
			"delete_announcement_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('announcement_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
				let announcementId = args.getAsNullableString("announcement_id");
				return await this._logic.deleteAnnouncementById(correlationId, announcementId);
			}
		);
	}

}