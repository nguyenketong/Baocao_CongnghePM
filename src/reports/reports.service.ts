import { Report } from 'src/schemas/Report.schema';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

// import{Report} from 'src/schemas/Report.schema'
import { CreateReportDto } from './dto/CreateReport.dto';
import { UpdateReportDto } from './dto/UpdateReport.dto';
import { EmployeeService } from 'src/employees/employees.service';
import { TaskService } from 'src/tasks/tasks.service';
import { ProgressService } from 'src/progress/progress.service';
import { DatabaseConnection } from 'src/config/database.connection';
import { ReportFactory } from './factory/report.factory';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name)
    private reportModel: Model<Report>,
    @Inject(forwardRef(() => EmployeeService))
    private employeeService: EmployeeService,
    @Inject(forwardRef(() => TaskService))
    private taskService: TaskService,
    @Inject(forwardRef(() => ProgressService))
    private progressService: ProgressService,
    private readonly reportFactory: ReportFactory,
    @Inject('DATABASE_CONNECTION')
    private readonly dbConnection: DatabaseConnection
  ) {
    console.log('🏗️ ReportService được khởi tạo');
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

  async createReport(createReportDto: CreateReportDto) {
    console.log('📝 Bắt đầu tạo report mới...');
    await this.ensureConnection();

    // Tạo và lưu report mới
    const newReport = await this.reportFactory.create(createReportDto);
    return await newReport.save();
  }

  // 🔍 Lấy tất cả Report
  async getAllReports(): Promise<Report[]> {
    console.log('🔍 Lấy danh sách tất cả report...');
    await this.ensureConnection();

    const reports = await this.reportFactory.getAll();
    return reports;
  }

  // 🔍 Lấy Report theo ID
  async getReportById(id: Types.ObjectId | string): Promise<Report> {
    await this.ensureConnection();

    const report = await this.reportFactory.getById(id);
    return report;
  }

  // 🔍 Lấy Report theo Task ID
  async getReportByTaskId(taskId: Types.ObjectId | string): Promise<Report[]> {
    await this.ensureConnection();

    const report = await this.reportFactory.getByTaskId(taskId);
    return report
  }

  // ✏️ Cập nhật Report
  async updateReport(id: string, updateReportDto: UpdateReportDto): Promise<Report> {
    await this.ensureConnection();

    const updatedReport = await this.reportFactory.update(id, updateReportDto);
    return updatedReport;
  }

  // 🗑️ Xóa Report
  async deleteReport(id: string): Promise<Report> {
    await this.ensureConnection();

    return this.reportFactory.delete(id);
  }
}
