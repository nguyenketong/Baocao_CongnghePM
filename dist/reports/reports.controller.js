"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const reports_service_1 = require("./reports.service");
const CreateReport_dto_1 = require("./dto/CreateReport.dto");
const UpdateReport_dto_1 = require("./dto/UpdateReport.dto");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const platform_express_1 = require("@nestjs/platform-express");
const path = __importStar(require("path"));
const mongoose_1 = require("mongoose");
let ReportController = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    async createReport(createReportDto, file) {
        if (file) {
            createReportDto.filerepport = `/uploads/reports/${file.filename}`;
        }
        const newReport = await this.reportService.createReport(createReportDto);
        return { success: true, data: newReport };
    }
    async getReportByTaskId(taskId) {
        if (!taskId || !mongoose_1.Types.ObjectId.isValid(taskId)) {
            throw new common_1.NotFoundException('ProjectId không hợp lệ');
        }
        return this.reportService.getReportByTaskId(new mongoose_1.Types.ObjectId(taskId));
    }
    async getAllReports() {
        return this.reportService.getAllReports();
    }
    async getReportById(id) {
        return this.reportService.getReportById(id);
    }
    async updateReport(id, updateReportDto, file) {
        if (file) {
            updateReportDto.filerepport = `/uploads/reports/${file.filename}`;
        }
        return this.reportService.updateReport(id, updateReportDto);
    }
    async deleteReport(id) {
        return this.reportService.deleteReport(id);
    }
};
exports.ReportController = ReportController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('filerepport', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/reports',
            filename: (req, file, cb) => {
                const fileExt = path.extname(file.originalname);
                if (fileExt !== '.docx') {
                    return cb(new Error('Chỉ cho phép tải lên file .docx'), '');
                }
                const filename = `${(0, uuid_1.v4)()}${fileExt}`;
                cb(null, filename);
            }
        })
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateReport_dto_1.CreateReportDto, Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "createReport", null);
__decorate([
    (0, common_1.Get)('/by-task'),
    __param(0, (0, common_1.Query)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getReportByTaskId", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getAllReports", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getReportById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('filerepport', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/reports',
            filename: (req, file, cb) => {
                const fileExt = path.extname(file.originalname);
                if (fileExt !== '.docx') {
                    return cb(new Error('Chỉ cho phép tải lên file .docx'), '');
                }
                const filename = `${(0, uuid_1.v4)()}${fileExt}`;
                cb(null, filename);
            }
        })
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateReport_dto_1.UpdateReportDto, Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "updateReport", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "deleteReport", null);
exports.ReportController = ReportController = __decorate([
    (0, common_1.Controller)('reports'),
    __param(0, (0, common_1.Inject)('ReportServiceDecorated')),
    __metadata("design:paramtypes", [reports_service_1.ReportService])
], ReportController);
//# sourceMappingURL=reports.controller.js.map