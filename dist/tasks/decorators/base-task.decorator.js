"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTaskDecorator = void 0;
class BaseTaskDecorator {
    constructor(taskService) {
        this.taskService = taskService;
    }
    createTask(createTaskDto) {
        return this.taskService.createTask(createTaskDto);
    }
    getAllTasks() {
        return this.taskService.getAllTasks();
    }
    getTaskById(id) {
        return this.taskService.getTaskById(id);
    }
    getTaskByProgressId(progressId) {
        return this.taskService.getTaskByProgressId(progressId);
    }
    updateTask(id, updateTaskDto) {
        return this.taskService.updateTask(id, updateTaskDto);
    }
    deleteTask(id) {
        return this.taskService.deleteTask(id);
    }
}
exports.BaseTaskDecorator = BaseTaskDecorator;
//# sourceMappingURL=base-task.decorator.js.map