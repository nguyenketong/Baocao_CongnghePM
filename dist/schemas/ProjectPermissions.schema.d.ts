import { Document } from 'mongoose';
export declare class ProjectPermissions extends Document {
    resourceName: string;
    can_read?: boolean;
    can_write?: boolean;
    can_create?: boolean;
    can_delete?: boolean;
    can_import?: boolean;
    can_export?: boolean;
}
export declare const ProjectPermissionsSchema: import("mongoose").Schema<ProjectPermissions, import("mongoose").Model<ProjectPermissions, any, any, any, Document<unknown, any, ProjectPermissions> & ProjectPermissions & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProjectPermissions, Document<unknown, {}, import("mongoose").FlatRecord<ProjectPermissions>> & import("mongoose").FlatRecord<ProjectPermissions> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
