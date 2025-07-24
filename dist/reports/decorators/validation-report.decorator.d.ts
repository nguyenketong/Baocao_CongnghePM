import { Report } from 'src/schemas/Report.schema';
import { CreateReportDto } from '../dto/CreateReport.dto';
import { UpdateReportDto } from '../dto/UpdateReport.dto';
import { BaseReportDecorator, IReportService } from './base-report.decorator';
export declare class ValidationReportDecorator extends BaseReportDecorator {
    constructor(reportService: IReportService);
    createReport(createReportDto: CreateReportDto): Promise<Report>;
    updateReport(report_id: string, updateReportDto: UpdateReportDto): Promise<Report>;
    private validateReportData;
}
