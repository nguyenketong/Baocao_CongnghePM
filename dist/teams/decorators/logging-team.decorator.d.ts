import { Team } from 'src/schemas/Team.schema';
import { CreateTeamDto } from '../dto/CreateTeam.dto';
import { BaseTeamDecorator, ITeamService } from './base-team.decorator';
export declare class LoggingTeamDecorator extends BaseTeamDecorator {
    private readonly logger;
    constructor(teamService: ITeamService);
    createTeam(createTeamDto: CreateTeamDto): Promise<Team>;
    deleteTeam(id: string): Promise<{
        message: string;
    }>;
    addTeamMember(teamId: string, addTeamMemberDto: any): Promise<any>;
}
