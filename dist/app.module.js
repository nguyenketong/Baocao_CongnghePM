"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const departments_module_1 = require("./departments/departments.module");
const designations_module_1 = require("./designations/designations.module");
const accounts_module_1 = require("./accounts/accounts.module");
const employees_module_1 = require("./employees/employees.module");
const projectpermissions_module_1 = require("./projectpermissions/projectpermissions.module");
const projectCategories_module_1 = require("./projectcategories/projectCategories.module");
const notifications_module_1 = require("./notifications/notifications.module");
const projects_module_1 = require("./projects/projects.module");
const teams_module_1 = require("./teams/teams.module");
const progressCategories_module_1 = require("./progresscategories/progressCategories.module");
const taskCategories_module_1 = require("./taskcategories/taskCategories.module");
const progress_module_1 = require("./progress/progress.module");
const tasks_module_1 = require("./tasks/tasks.module");
const Auth_module_1 = require("./accounts/Auth.module");
const reports_module_1 = require("./reports/reports.module");
const serve_static_1 = require("@nestjs/serve-static");
const path = __importStar(require("path"));
const config_1 = require("@nestjs/config");
const database_module_1 = require("./config/database.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path.join(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI ?? ''),
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
    })
], AppModule);
//# sourceMappingURL=app.module.js.map