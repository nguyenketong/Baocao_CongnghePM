"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseReportDecorator = void 0;
//  Base decorator class cho Report
var BaseReportDecorator = /** @class */ (function () {
    function BaseReportDecorator(reportService) {
        this.reportService = reportService;
    }
    BaseReportDecorator.prototype.createReport = function (createReportDto) {
        return this.reportService.createReport(createReportDto);
    };
    BaseReportDecorator.prototype.getAllReports = function () {
        return this.reportService.getAllReports();
    };
    BaseReportDecorator.prototype.getReportById = function (id) {
        return this.reportService.getReportById(id);
    };
    BaseReportDecorator.prototype.getReportByTaskId = function (taskId) {
        return this.reportService.getReportByTaskId(taskId);
    };
    BaseReportDecorator.prototype.updateReport = function (id, updateReportDto) {
        return this.reportService.updateReport(id, updateReportDto);
    };
    BaseReportDecorator.prototype.deleteReport = function (id) {
        return this.reportService.deleteReport(id);
    };
    return BaseReportDecorator;
}());
exports.BaseReportDecorator = BaseReportDecorator;
