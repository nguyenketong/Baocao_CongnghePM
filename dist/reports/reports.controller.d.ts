import { ReportService } from './reports.service';
import { CreateReportDto } from './dto/CreateReport.dto';
import { UpdateReportDto } from './dto/UpdateReport.dto';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    createReport(createReportDto: CreateReportDto, file: Express.Multer.File): Promise<{
        success: boolean;
        data: import("../schemas/Report.schema").Report;
    }>;
    getReportByTaskId(taskId: string): Promise<import("../schemas/Report.schema").Report[]>;
    getAllReports(): Promise<import("../schemas/Report.schema").Report[]>;
    getReportById(id: string): Promise<import("../schemas/Report.schema").Report>;
    updateReport(id: string, updateReportDto: UpdateReportDto, file: Express.Multer.File): Promise<import("../schemas/Report.schema").Report>;
    deleteReport(id: string): Promise<import("../schemas/Report.schema").Report>;
}
