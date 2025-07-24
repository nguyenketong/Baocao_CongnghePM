import { CreateEmployeeDto } from './dto/CreateEmployee.dto';
import { UpdateEmployeeDto } from './dto/UpdateEmployee.dto';
import { EmployeeService } from './employees.service';
import { Account } from 'src/schemas/Account.schema';
export interface AuthenticatedRequest extends Request {
    user: Account;
}
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    createEmployee(createEmployeeDto: CreateEmployeeDto, file: Express.Multer.File): Promise<{
        success: boolean;
        data: import("../schemas/Employee.schema").Employee;
    }>;
    getEmployees(): Promise<import("../schemas/Employee.schema").Employee[]>;
    getEmployeeById(id: string): Promise<import("../schemas/Employee.schema").Employee>;
    getTeamsByEmployeeId(id: string): Promise<import("../schemas/Team.schema").Team[]>;
    getProjectsByEmployeeId(id: string): Promise<import("../schemas/Project.schema").Project[]>;
    updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto, file: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, import("../schemas/Employee.schema").Employee> & import("../schemas/Employee.schema").Employee & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteEmployee(id: string): Promise<import("../schemas/Employee.schema").Employee>;
}
