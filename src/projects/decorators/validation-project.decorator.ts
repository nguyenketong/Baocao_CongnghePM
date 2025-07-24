import { BadRequestException, Injectable } from '@nestjs/common';
import { Project } from 'src/schemas/Project.schema';
import { CreateProjectDto } from '../dto/CreateProject.dto';
import { UpdateProjectDto } from '../dto/UpdateProject.dto';
import { BaseProjectDecorator, IProjectService } from './base-project.decorator';

@Injectable()
export class ValidationProjectDecorator extends BaseProjectDecorator {
    constructor(projectService: IProjectService) {
        super(projectService);
    }

    async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
        this.validateProjectData(createProjectDto);
        return super.createProject(createProjectDto);
    }

    async updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
        this.validateProjectData(updateProjectDto);
        return super.updateProject(id, updateProjectDto);
    }

    private validateProjectData(projectDto: CreateProjectDto | UpdateProjectDto): void {
        if (projectDto.projectName && projectDto.projectName.length < 3) {
            throw new BadRequestException('Tên project phải có ít nhất 3 ký tự');
        }
    }
}
