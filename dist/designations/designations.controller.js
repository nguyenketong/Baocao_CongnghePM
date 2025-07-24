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
exports.DesignationController = void 0;
const common_1 = require("@nestjs/common");
const designations_service_1 = require("./designations.service");
const CreateDesignation_dto_1 = require("./dto/CreateDesignation.dto");
const mongoose_1 = __importDefault(require("mongoose"));
const UpdateDesignation_dto_1 = require("./dto/UpdateDesignation.dto");
let DesignationController = class DesignationController {
    constructor(designationService) {
        this.designationService = designationService;
    }
    async create(createDesignationDto) {
        return this.designationService.create(createDesignationDto);
    }
    async getDesignation() {
        return this.designationService.getDesignation();
    }
    async getDesignationById(id) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('Designation not found', 404);
        const findDesignation = await this.designationService.getDesignationById(id);
        if (!findDesignation)
            throw new common_1.HttpException('Designation not found', 404);
        return findDesignation;
    }
    async updateDesignation(id, updateDesignationDto) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('Invalid ID', 404);
        const updateDesignation = await this.designationService.updateDesignation(id, updateDesignationDto);
        if (!updateDesignation)
            throw new common_1.HttpException('User not found', 404);
        return updateDesignation;
    }
    async deleteDesignation(id) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('Invalid Id', 404);
        const deleteDesignation = await this.designationService.deleteDesignation(id);
        if (!deleteDesignation)
            throw new common_1.HttpException('User not found', 404);
        return deleteDesignation;
    }
};
exports.DesignationController = DesignationController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateDesignation_dto_1.CreateDesignationDto]),
    __metadata("design:returntype", Promise)
], DesignationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DesignationController.prototype, "getDesignation", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DesignationController.prototype, "getDesignationById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateDesignation_dto_1.UpdateDesignationDto]),
    __metadata("design:returntype", Promise)
], DesignationController.prototype, "updateDesignation", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DesignationController.prototype, "deleteDesignation", null);
exports.DesignationController = DesignationController = __decorate([
    (0, common_1.Controller)('designations'),
    __metadata("design:paramtypes", [designations_service_1.DesignationService])
], DesignationController);
//# sourceMappingURL=designations.controller.js.map