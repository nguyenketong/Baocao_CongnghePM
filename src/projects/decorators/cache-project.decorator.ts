import { Injectable } from '@nestjs/common';
import { Project } from 'src/schemas/Project.schema';
import { BaseProjectDecorator, IProjectService } from './base-project.decorator';
import { Types } from 'mongoose';
import { UpdateProjectDto } from '../dto/UpdateProject.dto';
import { CreateProjectDto } from '../dto/CreateProject.dto';

@Injectable()
export class CacheProjectDecorator extends BaseProjectDecorator {
    private cache: Map<string, any> = new Map();

    constructor(projectService: IProjectService) {
        super(projectService);
    }

    async getAllProjects(): Promise<any[]> {
        const cacheKey = 'all_projects';
        if (this.cache.has(cacheKey)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return this.cache.get(cacheKey);
        }

        const projects = await super.getAllProjects();
        this.cache.set(cacheKey, projects);
        return projects;
    }

    async getProjectById(id: Types.ObjectId | string): Promise<Project> {
        const cacheKey = `project_${id.toString()}`; // Chuyển ObjectId thành chuỗi
        if (this.cache.has(cacheKey)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return this.cache.get(cacheKey);
        }

        const project = await super.getProjectById(id);
        this.cache.set(cacheKey, project);
        return project;
    }

    async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
        const result = await super.createProject(createProjectDto);
        this.cache.clear(); // Xóa cache khi có sự thay đổi dữ liệu
        return result;
    }

    async updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
        const result = await super.updateProject(id, updateProjectDto);
        this.cache.clear(); // Xóa cache khi có sự thay đổi dữ liệu
        return result;
    }

    async deleteProject(id: string): Promise<Project> {
        const result = await super.deleteProject(id);
        this.cache.clear(); // Xóa cache khi có sự thay đổi dữ liệu
        return result;
    }
}
