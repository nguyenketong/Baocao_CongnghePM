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
exports.CreateEmployeeDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const CreateAccount_dto_1 = require("../../accounts/dto/CreateAccount.dto");
const CreateProjectPermission_dto_1 = require("../../projectpermissions/dto/CreateProjectPermission.dto");
const mongoose_1 = require("mongoose");
class CreateEmployeeDto {
}
exports.CreateEmployeeDto = CreateEmployeeDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên nhân viên là bắt buộc' }),
    (0, class_validator_1.IsString)({ message: 'Tên nhân viên phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Tên nhân viên không được quá 100 ký tự' }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "employeeName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Ảnh hồ sơ phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(255, { message: 'Đường dẫn ảnh hồ sơ không được quá 255 ký tự' }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "employeeProfile", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ message: 'Ngày tham gia phải là một ngày hợp lệ' }),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateEmployeeDto.prototype, "joiningDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)(undefined, { message: 'Số điện thoại không hợp lệ' }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Mô tả phải là chuỗi' }),
    (0, class_validator_1.MaxLength)(500, { message: 'Mô tả không được quá 500 ký tự' }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'team_id phải là chuỗi ObjectId hợp lệ' }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateEmployeeDto.prototype, "team_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'department_id phải là chuỗi ObjectId hợp lệ' }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateEmployeeDto.prototype, "department_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'designation_id phải là chuỗi ObjectId hợp lệ' }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateEmployeeDto.prototype, "designation_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateAccount_dto_1.CreateAccountDto),
    __metadata("design:type", CreateAccount_dto_1.CreateAccountDto)
], CreateEmployeeDto.prototype, "account", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateProjectPermission_dto_1.CreateProjectPermissionsDto),
    __metadata("design:type", Array)
], CreateEmployeeDto.prototype, "projectpermission", void 0);
//# sourceMappingURL=CreateEmployee.dto.js.map