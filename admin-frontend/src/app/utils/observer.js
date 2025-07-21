"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamObserver = void 0;
var TeamObserver = /** @class */ (function () {
    function TeamObserver() {
        this.observers = [];
    }
    TeamObserver.prototype.subscribe = function (observer) {
        this.observers.push(observer);
    };
    TeamObserver.prototype.unsubscribe = function (observer) {
        this.observers = this.observers.filter(function (obs) { return obs !== observer; });
    };
    TeamObserver.prototype.notify = function (data) {
        this.observers.forEach(function (observer) { return observer(data); });
    };
    return TeamObserver;
}());
exports.teamObserver = new TeamObserver();
