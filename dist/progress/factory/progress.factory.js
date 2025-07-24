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
exports.ProgressFactory = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const employees_service_1 = require("../../employees/employees.service");
const notifications_service_1 = require("../../notifications/notifications.service");
const progressCategories_service_1 = require("../../progresscategories/progressCategories.service");
const projects_service_1 = require("../../projects/projects.service");
const Progress_schema_1 = require("../../schemas/Progress.schema");
let ProgressFactory = class ProgressFactory {
    constructor(progressModel, progressCategoryService, notificationService, employeeService, projectService) {
        this.progressModel = progressModel;
        this.progressCategoryService = progressCategoryService;
        this.notificationService = notificationService;
        this.employeeService = employeeService;
        this.projectService = projectService;
    }
    async create(createProgressDto) {
        const { progressCategory, notificationSent, taskAssignPerson, taskRecipient, projectid } = createProgressDto;
        if (progressCategory) {
            const progressCategoryExists = await this.progressCategoryService.getProgressCategoryById(progressCategory);
            if (!progressCategoryExists) {
                throw new common_1.BadRequestException('ProgressCategory không tồn tại');
            }
        }
        if (notificationSent) {
            const notificationExists = await this.notificationService.getNotificationById(notificationSent);
            if (!notificationExists) {
                throw new common_1.BadRequestException('Notification không tồn tại');
            }
        }
        if (taskAssignPerson) {
            const taskAssignPersonExists = await this.employeeService.getEmployeeById(taskAssignPerson);
            if (!taskAssignPersonExists) {
                throw new common_1.BadRequestException('Employee không tồn tại');
            }
        }
        if (taskRecipient) {
            const taskRecipientExists = await this.employeeService.getEmployeeById(taskRecipient);
            if (!taskRecipientExists) {
                throw new common_1.BadRequestException('Employee không tồn tại');
            }
        }
        if (projectid) {
            const projectExists = await this.projectService.getProjectById(projectid);
            if (!projectExists) {
                throw new common_1.BadRequestException('Project không tồn tại');
            }
        }
        const newProgress = new this.progressModel(createProgressDto);
        return await newProgress.save();
    }
    async getAll() {
        return await this.progressModel
            .find()
            .populate('progressCategory')
            .populate('notificationSent')
            .populate('taskAssignPerson')
            .populate('taskRecipient')
            .populate('projectid')
            .exec();
    }
    async getById(id) {
        const progress = await this.progressModel
            .findById(id)
            .populate(['progressCategory', 'notificationSent', 'taskAssignPerson', 'taskRecipient', 'projectid'])
            .exec();
        if (!progress) {
            throw new common_1.NotFoundException('Progress không tồn tại');
        }
        return progress;
    }
    async getByProjectId(projectId) {
        const progresses = await this.progressModel
            .find({ projectid: projectId })
            .populate(['progressCategory', 'notificationSent', 'taskAssignPerson', 'taskRecipient', 'projectid'])
            .exec();
        if (!progresses || progresses.length === 0) {
            throw new common_1.NotFoundException('Không có tiến độ nào cho dự án này');
        }
        return progresses;
    }
    async update(id, updateProgressDto) {
        const updatedProgress = await this.progressModel.findByIdAndUpdate(id, updateProgressDto, { new: true });
        if (!updatedProgress) {
            throw new common_1.NotFoundException('Không tìm thấy Progress để cập nhật');
        }
        return updatedProgress;
    }
    async delete(id) {
        const deletedProgress = await this.progressModel.findByIdAndDelete(id);
        if (!deletedProgress) {
            throw new common_1.NotFoundException('Không tìm thấy Progress để xóa');
        }
        return deletedProgress;
    }
};
exports.ProgressFactory = ProgressFactory;
exports.ProgressFactory = ProgressFactory = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Progress_schema_1.Progress.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        progressCategories_service_1.ProgressCategoryService,
        notifications_service_1.NotificationService,
        employees_service_1.EmployeeService,
        projects_service_1.ProjectService])
], ProgressFactory);
//# sourceMappingURL=progress.factory.js.map