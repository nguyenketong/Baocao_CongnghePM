import { Injectable } from '@nestjs/common';
import { Team } from 'src/schemas/Team.schema';
import { BaseTeamDecorator, ITeamService } from './base-team.decorator';

@Injectable()
export class CacheTeamDecorator extends BaseTeamDecorator {
    private cache: Map<string, any> = new Map();

    constructor(teamService: ITeamService) {
        super(teamService);
    }

    async getAll(): Promise<Team[]> {
        const cacheKey = 'all_teams';
        if (this.cache.has(cacheKey)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return this.cache.get(cacheKey);
        }

        const teams = await super.getAll();
        this.cache.set(cacheKey, teams);
        return teams;
    }

    async getTeamById(id: string): Promise<Team> {
        const cacheKey = `team_${id}`;
        if (this.cache.has(cacheKey)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return this.cache.get(cacheKey);
        }

        const team = await super.getTeamById(id);
        this.cache.set(cacheKey, team);
        return team;
    }

    async createTeam(createTeamDto: any): Promise<Team> {
        const result = await super.createTeam(createTeamDto);
        this.cache.clear(); // Clear cache when data changes
        return result;
    }

    async update(team_id: string, updateTeamDto: any): Promise<Team> {
        const result = await super.update(team_id, updateTeamDto);
        this.cache.clear(); // Clear cache when data changes
        return result;
    }

    async deleteTeam(id: string): Promise<{ message: string }> {
        const result = await super.deleteTeam(id);
        this.cache.clear(); // Clear cache when data changes
        return result;
    }
}