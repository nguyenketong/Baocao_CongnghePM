"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginateProjectCommand = exports.SortProjectCommand = exports.FilterProjectCommand = exports.DeleteProjectCommand = void 0;
// commands/projectCommands.ts
var DeleteProjectCommand = /** @class */ (function () {
    function DeleteProjectCommand(id, executeCallback) {
        this.id = id;
        this.executeCallback = executeCallback;
    }
    DeleteProjectCommand.prototype.execute = function () {
        var _this = this;
        fetch("http://localhost:3000/projects/".concat(this.id), { method: 'DELETE' })
            .then(function () { return _this.executeCallback(); })
            .catch(function (error) { return console.error('Lỗi khi xóa dự án:', error); });
    };
    return DeleteProjectCommand;
}());
exports.DeleteProjectCommand = DeleteProjectCommand;
var FilterProjectCommand = /** @class */ (function () {
    function FilterProjectCommand(projects, filterText) {
        this.projects = projects;
        this.filterText = filterText;
    }
    FilterProjectCommand.prototype.execute = function () {
        var _this = this;
        return this.projects.filter(function (project) {
            return project.projectName.toLowerCase().includes(_this.filterText.toLowerCase());
        });
    };
    return FilterProjectCommand;
}());
exports.FilterProjectCommand = FilterProjectCommand;
var SortProjectCommand = /** @class */ (function () {
    function SortProjectCommand(projects, sortBy) {
        this.projects = projects;
        this.sortBy = sortBy;
    }
    SortProjectCommand.prototype.execute = function () {
        var _this = this;
        return this.projects.sort(function (a, b) {
            if (_this.sortBy === 'projectName') {
                return a.projectName.localeCompare(b.projectName);
            }
            else {
                return new Date(a.projectStart).getTime() - new Date(b.projectStart).getTime();
            }
        });
    };
    return SortProjectCommand;
}());
exports.SortProjectCommand = SortProjectCommand;
var PaginateProjectCommand = /** @class */ (function () {
    function PaginateProjectCommand(projects, page, pageSize) {
        this.projects = projects;
        this.page = page;
        this.pageSize = pageSize;
    }
    PaginateProjectCommand.prototype.execute = function () {
        var startIndex = (this.page - 1) * this.pageSize;
        return this.projects.slice(startIndex, startIndex + this.pageSize);
    };
    return PaginateProjectCommand;
}());
exports.PaginateProjectCommand = PaginateProjectCommand;
