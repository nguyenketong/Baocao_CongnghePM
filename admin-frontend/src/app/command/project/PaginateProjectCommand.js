"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginateProjectCommand = void 0;
var PaginateProjectCommand = /** @class */ (function () {
    function PaginateProjectCommand(projects, page, pageSize) {
        this.projects = projects;
        this.page = page;
        this.pageSize = pageSize;
    }
    PaginateProjectCommand.prototype.execute = function () {
        var start = (this.page - 1) * this.pageSize;
        return this.projects.slice(start, start + this.pageSize);
    };
    return PaginateProjectCommand;
}());
exports.PaginateProjectCommand = PaginateProjectCommand;
