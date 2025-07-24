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
exports.CacheTaskDecorator = void 0;
const common_1 = require("@nestjs/common");
const base_task_decorator_1 = require("./base-task.decorator");
let CacheTaskDecorator = class CacheTaskDecorator extends base_task_decorator_1.BaseTaskDecorator {
    constructor(taskService) {
        super(taskService);
        this.cache = new Map();
    }
    async getAllTasks() {
        const cacheKey = 'all_tasks';
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        const tasks = await super.getAllTasks();
        this.cache.set(cacheKey, tasks);
        return tasks;
    }
    async getTaskById(id) {
        const cacheKey = `task_${id}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        const task = await super.getTaskById(id);
        this.cache.set(cacheKey, task);
        return task;
    }
    async createTask(createTaskDto) {
        const result = await super.createTask(createTaskDto);
        this.cache.clear();
        return result;
    }
    async updateTask(id, updateTaskDto) {
        const result = await super.updateTask(id, updateTaskDto);
        this.cache.clear();
        return result;
    }
    async deleteTask(id) {
        const result = await super.deleteTask(id);
        this.cache.clear();
        return result;
    }
};
exports.CacheTaskDecorator = CacheTaskDecorator;
exports.CacheTaskDecorator = CacheTaskDecorator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], CacheTaskDecorator);
//# sourceMappingURL=cache-task.decorator.js.map