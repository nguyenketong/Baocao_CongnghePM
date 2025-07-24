import { Model } from 'mongoose';
import { Team } from 'src/schemas/Team.schema';
import { EmployeeService } from 'src/employees/employees.service';
import { ProjectService } from 'src/projects/projects.service';
import { CreateTeamDto } from './dto/CreateTeam.dto';
import { UpdateTeamDto } from './dto/UpdateTeam.dto';
import { DatabaseConnection } from '../config/database.connection';
import { TeamFactory } from './factory/team.factory';
interface AddTeamMemberDto {
    employeeId: string;
    timestamp: string;
    addedBy: string;
}
export declare class TeamsService {
    private teamModel;
    private readonly employeeService;
    private projectService;
    private readonly teamFactory;
    private readonly dbConnection;
    constructor(teamModel: Model<Team>, employeeService: EmployeeService, projectService: ProjectService, teamFactory: TeamFactory, dbConnection: DatabaseConnection);
    private ensureConnection;
    createTeam(createTeamDto: CreateTeamDto): Promise<Team>;
    getAll(): Promise<Team[]>;
    getTeamById(id: string): Promise<Team>;
    update(team_id: string, updateTeamDto: UpdateTeamDto): Promise<Team>;
    deleteTeam(id: string): Promise<{
        message: string;
    }>;
    addTeamMember(teamId: string, addTeamMemberDto: AddTeamMemberDto): Promise<{
        success: boolean;
        message: string;
        data: {
            team: {
                _id: unknown;
                teamName: string;
                teamLead: import("mongoose").Types.ObjectId;
                projectid: import("mongoose").Types.ObjectId;
            };
            employee: {
                _id: unknown;
                employeeName: string;
                teams: string[];
            };
            addedInfo: {
                timestamp: string;
                addedBy: string;
            };
        };
    }>;
    getTeamMembers(teamId: string): Promise<{
        team: {
            _id: unknown;
            teamName: string;
            teamLead: import("mongoose").Types.ObjectId;
            projectid: import("mongoose").Types.ObjectId;
        };
        members: {
            _id: unknown;
            employeeName: string;
            employeeProfile: string | undefined;
            phone: string | undefined;
            teams: import("mongoose").Types.ObjectId[] | undefined;
        }[];
        totalMembers: number;
    }>;
    removeTeamMember(teamId: string, employeeId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            team: {
                _id: unknown;
                teamName: string;
                teamLead: import("mongoose").Types.ObjectId;
                projectid: import("mongoose").Types.ObjectId;
            };
            employee: {
                _id: unknown;
                employeeName: string;
                teams: string[] | undefined;
            };
            removedInfo: {
                timestamp: string;
                removedBy: string;
            };
        };
    }>;
}
export {};
