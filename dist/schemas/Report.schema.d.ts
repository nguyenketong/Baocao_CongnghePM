import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare class Report extends Document {
    reportName: string;
    submission_time: Date;
    status: string;
    notereport: string;
    filerepport: string;
    id_employee: mongoose.Types.ObjectId;
    id_task?: mongoose.Types.ObjectId;
    id_progress?: mongoose.Types.ObjectId;
}
export declare const ReportSchema: mongoose.Schema<Report, mongoose.Model<Report, any, any, any, Document<unknown, any, Report> & Report & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Report, Document<unknown, {}, mongoose.FlatRecord<Report>> & mongoose.FlatRecord<Report> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
