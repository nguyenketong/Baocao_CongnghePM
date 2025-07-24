import { Types } from 'mongoose';
import { CreateTeamDto } from './dto/CreateTeam.dto';
import { TeamsService } from './teams.service';
import { UpdateTeamDto } from './dto/UpdateTeam.dto';
interface AddTeamMemberRequest {
    employeeId: string;
}
export declare class TeamsController {
    private readonly teamsService;
    constructor(teamsService: TeamsService);
    createTeam(createTeamDto: CreateTeamDto): Promise<{
        success: boolean;
        data: import("../schemas/Team.schema").Team;
    }>;
    getAll(): Promise<import("../schemas/Team.schema").Team[]>;
    getById(id: string): Promise<import("../schemas/Team.schema").Team>;
    update(id: string, updateTeamDto: UpdateTeamDto): Promise<import("../schemas/Team.schema").Team>;
    delete(id: string): Promise<{
        message: string;
    }>;
    addTeamMember(teamId: string, body: AddTeamMemberRequest): Promise<{
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
export {};
