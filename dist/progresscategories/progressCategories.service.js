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
exports.ProgressCategoryService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("mongoose");
const ProgressCategory_schema_1 = require("../schemas/ProgressCategory.schema");
let ProgressCategoryService = class ProgressCategoryService {
    constructor(progressCategoryModel) {
        this.progressCategoryModel = progressCategoryModel;
    }
    async create(createProgressCategoryDto) {
        const createProgressCategory = new this.progressCategoryModel(createProgressCategoryDto);
        return createProgressCategory.save();
    }
    async getProgressCategory() {
        return this.progressCategoryModel.find();
    }
    async getProgressCategoryById(id) {
        return this.progressCategoryModel.findById(id);
    }
    async updateProgressCategory(id, updateProgressCategoryDto) {
        return this.progressCategoryModel.findByIdAndUpdate(id, updateProgressCategoryDto, { new: true });
    }
    async deleteProgressCategory(id) {
        return this.progressCategoryModel.findByIdAndDelete(id);
    }
};
exports.ProgressCategoryService = ProgressCategoryService;
exports.ProgressCategoryService = ProgressCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(ProgressCategory_schema_1.ProgressCategory.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProgressCategoryService);
//# sourceMappingURL=progressCategories.service.js.map