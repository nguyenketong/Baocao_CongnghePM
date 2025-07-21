"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSubject = void 0;
var EmployeeSubject = /** @class */ (function () {
    function EmployeeSubject() {
        this.observers = [];
    }
    EmployeeSubject.prototype.addObserver = function (observer) {
        this.observers.push(observer);
    };
    EmployeeSubject.prototype.removeObserver = function (observer) {
        this.observers = this.observers.filter(function (obs) { return obs !== observer; });
    };
    EmployeeSubject.prototype.notifyObservers = function (employeeId) {
        this.observers.forEach(function (observer) { return observer.update(employeeId); });
    };
    return EmployeeSubject;
}());
exports.EmployeeSubject = EmployeeSubject;
