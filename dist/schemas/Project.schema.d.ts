import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare class Project extends Document {
    projectName: string;
    projectCategory: mongoose.Types.ObjectId;
    projectImage: string;
    projectStart: Date;
    projectEnd: Date;
    notificationSent: mongoose.Types.ObjectId;
    assignedPerson: mongoose.Types.ObjectId;
    budget: number;
    priority: string;
    description: string;
}
export declare const ProjectSchema: mongoose.Schema<Project, mongoose.Model<Project, any, any, any, Document<unknown, any, Project> & Project & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Project, Document<unknown, {}, mongoose.FlatRecord<Project>> & mongoose.FlatRecord<Project> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
