import { Model, Types } from 'mongoose';
import { ProjectCategory } from 'src/schemas/ProjectCategory.schema';
import { CreateProjectCategoryDto } from './dto/CreateProjectCategory.dto';
import { UpdateProjectCategoryDto } from './dto/UpdateProjectCategory.dto';
export declare class ProjectCategoryService {
    private projectCategoryModel;
    constructor(projectCategoryModel: Model<ProjectCategory>);
    create(createProjectCategoryDto: CreateProjectCategoryDto): Promise<ProjectCategory>;
    getProjectCategory(): Promise<(import("mongoose").Document<unknown, {}, ProjectCategory> & ProjectCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getProjectCategoryById(id: Types.ObjectId | string): Promise<(import("mongoose").Document<unknown, {}, ProjectCategory> & ProjectCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    updateProjectCategory(id: string, updateProjectCategoryDto: UpdateProjectCategoryDto): Promise<(import("mongoose").Document<unknown, {}, ProjectCategory> & ProjectCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    deleteProjectCategory(id: string): Promise<(import("mongoose").Document<unknown, {}, ProjectCategory> & ProjectCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
