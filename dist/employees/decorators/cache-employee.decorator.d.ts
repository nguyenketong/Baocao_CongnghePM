import { Employee } from 'src/schemas/Employee.schema';
import { CreateEmployeeDto } from '../dto/CreateEmployee.dto';
import { UpdateEmployeeDto } from '../dto/UpdateEmployee.dto';
import { BaseEmployeeDecorator, IEmployeeService } from './base-employee.decorator';
export declare class CacheEmployeeDecorator extends BaseEmployeeDecorator {
    private cache;
    constructor(employeeService: IEmployeeService);
    getEmployees(): Promise<Employee[]>;
    getEmployeeById(id: string): Promise<Employee>;
    createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee>;
    updateEmployee(employee_id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee>;
    deleteEmployee(id: string): Promise<Employee>;
}
