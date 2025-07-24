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
exports.ProjectModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var Project_schema_1 = require("../../../../../src/schemas/Project.schema");
var projects_service_1 = require("./projects.service");
var projects_controller_1 = require("./projects.controller");
var projectCategories_module_1 = require("../../../../../src/projectcategories/projectCategories.module");
var notifications_module_1 = require("../../../../../src/notifications/notifications.module");
var employees_module_1 = require("../../../../../src/employees/employees.module");
var Employee_schema_1 = require("../../../../../src/schemas/Employee.schema");
var NotificationSent_schema_1 = require("../../../../../src/schemas/NotificationSent.schema");
var ProjectCategory_schema_1 = require("../../../../../src/schemas/ProjectCategory.schema");
var serve_static_1 = require("@nestjs/serve-static");
var teams_module_1 = require("../../../../../src/teams/teams.module");
var validation_project_decorator_1 = require("./decorators/validation-project.decorator");
var logging_project_decorator_1 = require("./decorators/logging-project.decorator");
var cache_project_decorator_1 = require("./decorators/cache-project.decorator");
var project_fatory_1 = require("./factory/project.fatory");
var ProjectModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                serve_static_1.ServeStaticModule.forRoot({
                    rootPath: 'uploads',
                    serveRoot: '/uploads',
                }),
                // ✅ Sử dụng đúng cách MongooseModule.forFeature()
                mongoose_1.MongooseModule.forFeature([
                    { name: Project_schema_1.Project.name, schema: Project_schema_1.ProjectSchema },
                    { name: Employee_schema_1.Employee.name, schema: Employee_schema_1.EmployeeSchema },
                    { name: NotificationSent_schema_1.NotificationSent.name, schema: NotificationSent_schema_1.NotificationSentSchema },
                    { name: ProjectCategory_schema_1.ProjectCategory.name, schema: ProjectCategory_schema_1.ProjectCategorySchema },
                ]),
                (0, common_1.forwardRef)(function () { return teams_module_1.TeamModule; }), // ✅ Đặt forwardRef() ngoài MongooseModule
                projectCategories_module_1.ProjectCategoryModule,
                notifications_module_1.NotificationModule,
                (0, common_1.forwardRef)(function () { return employees_module_1.EmployeeModule; }), // ✅ Dùng forwardRef() nếu có vòng lặp
            ],
            providers: [projects_service_1.ProjectService,
                project_fatory_1.ProjectFactory,
                {
                    provide: 'ProjectServiceDecorated',
                    useFactory: function (projectService) {
                        var withValidation = new validation_project_decorator_1.ValidationProjectDecorator(projectService);
                        var withLogging = new logging_project_decorator_1.LoggingProjectDecorator(withValidation);
                        var withCache = new cache_project_decorator_1.CacheProjectDecorator(withLogging);
                        return withCache;
                    },
                    inject: [projects_service_1.ProjectService]
                }
            ],
            controllers: [projects_controller_1.ProjectController],
            exports: [projects_service_1.ProjectService],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ProjectModule = _classThis = /** @class */ (function () {
        function ProjectModule_1() {
        }
        return ProjectModule_1;
    }());
    __setFunctionName(_classThis, "ProjectModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProjectModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProjectModule = _classThis;
}();
exports.ProjectModule = ProjectModule;
