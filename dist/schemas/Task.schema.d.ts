import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare class Task extends Document {
    taskName: string;
    progressId: mongoose.Types.ObjectId;
    taskCategory: mongoose.Types.ObjectId;
    taskStart: Date;
    taskEnd: Date;
    notificationSent: mongoose.Types.ObjectId;
    taskAssignPerson: mongoose.Types.ObjectId;
    taskRecipient: mongoose.Types.ObjectId;
    priority: string;
    description: string;
    status: string;
}
export declare const TaskSchema: mongoose.Schema<Task, mongoose.Model<Task, any, any, any, Document<unknown, any, Task> & Task & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Task, Document<unknown, {}, mongoose.FlatRecord<Task>> & mongoose.FlatRecord<Task> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
