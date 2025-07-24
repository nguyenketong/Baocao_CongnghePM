import { Model, Types } from 'mongoose';
import { Employee } from '../schemas/Employee.schema';
import { CreateEmployeeDto } from './dto/CreateEmployee.dto';
import { UpdateEmployeeDto } from './dto/UpdateEmployee.dto';
import { DepartmentService } from 'src/departments/departments.service';
import { DesignationService } from 'src/designations/designations.service';
import { AccountService } from 'src/accounts/accounts.service';
import { Account } from 'src/schemas/Account.schema';
import { ProjectPermissions } from 'src/schemas/ProjectPermissions.schema';
import { ProjectPermissionsService } from 'src/projectpermissions/projectpermissions.service';
import { Team } from 'src/schemas/Team.schema';
import { Project } from 'src/schemas/Project.schema';
import { EmployeeFactory } from './factory/employee.factory';
import { DatabaseConnection } from 'src/config/database.connection';
export declare class EmployeeService {
    private employeeModel;
    private teamModel;
    private projectModel;
    private accountModel;
    private projectPermissionsModel;
    private departmentService;
    private designationService;
    private projectPermissionService;
    private accountService;
    private readonly employeeFactory;
    private readonly dbConnection;
    constructor(employeeModel: Model<Employee>, teamModel: Model<Team>, projectModel: Model<Project>, accountModel: Model<Account>, projectPermissionsModel: Model<ProjectPermissions>, departmentService: DepartmentService, designationService: DesignationService, projectPermissionService: ProjectPermissionsService, accountService: AccountService, employeeFactory: EmployeeFactory, dbConnection: DatabaseConnection);
    private ensureConnection;
    createEmployee({ account, projectpermission, ...createEmployee }: CreateEmployeeDto): Promise<Employee>;
    getEmployeeByUsernameOrEmail(email: string): Promise<Employee | null>;
    getEmployees(): Promise<Employee[]>;
    getEmployeeById(id: Types.ObjectId | string): Promise<Employee>;
    getTeamsByEmployeeId(employeeId: string): Promise<Team[]>;
    getProjectsByEmployeeId(employeeId: string): Promise<Project[]>;
    updateEmployee(employee_id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<import("mongoose").Document<unknown, {}, Employee> & Employee & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteEmployee(employee_id: string): Promise<Employee>;
    getEmployeeProfileFromToken(email: string): Promise<Employee>;
    removeTeamFromEmployee(employeeId: string, teamId: string): Promise<Employee>;
    getEmployeesByTeamId(teamId: string): Promise<Employee[]>;
}
