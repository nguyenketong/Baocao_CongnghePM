import { Employee } from 'src/schemas/Employee.schema';
import { CreateEmployeeDto } from '../dto/CreateEmployee.dto';
import { UpdateEmployeeDto } from '../dto/UpdateEmployee.dto';
import { Types } from 'mongoose';
import { Team } from 'src/schemas/Team.schema';
import { Project } from 'src/schemas/Project.schema';

// Interface định nghĩa các phương thức cơ bản của EmployeeService
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

// Base decorator class
export abstract class BaseEmployeeDecorator implements IEmployeeService {
    constructor(protected readonly employeeService: IEmployeeService) { }

    createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        return this.employeeService.createEmployee(createEmployeeDto);
    }

    getEmployeeByUsernameOrEmail(email: string): Promise<Employee | null> {
        return this.employeeService.getEmployeeByUsernameOrEmail(email);
    }

    getEmployees(): Promise<Employee[]> {
        return this.employeeService.getEmployees();
    }

    getEmployeeById(id: Types.ObjectId | string): Promise<Employee> {
        return this.employeeService.getEmployeeById(id);
    }

    getTeamsByEmployeeId(employeeId: string): Promise<Team[]> {
        return this.employeeService.getTeamsByEmployeeId(employeeId);
    }

    getProjectsByEmployeeId(employeeId: string): Promise<Project[]> {
        return this.employeeService.getProjectsByEmployeeId(employeeId);
    }

    updateEmployee(employee_id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
        return this.employeeService.updateEmployee(employee_id, updateEmployeeDto);
    }

    deleteEmployee(id: string): Promise<Employee> {
        return this.employeeService.deleteEmployee(id);
    }

    getEmployeeProfileFromToken(email: string): Promise<Employee> {
        return this.employeeService.getEmployeeProfileFromToken(email);
    }

    removeTeamFromEmployee(employeeId: string, teamId: string): Promise<Employee> {
        return this.employeeService.removeTeamFromEmployee(employeeId, teamId);
    }

    getEmployeesByTeamId(teamId: string): Promise<Employee[]> {
        return this.employeeService.getEmployeesByTeamId(teamId);
    }
}
