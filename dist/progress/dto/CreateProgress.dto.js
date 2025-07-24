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
exports.CreateProgressDto = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class CreateProgressDto {
}
exports.CreateProgressDto = CreateProgressDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên tiến độ công việc là bắt buộc' }),
    (0, class_validator_1.IsString)({ message: 'Tên tiến độ công việc phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Tên tiến độ công việc không được quá 100 ký tự' }),
    __metadata("design:type", String)
], CreateProgressDto.prototype, "progressName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'project phải là chuỗi ObjectId hợp lệ' }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateProgressDto.prototype, "projectid", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'progressCategory phải là chuỗi ObjectId hợp lệ' }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateProgressDto.prototype, "progressCategory", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Ngày bắt đầu tiến độ công việc là bắt buộc' }),
    __metadata("design:type", Date)
], CreateProgressDto.prototype, "progressStart", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Ngày kết thúc tiến độ công việc là bắt buộc' }),
    __metadata("design:type", Date)
], CreateProgressDto.prototype, "progressEnd", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'notificationSent phải là chuỗi ObjectId hợp lệ' }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateProgressDto.prototype, "notificationSent", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'taskAssignPerson phải là chuỗi ObjectId hợp lệ' }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateProgressDto.prototype, "taskAssignPerson", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'taskRecipient phải là chuỗi ObjectId hợp lệ' }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateProgressDto.prototype, "taskRecipient", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Mức độ ưu tiên là bắt buộc' }),
    (0, class_validator_1.IsString)({ message: 'Mức độ ưu tiên phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Mức độ ưu tiên không được quá 50 ký tự' }),
    __metadata("design:type", String)
], CreateProgressDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Mô tả tiến độ công việc là bắt buộc' }),
    (0, class_validator_1.IsString)({ message: 'Mô tả phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(500, { message: 'Mô tả tiến độ công việc không được quá 500 ký tự' }),
    __metadata("design:type", String)
], CreateProgressDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Trạng thái tiến độ công việc là bắt buộc' }),
    (0, class_validator_1.IsString)({ message: 'Trạng thái phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Trạng thái không được quá 50 ký tự' }),
    __metadata("design:type", String)
], CreateProgressDto.prototype, "status", void 0);
//# sourceMappingURL=CreateProgress.dto.js.map