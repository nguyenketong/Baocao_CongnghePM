import { CreateAccountDto } from "src/accounts/dto/CreateAccount.dto";
import { CreateProjectPermissionsDto } from "src/projectpermissions/dto/CreateProjectPermission.dto";
import { Types } from "mongoose";
export declare class CreateEmployeeDto {
    employeeName: string;
    employeeProfile?: string;
    joiningDate?: Date;
    phone?: string;
    description?: string;
    team_id?: Types.ObjectId;
    department_id?: Types.ObjectId;
    designation_id?: Types.ObjectId;
    account?: CreateAccountDto;
    projectpermission?: CreateProjectPermissionsDto[];
}
