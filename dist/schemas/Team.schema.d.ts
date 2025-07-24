import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare class Team extends Document {
    teamName: string;
    teamLead: mongoose.Types.ObjectId;
    projectid: mongoose.Types.ObjectId;
}
export declare const TeamSchema: mongoose.Schema<Team, mongoose.Model<Team, any, any, any, Document<unknown, any, Team> & Team & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Team, Document<unknown, {}, mongoose.FlatRecord<Team>> & mongoose.FlatRecord<Team> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
