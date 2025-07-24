import { Types } from "mongoose";
export declare class UpdateEmployeeDto {
    employeeName?: string;
    team_id?: Types.ObjectId[];
    joiningDate?: Date;
    employeeProfile?: string;
    phone?: string;
    description?: string;
    lastModifiedBy: string;
    lastModifiedAt: string;
}
