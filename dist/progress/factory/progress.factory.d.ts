import { Model, Types } from "mongoose";
import { EmployeeService } from "src/employees/employees.service";
import { NotificationService } from "src/notifications/notifications.service";
import { ProgressCategoryService } from "src/progresscategories/progressCategories.service";
import { ProjectService } from "src/projects/projects.service";
import { Progress } from "src/schemas/Progress.schema";
import { CreateProgressDto } from "../dto/CreateProgress.dto";
import { UpdateProgressDto } from "../dto/UpdateProgress.dto";
export declare class ProgressFactory {
    private progressModel;
    private progressCategoryService;
    private notificationService;
    private employeeService;
    private projectService;
    constructor(progressModel: Model<Progress>, progressCategoryService: ProgressCategoryService, notificationService: NotificationService, employeeService: EmployeeService, projectService: ProjectService);
    create(createProgressDto: CreateProgressDto): Promise<import("mongoose").Document<unknown, {}, Progress> & Progress & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAll(): Promise<Progress[]>;
    getById(id: Types.ObjectId | string): Promise<Progress>;
    getByProjectId(projectId: Types.ObjectId | string): Promise<Progress[]>;
    update(id: string, updateProgressDto: UpdateProgressDto): Promise<Progress>;
    delete(id: string): Promise<Progress>;
}
