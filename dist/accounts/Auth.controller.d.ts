import { AuthService } from './Auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        employee: import("../schemas/Employee.schema").Employee;
    }>;
}
