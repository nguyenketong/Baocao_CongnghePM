import { Report } from 'src/schemas/Report.schema';
import { BaseReportDecorator, IReportService } from './base-report.decorator';
export declare class CacheReportDecorator extends BaseReportDecorator {
    private cache;
    constructor(reportService: IReportService);
    getAllReports(): Promise<Report[]>;
    getReportById(id: string): Promise<Report>;
    getReportByTaskId(taskId: string): Promise<Report[]>;
    createReport(createReportDto: any): Promise<Report>;
    updateReport(id: string, updateReportDto: any): Promise<Report>;
    deleteReport(id: string): Promise<Report>;
}
