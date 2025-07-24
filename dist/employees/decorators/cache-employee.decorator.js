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
exports.CacheEmployeeDecorator = void 0;
const common_1 = require("@nestjs/common");
const base_employee_decorator_1 = require("./base-employee.decorator");
let CacheEmployeeDecorator = class CacheEmployeeDecorator extends base_employee_decorator_1.BaseEmployeeDecorator {
    constructor(employeeService) {
        super(employeeService);
        this.cache = new Map();
    }
    async getEmployees() {
        const cacheKey = 'all_employees';
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        const employees = await super.getEmployees();
        this.cache.set(cacheKey, employees);
        return employees;
    }
    async getEmployeeById(id) {
        const cacheKey = `employee_${id}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        const employee = await super.getEmployeeById(id);
        this.cache.set(cacheKey, employee);
        return employee;
    }
    async createEmployee(createEmployeeDto) {
        const result = await super.createEmployee(createEmployeeDto);
        this.cache.clear();
        return result;
    }
    async updateEmployee(employee_id, updateEmployeeDto) {
        const result = await super.updateEmployee(employee_id, updateEmployeeDto);
        this.cache.clear();
        return result;
    }
    async deleteEmployee(id) {
        const result = await super.deleteEmployee(id);
        this.cache.clear();
        return result;
    }
};
exports.CacheEmployeeDecorator = CacheEmployeeDecorator;
exports.CacheEmployeeDecorator = CacheEmployeeDecorator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], CacheEmployeeDecorator);
//# sourceMappingURL=cache-employee.decorator.js.map