import { Types } from "mongoose";
export declare class UpdateTaskDto {
    taskName?: string;
    progressName?: Types.ObjectId;
    taskCategory?: Types.ObjectId;
    taskStart?: Date;
    taskEnd?: Date;
    notificationSent?: Types.ObjectId;
    taskAssignPerson?: Types.ObjectId;
    taskRecipient?: Types.ObjectId;
    priority?: string;
    description?: string;
    status?: string;
}
