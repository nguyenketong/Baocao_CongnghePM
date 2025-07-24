"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const employees_service_1 = require("../employees/employees.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(employeeService, jwtService) {
        this.employeeService = employeeService;
        this.jwtService = jwtService;
    }
    async validateUser(loginDto) {
        console.log("Đăng nhập với:", loginDto);
        const user = await this.employeeService.getEmployeeByUsernameOrEmail(loginDto.email);
        console.log("📌 Dữ liệu từ DB:", user);
        if (!user || !user.account || typeof user.account !== 'object' || !('password' in user.account)) {
            throw new common_1.UnauthorizedException('Thông tin đăng nhập không hợp lệ');
        }
        if (user.account.password !== loginDto.password) {
            throw new common_1.UnauthorizedException('Mật khẩu không chính xác');
        }
        const token = this.jwtService.sign({ id: user._id });
        console.log("✅ Đăng nhập thành công, tạo token:", token);
        return { token, employee: user };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employees_service_1.EmployeeService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=Auth.service.js.map