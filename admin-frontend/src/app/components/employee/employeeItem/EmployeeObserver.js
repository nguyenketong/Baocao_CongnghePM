"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/observers/EmployeeObserver.ts
var EmployeeObserver = /** @class */ (function () {
    function EmployeeObserver() {
        this.listeners = [];
    }
    EmployeeObserver.getInstance = function () {
        if (!EmployeeObserver.instance) {
            EmployeeObserver.instance = new EmployeeObserver();
        }
        return EmployeeObserver.instance;
    };
    EmployeeObserver.prototype.subscribe = function (listener) {
        this.listeners.push(listener);
    };
    EmployeeObserver.prototype.unsubscribe = function (listener) {
        this.listeners = this.listeners.filter(function (l) { return l !== listener; });
    };
    EmployeeObserver.prototype.notify = function () {
        this.listeners.forEach(function (listener) { return listener(); });
    };
    return EmployeeObserver;
}());
exports.default = EmployeeObserver;
