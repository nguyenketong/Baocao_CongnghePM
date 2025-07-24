"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamFactory = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Team_schema_1 = require("../../schemas/Team.schema");
const employees_service_1 = require("../../employees/employees.service");
const projects_service_1 = require("../../projects/projects.service");
let TeamFactory = class TeamFactory {
    constructor(teamModel, employeeService, projectService) {
        this.teamModel = teamModel;
        this.employeeService = employeeService;
        this.projectService = projectService;
    }
    async create(createTeamDto) {
        const { teamLead, projectid } = createTeamDto;
        if (teamLead) {
            const employeeExists = await this.employeeService.getEmployeeById(teamLead);
            if (!employeeExists) {
                throw new common_1.BadRequestException('Employee không tồn tại');
            }
        }
        if (projectid) {
            const projectExists = await this.projectService.getProjectById(projectid);
            if (!projectExists) {
                throw new common_1.BadRequestException('Project không tồn tại');
            }
        }
        const newTeam = new this.teamModel(createTeamDto);
        return await newTeam.save();
    }
    async findAll() {
        return await this.teamModel.find().populate(['teamLead', 'projectid']).exec();
    }
    async findById(id) {
        const team = await this.teamModel.findById(id).populate(['teamLead', 'projectid']).exec();
        if (!team) {
            throw new common_1.NotFoundException('Team không tồn tại');
        }
        return team;
    }
    async update(id, updateTeamDto) {
        if (updateTeamDto.teamLead) {
            const employeeExists = await this.employeeService.getEmployeeById(updateTeamDto.teamLead);
            if (!employeeExists) {
                throw new common_1.BadRequestException('Employee không tồn tại');
            }
        }
        if (updateTeamDto.projectid) {
            const projectExists = await this.projectService.getProjectById(updateTeamDto.projectid);
            if (!projectExists) {
                throw new common_1.BadRequestException('Project không tồn tại');
            }
        }
        const updatedTeam = await this.teamModel.findByIdAndUpdate(id, updateTeamDto, { new: true }).populate(['teamLead', 'projectid']);
        if (!updatedTeam) {
            throw new common_1.NotFoundException('Không tìm thấy Team để cập nhật');
        }
        return updatedTeam;
    }
    async delete(id) {
        const deletedTeam = await this.teamModel.findByIdAndDelete(id);
        if (!deletedTeam) {
            throw new common_1.NotFoundException('Không tìm thấy Team để xóa');
        }
        return { message: 'Team đã được xóa thành công' };
    }
    async addTeamMember(teamId, addTeamMemberDto) {
        const { employeeId, timestamp, addedBy } = addTeamMemberDto;
        if (!mongoose_2.Types.ObjectId.isValid(teamId) || !mongoose_2.Types.ObjectId.isValid(employeeId)) {
            throw new common_1.BadRequestException('ID không hợp lệ');
        }
        const teamObjectId = new mongoose_2.Types.ObjectId(teamId);
        const employeeObjectId = new mongoose_2.Types.ObjectId(employeeId);
        const team = await this.teamModel
            .findById(teamObjectId)
            .populate(['teamLead', 'projectid'])
            .exec();
        if (!team) {
            throw new common_1.NotFoundException('Team không tồn tại');
        }
        const employee = await this.employeeService.getEmployeeById(employeeId);
        if (!employee) {
            throw new common_1.BadRequestException('Employee không tồn tại');
        }
        if (employee.team_id?.some(id => id.toString() === teamId)) {
            throw new common_1.BadRequestException('Employee đã là thành viên của team này');
        }
        try {
            const currentTeamIds = employee.team_id || [];
            const updatedTeamIds = [...currentTeamIds, teamObjectId];
            const updateEmployeeDto = {
                team_id: updatedTeamIds,
                lastModifiedBy: 'HMK1510',
                lastModifiedAt: '2025-03-06 15:39:41'
            };
            const updatedEmployee = await this.employeeService.updateEmployee(employeeId, updateEmployeeDto);
            return {
                success: true,
                message: 'Thêm thành viên vào team thành công',
                data: {
                    team: {
                        _id: team._id,
                        teamName: team.teamName,
                        teamLead: team.teamLead,
                        projectid: team.projectid
                    },
                    employee: {
                        _id: updatedEmployee._id,
                        employeeName: updatedEmployee.employeeName,
                        teams: updatedTeamIds.map(id => id.toString())
                    },
                    addedInfo: {
                        timestamp: '2025-03-06 15:39:41',
                        addedBy: 'HMK1510'
                    }
                }
            };
        }
        catch (error) {
            if (employee.team_id) {
                const rollbackDto = {
                    team_id: employee.team_id,
                    lastModifiedBy: 'HMK1510',
                    lastModifiedAt: '2025-03-06 15:39:41'
                };
                await this.employeeService.updateEmployee(employeeId, rollbackDto);
            }
            console.error('Error adding team member:', error);
            throw new common_1.BadRequestException('Không thể thêm thành viên vào team. Vui lòng thử lại sau.');
        }
    }
    async getTeamMembers(teamId) {
        if (!mongoose_2.Types.ObjectId.isValid(teamId)) {
            throw new common_1.BadRequestException('Team ID không hợp lệ');
        }
        const team = await this.teamModel
            .findById(teamId)
            .populate(['teamLead', 'projectid'])
            .exec();
        if (!team) {
            throw new common_1.NotFoundException('Team không tồn tại');
        }
        const members = await this.employeeService.getEmployeesByTeamId(teamId);
        return {
            team: {
                _id: team._id,
                teamName: team.teamName,
                teamLead: team.teamLead,
                projectid: team.projectid
            },
            members: members.map(member => ({
                _id: member._id,
                employeeName: member.employeeName,
                employeeProfile: member.employeeProfile,
                phone: member.phone,
                teams: member.team_id
            })),
            totalMembers: members.length
        };
    }
    async removeTeamMember(teamId, employeeId) {
        try {
            if (!mongoose_2.Types.ObjectId.isValid(teamId) || !mongoose_2.Types.ObjectId.isValid(employeeId)) {
                throw new common_1.BadRequestException('ID không hợp lệ');
            }
            const team = await this.teamModel
                .findById(teamId)
                .populate(['teamLead', 'projectid'])
                .exec();
            if (!team) {
                throw new common_1.NotFoundException('Team không tồn tại');
            }
            const updatedEmployee = await this.employeeService.removeTeamFromEmployee(employeeId, teamId);
            return {
                success: true,
                message: 'Xóa thành viên khỏi team thành công',
                data: {
                    team: {
                        _id: team._id,
                        teamName: team.teamName,
                        teamLead: team.teamLead,
                        projectid: team.projectid
                    },
                    employee: {
                        _id: updatedEmployee._id,
                        employeeName: updatedEmployee.employeeName,
                        teams: updatedEmployee.team_id?.map(id => id.toString())
                    },
                    removedInfo: {
                        timestamp: '2025-03-06 15:39:41',
                        removedBy: 'HMK1510'
                    }
                }
            };
        }
        catch (error) {
            console.error('Error in removeTeamMember:', error);
            if (error instanceof common_1.BadRequestException || error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Không thể xóa thành viên khỏi team. Vui lòng thử lại sau.');
        }
    }
};
exports.TeamFactory = TeamFactory;
exports.TeamFactory = TeamFactory = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Team_schema_1.Team.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        employees_service_1.EmployeeService,
        projects_service_1.ProjectService])
], TeamFactory);
//# sourceMappingURL=team.factory.js.map