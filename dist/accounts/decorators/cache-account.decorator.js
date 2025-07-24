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
exports.CacheAccountDecorator = void 0;
const common_1 = require("@nestjs/common");
const base_account_decorator_1 = require("./base-account.decorator");
let CacheAccountDecorator = class CacheAccountDecorator extends base_account_decorator_1.BaseAccountDecorator {
    constructor(accountService) {
        super(accountService);
        this.cache = new Map();
    }
    async getAccount() {
        const cacheKey = 'all_accounts';
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        const accounts = await super.getAccount();
        this.cache.set(cacheKey, accounts);
        return accounts;
    }
    async getAccountById(id) {
        const cacheKey = `account_${id}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        const account = await super.getAccountById(id);
        this.cache.set(cacheKey, account);
        return account;
    }
    async create(createAccountDto) {
        const result = await super.create(createAccountDto);
        this.cache.clear();
        return result;
    }
    async updateAccount(id, updateAccountDto) {
        const result = await super.updateAccount(id, updateAccountDto);
        this.cache.clear();
        return result;
    }
    async deleteAccount(id) {
        const result = await super.deleteAccount(id);
        this.cache.clear();
        return result;
    }
};
exports.CacheAccountDecorator = CacheAccountDecorator;
exports.CacheAccountDecorator = CacheAccountDecorator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], CacheAccountDecorator);
//# sourceMappingURL=cache-account.decorator.js.map