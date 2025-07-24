import { Report } from 'src/schemas/Report.schema';
import { CreateReportDto } from '../dto/CreateReport.dto';
import { UpdateReportDto } from '../dto/UpdateReport.dto';
import { Types } from 'mongoose';
export interface IReportService {
    createReport(createReportDto: CreateReportDto): Promise<Report>;
    getAllReports(): Promise<Report[]>;
    getReportById(id: Types.ObjectId | string): Promise<Report>;
    getReportByTaskId(taskId: Types.ObjectId | string): Promise<Report[]>;
    updateReport(id: string, updateReportDto: UpdateReportDto): Promise<Report>;
    deleteReport(id: string): Promise<Report>;
}
export declare abstract class BaseReportDecorator implements IReportService {
    protected readonly reportService: IReportService;
    constructor(reportService: IReportService);
    createReport(createReportDto: CreateReportDto): Promise<Report>;
    getAllReports(): Promise<Report[]>;
    getReportById(id: Types.ObjectId | string): Promise<Report>;
    getReportByTaskId(taskId: Types.ObjectId | string): Promise<Report[]>;
    updateReport(id: string, updateReportDto: UpdateReportDto): Promise<Report>;
    deleteReport(id: string): Promise<Report>;
}
