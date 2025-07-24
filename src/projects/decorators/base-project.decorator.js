"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseProjectDecorator = void 0;
// Base decorator class
var BaseProjectDecorator = /** @class */ (function () {
    function BaseProjectDecorator(projectService) {
        this.projectService = projectService;
    }
    BaseProjectDecorator.prototype.createProject = function (createProjectDto) {
        return this.projectService.createProject(createProjectDto);
    };
    BaseProjectDecorator.prototype.getAllProjects = function () {
        return this.projectService.getAllProjects();
    };
    BaseProjectDecorator.prototype.getProjectById = function (id) {
        return this.projectService.getProjectById(id);
    };
    BaseProjectDecorator.prototype.updateProject = function (id, updateProjectDto) {
        return this.projectService.updateProject(id, updateProjectDto);
    };
    BaseProjectDecorator.prototype.deleteProject = function (id) {
        return this.projectService.deleteProject(id);
    };
    return BaseProjectDecorator;
}());
exports.BaseProjectDecorator = BaseProjectDecorator;
