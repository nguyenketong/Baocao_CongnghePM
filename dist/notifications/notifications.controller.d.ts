import { NotificationService } from './notifications.service';
import mongoose from 'mongoose';
import { CreateNotificationSentDto } from './dto/CreateNotification.dto';
import { UpdateNotificationSentDto } from './dto/UpdateNotification.dto';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    create(createNotificationDto: CreateNotificationSentDto): Promise<Notification>;
    getNotifications(): Promise<(mongoose.Document<unknown, {}, Notification> & Notification & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getNotificationById(id: string): Promise<mongoose.Document<unknown, {}, Notification> & Notification & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateNotification(id: string, updateNotificationDto: UpdateNotificationSentDto): Promise<mongoose.Document<unknown, {}, Notification> & Notification & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteNotification(id: string): Promise<mongoose.Document<unknown, {}, Notification> & Notification & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
}
