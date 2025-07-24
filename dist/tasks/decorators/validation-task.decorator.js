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
exports.ValidationTaskDecorator = void 0;
const common_1 = require("@nestjs/common");
const base_task_decorator_1 = require("./base-task.decorator");
let ValidationTaskDecorator = class ValidationTaskDecorator extends base_task_decorator_1.BaseTaskDecorator {
    constructor(taskService) {
        super(taskService);
    }
    async createTask(createTaskDto) {
        this.validateTaskData(createTaskDto);
        return super.createTask(createTaskDto);
    }
    async updateTask(id, updateTaskDto) {
        this.validateTaskData(updateTaskDto);
        return super.updateTask(id, updateTaskDto);
    }
    validateTaskData(taskDto) {
        if (!taskDto.taskName || taskDto.taskName.length < 3) {
            throw new common_1.BadRequestException('Tiêu đề nhiệm vụ phải có ít nhất 3 ký tự');
        }
        if (taskDto.description && taskDto.description.length < 10) {
            throw new common_1.BadRequestException('Mô tả nhiệm vụ phải có ít nhất 10 ký tự');
        }
    }
};
exports.ValidationTaskDecorator = ValidationTaskDecorator;
exports.ValidationTaskDecorator = ValidationTaskDecorator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], ValidationTaskDecorator);
//# sourceMappingURL=validation-task.decorator.js.map