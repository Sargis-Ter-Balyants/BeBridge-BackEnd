import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { NotificationsDTO } from "./dto/notifications.dto";
import { PaginateModel, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { NotificationsModel, NotificationsPaginateModel } from "./entities/notification.entity";

@Injectable()
export class NotificationsService {
    constructor(
        @InjectModel(NotificationsModel.name)
        private readonly notificationsModel: NotificationsPaginateModel
    ) {}

    getAll(page: number, limit: number) {
        const query = {};

        const options = {
            page,
            limit,
        };

        return this.notificationsModel.paginate(query, options);
    }

    async getOne(id: Types.ObjectId) {
        if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`Incorrect id`);

        const notification = await this.notificationsModel.findById(id);
        if (!notification) throw new NotFoundException(`Notification not found`);

        return notification;
    }

    async create(body: NotificationsDTO) {
        return this.notificationsModel.create(body);
    }

    async update(id: Types.ObjectId, body: NotificationsDTO) {
        if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`Incorrect query`);

        const updatedNotification = await this.notificationsModel.findByIdAndUpdate(id, { ...body }, { new: true });
        if (!updatedNotification) throw new NotFoundException(`Notification not found`);

        return updatedNotification;
    }

    async delete(id: Types.ObjectId) {
        if (!Types.ObjectId.isValid(id)) throw new BadRequestException(`Incorrect query`);

        const notification = await this.notificationsModel.findByIdAndDelete({ _id: id });
        if (!notification) throw new NotFoundException(`Notification not found`);

        return notification;
    }
}
