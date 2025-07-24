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
exports.ProjectCategoryService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("mongoose");
const ProjectCategory_schema_1 = require("../schemas/ProjectCategory.schema");
let ProjectCategoryService = class ProjectCategoryService {
    constructor(projectCategoryModel) {
        this.projectCategoryModel = projectCategoryModel;
    }
    async create(createProjectCategoryDto) {
        const createProjectCategory = new this.projectCategoryModel(createProjectCategoryDto);
        return createProjectCategory.save();
    }
    async getProjectCategory() {
        return this.projectCategoryModel.find();
    }
    async getProjectCategoryById(id) {
        return this.projectCategoryModel.findById(id);
    }
    async updateProjectCategory(id, updateProjectCategoryDto) {
        return this.projectCategoryModel.findByIdAndUpdate(id, updateProjectCategoryDto, { new: true });
    }
    async deleteProjectCategory(id) {
        return this.projectCategoryModel.findByIdAndDelete(id);
    }
};
exports.ProjectCategoryService = ProjectCategoryService;
exports.ProjectCategoryService = ProjectCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(ProjectCategory_schema_1.ProjectCategory.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProjectCategoryService);
//# sourceMappingURL=projectCategories.service.js.map