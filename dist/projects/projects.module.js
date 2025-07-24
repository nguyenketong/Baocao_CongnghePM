"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const Project_schema_1 = require("../schemas/Project.schema");
const projects_service_1 = require("./projects.service");
const projects_controller_1 = require("./projects.controller");
const projectCategories_module_1 = require("../projectcategories/projectCategories.module");
const notifications_module_1 = require("../notifications/notifications.module");
const employees_module_1 = require("../employees/employees.module");
const Employee_schema_1 = require("../schemas/Employee.schema");
const NotificationSent_schema_1 = require("../schemas/NotificationSent.schema");
const ProjectCategory_schema_1 = require("../schemas/ProjectCategory.schema");
const serve_static_1 = require("@nestjs/serve-static");
const teams_module_1 = require("../teams/teams.module");
const validation_project_decorator_1 = require("./decorators/validation-project.decorator");
const logging_project_decorator_1 = require("./decorators/logging-project.decorator");
const cache_project_decorator_1 = require("./decorators/cache-project.decorator");
const project_fatory_1 = require("./factory/project.fatory");
let ProjectModule = class ProjectModule {
};
exports.ProjectModule = ProjectModule;
exports.ProjectModule = ProjectModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: 'uploads',
                serveRoot: '/uploads',
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: Project_schema_1.Project.name, schema: Project_schema_1.ProjectSchema },
                { name: Employee_schema_1.Employee.name, schema: Employee_schema_1.EmployeeSchema },
                { name: NotificationSent_schema_1.NotificationSent.name, schema: NotificationSent_schema_1.NotificationSentSchema },
                { name: ProjectCategory_schema_1.ProjectCategory.name, schema: ProjectCategory_schema_1.ProjectCategorySchema },
            ]),
            (0, common_1.forwardRef)(() => teams_module_1.TeamModule),
            projectCategories_module_1.ProjectCategoryModule,
            notifications_module_1.NotificationModule,
            (0, common_1.forwardRef)(() => employees_module_1.EmployeeModule),
        ],
        providers: [projects_service_1.ProjectService,
            project_fatory_1.ProjectFactory,
            {
                provide: 'ProjectServiceDecorated',
                useFactory: (projectService) => {
                    const withValidation = new validation_project_decorator_1.ValidationProjectDecorator(projectService);
                    const withLogging = new logging_project_decorator_1.LoggingProjectDecorator(withValidation);
                    const withCache = new cache_project_decorator_1.CacheProjectDecorator(withLogging);
                    return withCache;
                },
                inject: [projects_service_1.ProjectService]
            }
        ],
        controllers: [projects_controller_1.ProjectController],
        exports: [projects_service_1.ProjectService],
    })
], ProjectModule);
//# sourceMappingURL=projects.module.js.map