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
var LoggingEmployeeDecorator_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingEmployeeDecorator = void 0;
const common_1 = require("@nestjs/common");
const base_employee_decorator_1 = require("./base-employee.decorator");
let LoggingEmployeeDecorator = LoggingEmployeeDecorator_1 = class LoggingEmployeeDecorator extends base_employee_decorator_1.BaseEmployeeDecorator {
    constructor(employeeService) {
        super(employeeService);
        this.logger = new common_1.Logger(LoggingEmployeeDecorator_1.name);
    }
    async createEmployee(createEmployeeDto) {
        this.logger.log(`Creating employee with name: ${createEmployeeDto.employeeName}`);
        const result = await super.createEmployee(createEmployeeDto);
        this.logger.log(`Employee created successfully with ID: ${result._id}`);
        return result;
    }
    async deleteEmployee(id) {
        this.logger.log(`Attempting to delete employee with ID: ${id}`);
        const result = await super.deleteEmployee(id);
        this.logger.log(`Employee deleted successfully: ${id}`);
        return result;
    }
    async updateEmployee(employee_id, updateEmployeeDto) {
        this.logger.log(`Updating employee with ID: ${employee_id}`);
        const result = await super.updateEmployee(employee_id, updateEmployeeDto);
        this.logger.log(`Employee updated successfully: ${employee_id}`);
        return result;
    }
};
exports.LoggingEmployeeDecorator = LoggingEmployeeDecorator;
exports.LoggingEmployeeDecorator = LoggingEmployeeDecorator = LoggingEmployeeDecorator_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], LoggingEmployeeDecorator);
//# sourceMappingURL=logging-employee.decorator.js.map