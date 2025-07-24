import { Types } from "mongoose";
import { CreateProjectDto } from "../dto/CreateProject.dto";
import { Project } from "src/schemas/Project.schema";
import { UpdateProjectDto } from "../dto/UpdateProject.dto";

// Interface định nghĩa các phương thức cơ bản của ProjectService
export interface IProjectService {
    createProject(createProjectDto: CreateProjectDto): Promise<Project>;
    getAllProjects(): Promise<any[]>;
    getProjectById(id: Types.ObjectId | string): Promise<Project>
    updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<Project>
    deleteProject(id: string): Promise<Project>
}
// Base decorator class
export abstract class BaseProjectDecorator implements IProjectService {
    constructor(protected readonly projectService: IProjectService) { }

    createProject(createProjectDto: CreateProjectDto): Promise<Project> {
        return this.projectService.createProject(createProjectDto);
    }

    getAllProjects(): Promise<any[]> {
        return this.projectService.getAllProjects();
    }

    getProjectById(id: Types.ObjectId | string): Promise<Project> {
        return this.projectService.getProjectById(id);
    }

    updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
        return this.projectService.updateProject(id, updateProjectDto);
    }

    deleteProject(id: string): Promise<Project> {
        return this.projectService.deleteProject(id);
    }

}