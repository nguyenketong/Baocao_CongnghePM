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
exports.CreateTaskDto = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class CreateTaskDto {
}
exports.CreateTaskDto = CreateTaskDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên nhiệm vụ là bắt buộc' }),
    (0, class_validator_1.IsString)({ message: 'Tên nhiệm vụ phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Tên nhiệm vụ không được quá 100 ký tự' }),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "taskName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'progressId phải là chuỗi ObjectId hợp lệ' }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateTaskDto.prototype, "progressId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'taskCategory phải là chuỗi ObjectId hợp lệ' }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateTaskDto.prototype, "taskCategory", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Ngày bắt đầu nhiệm vụ là bắt buộc' }),
    __metadata("design:type", Date)
], CreateTaskDto.prototype, "taskStart", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Ngày kết thúc nhiệm vụ là bắt buộc' }),
    __metadata("design:type", Date)
], CreateTaskDto.prototype, "taskEnd", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'notificationSent phải là chuỗi ObjectId hợp lệ' }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateTaskDto.prototype, "notificationSent", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'taskAssignPerson phải là chuỗi ObjectId hợp lệ' }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateTaskDto.prototype, "taskAssignPerson", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'taskRecipient phải là chuỗi ObjectId hợp lệ' }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateTaskDto.prototype, "taskRecipient", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Mức độ ưu tiên là bắt buộc' }),
    (0, class_validator_1.IsString)({ message: 'Mức độ ưu tiên phải là chuỗi' }),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Mô tả nhiệm vụ là bắt buộc' }),
    (0, class_validator_1.IsString)({ message: 'Mô tả nhiệm vụ phải là chuỗi' }),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Trạng thái nhiệm vụ là bắt buộc' }),
    (0, class_validator_1.IsString)({ message: 'Trạng thái nhiệm vụ phải là chuỗi' }),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "status", void 0);
//# sourceMappingURL=CreateTask.dto.js.map