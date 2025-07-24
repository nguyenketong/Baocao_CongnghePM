import { Project } from 'src/schemas/Project.schema';
import { CreateProjectDto } from '../dto/CreateProject.dto';
import { UpdateProjectDto } from '../dto/UpdateProject.dto';
import { BaseProjectDecorator, IProjectService } from './base-project.decorator';
export declare class ValidationProjectDecorator extends BaseProjectDecorator {
    constructor(projectService: IProjectService);
    createProject(createProjectDto: CreateProjectDto): Promise<Project>;
    updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<Project>;
    private validateProjectData;
}
