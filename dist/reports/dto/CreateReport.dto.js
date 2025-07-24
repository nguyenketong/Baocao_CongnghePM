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
exports.CreateReportDto = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class CreateReportDto {
}
exports.CreateReportDto = CreateReportDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên báo cáo là bắt buộc' }),
    __metadata("design:type", String)
], CreateReportDto.prototype, "reportName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Thời gian nộp báo cáo là bắt buộc' }),
    __metadata("design:type", Date)
], CreateReportDto.prototype, "submission_time", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Trạng thái báo cáo là bắt buộc' }),
    (0, class_validator_1.IsString)({ message: 'Trạng thái phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Trạng thái không được quá 50 ký tự' }),
    __metadata("design:type", String)
], CreateReportDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Ghi chú báo cáo phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(500, { message: 'Ghi chú báo cáo không được quá 500 ký tự' }),
    __metadata("design:type", String)
], CreateReportDto.prototype, "notereport", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Đường dẫn file báo cáo phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(255, { message: 'Đường dẫn file báo cáo không được quá 255 ký tự' }),
    __metadata("design:type", String)
], CreateReportDto.prototype, "filerepport", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID nhân viên là bắt buộc' }),
    (0, class_validator_1.IsString)({ message: 'ID nhân viên phải là chuỗi ObjectId hợp lệ' }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateReportDto.prototype, "id_employee", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'ID nhiệm vụ phải là chuỗi ObjectId hợp lệ' }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateReportDto.prototype, "id_task", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'ID tiến độ phải là chuỗi ObjectId hợp lệ' }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateReportDto.prototype, "id_progress", void 0);
//# sourceMappingURL=CreateReport.dto.js.map