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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const Report_schema_1 = require("../schemas/Report.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const employees_service_1 = require("../employees/employees.service");
const tasks_service_1 = require("../tasks/tasks.service");
const progress_service_1 = require("../progress/progress.service");
const database_connection_1 = require("../config/database.connection");
const report_factory_1 = require("./factory/report.factory");
let ReportService = class ReportService {
    constructor(reportModel, employeeService, taskService, progressService, reportFactory, dbConnection) {
        this.reportModel = reportModel;
        this.employeeService = employeeService;
        this.taskService = taskService;
        this.progressService = progressService;
        this.reportFactory = reportFactory;
        this.dbConnection = dbConnection;
        console.log('🏗️ ReportService được khởi tạo');
        console.log('📊 Database connection status:', this.dbConnection.getConnectionStatus());
    }
    async ensureConnection() {
        console.log('🔍 Kiểm tra kết nối database...');
        if (!this.dbConnection.getConnection()) {
            console.log('⚠️ Chưa có kết nối, đang kết nối...');
            await this.dbConnection.connect();
        }
        else {
            console.log('✅ Đã có kết nối database');
        }
        console.log('📊 Trạng thái kết nối hiện tại:', this.dbConnection.getConnectionStatus());
    }
    async createReport(createReportDto) {
        console.log('📝 Bắt đầu tạo report mới...');
        await this.ensureConnection();
        const newReport = await this.reportFactory.create(createReportDto);
        return await newReport.save();
    }
    async getAllReports() {
        console.log('🔍 Lấy danh sách tất cả report...');
        await this.ensureConnection();
        const reports = await this.reportFactory.getAll();
        return reports;
    }
    async getReportById(id) {
        await this.ensureConnection();
        const report = await this.reportFactory.getById(id);
        return report;
    }
    async getReportByTaskId(taskId) {
        await this.ensureConnection();
        const report = await this.reportFactory.getByTaskId(taskId);
        return report;
    }
    async updateReport(id, updateReportDto) {
        await this.ensureConnection();
        const updatedReport = await this.reportFactory.update(id, updateReportDto);
        return updatedReport;
    }
    async deleteReport(id) {
        await this.ensureConnection();
        return this.reportFactory.delete(id);
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Report_schema_1.Report.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => employees_service_1.EmployeeService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => tasks_service_1.TaskService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => progress_service_1.ProgressService))),
    __param(5, (0, common_1.Inject)('DATABASE_CONNECTION')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        employees_service_1.EmployeeService,
        tasks_service_1.TaskService,
        progress_service_1.ProgressService,
        report_factory_1.ReportFactory,
        database_connection_1.DatabaseConnection])
], ReportService);
//# sourceMappingURL=reports.service.js.map