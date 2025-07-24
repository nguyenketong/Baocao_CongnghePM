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
var LoggingReportDecorator_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingReportDecorator = void 0;
const common_1 = require("@nestjs/common");
const base_report_decorator_1 = require("./base-report.decorator");
let LoggingReportDecorator = LoggingReportDecorator_1 = class LoggingReportDecorator extends base_report_decorator_1.BaseReportDecorator {
    constructor(reportService) {
        super(reportService);
        this.logger = new common_1.Logger(LoggingReportDecorator_1.name);
    }
    async createReport(createReportDto) {
        this.logger.log(`Creating report with title: ${createReportDto.reportName}`);
        const result = await super.createReport(createReportDto);
        this.logger.log(`Report created successfully with ID: ${result._id}`);
        return result;
    }
    async deleteReport(id) {
        this.logger.log(`Attempting to delete report with ID: ${id}`);
        const result = await super.deleteReport(id);
        this.logger.log(`Report deleted successfully: ${id}`);
        return result;
    }
};
exports.LoggingReportDecorator = LoggingReportDecorator;
exports.LoggingReportDecorator = LoggingReportDecorator = LoggingReportDecorator_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], LoggingReportDecorator);
//# sourceMappingURL=logging-report.decorator.js.map