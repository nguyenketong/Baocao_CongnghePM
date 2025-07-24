import { Injectable, Logger } from '@nestjs/common';
import { Project } from 'src/schemas/Project.schema';
import { CreateProjectDto } from '../dto/CreateProject.dto';
import { UpdateProjectDto } from '../dto/UpdateProject.dto';
import { BaseProjectDecorator, IProjectService } from './base-project.decorator';

@Injectable()
export class LoggingProjectDecorator extends BaseProjectDecorator {
    private readonly logger = new Logger(LoggingProjectDecorator.name);

    constructor(projectService: IProjectService) {
        super(projectService);
    }

    async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
        this.logger.log(`Creating project with name: ${createProjectDto.projectName}`);
        const result = await super.createProject(createProjectDto);
        this.logger.log(`Project created successfully with ID: ${result._id}`);
        return result;
    }

    async deleteProject(id: string): Promise<Project> {
        this.logger.log(`Attempting to delete project with ID: ${id}`);
        const result = await super.deleteProject(id);
        this.logger.log(`Project deleted successfully: ${id}`);
        return result;
    }

    async updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
        this.logger.log(`Updating project with ID: ${id}`);
        const result = await super.updateProject(id, updateProjectDto);
        this.logger.log(`Project updated successfully: ${id}`);
        return result;
    }
}
