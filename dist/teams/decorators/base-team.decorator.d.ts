import { Team } from 'src/schemas/Team.schema';
import { CreateTeamDto } from '../dto/CreateTeam.dto';
import { UpdateTeamDto } from '../dto/UpdateTeam.dto';
import { AddTeamMemberDto } from '../dto/AddTeamMember.dto';
export interface ITeamService {
    createTeam(createTeamDto: CreateTeamDto): Promise<Team>;
    getAll(): Promise<Team[]>;
    getTeamById(id: string): Promise<Team>;
    update(team_id: string, updateTeamDto: UpdateTeamDto): Promise<Team>;
    deleteTeam(id: string): Promise<{
        message: string;
    }>;
    addTeamMember(teamId: string, addTeamMemberDto: AddTeamMemberDto): Promise<any>;
    getTeamMembers(teamId: string): Promise<any>;
    removeTeamMember(teamId: string, employeeId: string): Promise<any>;
}
export declare abstract class BaseTeamDecorator implements ITeamService {
    protected readonly teamService: ITeamService;
    constructor(teamService: ITeamService);
    createTeam(createTeamDto: CreateTeamDto): Promise<Team>;
    getAll(): Promise<Team[]>;
    getTeamById(id: string): Promise<Team>;
    update(team_id: string, updateTeamDto: UpdateTeamDto): Promise<Team>;
    deleteTeam(id: string): Promise<{
        message: string;
    }>;
    addTeamMember(teamId: string, addTeamMemberDto: AddTeamMemberDto): Promise<any>;
    getTeamMembers(teamId: string): Promise<any>;
    removeTeamMember(teamId: string, employeeId: string): Promise<any>;
}
