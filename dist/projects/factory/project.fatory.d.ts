import { CreateProjectDto } from "../dto/CreateProject.dto";
import { Project } from "src/schemas/Project.schema";
import { Model, Types } from "mongoose";
import { ProjectCategoryService } from "src/projectcategories/projectCategories.service";
import { NotificationService } from "src/notifications/notifications.service";
import { EmployeeService } from "src/employees/employees.service";
import { UpdateProjectDto } from "../dto/UpdateProject.dto";
export declare class ProjectFactory {
    private projectModel;
    private projectCategoryService;
    private notificationService;
    private employeeService;
    constructor(projectModel: Model<Project>, projectCategoryService: ProjectCategoryService, notificationService: NotificationService, employeeService: EmployeeService);
    create(createProjectDto: CreateProjectDto): Promise<import("mongoose").Document<unknown, {}, Project> & Project & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAll(): Promise<any[]>;
    getById(id: Types.ObjectId | string): Promise<Project>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project>;
    delete(id: string): Promise<Project>;
}
