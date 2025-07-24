"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEmployeeDecorator = void 0;
// Base decorator class
var BaseEmployeeDecorator = /** @class */ (function () {
    function BaseEmployeeDecorator(employeeService) {
        this.employeeService = employeeService;
    }
    BaseEmployeeDecorator.prototype.createEmployee = function (createEmployeeDto) {
        return this.employeeService.createEmployee(createEmployeeDto);
    };
    BaseEmployeeDecorator.prototype.getEmployeeByUsernameOrEmail = function (email) {
        return this.employeeService.getEmployeeByUsernameOrEmail(email);
    };
    BaseEmployeeDecorator.prototype.getEmployees = function () {
        return this.employeeService.getEmployees();
    };
    BaseEmployeeDecorator.prototype.getEmployeeById = function (id) {
        return this.employeeService.getEmployeeById(id);
    };
    BaseEmployeeDecorator.prototype.getTeamsByEmployeeId = function (employeeId) {
        return this.employeeService.getTeamsByEmployeeId(employeeId);
    };
    BaseEmployeeDecorator.prototype.getProjectsByEmployeeId = function (employeeId) {
        return this.employeeService.getProjectsByEmployeeId(employeeId);
    };
    BaseEmployeeDecorator.prototype.updateEmployee = function (employee_id, updateEmployeeDto) {
        return this.employeeService.updateEmployee(employee_id, updateEmployeeDto);
    };
    BaseEmployeeDecorator.prototype.deleteEmployee = function (id) {
        return this.employeeService.deleteEmployee(id);
    };
    BaseEmployeeDecorator.prototype.getEmployeeProfileFromToken = function (email) {
        return this.employeeService.getEmployeeProfileFromToken(email);
    };
    BaseEmployeeDecorator.prototype.removeTeamFromEmployee = function (employeeId, teamId) {
        return this.employeeService.removeTeamFromEmployee(employeeId, teamId);
    };
    BaseEmployeeDecorator.prototype.getEmployeesByTeamId = function (teamId) {
        return this.employeeService.getEmployeesByTeamId(teamId);
    };
    return BaseEmployeeDecorator;
}());
exports.BaseEmployeeDecorator = BaseEmployeeDecorator;
