"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LoggingProjectDecorator_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingProjectDecorator = void 0;
const common_1 = require("@nestjs/common");
const base_project_decorator_1 = require("./base-project.decorator");
let LoggingProjectDecorator = LoggingProjectDecorator_1 = class LoggingProjectDecorator extends base_project_decorator_1.BaseProjectDecorator {
    constructor(projectService) {
        super(projectService);
        this.logger = new common_1.Logger(LoggingProjectDecorator_1.name);
    }
    async createProject(createProjectDto) {
        this.logger.log(`Creating project with name: ${createProjectDto.projectName}`);
        const result = await super.createProject(createProjectDto);
        this.logger.log(`Project created successfully with ID: ${result._id}`);
        return result;
    }
    async deleteProject(id) {
        this.logger.log(`Attempting to delete project with ID: ${id}`);
        const result = await super.deleteProject(id);
        this.logger.log(`Project deleted successfully: ${id}`);
        return result;
    }
    async updateProject(id, updateProjectDto) {
        this.logger.log(`Updating project with ID: ${id}`);
        const result = await super.updateProject(id, updateProjectDto);
        this.logger.log(`Project updated successfully: ${id}`);
        return result;
    }
};
exports.LoggingProjectDecorator = LoggingProjectDecorator;
exports.LoggingProjectDecorator = LoggingProjectDecorator = LoggingProjectDecorator_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], LoggingProjectDecorator);
//# sourceMappingURL=logging-project.decorator.js.map