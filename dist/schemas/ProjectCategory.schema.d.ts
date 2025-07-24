import { Document } from 'mongoose';
export declare class ProjectCategory extends Document {
    projectCategoryName: string;
}
export declare const ProjectCategorySchema: import("mongoose").Schema<ProjectCategory, import("mongoose").Model<ProjectCategory, any, any, any, Document<unknown, any, ProjectCategory> & ProjectCategory & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProjectCategory, Document<unknown, {}, import("mongoose").FlatRecord<ProjectCategory>> & import("mongoose").FlatRecord<ProjectCategory> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
