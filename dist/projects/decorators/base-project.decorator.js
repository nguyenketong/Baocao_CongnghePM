"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseProjectDecorator = void 0;
class BaseProjectDecorator {
    constructor(projectService) {
        this.projectService = projectService;
    }
    createProject(createProjectDto) {
        return this.projectService.createProject(createProjectDto);
    }
    getAllProjects() {
        return this.projectService.getAllProjects();
    }
    getProjectById(id) {
        return this.projectService.getProjectById(id);
    }
    updateProject(id, updateProjectDto) {
        return this.projectService.updateProject(id, updateProjectDto);
    }
    deleteProject(id) {
        return this.projectService.deleteProject(id);
    }
}
exports.BaseProjectDecorator = BaseProjectDecorator;
//# sourceMappingURL=base-project.decorator.js.map