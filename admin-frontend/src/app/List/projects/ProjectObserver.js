"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectObserver = void 0;
var ProjectObserver = /** @class */ (function () {
    function ProjectObserver() {
        this.listeners = [];
    }
    ProjectObserver.prototype.subscribe = function (listener) {
        this.listeners.push(listener);
    };
    ProjectObserver.prototype.unsubscribe = function (listener) {
        this.listeners = this.listeners.filter(function (l) { return l !== listener; });
    };
    ProjectObserver.prototype.notify = function () {
        this.listeners.forEach(function (listener) { return listener(); });
    };
    return ProjectObserver;
}());
exports.ProjectObserver = ProjectObserver;
