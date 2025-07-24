import { Report } from 'src/schemas/Report.schema';
import { CreateReportDto } from '../dto/CreateReport.dto';
import { UpdateReportDto } from '../dto/UpdateReport.dto';
import { Types } from 'mongoose';


// Interface định nghĩa các phương thức cơ bản của ReportService
export interface IReportService {
    createReport(createReportDto: CreateReportDto): Promise<Report>;
    getAllReports(): Promise<Report[]>;
    getReportById(id: Types.ObjectId | string): Promise<Report>;
    getReportByTaskId(taskId: Types.ObjectId | string): Promise<Report[]>;
    updateReport(id: string, updateReportDto: UpdateReportDto): Promise<Report>;
    deleteReport(id: string): Promise<Report>;
}

//  Base decorator class cho Report
export abstract class BaseReportDecorator implements IReportService {
    constructor(protected readonly reportService: IReportService) { }

    createReport(createReportDto: CreateReportDto): Promise<Report> {
        return this.reportService.createReport(createReportDto);
    }

    getAllReports(): Promise<Report[]> {
        return this.reportService.getAllReports();
    }

    getReportById(id: Types.ObjectId | string): Promise<Report> {
        return this.reportService.getReportById(id);
    }

    getReportByTaskId(taskId: Types.ObjectId | string): Promise<Report[]> {
        return this.reportService.getReportByTaskId(taskId);
    }

    updateReport(id: string, updateReportDto: UpdateReportDto): Promise<Report> {
        return this.reportService.updateReport(id, updateReportDto);
    }

    deleteReport(id: string): Promise<Report> {
        return this.reportService.deleteReport(id);
    }
}