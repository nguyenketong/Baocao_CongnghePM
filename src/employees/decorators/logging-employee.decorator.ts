import { Injectable, Logger } from '@nestjs/common';
import { Employee } from 'src/schemas/Employee.schema';
import { CreateEmployeeDto } from '../dto/CreateEmployee.dto';
import { UpdateEmployeeDto } from '../dto/UpdateEmployee.dto';
import { BaseEmployeeDecorator, IEmployeeService } from './base-employee.decorator';

@Injectable()
export class LoggingEmployeeDecorator extends BaseEmployeeDecorator {
    private readonly logger = new Logger(LoggingEmployeeDecorator.name);

    constructor(employeeService: IEmployeeService) {
        super(employeeService);
    }

    async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        this.logger.log(`Creating employee with name: ${createEmployeeDto.employeeName}`);
        const result = await super.createEmployee(createEmployeeDto);
        this.logger.log(`Employee created successfully with ID: ${result._id}`);
        return result;
    }

    async deleteEmployee(id: string): Promise<Employee> {
        this.logger.log(`Attempting to delete employee with ID: ${id}`);
        const result = await super.deleteEmployee(id);
        this.logger.log(`Employee deleted successfully: ${id}`);
        return result;
    }

    async updateEmployee(employee_id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
        this.logger.log(`Updating employee with ID: ${employee_id}`);
        const result = await super.updateEmployee(employee_id, updateEmployeeDto);
        this.logger.log(`Employee updated successfully: ${employee_id}`);
        return result;
    }
}
