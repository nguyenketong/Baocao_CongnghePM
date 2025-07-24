"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseReportDecorator = void 0;
class BaseReportDecorator {
    constructor(reportService) {
        this.reportService = reportService;
    }
    createReport(createReportDto) {
        return this.reportService.createReport(createReportDto);
    }
    getAllReports() {
        return this.reportService.getAllReports();
    }
    getReportById(id) {
        return this.reportService.getReportById(id);
    }
    getReportByTaskId(taskId) {
        return this.reportService.getReportByTaskId(taskId);
    }
    updateReport(id, updateReportDto) {
        return this.reportService.updateReport(id, updateReportDto);
    }
    deleteReport(id) {
        return this.reportService.deleteReport(id);
    }
}
exports.BaseReportDecorator = BaseReportDecorator;
//# sourceMappingURL=base-report.decorator.js.map