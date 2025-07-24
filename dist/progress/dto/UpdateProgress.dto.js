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
exports.UpdateProgressDto = void 0;
const class_validator_1 = require("class-validator");
class UpdateProgressDto {
}
exports.UpdateProgressDto = UpdateProgressDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Tên tiến độ công việc phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Tên tiến độ công việc không được quá 100 ký tự' }),
    __metadata("design:type", String)
], UpdateProgressDto.prototype, "progressName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)({ message: 'projectid phải là ObjectId hợp lệ' }),
    __metadata("design:type", String)
], UpdateProgressDto.prototype, "projectid", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)({ message: 'progressCategory phải là ObjectId hợp lệ' }),
    __metadata("design:type", String)
], UpdateProgressDto.prototype, "progressCategory", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateProgressDto.prototype, "progressStart", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateProgressDto.prototype, "progressEnd", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)({ message: 'notificationSent phải là ObjectId hợp lệ' }),
    __metadata("design:type", String)
], UpdateProgressDto.prototype, "notificationSent", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)({ message: 'taskAssignPerson phải là ObjectId hợp lệ' }),
    __metadata("design:type", String)
], UpdateProgressDto.prototype, "taskAssignPerson", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)({ message: 'taskRecipient phải là ObjectId hợp lệ' }),
    __metadata("design:type", String)
], UpdateProgressDto.prototype, "taskRecipient", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Mức độ ưu tiên phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Mức độ ưu tiên không được quá 50 ký tự' }),
    __metadata("design:type", String)
], UpdateProgressDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Mô tả tiến độ công việc phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(500, { message: 'Mô tả tiến độ công việc không được quá 500 ký tự' }),
    __metadata("design:type", String)
], UpdateProgressDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Trạng thái phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Trạng thái không được quá 50 ký tự' }),
    __metadata("design:type", String)
], UpdateProgressDto.prototype, "status", void 0);
//# sourceMappingURL=UpdateProgress.dto.js.map