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
exports.CreateTeamDto = void 0;
const class_validator_1 = require("class-validator");
class CreateTeamDto {
}
exports.CreateTeamDto = CreateTeamDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên đội nhóm là bắt buộc' }),
    (0, class_validator_1.IsString)({ message: 'Tên đội nhóm phải là chuỗi' }),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "teamName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Người lãnh đạo là bắt buộc' }),
    (0, class_validator_1.IsMongoId)({ message: 'teamLead phải là ObjectId hợp lệ' }),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "teamLead", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Dự án là bắt buộc' }),
    (0, class_validator_1.IsMongoId)({ message: 'projectid phải là ObjectId hợp lệ' }),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "projectid", void 0);
//# sourceMappingURL=CreateTeam.dto.js.map