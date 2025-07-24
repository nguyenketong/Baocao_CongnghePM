import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { EmployeeService } from '../employees/employees.service'; // Giả sử bạn có một service để lấy thông tin người dùng
import { JwtService } from '@nestjs/jwt';
import { Employee } from 'src/schemas/Employee.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<{ token: string; employee: Employee }> {
    console.log("Đăng nhập với:", loginDto);

    const user = await this.employeeService.getEmployeeByUsernameOrEmail(loginDto.email);
    console.log("📌 Dữ liệu từ DB:", user);

    // Kiểm tra nếu user không tồn tại hoặc không có tài khoản
    if (!user || !user.account || typeof user.account !== 'object' || !('password' in user.account)) {
        throw new UnauthorizedException('Thông tin đăng nhập không hợp lệ');
    }

    // Kiểm tra mật khẩu
    if (user.account.password !== loginDto.password) {
        throw new UnauthorizedException('Mật khẩu không chính xác');
    }

    const token = this.jwtService.sign({ id: user._id });

    console.log("✅ Đăng nhập thành công, tạo token:", token);
    return { token, employee: user }; // Trả về cả token và thông tin nhân viên
}



}