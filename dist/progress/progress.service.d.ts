import { Model, Types } from 'mongoose';
import { EmployeeService } from 'src/employees/employees.service';
import { NotificationService } from 'src/notifications/notifications.service';
import { ProgressCategoryService } from 'src/progresscategories/progressCategories.service';
import { ProjectService } from 'src/projects/projects.service';
import { Progress } from 'src/schemas/Progress.schema';
import { CreateProgressDto } from './dto/CreateProgress.dto';
import { UpdateProgressDto } from './dto/UpdateProgress.dto';
import { ProgressFactory } from './factory/progress.factory';
import { DatabaseConnection } from 'src/config/database.connection';
export declare class ProgressService {
    private progressModel;
    private progressCategoryService;
    private notificationService;
    private employeeService;
    private projectService;
    private readonly progressFactory;
    private readonly dbConnection;
    constructor(progressModel: Model<Progress>, progressCategoryService: ProgressCategoryService, notificationService: NotificationService, employeeService: EmployeeService, projectService: ProjectService, progressFactory: ProgressFactory, dbConnection: DatabaseConnection);
    private ensureConnection;
    createProgress(createProgressDto: CreateProgressDto): Promise<import("mongoose").Document<unknown, {}, Progress> & Progress & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAllProgresses(): Promise<Progress[]>;
    getProgressById(id: Types.ObjectId | string): Promise<Progress>;
    getProgressByProjectId(projectId: Types.ObjectId | string): Promise<Progress[]>;
    updateProgress(id: string, updateProgressDto: UpdateProgressDto): Promise<Progress>;
    deleteProgress(id: string): Promise<Progress>;
}
