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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheTeamDecorator = void 0;
const common_1 = require("@nestjs/common");
const base_team_decorator_1 = require("./base-team.decorator");
let CacheTeamDecorator = class CacheTeamDecorator extends base_team_decorator_1.BaseTeamDecorator {
    constructor(teamService) {
        super(teamService);
        this.cache = new Map();
    }
    async getAll() {
        const cacheKey = 'all_teams';
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        const teams = await super.getAll();
        this.cache.set(cacheKey, teams);
        return teams;
    }
    async getTeamById(id) {
        const cacheKey = `team_${id}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        const team = await super.getTeamById(id);
        this.cache.set(cacheKey, team);
        return team;
    }
    async createTeam(createTeamDto) {
        const result = await super.createTeam(createTeamDto);
        this.cache.clear();
        return result;
    }
    async update(team_id, updateTeamDto) {
        const result = await super.update(team_id, updateTeamDto);
        this.cache.clear();
        return result;
    }
    async deleteTeam(id) {
        const result = await super.deleteTeam(id);
        this.cache.clear();
        return result;
    }
};
exports.CacheTeamDecorator = CacheTeamDecorator;
exports.CacheTeamDecorator = CacheTeamDecorator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], CacheTeamDecorator);
//# sourceMappingURL=cache-team.decorator.js.map