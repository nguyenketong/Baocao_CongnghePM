"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const Task_schema_1 = require("../schemas/Task.schema");
const taskCategories_module_1 = require("../taskcategories/taskCategories.module");
const notifications_module_1 = require("../notifications/notifications.module");
const employees_module_1 = require("../employees/employees.module");
const Employee_schema_1 = require("../schemas/Employee.schema");
const NotificationSent_schema_1 = require("../schemas/NotificationSent.schema");
const TaskCategory_schema_1 = require("../schemas/TaskCategory.schema");
const Progress_schema_1 = require("../schemas/Progress.schema");
const progress_module_1 = require("../progress/progress.module");
const tasks_service_1 = require("./tasks.service");
const tasks_controller_1 = require("./tasks.controller");
const task_factory_1 = require("./factory/task.factory");
const cache_task_decorator_1 = require("./decorators/cache-task.decorator");
let TaskModule = class TaskModule {
};
exports.TaskModule = TaskModule;
exports.TaskModule = TaskModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: Task_schema_1.Task.name, schema: Task_schema_1.TaskSchema },
                { name: Employee_schema_1.Employee.name, schema: Employee_schema_1.EmployeeSchema },
                { name: NotificationSent_schema_1.NotificationSent.name, schema: NotificationSent_schema_1.NotificationSentSchema },
                { name: TaskCategory_schema_1.TaskCategory.name, schema: TaskCategory_schema_1.TaskCategorySchema },
                { name: Progress_schema_1.Progress.name, schema: Progress_schema_1.ProgressSchema },
            ]),
            taskCategories_module_1.TaskCategoryModule,
            notifications_module_1.NotificationModule,
            employees_module_1.EmployeeModule,
            progress_module_1.ProgressModule
        ],
        providers: [tasks_service_1.TaskService, task_factory_1.TaskFactory,
            {
                provide: 'TaskServiceDecorated',
                useFactory: (taskService) => new cache_task_decorator_1.CacheTaskDecorator(taskService),
                inject: [tasks_service_1.TaskService],
            }
        ],
        controllers: [tasks_controller_1.TaskController],
        exports: [tasks_service_1.TaskService, 'TaskServiceDecorated'],
    })
], TaskModule);
//# sourceMappingURL=tasks.module.js.map