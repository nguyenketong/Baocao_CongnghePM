import { Injectable } from '@nestjs/common';
import { Employee } from 'src/schemas/Employee.schema';
import { CreateEmployeeDto } from '../dto/CreateEmployee.dto';
import { UpdateEmployeeDto } from '../dto/UpdateEmployee.dto';
import { BaseEmployeeDecorator, IEmployeeService } from './base-employee.decorator';

@Injectable()
export class CacheEmployeeDecorator extends BaseEmployeeDecorator {
    private cache: Map<string, any> = new Map();

    constructor(employeeService: IEmployeeService) {
        super(employeeService);
    }

    async getEmployees(): Promise<Employee[]> {
        const cacheKey = 'all_employees';
        if (this.cache.has(cacheKey)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return this.cache.get(cacheKey);
        }

        const employees = await super.getEmployees();
        this.cache.set(cacheKey, employees);
        return employees;
    }

    async getEmployeeById(id: string): Promise<Employee> {
        const cacheKey = `employee_${id}`;
        if (this.cache.has(cacheKey)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return this.cache.get(cacheKey);
        }

        const employee = await super.getEmployeeById(id);
        this.cache.set(cacheKey, employee);
        return employee;
    }

    async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        const result = await super.createEmployee(createEmployeeDto);
        this.cache.clear(); // Clear cache when data changes
        return result;
    }

    async updateEmployee(employee_id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
        const result = await super.updateEmployee(employee_id, updateEmployeeDto);
        this.cache.clear(); // Clear cache when data changes
        return result;
    }

    async deleteEmployee(id: string): Promise<Employee> {
        const result = await super.deleteEmployee(id);
        this.cache.clear(); // Clear cache when data changes
        return result;
    }
}
