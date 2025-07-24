import { BadRequestException, Injectable } from '@nestjs/common';
import { Team } from 'src/schemas/Team.schema';
import { CreateTeamDto } from '../dto/CreateTeam.dto';
import { UpdateTeamDto } from '../dto/UpdateTeam.dto';
import { BaseTeamDecorator, ITeamService } from './base-team.decorator';

@Injectable()
export class ValidationTeamDecorator extends BaseTeamDecorator {
    constructor(teamService: ITeamService) {
        super(teamService);
    }

    async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
        this.validateTeamData(createTeamDto);
        return super.createTeam(createTeamDto);
    }

    async update(team_id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
        this.validateTeamData(updateTeamDto);
        return super.update(team_id, updateTeamDto);
    }

    private validateTeamData(teamDto: CreateTeamDto | UpdateTeamDto): void {
        if (teamDto.teamName && teamDto.teamName.length < 3) {
            throw new BadRequestException('Tên team phải có ít nhất 3 ký tự');
        }
    }
}