import { Model, Types } from 'mongoose';
import { CreateNotificationSentDto } from './dto/CreateNotification.dto';
import { UpdateNotificationSentDto } from './dto/UpdateNotification.dto';
export declare class NotificationService {
    private notificationModel;
    constructor(notificationModel: Model<Notification>);
    create(createNotificationDto: CreateNotificationSentDto): Promise<Notification>;
    getNotifications(): Promise<(import("mongoose").Document<unknown, {}, Notification> & Notification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getNotificationById(id: Types.ObjectId | string): Promise<(import("mongoose").Document<unknown, {}, Notification> & Notification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateNotification(id: string, updateNotificationDto: UpdateNotificationSentDto): Promise<(import("mongoose").Document<unknown, {}, Notification> & Notification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteNotification(id: string): Promise<(import("mongoose").Document<unknown, {}, Notification> & Notification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
