import { Team } from 'src/schemas/Team.schema';
import { BaseTeamDecorator, ITeamService } from './base-team.decorator';
export declare class CacheTeamDecorator extends BaseTeamDecorator {
    private cache;
    constructor(teamService: ITeamService);
    getAll(): Promise<Team[]>;
    getTeamById(id: string): Promise<Team>;
    createTeam(createTeamDto: any): Promise<Team>;
    update(team_id: string, updateTeamDto: any): Promise<Team>;
    deleteTeam(id: string): Promise<{
        message: string;
    }>;
}
