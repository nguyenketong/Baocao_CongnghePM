import mongoose from 'mongoose';
import { ProgressCategoryService } from './progressCategories.service';
import { CreateProgressCategoryDto } from './dto/CreatProgressCategory.dto';
import { UpdateProgressCategoryDto } from './dto/UpdateProgressCategoryDto ';
export declare class ProgressCategoryController {
    private readonly progressCategoryService;
    constructor(progressCategoryService: ProgressCategoryService);
    create(createProgressCategoryDto: CreateProgressCategoryDto): Promise<import("../schemas/ProgressCategory.schema").ProgressCategory>;
    getProgressCategory(): Promise<(mongoose.Document<unknown, {}, import("../schemas/ProgressCategory.schema").ProgressCategory> & import("../schemas/ProgressCategory.schema").ProgressCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getProgressCategoryById(id: string): Promise<mongoose.Document<unknown, {}, import("../schemas/ProgressCategory.schema").ProgressCategory> & import("../schemas/ProgressCategory.schema").ProgressCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateProgressCategory(id: string, updateProgressCategoryDto: UpdateProgressCategoryDto): Promise<mongoose.Document<unknown, {}, import("../schemas/ProgressCategory.schema").ProgressCategory> & import("../schemas/ProgressCategory.schema").ProgressCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteProgressCategory(id: string): Promise<mongoose.Document<unknown, {}, import("../schemas/ProgressCategory.schema").ProgressCategory> & import("../schemas/ProgressCategory.schema").ProgressCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
