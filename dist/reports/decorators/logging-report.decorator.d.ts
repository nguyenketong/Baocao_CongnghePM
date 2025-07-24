import { Report } from 'src/schemas/Report.schema';
import { CreateReportDto } from '../dto/CreateReport.dto';
import { BaseReportDecorator, IReportService } from './base-report.decorator';
export declare class LoggingReportDecorator extends BaseReportDecorator {
    private readonly logger;
    constructor(reportService: IReportService);
    createReport(createReportDto: CreateReportDto): Promise<Report>;
    deleteReport(id: string): Promise<Report>;
}
