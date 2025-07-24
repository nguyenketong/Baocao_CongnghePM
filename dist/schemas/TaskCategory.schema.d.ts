import { Document } from 'mongoose';
export declare class TaskCategory extends Document {
    taskCategoryName: string;
}
export declare const TaskCategorySchema: import("mongoose").Schema<TaskCategory, import("mongoose").Model<TaskCategory, any, any, any, Document<unknown, any, TaskCategory> & TaskCategory & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TaskCategory, Document<unknown, {}, import("mongoose").FlatRecord<TaskCategory>> & import("mongoose").FlatRecord<TaskCategory> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
