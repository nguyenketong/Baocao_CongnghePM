import { BadRequestException, Injectable } from '@nestjs/common';
import { Report } from 'src/schemas/Report.schema';
import { CreateReportDto } from '../dto/CreateReport.dto';
import { UpdateReportDto } from '../dto/UpdateReport.dto';
import { BaseReportDecorator, IReportService } from './base-report.decorator';

@Injectable()
export class ValidationReportDecorator extends BaseReportDecorator {
    constructor(reportService: IReportService) {
        super(reportService);
    }

    async createReport(createReportDto: CreateReportDto): Promise<Report> {
        this.validateReportData(createReportDto);
        return super.createReport(createReportDto);
    }

    async updateReport(report_id: string, updateReportDto: UpdateReportDto): Promise<Report> {
        this.validateReportData(updateReportDto);
        return super.updateReport(report_id, updateReportDto);
    }

    private validateReportData(reportDto: CreateReportDto | UpdateReportDto): void {
        if (reportDto.reportName && reportDto.reportName.length < 3) {
            throw new BadRequestException('Tên báo cáo phải có ít nhất 3 ký tự');
        }
    }
}
