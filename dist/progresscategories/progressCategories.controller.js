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
exports.ProgressCategoryController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = __importDefault(require("mongoose"));
const progressCategories_service_1 = require("./progressCategories.service");
const CreatProgressCategory_dto_1 = require("./dto/CreatProgressCategory.dto");
const UpdateProgressCategoryDto_1 = require("./dto/UpdateProgressCategoryDto ");
let ProgressCategoryController = class ProgressCategoryController {
    constructor(progressCategoryService) {
        this.progressCategoryService = progressCategoryService;
    }
    async create(createProgressCategoryDto) {
        return this.progressCategoryService.create(createProgressCategoryDto);
    }
    async getProgressCategory() {
        return this.progressCategoryService.getProgressCategory();
    }
    async getProgressCategoryById(id) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('ProgressCategory not found', 404);
        const findProgressCategory = await this.progressCategoryService.getProgressCategoryById(id);
        if (!findProgressCategory)
            throw new common_1.HttpException('ProgressCategory not found', 404);
        return findProgressCategory;
    }
    async updateProgressCategory(id, updateProgressCategoryDto) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('Invalid ID', 404);
        const updateProgressCategory = await this.progressCategoryService.updateProgressCategory(id, updateProgressCategoryDto);
        if (!updateProgressCategory)
            throw new common_1.HttpException('ProgressCategory not found', 404);
        return updateProgressCategory;
    }
    async deleteProgressCategory(id) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('Invalid Id', 404);
        const deleteProgressCategory = await this.progressCategoryService.deleteProgressCategory(id);
        if (!deleteProgressCategory)
            throw new common_1.HttpException('ProgressCategory not found', 404);
        return deleteProgressCategory;
    }
};
exports.ProgressCategoryController = ProgressCategoryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatProgressCategory_dto_1.CreateProgressCategoryDto]),
    __metadata("design:returntype", Promise)
], ProgressCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProgressCategoryController.prototype, "getProgressCategory", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgressCategoryController.prototype, "getProgressCategoryById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateProgressCategoryDto_1.UpdateProgressCategoryDto]),
    __metadata("design:returntype", Promise)
], ProgressCategoryController.prototype, "updateProgressCategory", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgressCategoryController.prototype, "deleteProgressCategory", null);
exports.ProgressCategoryController = ProgressCategoryController = __decorate([
    (0, common_1.Controller)('progresscategories'),
    __metadata("design:paramtypes", [progressCategories_service_1.ProgressCategoryService])
], ProgressCategoryController);
//# sourceMappingURL=progressCategories.controller.js.map