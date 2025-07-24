"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var Task_schema_1 = require("../../../../../src/schemas/Task.schema"); // Chỉnh sửa tên schema thành Task
var taskCategories_module_1 = require("../../../../../src/taskcategories/taskCategories.module"); // Chỉnh sửa tên module TaskCategory
var notifications_module_1 = require("../../../../../src/notifications/notifications.module");
var employees_module_1 = require("../../../../../src/employees/employees.module");
var Employee_schema_1 = require("../../../../../src/schemas/Employee.schema");
var NotificationSent_schema_1 = require("../../../../../src/schemas/NotificationSent.schema");
var TaskCategory_schema_1 = require("../../../../../src/schemas/TaskCategory.schema"); // Sửa lại TaskCategorySchema
var Progress_schema_1 = require("../../../../../src/schemas/Progress.schema");
var progress_module_1 = require("../../../../../src/progress/progress.module");
var tasks_service_1 = require("./tasks.service");
var tasks_controller_1 = require("./tasks.controller");
var task_factory_1 = require("./factory/task.factory");
var cache_task_decorator_1 = require("./decorators/cache-task.decorator");
var TaskModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                mongoose_1.MongooseModule.forFeature([
                    { name: Task_schema_1.Task.name, schema: Task_schema_1.TaskSchema }, // Sửa lại TaskSchema
                    { name: Employee_schema_1.Employee.name, schema: Employee_schema_1.EmployeeSchema },
                    { name: NotificationSent_schema_1.NotificationSent.name, schema: NotificationSent_schema_1.NotificationSentSchema },
                    { name: TaskCategory_schema_1.TaskCategory.name, schema: TaskCategory_schema_1.TaskCategorySchema }, // Chỉnh sửa thành TaskCategory
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
                    useFactory: function (taskService) { return new cache_task_decorator_1.CacheTaskDecorator(taskService); },
                    inject: [tasks_service_1.TaskService],
                }
            ],
            controllers: [tasks_controller_1.TaskController],
            exports: [tasks_service_1.TaskService, 'TaskServiceDecorated'],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TaskModule = _classThis = /** @class */ (function () {
        function TaskModule_1() {
        }
        return TaskModule_1;
    }());
    __setFunctionName(_classThis, "TaskModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TaskModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TaskModule = _classThis;
}();
exports.TaskModule = TaskModule;
