import { Types } from "mongoose";
export declare class CreateProgressDto {
    progressName: string;
    projectid?: Types.ObjectId;
    progressCategory?: Types.ObjectId;
    progressStart: Date;
    progressEnd: Date;
    notificationSent?: Types.ObjectId;
    taskAssignPerson?: Types.ObjectId;
    taskRecipient?: Types.ObjectId;
    priority: string;
    description: string;
    status: string;
}
