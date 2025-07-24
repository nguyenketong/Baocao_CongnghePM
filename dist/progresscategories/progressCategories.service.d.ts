import { Model, Types } from 'mongoose';
import { ProgressCategory } from 'src/schemas/ProgressCategory.schema';
import { CreateProgressCategoryDto } from './dto/CreatProgressCategory.dto';
import { UpdateProgressCategoryDto } from './dto/UpdateProgressCategoryDto ';
export declare class ProgressCategoryService {
    private progressCategoryModel;
    constructor(progressCategoryModel: Model<ProgressCategory>);
    create(createProgressCategoryDto: CreateProgressCategoryDto): Promise<ProgressCategory>;
    getProgressCategory(): Promise<(import("mongoose").Document<unknown, {}, ProgressCategory> & ProgressCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getProgressCategoryById(id: Types.ObjectId | string): Promise<(import("mongoose").Document<unknown, {}, ProgressCategory> & ProgressCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    updateProgressCategory(id: string, updateProgressCategoryDto: UpdateProgressCategoryDto): Promise<(import("mongoose").Document<unknown, {}, ProgressCategory> & ProgressCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    deleteProgressCategory(id: string): Promise<(import("mongoose").Document<unknown, {}, ProgressCategory> & ProgressCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
