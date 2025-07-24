import { LoginDto } from './dto/login.dto';
import { EmployeeService } from '../employees/employees.service';
import { JwtService } from '@nestjs/jwt';
import { Employee } from 'src/schemas/Employee.schema';
export declare class AuthService {
    private readonly employeeService;
    private readonly jwtService;
    constructor(employeeService: EmployeeService, jwtService: JwtService);
    validateUser(loginDto: LoginDto): Promise<{
        token: string;
        employee: Employee;
    }>;
}
