import { Types } from "mongoose";
import { CreateProjectDto } from "../dto/CreateProject.dto";
import { Project } from "src/schemas/Project.schema";
import { UpdateProjectDto } from "../dto/UpdateProject.dto";
export interface IProjectService {
    createProject(createProjectDto: CreateProjectDto): Promise<Project>;
    getAllProjects(): Promise<any[]>;
    getProjectById(id: Types.ObjectId | string): Promise<Project>;
    updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<Project>;
    deleteProject(id: string): Promise<Project>;
}
export declare abstract class BaseProjectDecorator implements IProjectService {
    protected readonly projectService: IProjectService;
    constructor(projectService: IProjectService);
    createProject(createProjectDto: CreateProjectDto): Promise<Project>;
    getAllProjects(): Promise<any[]>;
    getProjectById(id: Types.ObjectId | string): Promise<Project>;
    updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<Project>;
    deleteProject(id: string): Promise<Project>;
}
