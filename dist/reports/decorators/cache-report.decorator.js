"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheReportDecorator = void 0;
const common_1 = require("@nestjs/common");
const base_report_decorator_1 = require("./base-report.decorator");
let CacheReportDecorator = class CacheReportDecorator extends base_report_decorator_1.BaseReportDecorator {
    constructor(reportService) {
        super(reportService);
        this.cache = new Map();
    }
    async getAllReports() {
        const cacheKey = 'all_reports';
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        const reports = await super.getAllReports();
        this.cache.set(cacheKey, reports);
        return reports;
    }
    async getReportById(id) {
        const cacheKey = `report_${id}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        const report = await super.getReportById(id);
        this.cache.set(cacheKey, report);
        return report;
    }
    async getReportByTaskId(taskId) {
        const cacheKey = `reports_task_${taskId}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        const reports = await super.getReportByTaskId(taskId);
        this.cache.set(cacheKey, reports);
        return reports;
    }
    async createReport(createReportDto) {
        const result = await super.createReport(createReportDto);
        this.cache.clear();
        return result;
    }
    async updateReport(id, updateReportDto) {
        const result = await super.updateReport(id, updateReportDto);
        this.cache.clear();
        return result;
    }
    async deleteReport(id) {
        const result = await super.deleteReport(id);
        this.cache.clear();
        return result;
    }
};
exports.CacheReportDecorator = CacheReportDecorator;
exports.CacheReportDecorator = CacheReportDecorator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], CacheReportDecorator);
//# sourceMappingURL=cache-report.decorator.js.map