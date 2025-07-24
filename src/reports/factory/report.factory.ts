import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateReportDto } from "../dto/CreateReport.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Report } from "src/schemas/Report.schema";
import { EmployeeService } from "src/employees/employees.service";
import { TaskService } from "src/tasks/tasks.service";
import { ProgressService } from "src/progress/progress.service";
import { UpdateReportDto } from "../dto/UpdateReport.dto";


@Injectable()
export class ReportFactory {
    constructor(
        @InjectModel(Report.name) private readonly reportModel: Model<Report>,
        private readonly employeeService: EmployeeService,
        private taskService: TaskService,
        private progressService: ProgressService,
    ) { }
    async create(createReportDto: CreateReportDto): Promise<Report> {

        const { id_employee, id_task, id_progress } = createReportDto;
        // Kiểm tra xem employee có tồn tại không
        if (id_employee) {
            const employeeExists = await this.employeeService.getEmployeeById(id_employee);
            if (!employeeExists) {
                throw new BadRequestException('Employee không tồn tại');
            }
        }

        // Kiểm tra xem task có tồn tại không, chỉ khi id_task có giá trị
        if (id_task) {
            const taskExists = await this.taskService.getTaskById(id_task);
            if (!taskExists) {
                throw new BadRequestException('Task không tồn tại');
            }
        }

        // Kiểm tra xem progress có tồn tại không, chỉ khi id_progress có giá trị
        if (id_progress) {
            const progressExists = await this.progressService.getProgressById(id_progress);
            if (!progressExists) {
                throw new BadRequestException('Progress không tồn tại');
            }
        }

        // Tạo và lưu report mới
        const newReport = new this.reportModel(createReportDto);
        return await newReport.save();
    }

    async getAll(): Promise<Report[]> {
        return await this.reportModel
            .find()
            .populate('id_employee')
            .populate('id_task')
            .populate('id_progress')
            .exec();
    }

    async getById(id: Types.ObjectId | string): Promise<Report> {
        const report = await this.reportModel
            .findById(id)
            .populate(['id_employee', 'id_task', 'id_progress'])
            .exec();

        if (!report) {
            throw new NotFoundException('Report không tồn tại');
        }
        return report;
    }

    async getByTaskId(taskId: Types.ObjectId | string): Promise<Report[]> {
        // Nếu taskId là chuỗi, chuyển đổi thành ObjectId để so sánh với id_task trong cơ sở dữ liệu
        const taskObjectId = Types.ObjectId.isValid(taskId) ? new Types.ObjectId(taskId) : taskId;

        const report = await this.reportModel
            .find({ id_task: taskObjectId })
            .populate(['id_employee', 'id_task', 'id_progress'])
            .exec();

        if (!report || report.length === 0) {
            throw new NotFoundException('Không có báo cáo nào cho nhiệm vụ này');
        }

        return report;
    }

    async update(id: string, updateReportDto: UpdateReportDto): Promise<Report> {
        const updatedReport = await this.reportModel.findByIdAndUpdate(id, updateReportDto, { new: true });
        if (!updatedReport) {
            throw new NotFoundException('Không tìm thấy Report để cập nhật');
        }
        return updatedReport;
    }

    async delete(id: string): Promise<Report> {
        const deletedReport = await this.reportModel.findByIdAndDelete(id);
        if (!deletedReport) {
            throw new NotFoundException('Không tìm thấy Report để xóa');
        }
        return deletedReport;
    }
}