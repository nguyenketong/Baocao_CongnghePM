"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTaskDecorator = void 0;
var BaseTaskDecorator = /** @class */ (function () {
    function BaseTaskDecorator(taskService) {
        this.taskService = taskService;
    }
    BaseTaskDecorator.prototype.createTask = function (createTaskDto) {
        return this.taskService.createTask(createTaskDto);
    };
    BaseTaskDecorator.prototype.getAllTasks = function () {
        return this.taskService.getAllTasks();
    };
    BaseTaskDecorator.prototype.getTaskById = function (id) {
        return this.taskService.getTaskById(id);
    };
    BaseTaskDecorator.prototype.getTaskByProgressId = function (progressId) {
        return this.taskService.getTaskByProgressId(progressId);
    };
    BaseTaskDecorator.prototype.updateTask = function (id, updateTaskDto) {
        return this.taskService.updateTask(id, updateTaskDto);
    };
    BaseTaskDecorator.prototype.deleteTask = function (id) {
        return this.taskService.deleteTask(id);
    };
    return BaseTaskDecorator;
}());
exports.BaseTaskDecorator = BaseTaskDecorator;
