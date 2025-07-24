import { Team } from 'src/schemas/Team.schema';
import { CreateTeamDto } from '../dto/CreateTeam.dto';
import { UpdateTeamDto } from '../dto/UpdateTeam.dto';
import { AddTeamMemberDto } from '../dto/AddTeamMember.dto';

// Interface định nghĩa các phương thức cơ bản của TeamService
export interface ITeamService {
    createTeam(createTeamDto: CreateTeamDto): Promise<Team>;
    getAll(): Promise<Team[]>;
    getTeamById(id: string): Promise<Team>;
    update(team_id: string, updateTeamDto: UpdateTeamDto): Promise<Team>;
    deleteTeam(id: string): Promise<{ message: string }>;
    addTeamMember(teamId: string, addTeamMemberDto: AddTeamMemberDto): Promise<any>;
    getTeamMembers(teamId: string): Promise<any>;
    removeTeamMember(teamId: string, employeeId: string): Promise<any>;
}

// Base decorator class
export abstract class BaseTeamDecorator implements ITeamService {
    constructor(protected readonly teamService: ITeamService) { }

    createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
        return this.teamService.createTeam(createTeamDto);
    }

    getAll(): Promise<Team[]> {
        return this.teamService.getAll();
    }

    getTeamById(id: string): Promise<Team> {
        return this.teamService.getTeamById(id);
    }

    update(team_id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
        return this.teamService.update(team_id, updateTeamDto);
    }

    deleteTeam(id: string): Promise<{ message: string }> {
        return this.teamService.deleteTeam(id);
    }

    addTeamMember(teamId: string, addTeamMemberDto: AddTeamMemberDto): Promise<any> {
        return this.teamService.addTeamMember(teamId, addTeamMemberDto);
    }

    getTeamMembers(teamId: string): Promise<any> {
        return this.teamService.getTeamMembers(teamId);
    }

    removeTeamMember(teamId: string, employeeId: string): Promise<any> {
        return this.teamService.removeTeamMember(teamId, employeeId);
    }
}