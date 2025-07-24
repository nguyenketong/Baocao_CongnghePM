import { Report } from 'src/schemas/Report.schema';
import { Model, Types } from 'mongoose';
import { CreateReportDto } from './dto/CreateReport.dto';
import { UpdateReportDto } from './dto/UpdateReport.dto';
import { EmployeeService } from 'src/employees/employees.service';
import { TaskService } from 'src/tasks/tasks.service';
import { ProgressService } from 'src/progress/progress.service';
import { DatabaseConnection } from 'src/config/database.connection';
import { ReportFactory } from './factory/report.factory';
export declare class ReportService {
    private reportModel;
    private employeeService;
    private taskService;
    private progressService;
    private readonly reportFactory;
    private readonly dbConnection;
    constructor(reportModel: Model<Report>, employeeService: EmployeeService, taskService: TaskService, progressService: ProgressService, reportFactory: ReportFactory, dbConnection: DatabaseConnection);
    private ensureConnection;
    createReport(createReportDto: CreateReportDto): Promise<Report>;
    getAllReports(): Promise<Report[]>;
    getReportById(id: Types.ObjectId | string): Promise<Report>;
    getReportByTaskId(taskId: Types.ObjectId | string): Promise<Report[]>;
    updateReport(id: string, updateReportDto: UpdateReportDto): Promise<Report>;
    deleteReport(id: string): Promise<Report>;
}
