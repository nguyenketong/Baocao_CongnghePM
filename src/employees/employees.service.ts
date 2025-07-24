import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Employee } from '../schemas/Employee.schema';
import { CreateEmployeeDto } from './dto/CreateEmployee.dto';
import { UpdateEmployeeDto } from './dto/UpdateEmployee.dto';
import { DepartmentService } from 'src/departments/departments.service';
import { DesignationService } from 'src/designations/designations.service';
import { AccountService } from 'src/accounts/accounts.service';

import { Account } from 'src/schemas/Account.schema';
import { ProjectPermissions } from 'src/schemas/ProjectPermissions.schema';
import { ProjectPermissionsService } from 'src/projectpermissions/projectpermissions.service';
import { Team } from 'src/schemas/Team.schema';
import { Project } from 'src/schemas/Project.schema';
import { EmployeeFactory } from './factory/employee.factory';
import { DatabaseConnection } from 'src/config/database.connection';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    @InjectModel(Team.name) private teamModel: Model<Team>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(Account.name) private accountModel: Model<Account>,
    @InjectModel(ProjectPermissions.name) private projectPermissionsModel: Model<ProjectPermissions>,
    @Inject(forwardRef(() => DepartmentService))
    private departmentService: DepartmentService,
    @Inject(forwardRef(() => DesignationService))
    private designationService: DesignationService,
    @Inject(forwardRef(() => ProjectPermissionsService))
    private projectPermissionService: ProjectPermissionsService,
    @Inject(forwardRef(() => AccountService))
    private accountService: AccountService,
    private readonly employeeFactory: EmployeeFactory,
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

  async createEmployee({ account, projectpermission, ...createEmployee }: CreateEmployeeDto): Promise<Employee> {
    console.log('📝 Bắt đầu tạo employee mới...');
    await this.ensureConnection();

    const newEmployee = await this.employeeFactory.create({ account, projectpermission, ...createEmployee });
    return await newEmployee.save();
  }

  async getEmployeeByUsernameOrEmail(email: string): Promise<Employee | null> {
    await this.ensureConnection();

    const employee = await this.employeeFactory.getByUsernameOrEmail(email);
    return employee;
  }




  async getEmployees(): Promise<Employee[]> {
    console.log('🔍 Lấy danh sách tất cả employees...');
    await this.ensureConnection();

    const employees = await this.employeeFactory.getAll();
    return employees;

  }
  // ✅ Lấy thông tin nhân viên theo ID
  async getEmployeeById(id: Types.ObjectId | string): Promise<Employee> {
    await this.ensureConnection();

    const employee = await this.employeeFactory.getById(id);
    return employee;
  }

  async getTeamsByEmployeeId(employeeId: string): Promise<Team[]> {
    await this.ensureConnection();

    const teams = await this.employeeFactory.getTeamsById(employeeId);
    return teams;
  }

  async getProjectsByEmployeeId(employeeId: string): Promise<Project[]> {
    await this.ensureConnection();

    const projects = await this.employeeFactory.getProjectsById(employeeId);
    return projects;
  }

  // ✅ Cập nhật thông tin nhân viên
  async updateEmployee(employee_id: string, updateEmployeeDto: UpdateEmployeeDto) {
    await this.ensureConnection();

    const updatedEmployee = await this.employeeFactory.update(employee_id, updateEmployeeDto);
    return updatedEmployee;
  }

  // ✅ Xóa nhân viên
  async deleteEmployee(employee_id: string): Promise<Employee> {
    await this.ensureConnection();

    return this.employeeFactory.delete(employee_id);
  }


  async getEmployeeProfileFromToken(email: string): Promise<Employee> {
    await this.ensureConnection();

    const employee = await this.employeeFactory.getProfileFromToken(email);
    return employee;
  }

  async removeTeamFromEmployee(employeeId: string, teamId: string): Promise<Employee> {
    await this.ensureConnection();

    const team = await this.employeeFactory.removeTeam(employeeId, teamId);
    return team;
  }

  async getEmployeesByTeamId(teamId: string): Promise<Employee[]> {
    await this.ensureConnection();

    const employee = await this.employeeFactory.getByTeamId(teamId);
    return employee;
  }
}  