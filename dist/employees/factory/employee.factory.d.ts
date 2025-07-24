import { Model, Types } from "mongoose";
import { AccountService } from "src/accounts/accounts.service";
import { DepartmentService } from "src/departments/departments.service";
import { DesignationService } from "src/designations/designations.service";
import { ProjectPermissionsService } from "src/projectpermissions/projectpermissions.service";
import { Account } from "src/schemas/Account.schema";
import { Employee } from "src/schemas/Employee.schema";
import { Project } from "src/schemas/Project.schema";
import { ProjectPermissions } from "src/schemas/ProjectPermissions.schema";
import { Team } from "src/schemas/Team.schema";
import { CreateEmployeeDto } from "../dto/CreateEmployee.dto";
import { UpdateEmployeeDto } from "../dto/UpdateEmployee.dto";
export declare class EmployeeFactory {
    private employeeModel;
    private teamModel;
    private projectModel;
    private accountModel;
    private projectPermissionsModel;
    private departmentService;
    private designationService;
    private projectPermissionService;
    private accountService;
    constructor(employeeModel: Model<Employee>, teamModel: Model<Team>, projectModel: Model<Project>, accountModel: Model<Account>, projectPermissionsModel: Model<ProjectPermissions>, departmentService: DepartmentService, designationService: DesignationService, projectPermissionService: ProjectPermissionsService, accountService: AccountService);
    create({ account, projectpermission, ...createEmployee }: CreateEmployeeDto): Promise<Employee>;
    getByUsernameOrEmail(email: string): Promise<Employee | null>;
    getAll(): Promise<Employee[]>;
    getById(id: Types.ObjectId | string): Promise<Employee>;
    getTeamsById(employeeId: string): Promise<Team[]>;
    getProjectsById(employeeId: string): Promise<Project[]>;
    update(employee_id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<import("mongoose").Document<unknown, {}, Employee> & Employee & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    delete(employee_id: string): Promise<Employee>;
    getProfileFromToken(email: string): Promise<Employee>;
    removeTeam(employeeId: string, teamId: string): Promise<Employee>;
    getByTeamId(teamId: string): Promise<Employee[]>;
}
