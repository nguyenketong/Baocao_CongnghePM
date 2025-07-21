"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterProjectCommand = void 0;
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
