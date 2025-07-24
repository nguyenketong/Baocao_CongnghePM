import { Model, Types } from 'mongoose';
import { EmployeeService } from 'src/employees/employees.service';
import { NotificationService } from 'src/notifications/notifications.service';
import { ProjectCategoryService } from 'src/projectcategories/projectCategories.service';
import { Project } from 'src/schemas/Project.schema';
import { CreateProjectDto } from './dto/CreateProject.dto';
import { UpdateProjectDto } from './dto/UpdateProject.dto';
import { DatabaseConnection } from 'src/config/database.connection';
import { ProjectFactory } from './factory/project.fatory';
export declare class ProjectService {
    private projectModel;
    private projectCategoryService;
    private notificationService;
    private employeeService;
    private readonly projectFactory;
    private readonly dbConnection;
    constructor(projectModel: Model<Project>, projectCategoryService: ProjectCategoryService, notificationService: NotificationService, employeeService: EmployeeService, projectFactory: ProjectFactory, dbConnection: DatabaseConnection);
    private ensureConnection;
    createProject(createProjectDto: CreateProjectDto): Promise<import("mongoose").Document<unknown, {}, Project> & Project & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAllProjects(): Promise<any[]>;
    getProjectById(id: Types.ObjectId | string): Promise<Project>;
    updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<Project>;
    deleteProject(id: string): Promise<Project>;
}
