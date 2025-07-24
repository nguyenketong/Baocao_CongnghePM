import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EmployeeService } from 'src/employees/employees.service';
import { NotificationService } from 'src/notifications/notifications.service';
import { ProgressCategoryService } from 'src/progresscategories/progressCategories.service';
import { ProjectService } from 'src/projects/projects.service';  // Import ProjectService
import { Progress } from 'src/schemas/Progress.schema';
import { CreateProgressDto } from './dto/CreateProgress.dto';
import { UpdateProgressDto } from './dto/UpdateProgress.dto';
import { ProgressFactory } from './factory/progress.factory';
import { DatabaseConnection } from 'src/config/database.connection';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(Progress.name)
    private progressModel: Model<Progress>,
    @Inject(forwardRef(() => ProgressCategoryService))
    private progressCategoryService: ProgressCategoryService,
    @Inject(forwardRef(() => NotificationService))
    private notificationService: NotificationService,
    @Inject(forwardRef(() => EmployeeService))
    private employeeService: EmployeeService,
    @Inject(forwardRef(() => ProjectService))
    private projectService: ProjectService,  // Inject ProjectService
    private readonly progressFactory: ProgressFactory,
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

  // ✅ Tạo mới Progress
  async createProgress(createProgressDto: CreateProgressDto) {
    console.log('📝 Bắt đầu tạo progress mới...');
    await this.ensureConnection();

    const newProgress = await this.progressFactory.create(createProgressDto);
    return await newProgress.save();
  }

  // ✅ Lấy danh sách tất cả Progress
  async getAllProgresses(): Promise<Progress[]> {
    console.log('🔍 Lấy danh sách tất cả progresses...');
    await this.ensureConnection();

    const progresses = await this.progressFactory.getAll();
    return progresses;
  }

  // ✅ Lấy Progress theo ID
  async getProgressById(id: Types.ObjectId | string): Promise<Progress> {
    await this.ensureConnection();

    const progress = await this.progressFactory.getById(id);
    return progress;
  }

  async getProgressByProjectId(projectId: Types.ObjectId | string): Promise<Progress[]> {
    await this.ensureConnection();

    const progress = await this.progressFactory.getByProjectId(projectId);
    return progress;
  }


  // ✅ Cập nhật Progress
  async updateProgress(id: string, updateProgressDto: UpdateProgressDto): Promise<Progress> {
    await this.ensureConnection();

    const updatedProgress = await this.progressFactory.update(id, updateProgressDto);
    return updatedProgress;
  }

  // ✅ Xóa Progress
  async deleteProgress(id: string): Promise<Progress> {
    await this.ensureConnection();

    return this.progressFactory.delete(id);
  }
}