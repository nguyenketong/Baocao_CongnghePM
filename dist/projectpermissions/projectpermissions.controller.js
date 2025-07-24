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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectPermissionsController = void 0;
const common_1 = require("@nestjs/common");
const CreateProjectPermission_dto_1 = require("./dto/CreateProjectPermission.dto");
const projectpermissions_service_1 = require("./projectpermissions.service");
const UpdateProjectPermission_dto_1 = require("./dto/UpdateProjectPermission.dto");
let ProjectPermissionsController = class ProjectPermissionsController {
    constructor(projectpermissionService) {
        this.projectpermissionService = projectpermissionService;
    }
    async createProjectPermission(createProjectPermissionDto) {
        const newProjectPermission = await this.projectpermissionService.createProjectPermission(createProjectPermissionDto);
        return { success: true, data: newProjectPermission };
    }
    async getAll() {
        return this.projectpermissionService.getAll();
    }
    async getByEmployee(id) {
        return this.projectpermissionService.getByEmployee(id);
    }
    async update(id, updateProjectPermissionDto) {
        return this.projectpermissionService.update(id, updateProjectPermissionDto);
    }
    async delete(id) {
        return this.projectpermissionService.delete(id);
    }
};
exports.ProjectPermissionsController = ProjectPermissionsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateProjectPermission_dto_1.CreateProjectPermissionsDto]),
    __metadata("design:returntype", Promise)
], ProjectPermissionsController.prototype, "createProjectPermission", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectPermissionsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectPermissionsController.prototype, "getByEmployee", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateProjectPermission_dto_1.UpdateProjectPermissionsDto]),
    __metadata("design:returntype", Promise)
], ProjectPermissionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectPermissionsController.prototype, "delete", null);
exports.ProjectPermissionsController = ProjectPermissionsController = __decorate([
    (0, common_1.Controller)('projectpermissions'),
    __metadata("design:paramtypes", [projectpermissions_service_1.ProjectPermissionsService])
], ProjectPermissionsController);
//# sourceMappingURL=projectpermissions.controller.js.map