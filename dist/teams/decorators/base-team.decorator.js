"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTeamDecorator = void 0;
class BaseTeamDecorator {
    constructor(teamService) {
        this.teamService = teamService;
    }
    createTeam(createTeamDto) {
        return this.teamService.createTeam(createTeamDto);
    }
    getAll() {
        return this.teamService.getAll();
    }
    getTeamById(id) {
        return this.teamService.getTeamById(id);
    }
    update(team_id, updateTeamDto) {
        return this.teamService.update(team_id, updateTeamDto);
    }
    deleteTeam(id) {
        return this.teamService.deleteTeam(id);
    }
    addTeamMember(teamId, addTeamMemberDto) {
        return this.teamService.addTeamMember(teamId, addTeamMemberDto);
    }
    getTeamMembers(teamId) {
        return this.teamService.getTeamMembers(teamId);
    }
    removeTeamMember(teamId, employeeId) {
        return this.teamService.removeTeamMember(teamId, employeeId);
    }
}
exports.BaseTeamDecorator = BaseTeamDecorator;
//# sourceMappingURL=base-team.decorator.js.map