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
exports.CreateProjectDto = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class CreateProjectDto {
}
exports.CreateProjectDto = CreateProjectDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên dự án là bắt buộc' }),
    (0, class_validator_1.IsString)({ message: 'Tên dự án phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Tên dự án không được quá 100 ký tự' }),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "projectName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'projectCategory phải là chuỗi ObjectId hợp lệ' }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateProjectDto.prototype, "projectCategory", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Ảnh hồ sơ phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(255, { message: 'Đường dẫn ảnh hồ sơ không được quá 255 ký tự' }),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "projectImage", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Ngày bắt đầu dự án là bắt buộc' }),
    __metadata("design:type", Date)
], CreateProjectDto.prototype, "projectStart", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Ngày kết thúc dự án là bắt buộc' }),
    __metadata("design:type", Date)
], CreateProjectDto.prototype, "projectEnd", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'notificationSent phải là chuỗi ObjectId hợp lệ' }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateProjectDto.prototype, "notificationSent", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'employee_id phải là chuỗi ObjectId hợp lệ' }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateProjectDto.prototype, "assignedPerson", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Ngân sách là bắt buộc' }),
    __metadata("design:type", Number)
], CreateProjectDto.prototype, "budget", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Mức độ ưu tiên là bắt buộc' }),
    (0, class_validator_1.IsString)({ message: 'Mức độ ưu tiên phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Mức độ ưu tiên không được quá 50 ký tự' }),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Mô tả dự án là bắt buộc' }),
    (0, class_validator_1.IsString)({ message: 'Mô tả phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(500, { message: 'Mô tả dự án không được quá 500 ký tự' }),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "description", void 0);
//# sourceMappingURL=CreateProject.dto.js.map