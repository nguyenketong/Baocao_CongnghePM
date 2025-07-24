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
exports.TeamsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Team_schema_1 = require("../schemas/Team.schema");
const employees_service_1 = require("../employees/employees.service");
const projects_service_1 = require("../projects/projects.service");
const database_connection_1 = require("../config/database.connection");
const team_factory_1 = require("./factory/team.factory");
let TeamsService = class TeamsService {
    constructor(teamModel, employeeService, projectService, teamFactory, dbConnection) {
        this.teamModel = teamModel;
        this.employeeService = employeeService;
        this.projectService = projectService;
        this.teamFactory = teamFactory;
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
    async createTeam(createTeamDto) {
        console.log('📝 Bắt đầu tạo team mới...');
        await this.ensureConnection();
        const newTeam = await this.teamFactory.create(createTeamDto);
        return await newTeam.save();
    }
    async getAll() {
        console.log('🔍 Lấy danh sách tất cả teams...');
        await this.ensureConnection();
        const teams = await this.teamFactory.findAll();
        return teams;
    }
    async getTeamById(id) {
        await this.ensureConnection();
        const team = await this.teamFactory.findById(id);
        return team;
    }
    async update(team_id, updateTeamDto) {
        await this.ensureConnection();
        const updatedTeam = await this.teamFactory.update(team_id, updateTeamDto);
        return updatedTeam;
    }
    async deleteTeam(id) {
        await this.ensureConnection();
        return this.teamFactory.delete(id);
    }
    async addTeamMember(teamId, addTeamMemberDto) {
        await this.ensureConnection();
        const addTeamMember = await this.teamFactory.addTeamMember(teamId, addTeamMemberDto);
        return addTeamMember;
    }
    async getTeamMembers(teamId) {
        await this.ensureConnection();
        const getTeamMember = await this.teamFactory.getTeamMembers(teamId);
        return getTeamMember;
    }
    async removeTeamMember(teamId, employeeId) {
        await this.ensureConnection();
        const removeTeamMember = await this.teamFactory.removeTeamMember(teamId, employeeId);
        return removeTeamMember;
    }
};
exports.TeamsService = TeamsService;
exports.TeamsService = TeamsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Team_schema_1.Team.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => employees_service_1.EmployeeService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => projects_service_1.ProjectService))),
    __param(4, (0, common_1.Inject)('DATABASE_CONNECTION')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        employees_service_1.EmployeeService,
        projects_service_1.ProjectService,
        team_factory_1.TeamFactory,
        database_connection_1.DatabaseConnection])
], TeamsService);
//# sourceMappingURL=teams.service.js.map