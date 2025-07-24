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
exports.ProgressService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const employees_service_1 = require("../employees/employees.service");
const notifications_service_1 = require("../notifications/notifications.service");
const progressCategories_service_1 = require("../progresscategories/progressCategories.service");
const projects_service_1 = require("../projects/projects.service");
const Progress_schema_1 = require("../schemas/Progress.schema");
const progress_factory_1 = require("./factory/progress.factory");
const database_connection_1 = require("../config/database.connection");
let ProgressService = class ProgressService {
    constructor(progressModel, progressCategoryService, notificationService, employeeService, projectService, progressFactory, dbConnection) {
        this.progressModel = progressModel;
        this.progressCategoryService = progressCategoryService;
        this.notificationService = notificationService;
        this.employeeService = employeeService;
        this.projectService = projectService;
        this.progressFactory = progressFactory;
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
    async createProgress(createProgressDto) {
        console.log('📝 Bắt đầu tạo progress mới...');
        await this.ensureConnection();
        const newProgress = await this.progressFactory.create(createProgressDto);
        return await newProgress.save();
    }
    async getAllProgresses() {
        console.log('🔍 Lấy danh sách tất cả progresses...');
        await this.ensureConnection();
        const progresses = await this.progressFactory.getAll();
        return progresses;
    }
    async getProgressById(id) {
        await this.ensureConnection();
        const progress = await this.progressFactory.getById(id);
        return progress;
    }
    async getProgressByProjectId(projectId) {
        await this.ensureConnection();
        const progress = await this.progressFactory.getByProjectId(projectId);
        return progress;
    }
    async updateProgress(id, updateProgressDto) {
        await this.ensureConnection();
        const updatedProgress = await this.progressFactory.update(id, updateProgressDto);
        return updatedProgress;
    }
    async deleteProgress(id) {
        await this.ensureConnection();
        return this.progressFactory.delete(id);
    }
};
exports.ProgressService = ProgressService;
exports.ProgressService = ProgressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Progress_schema_1.Progress.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => progressCategories_service_1.ProgressCategoryService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => notifications_service_1.NotificationService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => employees_service_1.EmployeeService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => projects_service_1.ProjectService))),
    __param(6, (0, common_1.Inject)('DATABASE_CONNECTION')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        progressCategories_service_1.ProgressCategoryService,
        notifications_service_1.NotificationService,
        employees_service_1.EmployeeService,
        projects_service_1.ProjectService,
        progress_factory_1.ProgressFactory,
        database_connection_1.DatabaseConnection])
], ProgressService);
//# sourceMappingURL=progress.service.js.map