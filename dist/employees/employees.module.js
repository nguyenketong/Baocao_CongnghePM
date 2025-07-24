"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeModule = void 0;
const Project_schema_1 = require("../schemas/Project.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const serve_static_1 = require("@nestjs/serve-static");
const Account_schema_1 = require("../schemas/Account.schema");
const Employee_schema_1 = require("../schemas/Employee.schema");
const employees_service_1 = require("./employees.service");
const employees_controller_1 = require("./employees.controller");
const departments_module_1 = require("../departments/departments.module");
const designations_module_1 = require("../designations/designations.module");
const accounts_module_1 = require("../accounts/accounts.module");
const ProjectPermissions_schema_1 = require("../schemas/ProjectPermissions.schema");
const projectpermissions_module_1 = require("../projectpermissions/projectpermissions.module");
const teams_module_1 = require("../teams/teams.module");
const employee_factory_1 = require("./factory/employee.factory");
const validation_employee_decorator_1 = require("./decorators/validation-employee.decorator");
const logging_employee_decorator_1 = require("./decorators/logging-employee.decorator");
const cache_employee_decorator_1 = require("./decorators/cache-employee.decorator");
let EmployeeModule = class EmployeeModule {
};
exports.EmployeeModule = EmployeeModule;
exports.EmployeeModule = EmployeeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: 'uploads',
                serveRoot: '/uploads',
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: Employee_schema_1.Employee.name, schema: Employee_schema_1.EmployeeSchema },
                { name: Account_schema_1.Account.name, schema: Account_schema_1.AccountSchema },
                { name: Project_schema_1.Project.name, schema: Project_schema_1.ProjectSchema },
                { name: ProjectPermissions_schema_1.ProjectPermissions.name, schema: ProjectPermissions_schema_1.ProjectPermissionsSchema },
            ]),
            (0, common_1.forwardRef)(() => teams_module_1.TeamModule),
            departments_module_1.DepartmentModule,
            designations_module_1.DesignationModule,
            accounts_module_1.AccountModule,
            projectpermissions_module_1.ProjectPermissionsModule,
        ],
        providers: [employees_service_1.EmployeeService,
            employee_factory_1.EmployeeFactory,
            {
                provide: 'EmployeeServiceDecorated',
                useFactory: (employeeService) => {
                    const withValidation = new validation_employee_decorator_1.ValidationEmployeeDecorator(employeeService);
                    const withLogging = new logging_employee_decorator_1.LoggingEmployeeDecorator(withValidation);
                    const withCache = new cache_employee_decorator_1.CacheEmployeeDecorator(withLogging);
                    return withCache;
                },
                inject: [employees_service_1.EmployeeService]
            }
        ],
        controllers: [employees_controller_1.EmployeeController],
        exports: [employees_service_1.EmployeeService],
    })
], EmployeeModule);
//# sourceMappingURL=employees.module.js.map