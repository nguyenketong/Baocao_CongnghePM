"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const employees_service_1 = require("../employees/employees.service");
const notifications_service_1 = require("../notifications/notifications.service");
const projectCategories_service_1 = require("../projectcategories/projectCategories.service");
const Project_schema_1 = require("../schemas/Project.schema");
const database_connection_1 = require("../config/database.connection");
const project_fatory_1 = require("./factory/project.fatory");
let ProjectService = class ProjectService {
    constructor(projectModel, projectCategoryService, notificationService, employeeService, projectFactory, dbConnection) {
        this.projectModel = projectModel;
        this.projectCategoryService = projectCategoryService;
        this.notificationService = notificationService;
        this.employeeService = employeeService;
        this.projectFactory = projectFactory;
        this.dbConnection = dbConnection;
        console.log('🏗️ TeamsService được khởi tạo');
        console.log('📊 Database connection status:', this.dbConnection.getConnectionStatus());
    }
    async ensureConnection() {
        console.log('🔍 Kiểm tra kết nối database...');
        if (!this.dbConnection.getConnection()) {
            console.log('⚠️ Chưa có kết nối, đang kết nối...');
            await this.dbConnection.connect();
        }
        else {
            console.log('✅ Đã có kết nối database');
        }
        console.log('📊 Trạng thái kết nối hiện tại:', this.dbConnection.getConnectionStatus());
    }
    async createProject(createProjectDto) {
        console.log('📝 Bắt đầu tạo project mới...');
        await this.ensureConnection();
        const newProject = await this.projectFactory.create(createProjectDto);
        return await newProject.save();
    }
    async getAllProjects() {
        console.log('🔍 Lấy danh sách tất cả projects...');
        await this.ensureConnection();
        const projects = await this.projectFactory.getAll();
        return projects;
    }
    async getProjectById(id) {
        await this.ensureConnection();
        const project = await this.projectFactory.getById(id);
        return project;
    }
    async updateProject(id, updateProjectDto) {
        await this.ensureConnection();
        const updatedProject = await this.projectFactory.update(id, updateProjectDto);
        return updatedProject;
    }
    async deleteProject(id) {
        await this.ensureConnection();
        return this.projectFactory.delete(id);
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Project_schema_1.Project.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => projectCategories_service_1.ProjectCategoryService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => notifications_service_1.NotificationService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => employees_service_1.EmployeeService))),
    __param(5, (0, common_1.Inject)('DATABASE_CONNECTION')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        projectCategories_service_1.ProjectCategoryService,
        notifications_service_1.NotificationService,
        employees_service_1.EmployeeService,
        project_fatory_1.ProjectFactory,
        database_connection_1.DatabaseConnection])
], ProjectService);
//# sourceMappingURL=projects.service.js.map