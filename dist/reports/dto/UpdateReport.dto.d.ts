import { Types } from "mongoose";
export declare class UpdateReportDto {
    reportName?: string;
    submission_time?: Date;
    status?: string;
    notereport?: string;
    filerepport?: string;
    id_employee?: Types.ObjectId;
    id_task?: Types.ObjectId;
    id_progress?: Types.ObjectId;
}
