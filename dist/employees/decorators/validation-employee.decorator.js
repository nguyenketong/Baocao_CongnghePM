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
exports.ValidationEmployeeDecorator = void 0;
const common_1 = require("@nestjs/common");
const base_employee_decorator_1 = require("./base-employee.decorator");
let ValidationEmployeeDecorator = class ValidationEmployeeDecorator extends base_employee_decorator_1.BaseEmployeeDecorator {
    constructor(employeeService) {
        super(employeeService);
    }
    async createEmployee(createEmployeeDto) {
        this.validateEmployeeData(createEmployeeDto);
        return super.createEmployee(createEmployeeDto);
    }
    async updateEmployee(employee_id, updateEmployeeDto) {
        this.validateEmployeeData(updateEmployeeDto);
        return super.updateEmployee(employee_id, updateEmployeeDto);
    }
    validateEmployeeData(employeeDto) {
        if (employeeDto.employeeName && employeeDto.employeeName.length < 3) {
            throw new common_1.BadRequestException('Tên nhân viên phải có ít nhất 3 ký tự');
        }
    }
};
exports.ValidationEmployeeDecorator = ValidationEmployeeDecorator;
exports.ValidationEmployeeDecorator = ValidationEmployeeDecorator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], ValidationEmployeeDecorator);
//# sourceMappingURL=validation-employee.decorator.js.map