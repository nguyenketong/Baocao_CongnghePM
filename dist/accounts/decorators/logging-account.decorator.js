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
var LoggingAccountDecorator_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingAccountDecorator = void 0;
const common_1 = require("@nestjs/common");
const base_account_decorator_1 = require("./base-account.decorator");
let LoggingAccountDecorator = LoggingAccountDecorator_1 = class LoggingAccountDecorator extends base_account_decorator_1.BaseAccountDecorator {
    constructor(accountService) {
        super(accountService);
        this.logger = new common_1.Logger(LoggingAccountDecorator_1.name);
    }
    async create(createAccountDto) {
        this.logger.log(`Creating account with username: ${createAccountDto.userName}`);
        const result = await super.create(createAccountDto);
        this.logger.log(`Account created successfully with ID: ${result._id}`);
        return result;
    }
    async deleteAccount(id) {
        this.logger.log(`Attempting to delete account with ID: ${id}`);
        const result = await super.deleteAccount(id);
        this.logger.log(`Account deleted successfully: ${id}`);
        return result;
    }
    async updateAccount(id, updateAccountDto) {
        this.logger.log(`Updating account with ID: ${id}`);
        const result = await super.updateAccount(id, updateAccountDto);
        this.logger.log(`Account updated successfully: ${id}`);
        return result;
    }
    async getAccountByUserName(userName) {
        this.logger.log(`Fetching account with username: ${userName}`);
        const result = await super.getAccountByUserName(userName);
        if (result) {
            this.logger.log(`Account found: ${result._id}`);
        }
        else {
            this.logger.log(`Account not found`);
        }
        return result;
    }
};
exports.LoggingAccountDecorator = LoggingAccountDecorator;
exports.LoggingAccountDecorator = LoggingAccountDecorator = LoggingAccountDecorator_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], LoggingAccountDecorator);
//# sourceMappingURL=logging-account.decorator.js.map