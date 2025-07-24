import mongoose from 'mongoose';
import { ProjectCategoryService } from './projectCategories.service';
import { CreateProjectCategoryDto } from './dto/CreateProjectCategory.dto';
import { UpdateProjectCategoryDto } from './dto/UpdateProjectCategory.dto';
export declare class ProjectCategoryController {
    private readonly projectCategoryService;
    constructor(projectCategoryService: ProjectCategoryService);
    create(createProjectCategoryDto: CreateProjectCategoryDto): Promise<import("../schemas/ProjectCategory.schema").ProjectCategory>;
    getProjectCategory(): Promise<(mongoose.Document<unknown, {}, import("../schemas/ProjectCategory.schema").ProjectCategory> & import("../schemas/ProjectCategory.schema").ProjectCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getProjectCategoryById(id: string): Promise<mongoose.Document<unknown, {}, import("../schemas/ProjectCategory.schema").ProjectCategory> & import("../schemas/ProjectCategory.schema").ProjectCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateProjectCategory(id: string, updateProjectCategoryDto: UpdateProjectCategoryDto): Promise<mongoose.Document<unknown, {}, import("../schemas/ProjectCategory.schema").ProjectCategory> & import("../schemas/ProjectCategory.schema").ProjectCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteProjectCategory(id: string): Promise<mongoose.Document<unknown, {}, import("../schemas/ProjectCategory.schema").ProjectCategory> & import("../schemas/ProjectCategory.schema").ProjectCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
