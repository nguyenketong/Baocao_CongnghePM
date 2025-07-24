import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EmployeeService } from 'src/employees/employees.service';
import { NotificationService } from 'src/notifications/notifications.service';
import { ProjectCategoryService } from 'src/projectcategories/projectCategories.service';
import { Project } from 'src/schemas/Project.schema';
import { CreateProjectDto } from './dto/CreateProject.dto';
import { UpdateProjectDto } from './dto/UpdateProject.dto';
import { DatabaseConnection } from 'src/config/database.connection';
import { ProjectFactory } from './factory/project.fatory';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<Project>,
    @Inject(forwardRef(() => ProjectCategoryService))
    private projectCategoryService: ProjectCategoryService,
    @Inject(forwardRef(() => NotificationService))
    private notificationService: NotificationService,
    @Inject(forwardRef(() => EmployeeService))
    private employeeService: EmployeeService,
    private readonly projectFactory: ProjectFactory,
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

  // ✅ Tạo mới Project
  async createProject(createProjectDto: CreateProjectDto) {
    console.log('📝 Bắt đầu tạo project mới...');
    await this.ensureConnection();

    const newProject = await this.projectFactory.create(createProjectDto);
    return await newProject.save();
  }


  async getAllProjects(): Promise<any[]> {
    console.log('🔍 Lấy danh sách tất cả projects...');
    await this.ensureConnection();

    const projects = await this.projectFactory.getAll();
    return projects;
  }

  // ✅ Lấy Project theo ID
  async getProjectById(id: Types.ObjectId | string): Promise<Project> {
    await this.ensureConnection();

    const project = await this.projectFactory.getById(id);
    return project;
  }


  // ✅ Cập nhật Project
  async updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    await this.ensureConnection();

    const updatedProject = await this.projectFactory.update(id, updateProjectDto);
    return updatedProject;
  }

  // ✅ Xóa Project
  async deleteProject(id: string): Promise<Project> {
    await this.ensureConnection();

    return this.projectFactory.delete(id);
  }
}
