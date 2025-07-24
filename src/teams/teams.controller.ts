import { Controller, Post, Body, Get, Param, Patch, Delete, BadRequestException, Inject } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateTeamDto } from './dto/CreateTeam.dto';
import { TeamsService } from './teams.service';
import { UpdateTeamDto } from './dto/UpdateTeam.dto';

interface AddTeamMemberRequest {
  employeeId: string;
}

@Controller('teams')
export class TeamsController {
  constructor(
    @Inject('TeamServiceDecorated')
    private readonly teamsService: TeamsService
  ) {}

  @Post()
  async createTeam(@Body() createTeamDto: CreateTeamDto) {
    const newTeam = await this.teamsService.createTeam(createTeamDto);
    return { success: true, data: newTeam };  
  }

  @Get()
  async getAll() {
    return this.teamsService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.teamsService.getTeamById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.teamsService.deleteTeam(id);
  }

  @Post(':teamId/members')
  async addTeamMember(
    @Param('teamId') teamId: string,
    @Body() body: AddTeamMemberRequest
  ) {
    if (!Types.ObjectId.isValid(teamId) || !Types.ObjectId.isValid(body.employeeId)) {
      throw new BadRequestException('ID không hợp lệ');
    }

    const addMemberData = {
      employeeId: body.employeeId,
      timestamp: '2025-02-25 09:48:30',
      addedBy: 'HMK1510'
    };

    return await this.teamsService.addTeamMember(teamId, addMemberData);
  }

  @Get(':teamId/members')
  async getTeamMembers(@Param('teamId') teamId: string) {
    if (!Types.ObjectId.isValid(teamId)) {
      throw new BadRequestException('Team ID không hợp lệ');
    }
    return await this.teamsService.getTeamMembers(teamId);
  }

  @Delete(':teamId/members/:employeeId')
  async removeTeamMember(@Param('teamId') teamId: string, @Param('employeeId') employeeId: string) {
    if (!Types.ObjectId.isValid(teamId) || !Types.ObjectId.isValid(employeeId)) {
      throw new BadRequestException('ID không hợp lệ');
    }

    return await this.teamsService.removeTeamMember(teamId, employeeId);
  }
}