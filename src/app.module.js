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
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var departments_module_1 = require("./departments/departments.module");
var designations_module_1 = require("./designations/designations.module");
var accounts_module_1 = require("./accounts/accounts.module");
var employees_module_1 = require("./employees/employees.module");
var projectpermissions_module_1 = require("./projectpermissions/projectpermissions.module");
var projectCategories_module_1 = require("./projectcategories/projectCategories.module");
var notifications_module_1 = require("./notifications/notifications.module");
var projects_module_1 = require("./projects/projects.module");
var teams_module_1 = require("./teams/teams.module");
var progressCategories_module_1 = require("./progresscategories/progressCategories.module");
var taskCategories_module_1 = require("./taskcategories/taskCategories.module");
var progress_module_1 = require("./progress/progress.module");
var tasks_module_1 = require("./tasks/tasks.module");
var Auth_module_1 = require("./accounts/Auth.module");
var reports_module_1 = require("./reports/reports.module");
var serve_static_1 = require("@nestjs/serve-static");
var path = require("path");
var config_1 = require("@nestjs/config");
var database_module_1 = require("./config/database.module");
var AppModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                config_1.ConfigModule.forRoot({
                    isGlobal: true, // Đảm bảo biến môi trường có thể được sử dụng toàn cục
                }),
                serve_static_1.ServeStaticModule.forRoot({
                    rootPath: path.join(__dirname, '..', 'uploads'), // Đường dẫn tới thư mục uploads
                    serveRoot: '/uploads', // URL cơ sở mà ứng dụng sẽ sử dụng để phục vụ file
                }),
                mongoose_1.MongooseModule.forRoot('mongodb+srv://nguyenketong1603:ketong1603@tong.8zcrene.mongodb.net/?retryWrites=true&w=majority&appName=tong'),
                database_module_1.DatabaseModule,
                departments_module_1.DepartmentModule,
                designations_module_1.DesignationModule,
                accounts_module_1.AccountModule,
                employees_module_1.EmployeeModule,
                projectpermissions_module_1.ProjectPermissionsModule,
                projectCategories_module_1.ProjectCategoryModule,
                notifications_module_1.NotificationModule,
                projects_module_1.ProjectModule,
                teams_module_1.TeamModule,
                progressCategories_module_1.ProgressCategoryModule,
                taskCategories_module_1.TaskCategoryModule,
                progress_module_1.ProgressModule,
                tasks_module_1.TaskModule,
                reports_module_1.ReportModule,
                Auth_module_1.AuthModule
            ],
            controllers: [],
            providers: [],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;
