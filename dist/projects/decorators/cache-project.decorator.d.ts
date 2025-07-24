import { Project } from 'src/schemas/Project.schema';
import { BaseProjectDecorator, IProjectService } from './base-project.decorator';
import { Types } from 'mongoose';
import { UpdateProjectDto } from '../dto/UpdateProject.dto';
import { CreateProjectDto } from '../dto/CreateProject.dto';
export declare class CacheProjectDecorator extends BaseProjectDecorator {
    private cache;
    constructor(projectService: IProjectService);
    getAllProjects(): Promise<any[]>;
    getProjectById(id: Types.ObjectId | string): Promise<Project>;
    createProject(createProjectDto: CreateProjectDto): Promise<Project>;
    updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<Project>;
    deleteProject(id: string): Promise<Project>;
}
