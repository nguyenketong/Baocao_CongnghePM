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
exports.ProgressController = void 0;
const common_1 = require("@nestjs/common");
const progress_service_1 = require("./progress.service");
const CreateProgress_dto_1 = require("./dto/CreateProgress.dto");
const UpdateProgress_dto_1 = require("./dto/UpdateProgress.dto");
const mongoose_1 = require("mongoose");
let ProgressController = class ProgressController {
    constructor(progressService) {
        this.progressService = progressService;
    }
    async createProgress(createProgressDto) {
        const newProgress = await this.progressService.createProgress(createProgressDto);
        return { success: true, data: newProgress };
    }
    async getAllProgresses() {
        return this.progressService.getAllProgresses();
    }
    async getProgressByProjectId(projectId) {
        if (!projectId || !mongoose_1.Types.ObjectId.isValid(projectId)) {
            throw new common_1.NotFoundException('ProjectId không hợp lệ');
        }
        return this.progressService.getProgressByProjectId(new mongoose_1.Types.ObjectId(projectId));
    }
    async getProgressById(id) {
        return this.progressService.getProgressById(id);
    }
    async updateProgress(id, updateProgressDto) {
        return this.progressService.updateProgress(id, updateProgressDto);
    }
    async deleteProgress(id) {
        return this.progressService.deleteProgress(id);
    }
};
exports.ProgressController = ProgressController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateProgress_dto_1.CreateProgressDto]),
    __metadata("design:returntype", Promise)
], ProgressController.prototype, "createProgress", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProgressController.prototype, "getAllProgresses", null);
__decorate([
    (0, common_1.Get)('/by-project'),
    __param(0, (0, common_1.Query)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgressController.prototype, "getProgressByProjectId", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgressController.prototype, "getProgressById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateProgress_dto_1.UpdateProgressDto]),
    __metadata("design:returntype", Promise)
], ProgressController.prototype, "updateProgress", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgressController.prototype, "deleteProgress", null);
exports.ProgressController = ProgressController = __decorate([
    (0, common_1.Controller)('progress'),
    __param(0, (0, common_1.Inject)('ProgressServiceDecorated')),
    __metadata("design:paramtypes", [progress_service_1.ProgressService])
], ProgressController);
//# sourceMappingURL=progress.controller.js.map