import { Employee } from 'src/schemas/Employee.schema';
import { CreateEmployeeDto } from '../dto/CreateEmployee.dto';
import { UpdateEmployeeDto } from '../dto/UpdateEmployee.dto';
import { Types } from 'mongoose';
import { Team } from 'src/schemas/Team.schema';
import { Project } from 'src/schemas/Project.schema';
export interface IEmployeeService {
    createEmployee({ account, projectpermission, ...createEmployee }: CreateEmployeeDto): Promise<Employee>;
    getEmployeeByUsernameOrEmail(email: string): Promise<Employee | null>;
    getEmployees(): Promise<Employee[]>;
    getEmployeeById(id: Types.ObjectId | string): Promise<Employee>;
    getTeamsByEmployeeId(employeeId: string): Promise<Team[]>;
    getProjectsByEmployeeId(employeeId: string): Promise<Project[]>;
    updateEmployee(employee_id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee>;
    deleteEmployee(id: string): Promise<Employee>;
    getEmployeeProfileFromToken(email: string): Promise<Employee>;
    removeTeamFromEmployee(employeeId: string, teamId: string): Promise<Employee>;
    getEmployeesByTeamId(teamId: string): Promise<Employee[]>;
}
export declare abstract class BaseEmployeeDecorator implements IEmployeeService {
    protected readonly employeeService: IEmployeeService;
    constructor(employeeService: IEmployeeService);
    createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee>;
    getEmployeeByUsernameOrEmail(email: string): Promise<Employee | null>;
    getEmployees(): Promise<Employee[]>;
    getEmployeeById(id: Types.ObjectId | string): Promise<Employee>;
    getTeamsByEmployeeId(employeeId: string): Promise<Team[]>;
    getProjectsByEmployeeId(employeeId: string): Promise<Project[]>;
    updateEmployee(employee_id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee>;
    deleteEmployee(id: string): Promise<Employee>;
    getEmployeeProfileFromToken(email: string): Promise<Employee>;
    removeTeamFromEmployee(employeeId: string, teamId: string): Promise<Employee>;
    getEmployeesByTeamId(teamId: string): Promise<Employee[]>;
}
