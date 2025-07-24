import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Team } from 'src/schemas/Team.schema';
import { CreateTeamDto } from '../dto/CreateTeam.dto';
import { UpdateTeamDto } from '../dto/UpdateTeam.dto';
import { EmployeeService } from 'src/employees/employees.service';
import { ProjectService } from 'src/projects/projects.service';
import { UpdateEmployeeDto } from 'src/employees/dto/UpdateEmployee.dto';
export interface AddTeamMemberDto {
  employeeId: string;
  timestamp: string;
  addedBy: string;
}
@Injectable()
export class TeamFactory {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<Team>,
    private readonly employeeService: EmployeeService,
    private readonly projectService: ProjectService
  ) { }

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const { teamLead, projectid } = createTeamDto;
    if (teamLead) {
      const employeeExists = await this.employeeService.getEmployeeById(teamLead);
      if (!employeeExists) {
        throw new BadRequestException('Employee không tồn tại');
      }
    }
    if (projectid) {
      const projectExists = await this.projectService.getProjectById(projectid);
      if (!projectExists) {
        throw new BadRequestException('Project không tồn tại');
      }
    }
    const newTeam = new this.teamModel(createTeamDto);
    return await newTeam.save();
  }

  async findAll(): Promise<Team[]> {
    return await this.teamModel.find().populate(['teamLead', 'projectid']).exec();
  }

  async findById(id: string | Types.ObjectId): Promise<Team> {
    const team = await this.teamModel.findById(id).populate(['teamLead', 'projectid']).exec();
    if (!team) {
      throw new NotFoundException('Team không tồn tại');
    }
    return team;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    if (updateTeamDto.teamLead) {
      const employeeExists = await this.employeeService.getEmployeeById(updateTeamDto.teamLead);
      if (!employeeExists) {
        throw new BadRequestException('Employee không tồn tại');
      }
    }
    if (updateTeamDto.projectid) {
      const projectExists = await this.projectService.getProjectById(updateTeamDto.projectid);
      if (!projectExists) {
        throw new BadRequestException('Project không tồn tại');
      }
    }
    const updatedTeam = await this.teamModel.findByIdAndUpdate(
      id,
      updateTeamDto,
      { new: true }
    ).populate(['teamLead', 'projectid']);
    if (!updatedTeam) {
      throw new NotFoundException('Không tìm thấy Team để cập nhật');
    }
    return updatedTeam;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletedTeam = await this.teamModel.findByIdAndDelete(id);
    if (!deletedTeam) {
      throw new NotFoundException('Không tìm thấy Team để xóa');
    }
    return { message: 'Team đã được xóa thành công' };
  }
  async addTeamMember(teamId: string, addTeamMemberDto: AddTeamMemberDto) {
    const { employeeId, timestamp, addedBy } = addTeamMemberDto;

    if (!Types.ObjectId.isValid(teamId) || !Types.ObjectId.isValid(employeeId)) {
      throw new BadRequestException('ID không hợp lệ');
    }

    const teamObjectId = new Types.ObjectId(teamId);
    const employeeObjectId = new Types.ObjectId(employeeId);

    const team = await this.teamModel
      .findById(teamObjectId)
      .populate(['teamLead', 'projectid'])
      .exec();

    if (!team) {
      throw new NotFoundException('Team không tồn tại');
    }

    const employee = await this.employeeService.getEmployeeById(employeeId);
    if (!employee) {
      throw new BadRequestException('Employee không tồn tại');
    }

    if (employee.team_id?.some(id => id.toString() === teamId)) {
      throw new BadRequestException('Employee đã là thành viên của team này');
    }

    try {
      const currentTeamIds = employee.team_id || [];
      const updatedTeamIds = [...currentTeamIds, teamObjectId];

      const updateEmployeeDto: UpdateEmployeeDto = {
        team_id: updatedTeamIds,
        lastModifiedBy: 'HMK1510',
        lastModifiedAt: '2025-03-06 15:39:41'
      };

      const updatedEmployee = await this.employeeService.updateEmployee(
        employeeId,
        updateEmployeeDto
      );

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

    } catch (error) {
      if (employee.team_id) {
        const rollbackDto: UpdateEmployeeDto = {
          team_id: employee.team_id,
          lastModifiedBy: 'HMK1510',
          lastModifiedAt: '2025-03-06 15:39:41'
        };

        await this.employeeService.updateEmployee(
          employeeId,
          rollbackDto
        );
      }

      console.error('Error adding team member:', error);
      throw new BadRequestException(
        'Không thể thêm thành viên vào team. Vui lòng thử lại sau.'
      );
    }
  }

  async getTeamMembers(teamId: string) {
    if (!Types.ObjectId.isValid(teamId)) {
      throw new BadRequestException('Team ID không hợp lệ');
    }

    const team = await this.teamModel
      .findById(teamId)
      .populate(['teamLead', 'projectid'])
      .exec();

    if (!team) {
      throw new NotFoundException('Team không tồn tại');
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

  async removeTeamMember(teamId: string, employeeId: string) {
    try {
      if (!Types.ObjectId.isValid(teamId) || !Types.ObjectId.isValid(employeeId)) {
        throw new BadRequestException('ID không hợp lệ');
      }

      const team = await this.teamModel
        .findById(teamId)
        .populate(['teamLead', 'projectid'])
        .exec();

      if (!team) {
        throw new NotFoundException('Team không tồn tại');
      }

      const updatedEmployee = await this.employeeService.removeTeamFromEmployee(
        employeeId,
        teamId
      );

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

    } catch (error) {
      console.error('Error in removeTeamMember:', error);

      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException(
        'Không thể xóa thành viên khỏi team. Vui lòng thử lại sau.'
      );
    }
  }
}

