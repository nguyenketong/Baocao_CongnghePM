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
exports.ReportFactory = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Report_schema_1 = require("../../schemas/Report.schema");
const employees_service_1 = require("../../employees/employees.service");
const tasks_service_1 = require("../../tasks/tasks.service");
const progress_service_1 = require("../../progress/progress.service");
let ReportFactory = class ReportFactory {
    constructor(reportModel, employeeService, taskService, progressService) {
        this.reportModel = reportModel;
        this.employeeService = employeeService;
        this.taskService = taskService;
        this.progressService = progressService;
    }
    async create(createReportDto) {
        const { id_employee, id_task, id_progress } = createReportDto;
        if (id_employee) {
            const employeeExists = await this.employeeService.getEmployeeById(id_employee);
            if (!employeeExists) {
                throw new common_1.BadRequestException('Employee không tồn tại');
            }
        }
        if (id_task) {
            const taskExists = await this.taskService.getTaskById(id_task);
            if (!taskExists) {
                throw new common_1.BadRequestException('Task không tồn tại');
            }
        }
        if (id_progress) {
            const progressExists = await this.progressService.getProgressById(id_progress);
            if (!progressExists) {
                throw new common_1.BadRequestException('Progress không tồn tại');
            }
        }
        const newReport = new this.reportModel(createReportDto);
        return await newReport.save();
    }
    async getAll() {
        return await this.reportModel
            .find()
            .populate('id_employee')
            .populate('id_task')
            .populate('id_progress')
            .exec();
    }
    async getById(id) {
        const report = await this.reportModel
            .findById(id)
            .populate(['id_employee', 'id_task', 'id_progress'])
            .exec();
        if (!report) {
            throw new common_1.NotFoundException('Report không tồn tại');
        }
        return report;
    }
    async getByTaskId(taskId) {
        const taskObjectId = mongoose_2.Types.ObjectId.isValid(taskId) ? new mongoose_2.Types.ObjectId(taskId) : taskId;
        const report = await this.reportModel
            .find({ id_task: taskObjectId })
            .populate(['id_employee', 'id_task', 'id_progress'])
            .exec();
        if (!report || report.length === 0) {
            throw new common_1.NotFoundException('Không có báo cáo nào cho nhiệm vụ này');
        }
        return report;
    }
    async update(id, updateReportDto) {
        const updatedReport = await this.reportModel.findByIdAndUpdate(id, updateReportDto, { new: true });
        if (!updatedReport) {
            throw new common_1.NotFoundException('Không tìm thấy Report để cập nhật');
        }
        return updatedReport;
    }
    async delete(id) {
        const deletedReport = await this.reportModel.findByIdAndDelete(id);
        if (!deletedReport) {
            throw new common_1.NotFoundException('Không tìm thấy Report để xóa');
        }
        return deletedReport;
    }
};
exports.ReportFactory = ReportFactory;
exports.ReportFactory = ReportFactory = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Report_schema_1.Report.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        employees_service_1.EmployeeService,
        tasks_service_1.TaskService,
        progress_service_1.ProgressService])
], ReportFactory);
//# sourceMappingURL=report.factory.js.map