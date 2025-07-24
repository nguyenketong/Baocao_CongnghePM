import { Document } from 'mongoose';
export declare class ProgressCategory extends Document {
    progressCategoryName: string;
}
export declare const ProgressCategorySchema: import("mongoose").Schema<ProgressCategory, import("mongoose").Model<ProgressCategory, any, any, any, Document<unknown, any, ProgressCategory> & ProgressCategory & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProgressCategory, Document<unknown, {}, import("mongoose").FlatRecord<ProgressCategory>> & import("mongoose").FlatRecord<ProgressCategory> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
