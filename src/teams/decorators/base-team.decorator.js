"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTeamDecorator = void 0;
// Base decorator class
var BaseTeamDecorator = /** @class */ (function () {
    function BaseTeamDecorator(teamService) {
        this.teamService = teamService;
    }
    BaseTeamDecorator.prototype.createTeam = function (createTeamDto) {
        return this.teamService.createTeam(createTeamDto);
    };
    BaseTeamDecorator.prototype.getAll = function () {
        return this.teamService.getAll();
    };
    BaseTeamDecorator.prototype.getTeamById = function (id) {
        return this.teamService.getTeamById(id);
    };
    BaseTeamDecorator.prototype.update = function (team_id, updateTeamDto) {
        return this.teamService.update(team_id, updateTeamDto);
    };
    BaseTeamDecorator.prototype.deleteTeam = function (id) {
        return this.teamService.deleteTeam(id);
    };
    BaseTeamDecorator.prototype.addTeamMember = function (teamId, addTeamMemberDto) {
        return this.teamService.addTeamMember(teamId, addTeamMemberDto);
    };
    BaseTeamDecorator.prototype.getTeamMembers = function (teamId) {
        return this.teamService.getTeamMembers(teamId);
    };
    BaseTeamDecorator.prototype.removeTeamMember = function (teamId, employeeId) {
        return this.teamService.removeTeamMember(teamId, employeeId);
    };
    return BaseTeamDecorator;
}());
exports.BaseTeamDecorator = BaseTeamDecorator;
