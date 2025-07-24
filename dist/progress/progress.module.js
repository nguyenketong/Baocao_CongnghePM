"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const Progress_schema_1 = require("../schemas/Progress.schema");
const progress_service_1 = require("./progress.service");
const progress_controller_1 = require("./progress.controller");
const progressCategories_module_1 = require("../progresscategories/progressCategories.module");
const notifications_module_1 = require("../notifications/notifications.module");
const employees_module_1 = require("../employees/employees.module");
const Employee_schema_1 = require("../schemas/Employee.schema");
const NotificationSent_schema_1 = require("../schemas/NotificationSent.schema");
const ProgressCategory_schema_1 = require("../schemas/ProgressCategory.schema");
const Project_schema_1 = require("../schemas/Project.schema");
const projects_module_1 = require("../projects/projects.module");
const cache_progress_decorator_1 = require("./decorators/cache-progress.decorator");
const logging_progress_decorator_1 = require("./decorators/logging-progress.decorator");
const validation_progress_decorator_1 = require("./decorators/validation-progress.decorator");
const progress_factory_1 = require("./factory/progress.factory");
let ProgressModule = class ProgressModule {
};
exports.ProgressModule = ProgressModule;
exports.ProgressModule = ProgressModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: Progress_schema_1.Progress.name, schema: Progress_schema_1.ProgressSchema },
                { name: Employee_schema_1.Employee.name, schema: Employee_schema_1.EmployeeSchema },
                { name: NotificationSent_schema_1.NotificationSent.name, schema: NotificationSent_schema_1.NotificationSentSchema },
                { name: ProgressCategory_schema_1.ProgressCategory.name, schema: ProgressCategory_schema_1.ProgressCategorySchema },
                { name: Project_schema_1.Project.name, schema: Project_schema_1.ProjectSchema },
            ]),
            progressCategories_module_1.ProgressCategoryModule,
            notifications_module_1.NotificationModule,
            employees_module_1.EmployeeModule,
            projects_module_1.ProjectModule
        ],
        providers: [progress_service_1.ProgressService,
            progress_factory_1.ProgressFactory,
            {
                provide: 'ProgressServiceDecorated',
                useFactory: (progressService) => {
                    const withValidation = new validation_progress_decorator_1.ValidationProgressDecorator(progressService);
                    const withLogging = new logging_progress_decorator_1.LoggingProgressDecorator(withValidation);
                    const withCache = new cache_progress_decorator_1.CacheProgressDecorator(withLogging);
                    return withCache;
                },
                inject: [progress_service_1.ProgressService]
            }
        ],
        controllers: [progress_controller_1.ProgressController],
        exports: [progress_service_1.ProgressService],
    })
], ProgressModule);
//# sourceMappingURL=progress.module.js.map