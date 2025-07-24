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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Task_schema_1 = require("../schemas/Task.schema");
const task_factory_1 = require("./factory/task.factory");
let TaskService = class TaskService {
    constructor(taskModel, taskFactory) {
        this.taskModel = taskModel;
        this.taskFactory = taskFactory;
    }
    async createTask(createTaskDto) {
        const newTask = await this.taskFactory.create(createTaskDto);
        return await newTask.save();
    }
    async getAllTasks() {
        const getAllTask = await this.taskFactory.findAll();
        return getAllTask;
    }
    async getTaskByProgressId(progressId) {
        const getIdTaskbyProgress = await this.taskFactory.findByProgressId(progressId);
        return getIdTaskbyProgress;
    }
    async getTaskById(id) {
        const getIdTask = await this.taskFactory.findById(id);
        return getIdTask;
    }
    async updateTask(id, updateTaskDto) {
        const updateTask = await this.taskFactory.update(id, updateTaskDto);
        return updateTask;
    }
    async deleteTask(id) {
        const deleteTask = await this.taskFactory.delete(id);
        return deleteTask;
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Task_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        task_factory_1.TaskFactory])
], TaskService);
//# sourceMappingURL=tasks.service.js.map