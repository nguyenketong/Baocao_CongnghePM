import { Types } from "mongoose";
export declare class CreateProjectDto {
    projectName: string;
    projectCategory?: Types.ObjectId;
    projectImage: string;
    projectStart: Date;
    projectEnd: Date;
    notificationSent?: Types.ObjectId;
    assignedPerson?: Types.ObjectId;
    budget: number;
    priority: string;
    description: string;
}
