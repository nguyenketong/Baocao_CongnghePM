"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const Report_schema_1 = require("../schemas/Report.schema");
const reports_service_1 = require("./reports.service");
const reports_controller_1 = require("./reports.controller");
const employees_module_1 = require("../employees/employees.module");
const tasks_module_1 = require("../tasks/tasks.module");
const progress_module_1 = require("../progress/progress.module");
const Employee_schema_1 = require("../schemas/Employee.schema");
const Task_schema_1 = require("../schemas/Task.schema");
const Progress_schema_1 = require("../schemas/Progress.schema");
const database_module_1 = require("../config/database.module");
const validation_report_decorator_1 = require("./decorators/validation-report.decorator");
const cache_report_decorator_1 = require("./decorators/cache-report.decorator");
const logging_report_decorator_1 = require("./decorators/logging-report.decorator");
const report_factory_1 = require("./factory/report.factory");
let ReportModule = class ReportModule {
};
exports.ReportModule = ReportModule;
exports.ReportModule = ReportModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            mongoose_1.MongooseModule.forFeature([
                { name: Report_schema_1.Report.name, schema: Report_schema_1.ReportSchema },
                { name: Employee_schema_1.Employee.name, schema: Employee_schema_1.EmployeeSchema },
                { name: Task_schema_1.Task.name, schema: Task_schema_1.TaskSchema },
                { name: Progress_schema_1.Progress.name, schema: Progress_schema_1.ProgressSchema },
            ]),
            employees_module_1.EmployeeModule,
            tasks_module_1.TaskModule,
            progress_module_1.ProgressModule,
        ],
        providers: [reports_service_1.ReportService,
            report_factory_1.ReportFactory,
            {
                provide: 'ReportServiceDecorated',
                useFactory: (reportService) => {
                    const withValidation = new validation_report_decorator_1.ValidationReportDecorator(reportService);
                    const withLogging = new logging_report_decorator_1.LoggingReportDecorator(withValidation);
                    const withCache = new cache_report_decorator_1.CacheReportDecorator(withLogging);
                    return withCache;
                },
                inject: [reports_service_1.ReportService]
            }
        ],
        controllers: [reports_controller_1.ReportController],
        exports: [reports_service_1.ReportService],
    })
], ReportModule);
//# sourceMappingURL=reports.module.js.map