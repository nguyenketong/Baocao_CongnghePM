import { Injectable, Logger } from '@nestjs/common';
import { Team } from 'src/schemas/Team.schema';
import { CreateTeamDto } from '../dto/CreateTeam.dto';
import { UpdateTeamDto } from '../dto/UpdateTeam.dto';
import { BaseTeamDecorator, ITeamService } from './base-team.decorator';

@Injectable()
export class LoggingTeamDecorator extends BaseTeamDecorator {
    private readonly logger = new Logger(LoggingTeamDecorator.name);

    constructor(teamService: ITeamService) {
        super(teamService);
    }

    async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
        this.logger.log(`Creating team with name: ${createTeamDto.teamName}`);
        const result = await super.createTeam(createTeamDto);
        this.logger.log(`Team created successfully with ID: ${result._id}`);
        return result;
    }

    async deleteTeam(id: string): Promise<{ message: string }> {
        this.logger.log(`Attempting to delete team with ID: ${id}`);
        const result = await super.deleteTeam(id);
        this.logger.log(`Team deleted successfully: ${id}`);
        return result;
    }

    async addTeamMember(teamId: string, addTeamMemberDto: any): Promise<any> {
        this.logger.log(`Adding member ${addTeamMemberDto.employeeId} to team ${teamId}`);
        const result = await super.addTeamMember(teamId, addTeamMemberDto);
        this.logger.log(`Member added successfully to team ${teamId}`);
        return result;
    }
}
