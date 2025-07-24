import { BadRequestException, Injectable } from '@nestjs/common';
import { Employee } from 'src/schemas/Employee.schema';
import { CreateEmployeeDto } from '../dto/CreateEmployee.dto';
import { UpdateEmployeeDto } from '../dto/UpdateEmployee.dto';
import { BaseEmployeeDecorator, IEmployeeService } from './base-employee.decorator';

@Injectable()
export class ValidationEmployeeDecorator extends BaseEmployeeDecorator {
    constructor(employeeService: IEmployeeService) {
        super(employeeService);
    }

    async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        this.validateEmployeeData(createEmployeeDto);
        return super.createEmployee(createEmployeeDto);
    }

    async updateEmployee(employee_id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
        this.validateEmployeeData(updateEmployeeDto);
        return super.updateEmployee(employee_id, updateEmployeeDto);
    }

    private validateEmployeeData(employeeDto: CreateEmployeeDto | UpdateEmployeeDto): void {
        if (employeeDto.employeeName && employeeDto.employeeName.length < 3) {
            throw new BadRequestException('Tên nhân viên phải có ít nhất 3 ký tự');
        }
    }
}
