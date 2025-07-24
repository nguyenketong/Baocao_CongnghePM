import mongoose from 'mongoose';
import { TaskCategoryService } from './taskCategories.service';
import { CreateTaskCategoryDto } from './dto/CreateTaskCategory.dto';
import { UpdateTaskCategoryDto } from './dto/UpdateTaskCategory.dto';
export declare class TaskCategoryController {
    private readonly taskCategoryService;
    constructor(taskCategoryService: TaskCategoryService);
    create(createTaskCategoryDto: CreateTaskCategoryDto): Promise<import("../schemas/TaskCategory.schema").TaskCategory>;
    getTaskCategory(): Promise<(mongoose.Document<unknown, {}, import("../schemas/TaskCategory.schema").TaskCategory> & import("../schemas/TaskCategory.schema").TaskCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getTaskCategoryById(id: string): Promise<mongoose.Document<unknown, {}, import("../schemas/TaskCategory.schema").TaskCategory> & import("../schemas/TaskCategory.schema").TaskCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateTaskCategory(id: string, updateTaskCategoryDto: UpdateTaskCategoryDto): Promise<mongoose.Document<unknown, {}, import("../schemas/TaskCategory.schema").TaskCategory> & import("../schemas/TaskCategory.schema").TaskCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteTaskCategory(id: string): Promise<mongoose.Document<unknown, {}, import("../schemas/TaskCategory.schema").TaskCategory> & import("../schemas/TaskCategory.schema").TaskCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
