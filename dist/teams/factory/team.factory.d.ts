import { Model, Types } from 'mongoose';
import { Team } from 'src/schemas/Team.schema';
import { CreateTeamDto } from '../dto/CreateTeam.dto';
import { UpdateTeamDto } from '../dto/UpdateTeam.dto';
import { EmployeeService } from 'src/employees/employees.service';
import { ProjectService } from 'src/projects/projects.service';
export interface AddTeamMemberDto {
    employeeId: string;
    timestamp: string;
    addedBy: string;
}
export declare class TeamFactory {
    private readonly teamModel;
    private readonly employeeService;
    private readonly projectService;
    constructor(teamModel: Model<Team>, employeeService: EmployeeService, projectService: ProjectService);
    create(createTeamDto: CreateTeamDto): Promise<Team>;
    findAll(): Promise<Team[]>;
    findById(id: string | Types.ObjectId): Promise<Team>;
    update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team>;
    delete(id: string): Promise<{
        message: string;
    }>;
    addTeamMember(teamId: string, addTeamMemberDto: AddTeamMemberDto): Promise<{
        success: boolean;
        message: string;
        data: {
            team: {
                _id: unknown;
                teamName: string;
                teamLead: Types.ObjectId;
                projectid: Types.ObjectId;
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
            teamLead: Types.ObjectId;
            projectid: Types.ObjectId;
        };
        members: {
            _id: unknown;
            employeeName: string;
            employeeProfile: string | undefined;
            phone: string | undefined;
            teams: Types.ObjectId[] | undefined;
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
                teamLead: Types.ObjectId;
                projectid: Types.ObjectId;
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
