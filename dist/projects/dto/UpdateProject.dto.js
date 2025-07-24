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
exports.UpdateProjectDto = void 0;
const class_validator_1 = require("class-validator");
class UpdateProjectDto {
}
exports.UpdateProjectDto = UpdateProjectDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Tên dự án phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Tên dự án không được quá 100 ký tự' }),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "projectName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)({ message: 'projectCategory phải là ObjectId hợp lệ' }),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "projectCategory", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Hình ảnh dự án phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(255, { message: 'Đường dẫn hình ảnh không được quá 255 ký tự' }),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "projectImage", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ message: 'Ngày bắt đầu phải là một ngày hợp lệ' }),
    __metadata("design:type", Date)
], UpdateProjectDto.prototype, "projectStart", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ message: 'Ngày kết thúc phải là một ngày hợp lệ' }),
    __metadata("design:type", Date)
], UpdateProjectDto.prototype, "projectEnd", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)({ message: 'notificationSent phải là ObjectId hợp lệ' }),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "notificationSent", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)({ message: 'assignedPerson phải là ObjectId hợp lệ' }),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "assignedPerson", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'Ngân sách phải là số' }),
    __metadata("design:type", Number)
], UpdateProjectDto.prototype, "budget", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Mức độ ưu tiên phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Mức độ ưu tiên không được quá 50 ký tự' }),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Mô tả phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(500, { message: 'Mô tả dự án không được quá 500 ký tự' }),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "description", void 0);
//# sourceMappingURL=UpdateProject.dto.js.map