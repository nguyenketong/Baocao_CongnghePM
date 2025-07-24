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
exports.TaskFactory = void 0;
const common_1 = require("@nestjs/common");
const Task_schema_1 = require("../../schemas/Task.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const taskCategories_service_1 = require("../../taskcategories/taskCategories.service");
const notifications_service_1 = require("../../notifications/notifications.service");
const employees_service_1 = require("../../employees/employees.service");
const progress_service_1 = require("../../progress/progress.service");
let TaskFactory = class TaskFactory {
    constructor(taskModel, taskCategoryService, notificationService, employeeService, progressService) {
        this.taskModel = taskModel;
        this.taskCategoryService = taskCategoryService;
        this.notificationService = notificationService;
        this.employeeService = employeeService;
        this.progressService = progressService;
    }
    async create(createTaskDto) {
        const { taskCategory, notificationSent, taskAssignPerson, taskRecipient, progressId } = createTaskDto;
        if (taskCategory) {
            const taskCategoryExists = await this.taskCategoryService.getTaskCategoryById(taskCategory);
            if (!taskCategoryExists) {
                throw new common_1.BadRequestException('TaskCategory không tồn tại');
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
        if (progressId) {
            const progressExists = await this.progressService.getProgressById(progressId);
            if (!progressExists) {
                throw new common_1.BadRequestException('Progress không tồn tại');
            }
        }
        const newTask = new this.taskModel(createTaskDto);
        return await newTask.save();
    }
    async findAll() {
        return await this.taskModel
            .find()
            .populate(['taskCategory', 'notificationSent', 'taskAssignPerson', 'taskRecipient', 'progressId'])
            .exec();
    }
    async findById(id) {
        const task = await this.taskModel
            .findById(id)
            .populate(['taskCategory', 'notificationSent', 'taskAssignPerson', 'taskRecipient', 'progressId'])
            .exec();
        if (!task) {
            throw new common_1.NotFoundException('Task không tồn tại');
        }
        return task;
    }
    async findByProgressId(progressId) {
        const progressObjectId = mongoose_1.Types.ObjectId.isValid(progressId) ? new mongoose_1.Types.ObjectId(progressId) : progressId;
        const tasks = await this.taskModel
            .find({ progressId: progressObjectId })
            .populate(['taskCategory', 'notificationSent', 'taskAssignPerson', 'taskRecipient', 'progressId'])
            .exec();
        if (!tasks || tasks.length === 0) {
            throw new common_1.NotFoundException('Không có nhiệm vụ nào trong tiến độ này');
        }
        return tasks;
    }
    async update(id, updateTaskDto) {
        const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
        if (!updatedTask) {
            throw new common_1.NotFoundException('Không tìm thấy Task để cập nhật');
        }
        return updatedTask;
    }
    async delete(id) {
        const deletedTask = await this.taskModel.findByIdAndDelete(id);
        if (!deletedTask) {
            throw new common_1.NotFoundException('Không tìm thấy Task để xóa');
        }
        return { message: 'Task đã được xóa thành công' };
    }
};
exports.TaskFactory = TaskFactory;
exports.TaskFactory = TaskFactory = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(Task_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        taskCategories_service_1.TaskCategoryService,
        notifications_service_1.NotificationService,
        employees_service_1.EmployeeService,
        progress_service_1.ProgressService])
], TaskFactory);
//# sourceMappingURL=task.factory.js.map