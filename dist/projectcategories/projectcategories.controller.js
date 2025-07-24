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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectCategoryController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = __importDefault(require("mongoose"));
const projectCategories_service_1 = require("./projectCategories.service");
const CreateProjectCategory_dto_1 = require("./dto/CreateProjectCategory.dto");
const UpdateProjectCategory_dto_1 = require("./dto/UpdateProjectCategory.dto");
let ProjectCategoryController = class ProjectCategoryController {
    constructor(projectCategoryService) {
        this.projectCategoryService = projectCategoryService;
    }
    async create(createProjectCategoryDto) {
        return this.projectCategoryService.create(createProjectCategoryDto);
    }
    async getProjectCategory() {
        return this.projectCategoryService.getProjectCategory();
    }
    async getProjectCategoryById(id) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('ProjectCategory not found', 404);
        const findProjectCategory = await this.projectCategoryService.getProjectCategoryById(id);
        if (!findProjectCategory)
            throw new common_1.HttpException('ProjectCategory not found', 404);
        return findProjectCategory;
    }
    async updateProjectCategory(id, updateProjectCategoryDto) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('Invalid ID', 404);
        const updateProjectCategory = await this.projectCategoryService.updateProjectCategory(id, updateProjectCategoryDto);
        if (!updateProjectCategory)
            throw new common_1.HttpException('User not found', 404);
        return updateProjectCategory;
    }
    async deleteProjectCategory(id) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('Invalid Id', 404);
        const deleteProjectCategory = await this.projectCategoryService.deleteProjectCategory(id);
        if (!deleteProjectCategory)
            throw new common_1.HttpException('User not found', 404);
        return deleteProjectCategory;
    }
};
exports.ProjectCategoryController = ProjectCategoryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateProjectCategory_dto_1.CreateProjectCategoryDto]),
    __metadata("design:returntype", Promise)
], ProjectCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectCategoryController.prototype, "getProjectCategory", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectCategoryController.prototype, "getProjectCategoryById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateProjectCategory_dto_1.UpdateProjectCategoryDto]),
    __metadata("design:returntype", Promise)
], ProjectCategoryController.prototype, "updateProjectCategory", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectCategoryController.prototype, "deleteProjectCategory", null);
exports.ProjectCategoryController = ProjectCategoryController = __decorate([
    (0, common_1.Controller)('projectcategories'),
    __metadata("design:paramtypes", [projectCategories_service_1.ProjectCategoryService])
], ProjectCategoryController);
//# sourceMappingURL=projectcategories.controller.js.map