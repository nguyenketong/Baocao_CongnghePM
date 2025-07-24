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
exports.TeamsController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const CreateTeam_dto_1 = require("./dto/CreateTeam.dto");
const teams_service_1 = require("./teams.service");
const UpdateTeam_dto_1 = require("./dto/UpdateTeam.dto");
let TeamsController = class TeamsController {
    constructor(teamsService) {
        this.teamsService = teamsService;
    }
    async createTeam(createTeamDto) {
        const newTeam = await this.teamsService.createTeam(createTeamDto);
        return { success: true, data: newTeam };
    }
    async getAll() {
        return this.teamsService.getAll();
    }
    async getById(id) {
        return this.teamsService.getTeamById(id);
    }
    async update(id, updateTeamDto) {
        return this.teamsService.update(id, updateTeamDto);
    }
    async delete(id) {
        return this.teamsService.deleteTeam(id);
    }
    async addTeamMember(teamId, body) {
        if (!mongoose_1.Types.ObjectId.isValid(teamId) || !mongoose_1.Types.ObjectId.isValid(body.employeeId)) {
            throw new common_1.BadRequestException('ID không hợp lệ');
        }
        const addMemberData = {
            employeeId: body.employeeId,
            timestamp: '2025-02-25 09:48:30',
            addedBy: 'HMK1510'
        };
        return await this.teamsService.addTeamMember(teamId, addMemberData);
    }
    async getTeamMembers(teamId) {
        if (!mongoose_1.Types.ObjectId.isValid(teamId)) {
            throw new common_1.BadRequestException('Team ID không hợp lệ');
        }
        return await this.teamsService.getTeamMembers(teamId);
    }
    async removeTeamMember(teamId, employeeId) {
        if (!mongoose_1.Types.ObjectId.isValid(teamId) || !mongoose_1.Types.ObjectId.isValid(employeeId)) {
            throw new common_1.BadRequestException('ID không hợp lệ');
        }
        return await this.teamsService.removeTeamMember(teamId, employeeId);
    }
};
exports.TeamsController = TeamsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateTeam_dto_1.CreateTeamDto]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "createTeam", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "getById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateTeam_dto_1.UpdateTeamDto]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':teamId/members'),
    __param(0, (0, common_1.Param)('teamId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "addTeamMember", null);
__decorate([
    (0, common_1.Get)(':teamId/members'),
    __param(0, (0, common_1.Param)('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "getTeamMembers", null);
__decorate([
    (0, common_1.Delete)(':teamId/members/:employeeId'),
    __param(0, (0, common_1.Param)('teamId')),
    __param(1, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "removeTeamMember", null);
exports.TeamsController = TeamsController = __decorate([
    (0, common_1.Controller)('teams'),
    __param(0, (0, common_1.Inject)('TeamServiceDecorated')),
    __metadata("design:paramtypes", [teams_service_1.TeamsService])
], TeamsController);
//# sourceMappingURL=teams.controller.js.map