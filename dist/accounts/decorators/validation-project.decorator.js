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
exports.ValidationAccountDecorator = void 0;
const common_1 = require("@nestjs/common");
const base_account_decorator_1 = require("./base-account.decorator");
let ValidationAccountDecorator = class ValidationAccountDecorator extends base_account_decorator_1.BaseAccountDecorator {
    constructor(accountService) {
        super(accountService);
    }
    async create(createAccountDto) {
        this.validateAccountData(createAccountDto);
        return super.create(createAccountDto);
    }
    async updateAccount(id, updateAccountDto) {
        this.validateAccountData(updateAccountDto);
        return super.updateAccount(id, updateAccountDto);
    }
    validateAccountData(accountDto) {
        if (accountDto.userName && accountDto.userName.length < 3) {
            throw new common_1.BadRequestException('Tên tài khoản phải có ít nhất 3 ký tự');
        }
        if (accountDto.password && accountDto.password.length < 6) {
            throw new common_1.BadRequestException('Mật khẩu phải có ít nhất 6 ký tự');
        }
    }
};
exports.ValidationAccountDecorator = ValidationAccountDecorator;
exports.ValidationAccountDecorator = ValidationAccountDecorator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], ValidationAccountDecorator);
//# sourceMappingURL=validation-project.decorator.js.map