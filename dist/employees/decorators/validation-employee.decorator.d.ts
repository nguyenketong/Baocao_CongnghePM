import { Employee } from 'src/schemas/Employee.schema';
import { CreateEmployeeDto } from '../dto/CreateEmployee.dto';
import { UpdateEmployeeDto } from '../dto/UpdateEmployee.dto';
import { BaseEmployeeDecorator, IEmployeeService } from './base-employee.decorator';
export declare class ValidationEmployeeDecorator extends BaseEmployeeDecorator {
    constructor(employeeService: IEmployeeService);
    createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee>;
    updateEmployee(employee_id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee>;
    private validateEmployeeData;
}
