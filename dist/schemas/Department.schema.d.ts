import { Document } from 'mongoose';
export declare class Department extends Document {
    nameDepartment: string;
}
export declare const DepartmentSchema: import("mongoose").Schema<Department, import("mongoose").Model<Department, any, any, any, Document<unknown, any, Department> & Department & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Department, Document<unknown, {}, import("mongoose").FlatRecord<Department>> & import("mongoose").FlatRecord<Department> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
