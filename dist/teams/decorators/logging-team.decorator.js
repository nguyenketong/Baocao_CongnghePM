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
var LoggingTeamDecorator_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingTeamDecorator = void 0;
const common_1 = require("@nestjs/common");
const base_team_decorator_1 = require("./base-team.decorator");
let LoggingTeamDecorator = LoggingTeamDecorator_1 = class LoggingTeamDecorator extends base_team_decorator_1.BaseTeamDecorator {
    constructor(teamService) {
        super(teamService);
        this.logger = new common_1.Logger(LoggingTeamDecorator_1.name);
    }
    async createTeam(createTeamDto) {
        this.logger.log(`Creating team with name: ${createTeamDto.teamName}`);
        const result = await super.createTeam(createTeamDto);
        this.logger.log(`Team created successfully with ID: ${result._id}`);
        return result;
    }
    async deleteTeam(id) {
        this.logger.log(`Attempting to delete team with ID: ${id}`);
        const result = await super.deleteTeam(id);
        this.logger.log(`Team deleted successfully: ${id}`);
        return result;
    }
    async addTeamMember(teamId, addTeamMemberDto) {
        this.logger.log(`Adding member ${addTeamMemberDto.employeeId} to team ${teamId}`);
        const result = await super.addTeamMember(teamId, addTeamMemberDto);
        this.logger.log(`Member added successfully to team ${teamId}`);
        return result;
    }
};
exports.LoggingTeamDecorator = LoggingTeamDecorator;
exports.LoggingTeamDecorator = LoggingTeamDecorator = LoggingTeamDecorator_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], LoggingTeamDecorator);
//# sourceMappingURL=logging-team.decorator.js.map