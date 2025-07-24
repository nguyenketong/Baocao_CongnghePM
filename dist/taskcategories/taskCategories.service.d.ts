import { Model, Types } from 'mongoose';
import { TaskCategory } from 'src/schemas/TaskCategory.schema';
import { CreateTaskCategoryDto } from './dto/CreateTaskCategory.dto';
import { UpdateTaskCategoryDto } from './dto/UpdateTaskCategory.dto';
export declare class TaskCategoryService {
    private taskCategoryModel;
    constructor(taskCategoryModel: Model<TaskCategory>);
    create(createTaskCategoryDto: CreateTaskCategoryDto): Promise<TaskCategory>;
    getTaskCategory(): Promise<(import("mongoose").Document<unknown, {}, TaskCategory> & TaskCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getTaskCategoryById(id: Types.ObjectId | string): Promise<(import("mongoose").Document<unknown, {}, TaskCategory> & TaskCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    updateTaskCategory(id: string, updateTaskCategoryDto: UpdateTaskCategoryDto): Promise<(import("mongoose").Document<unknown, {}, TaskCategory> & TaskCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    deleteTaskCategory(id: string): Promise<(import("mongoose").Document<unknown, {}, TaskCategory> & TaskCategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
