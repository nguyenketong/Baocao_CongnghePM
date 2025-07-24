import { Document } from 'mongoose';
export declare class Designation extends Document {
    designationName: string;
}
export declare const DesignationSchema: import("mongoose").Schema<Designation, import("mongoose").Model<Designation, any, any, any, Document<unknown, any, Designation> & Designation & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Designation, Document<unknown, {}, import("mongoose").FlatRecord<Designation>> & import("mongoose").FlatRecord<Designation> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
