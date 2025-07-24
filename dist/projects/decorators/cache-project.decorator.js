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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheProjectDecorator = void 0;
const common_1 = require("@nestjs/common");
const base_project_decorator_1 = require("./base-project.decorator");
let CacheProjectDecorator = class CacheProjectDecorator extends base_project_decorator_1.BaseProjectDecorator {
    constructor(projectService) {
        super(projectService);
        this.cache = new Map();
    }
    async getAllProjects() {
        const cacheKey = 'all_projects';
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        const projects = await super.getAllProjects();
        this.cache.set(cacheKey, projects);
        return projects;
    }
    async getProjectById(id) {
        const cacheKey = `project_${id.toString()}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        const project = await super.getProjectById(id);
        this.cache.set(cacheKey, project);
        return project;
    }
    async createProject(createProjectDto) {
        const result = await super.createProject(createProjectDto);
        this.cache.clear();
        return result;
    }
    async updateProject(id, updateProjectDto) {
        const result = await super.updateProject(id, updateProjectDto);
        this.cache.clear();
        return result;
    }
    async deleteProject(id) {
        const result = await super.deleteProject(id);
        this.cache.clear();
        return result;
    }
};
exports.CacheProjectDecorator = CacheProjectDecorator;
exports.CacheProjectDecorator = CacheProjectDecorator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], CacheProjectDecorator);
//# sourceMappingURL=cache-project.decorator.js.map