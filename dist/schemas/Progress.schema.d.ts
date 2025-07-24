import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare class Progress extends Document {
    progressName: string;
    projectid: mongoose.Types.ObjectId;
    progressCategory: mongoose.Types.ObjectId;
    progressStart: Date;
    progressEnd: Date;
    notificationSent: mongoose.Types.ObjectId;
    taskAssignPerson: mongoose.Types.ObjectId;
    taskRecipient: mongoose.Types.ObjectId;
    priority: string;
    description: string;
    status: string;
}
export declare const ProgressSchema: mongoose.Schema<Progress, mongoose.Model<Progress, any, any, any, Document<unknown, any, Progress> & Progress & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Progress, Document<unknown, {}, mongoose.FlatRecord<Progress>> & mongoose.FlatRecord<Progress> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
