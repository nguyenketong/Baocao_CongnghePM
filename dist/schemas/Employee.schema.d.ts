import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
export declare class Employee extends Document {
    employeeName: string;
    employeeProfile?: string;
    joiningDate: Date;
    phone?: string;
    description?: string;
    team_id?: mongoose.Types.ObjectId[];
    department_id?: mongoose.Types.ObjectId;
    designation_id?: mongoose.Types.ObjectId;
    account?: mongoose.Types.ObjectId;
    projectpermission?: Types.ObjectId[];
}
declare const EmployeeSchema: mongoose.Schema<Employee, mongoose.Model<Employee, any, any, any, Document<unknown, any, Employee> & Employee & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Employee, Document<unknown, {}, mongoose.FlatRecord<Employee>> & mongoose.FlatRecord<Employee> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export { EmployeeSchema };
