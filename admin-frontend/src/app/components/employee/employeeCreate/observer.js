"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeObserver = exports.EmployeeObserver = void 0;
var EmployeeObserver = /** @class */ (function () {
    function EmployeeObserver() {
        this.observers = [];
    }
    EmployeeObserver.prototype.subscribe = function (observer) {
        this.observers.push(observer);
    };
    EmployeeObserver.prototype.notify = function () {
        this.observers.forEach(function (observer) { return observer(); });
    };
    return EmployeeObserver;
}());
exports.EmployeeObserver = EmployeeObserver;
exports.employeeObserver = new EmployeeObserver();
