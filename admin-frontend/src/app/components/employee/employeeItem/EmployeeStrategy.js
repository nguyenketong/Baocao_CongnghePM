"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeContext = exports.LeadEmployeeStrategy = exports.DefaultEmployeeStrategy = void 0;
var DefaultEmployeeStrategy = /** @class */ (function () {
    function DefaultEmployeeStrategy() {
    }
    DefaultEmployeeStrategy.prototype.process = function (employee) {
        var _a;
        return " ".concat(((_a = employee.designation_id) === null || _a === void 0 ? void 0 : _a.designationName) || "Chưa có chức vụ");
    };
    return DefaultEmployeeStrategy;
}());
exports.DefaultEmployeeStrategy = DefaultEmployeeStrategy;
var LeadEmployeeStrategy = /** @class */ (function () {
    function LeadEmployeeStrategy() {
    }
    LeadEmployeeStrategy.prototype.process = function (employee) {
        var _a;
        return "\uD83D\uDE80 ".concat((_a = employee.designation_id) === null || _a === void 0 ? void 0 : _a.designationName);
    };
    return LeadEmployeeStrategy;
}());
exports.LeadEmployeeStrategy = LeadEmployeeStrategy;
var EmployeeContext = /** @class */ (function () {
    function EmployeeContext(strategy) {
        this.strategy = strategy;
    }
    EmployeeContext.prototype.setStrategy = function (strategy) {
        this.strategy = strategy;
    };
    EmployeeContext.prototype.executeStrategy = function (employee) {
        return this.strategy.process(employee);
    };
    return EmployeeContext;
}());
exports.EmployeeContext = EmployeeContext;
