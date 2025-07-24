import { Team } from 'src/schemas/Team.schema';
import { CreateTeamDto } from '../dto/CreateTeam.dto';
import { UpdateTeamDto } from '../dto/UpdateTeam.dto';
import { BaseTeamDecorator, ITeamService } from './base-team.decorator';
export declare class ValidationTeamDecorator extends BaseTeamDecorator {
    constructor(teamService: ITeamService);
    createTeam(createTeamDto: CreateTeamDto): Promise<Team>;
    update(team_id: string, updateTeamDto: UpdateTeamDto): Promise<Team>;
    private validateTeamData;
}
