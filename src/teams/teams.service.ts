
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name)
    private teamModel: Model<Team>,
    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: EmployeeService,
    @Inject(forwardRef(() => ProjectService))
    private projectService: ProjectService,
    private readonly teamFactory: TeamFactory,
    @Inject('DATABASE_CONNECTION')
    private readonly dbConnection: DatabaseConnection
  ) {
    console.log('🏗️ TeamsService được khởi tạo');
    console.log('📊 Database connection status:', this.dbConnection.getConnectionStatus());
  }

  private async ensureConnection() {
    console.log('🔍 Kiểm tra kết nối database...');
    if (!this.dbConnection.getConnection()) {
      console.log('⚠️ Chưa có kết nối, đang kết nối...');
      await this.dbConnection.connect();
    } else {
      console.log('✅ Đã có kết nối database');
    }
    console.log('📊 Trạng thái kết nối hiện tại:', this.dbConnection.getConnectionStatus());
  }

  async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
    console.log('📝 Bắt đầu tạo team mới...');
    await this.ensureConnection();

    const newTeam = await this.teamFactory.create(createTeamDto);
    return await newTeam.save();
  }

  async getAll(): Promise<Team[]> {
    console.log('🔍 Lấy danh sách tất cả teams...');
    await this.ensureConnection();

    const teams = await this.teamFactory.findAll();
    return teams;
  }

  async getTeamById(id: string): Promise<Team> {
    await this.ensureConnection();

    const team = await this.teamFactory.findById(id);
    return team;
  }

  async update(team_id: string, updateTeamDto: UpdateTeamDto) {
    await this.ensureConnection();

    const updatedTeam = await this.teamFactory.update(team_id, updateTeamDto);
    return updatedTeam;
  }

  async deleteTeam(id: string): Promise<{ message: string }> {
    await this.ensureConnection();

    return this.teamFactory.delete(id);
  }

  async addTeamMember(teamId: string, addTeamMemberDto: AddTeamMemberDto) {
    await this.ensureConnection();

    const addTeamMember = await this.teamFactory.addTeamMember(teamId, addTeamMemberDto);
    return addTeamMember;
  }

  async getTeamMembers(teamId: string) {
    await this.ensureConnection();

    const getTeamMember = await this.teamFactory.getTeamMembers(teamId);
    return getTeamMember;
  }

  async removeTeamMember(teamId: string, employeeId: string) {
    await this.ensureConnection();
    const removeTeamMember = await this.teamFactory.removeTeamMember(teamId, employeeId);
    return removeTeamMember;
  }
}