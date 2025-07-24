"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEmployeeDecorator = void 0;
class BaseEmployeeDecorator {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    createEmployee(createEmployeeDto) {
        return this.employeeService.createEmployee(createEmployeeDto);
    }
    getEmployeeByUsernameOrEmail(email) {
        return this.employeeService.getEmployeeByUsernameOrEmail(email);
    }
    getEmployees() {
        return this.employeeService.getEmployees();
    }
    getEmployeeById(id) {
        return this.employeeService.getEmployeeById(id);
    }
    getTeamsByEmployeeId(employeeId) {
        return this.employeeService.getTeamsByEmployeeId(employeeId);
    }
    getProjectsByEmployeeId(employeeId) {
        return this.employeeService.getProjectsByEmployeeId(employeeId);
    }
    updateEmployee(employee_id, updateEmployeeDto) {
        return this.employeeService.updateEmployee(employee_id, updateEmployeeDto);
    }
    deleteEmployee(id) {
        return this.employeeService.deleteEmployee(id);
    }
    getEmployeeProfileFromToken(email) {
        return this.employeeService.getEmployeeProfileFromToken(email);
    }
    removeTeamFromEmployee(employeeId, teamId) {
        return this.employeeService.removeTeamFromEmployee(employeeId, teamId);
    }
    getEmployeesByTeamId(teamId) {
        return this.employeeService.getEmployeesByTeamId(teamId);
    }
}
exports.BaseEmployeeDecorator = BaseEmployeeDecorator;
//# sourceMappingURL=base-employee.decorator.js.map