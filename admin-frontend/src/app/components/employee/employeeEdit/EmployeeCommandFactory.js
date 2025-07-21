"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeCommandFactory = void 0;
var UpdateEmployeeCommand_1 = require("../../command/employee/UpdateEmployeeCommand");
var EmployeeObserver_1 = require("./EmployeeObserver"); // Import Observer
var EmployeeCommandFactory = /** @class */ (function () {
    function EmployeeCommandFactory() {
    }
    EmployeeCommandFactory.createUpdateCommand = function (employeeId, data, file, setIsSubmitting, onClose) {
        var observerSubject = new EmployeeObserver_1.EmployeeSubject(); // Thêm observerSubject
        return new UpdateEmployeeCommand_1.UpdateEmployeeCommand(employeeId, data, file, setIsSubmitting, onClose, observerSubject);
    };
    return EmployeeCommandFactory;
}());
exports.EmployeeCommandFactory = EmployeeCommandFactory;
