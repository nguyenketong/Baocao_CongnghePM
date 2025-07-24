import { CreateReportDto } from "../dto/CreateReport.dto";
import { Model, Types } from "mongoose";
import { Report } from "src/schemas/Report.schema";
import { EmployeeService } from "src/employees/employees.service";
import { TaskService } from "src/tasks/tasks.service";
import { ProgressService } from "src/progress/progress.service";
import { UpdateReportDto } from "../dto/UpdateReport.dto";
export declare class ReportFactory {
    private readonly reportModel;
    private readonly employeeService;
    private taskService;
    private progressService;
    constructor(reportModel: Model<Report>, employeeService: EmployeeService, taskService: TaskService, progressService: ProgressService);
    create(createReportDto: CreateReportDto): Promise<Report>;
    getAll(): Promise<Report[]>;
    getById(id: Types.ObjectId | string): Promise<Report>;
    getByTaskId(taskId: Types.ObjectId | string): Promise<Report[]>;
    update(id: string, updateReportDto: UpdateReportDto): Promise<Report>;
    delete(id: string): Promise<Report>;
}
