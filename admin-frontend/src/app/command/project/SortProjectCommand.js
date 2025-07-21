"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortProjectCommand = void 0;
var SortProjectCommand = /** @class */ (function () {
    function SortProjectCommand(projects, sortBy) {
        this.projects = projects;
        this.sortBy = sortBy;
    }
    SortProjectCommand.prototype.execute = function () {
        var _this = this;
        return __spreadArray([], this.projects, true).sort(function (a, b) {
            if (_this.sortBy === 'projectName') {
                return a.projectName.localeCompare(b.projectName);
            }
            return new Date(a.projectStart).getTime() - new Date(b.projectStart).getTime();
        });
    };
    return SortProjectCommand;
}());
exports.SortProjectCommand = SortProjectCommand;
