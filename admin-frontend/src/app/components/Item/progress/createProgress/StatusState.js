"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusContext = exports.Completed = exports.InProgress = exports.NotStarted = void 0;
var NotStarted = /** @class */ (function () {
    function NotStarted() {
    }
    NotStarted.prototype.getLabel = function () {
        return 'Needs Review';
    };
    return NotStarted;
}());
exports.NotStarted = NotStarted;
var InProgress = /** @class */ (function () {
    function InProgress() {
    }
    InProgress.prototype.getLabel = function () {
        return 'In Progress';
    };
    return InProgress;
}());
exports.InProgress = InProgress;
var Completed = /** @class */ (function () {
    function Completed() {
    }
    Completed.prototype.getLabel = function () {
        return 'Completed';
    };
    return Completed;
}());
exports.Completed = Completed;
var StatusContext = /** @class */ (function () {
    function StatusContext(initialState) {
        this.state = initialState;
    }
    StatusContext.prototype.setState = function (state) {
        this.state = state;
    };
    StatusContext.prototype.getLabel = function () {
        return this.state.getLabel();
    };
    return StatusContext;
}());
exports.StatusContext = StatusContext;
