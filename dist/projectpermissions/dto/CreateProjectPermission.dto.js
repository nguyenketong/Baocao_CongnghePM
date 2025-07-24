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
exports.CreateProjectPermissionsDto = void 0;
const class_validator_1 = require("class-validator");
class CreateProjectPermissionsDto {
}
exports.CreateProjectPermissionsDto = CreateProjectPermissionsDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên tài nguyên là bắt buộc' }),
    (0, class_validator_1.IsString)({ message: 'Tên tài nguyên phải là chuỗi' }),
    __metadata("design:type", String)
], CreateProjectPermissionsDto.prototype, "resourceName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'Giá trị phải là true hoặc false' }),
    __metadata("design:type", Boolean)
], CreateProjectPermissionsDto.prototype, "can_read", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'Giá trị phải là true hoặc false' }),
    __metadata("design:type", Boolean)
], CreateProjectPermissionsDto.prototype, "can_write", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'Giá trị phải là true hoặc false' }),
    __metadata("design:type", Boolean)
], CreateProjectPermissionsDto.prototype, "can_create", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'Giá trị phải là true hoặc false' }),
    __metadata("design:type", Boolean)
], CreateProjectPermissionsDto.prototype, "can_delete", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'Giá trị phải là true hoặc false' }),
    __metadata("design:type", Boolean)
], CreateProjectPermissionsDto.prototype, "can_import", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'Giá trị phải là true hoặc false' }),
    __metadata("design:type", Boolean)
], CreateProjectPermissionsDto.prototype, "can_export", void 0);
//# sourceMappingURL=CreateProjectPermission.dto.js.map