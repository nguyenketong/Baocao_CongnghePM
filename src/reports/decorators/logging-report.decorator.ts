import { Injectable, Logger } from '@nestjs/common';
import { Report } from 'src/schemas/Report.schema';
import { CreateReportDto } from '../dto/CreateReport.dto';
import { UpdateReportDto } from '../dto/UpdateReport.dto';
import { BaseReportDecorator, IReportService } from './base-report.decorator';

@Injectable()
export class LoggingReportDecorator extends BaseReportDecorator {
    private readonly logger = new Logger(LoggingReportDecorator.name);

    constructor(reportService: IReportService) {
        super(reportService);
    }

    async createReport(createReportDto: CreateReportDto): Promise<Report> {
        this.logger.log(`Creating report with title: ${createReportDto.reportName}`);
        const result = await super.createReport(createReportDto);
        this.logger.log(`Report created successfully with ID: ${result._id}`);
        return result;
    }

    async deleteReport(id: string): Promise<Report> {
        this.logger.log(`Attempting to delete report with ID: ${id}`);
        const result = await super.deleteReport(id);
        this.logger.log(`Report deleted successfully: ${id}`);
        return result;
    }

    // async addReportReviewer(reportId: string, addReportReviewerDto: any): Promise<any> {
    //     this.logger.log(`Adding reviewer ${addReportReviewerDto.reviewerId} to report ${reportId}`);
    //     const result = await super.addReportReviewer(reportId, addReportReviewerDto);
    //     this.logger.log(`Reviewer added successfully to report ${reportId}`);
    //     return result;
    // }
}