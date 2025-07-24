import { Injectable } from '@nestjs/common';
import { Report } from 'src/schemas/Report.schema';
import { BaseReportDecorator, IReportService } from './base-report.decorator';

@Injectable()
export class CacheReportDecorator extends BaseReportDecorator {
    private cache: Map<string, any> = new Map();

    constructor(reportService: IReportService) {
        super(reportService);
    }

    async getAllReports(): Promise<Report[]> {
        const cacheKey = 'all_reports';
        if (this.cache.has(cacheKey)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return this.cache.get(cacheKey);
        }

        const reports = await super.getAllReports();
        this.cache.set(cacheKey, reports);
        return reports;
    }

    async getReportById(id: string): Promise<Report> {
        const cacheKey = `report_${id}`;
        if (this.cache.has(cacheKey)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return this.cache.get(cacheKey);
        }

        const report = await super.getReportById(id);
        this.cache.set(cacheKey, report);
        return report;
    }

    async getReportByTaskId(taskId: string): Promise<Report[]> {
        const cacheKey = `reports_task_${taskId}`;
        if (this.cache.has(cacheKey)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return this.cache.get(cacheKey);
        }

        const reports = await super.getReportByTaskId(taskId);
        this.cache.set(cacheKey, reports);
        return reports;
    }

    async createReport(createReportDto: any): Promise<Report> {
        const result = await super.createReport(createReportDto);
        this.cache.clear(); // Xóa cache khi dữ liệu thay đổi
        return result;
    }

    async updateReport(id: string, updateReportDto: any): Promise<Report> {
        const result = await super.updateReport(id, updateReportDto);
        this.cache.clear(); // Xóa cache khi dữ liệu thay đổi
        return result;
    }

    async deleteReport(id: string): Promise<Report> {
        const result = await super.deleteReport(id);
        this.cache.clear(); // Xóa cache khi dữ liệu thay đổi
        return result;
    }
}
