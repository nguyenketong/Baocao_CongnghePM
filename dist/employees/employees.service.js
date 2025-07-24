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
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Employee_schema_1 = require("../schemas/Employee.schema");
const departments_service_1 = require("../departments/departments.service");
const designations_service_1 = require("../designations/designations.service");
const accounts_service_1 = require("../accounts/accounts.service");
const Account_schema_1 = require("../schemas/Account.schema");
const ProjectPermissions_schema_1 = require("../schemas/ProjectPermissions.schema");
const projectpermissions_service_1 = require("../projectpermissions/projectpermissions.service");
const Team_schema_1 = require("../schemas/Team.schema");
const Project_schema_1 = require("../schemas/Project.schema");
const employee_factory_1 = require("./factory/employee.factory");
const database_connection_1 = require("../config/database.connection");
let EmployeeService = class EmployeeService {
    constructor(employeeModel, teamModel, projectModel, accountModel, projectPermissionsModel, departmentService, designationService, projectPermissionService, accountService, employeeFactory, dbConnection) {
        this.employeeModel = employeeModel;
        this.teamModel = teamModel;
        this.projectModel = projectModel;
        this.accountModel = accountModel;
        this.projectPermissionsModel = projectPermissionsModel;
        this.departmentService = departmentService;
        this.designationService = designationService;
        this.projectPermissionService = projectPermissionService;
        this.accountService = accountService;
        this.employeeFactory = employeeFactory;
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
    async createEmployee({ account, projectpermission, ...createEmployee }) {
        console.log('📝 Bắt đầu tạo employee mới...');
        await this.ensureConnection();
        const newEmployee = await this.employeeFactory.create({ account, projectpermission, ...createEmployee });
        return await newEmployee.save();
    }
    async getEmployeeByUsernameOrEmail(email) {
        await this.ensureConnection();
        const employee = await this.employeeFactory.getByUsernameOrEmail(email);
        return employee;
    }
    async getEmployees() {
        console.log('🔍 Lấy danh sách tất cả employees...');
        await this.ensureConnection();
        const employees = await this.employeeFactory.getAll();
        return employees;
    }
    async getEmployeeById(id) {
        await this.ensureConnection();
        const employee = await this.employeeFactory.getById(id);
        return employee;
    }
    async getTeamsByEmployeeId(employeeId) {
        await this.ensureConnection();
        const teams = await this.employeeFactory.getTeamsById(employeeId);
        return teams;
    }
    async getProjectsByEmployeeId(employeeId) {
        await this.ensureConnection();
        const projects = await this.employeeFactory.getProjectsById(employeeId);
        return projects;
    }
    async updateEmployee(employee_id, updateEmployeeDto) {
        await this.ensureConnection();
        const updatedEmployee = await this.employeeFactory.update(employee_id, updateEmployeeDto);
        return updatedEmployee;
    }
    async deleteEmployee(employee_id) {
        await this.ensureConnection();
        return this.employeeFactory.delete(employee_id);
    }
    async getEmployeeProfileFromToken(email) {
        await this.ensureConnection();
        const employee = await this.employeeFactory.getProfileFromToken(email);
        return employee;
    }
    async removeTeamFromEmployee(employeeId, teamId) {
        await this.ensureConnection();
        const team = await this.employeeFactory.removeTeam(employeeId, teamId);
        return team;
    }
    async getEmployeesByTeamId(teamId) {
        await this.ensureConnection();
        const employee = await this.employeeFactory.getByTeamId(teamId);
        return employee;
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Employee_schema_1.Employee.name)),
    __param(1, (0, mongoose_1.InjectModel)(Team_schema_1.Team.name)),
    __param(2, (0, mongoose_1.InjectModel)(Project_schema_1.Project.name)),
    __param(3, (0, mongoose_1.InjectModel)(Account_schema_1.Account.name)),
    __param(4, (0, mongoose_1.InjectModel)(ProjectPermissions_schema_1.ProjectPermissions.name)),
    __param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => departments_service_1.DepartmentService))),
    __param(6, (0, common_1.Inject)((0, common_1.forwardRef)(() => designations_service_1.DesignationService))),
    __param(7, (0, common_1.Inject)((0, common_1.forwardRef)(() => projectpermissions_service_1.ProjectPermissionsService))),
    __param(8, (0, common_1.Inject)((0, common_1.forwardRef)(() => accounts_service_1.AccountService))),
    __param(10, (0, common_1.Inject)('DATABASE_CONNECTION')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        departments_service_1.DepartmentService,
        designations_service_1.DesignationService,
        projectpermissions_service_1.ProjectPermissionsService,
        accounts_service_1.AccountService,
        employee_factory_1.EmployeeFactory,
        database_connection_1.DatabaseConnection])
], EmployeeService);
//# sourceMappingURL=employees.service.js.map