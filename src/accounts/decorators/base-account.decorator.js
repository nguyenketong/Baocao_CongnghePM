"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAccountDecorator = void 0;
// Base decorator class
var BaseAccountDecorator = /** @class */ (function () {
    function BaseAccountDecorator(accountService) {
        this.accountService = accountService;
    }
    BaseAccountDecorator.prototype.getAccountByUserName = function (userName) {
        return this.accountService.getAccountByUserName(userName);
    };
    BaseAccountDecorator.prototype.create = function (createAccountDto) {
        return this.accountService.create(createAccountDto);
    };
    BaseAccountDecorator.prototype.getAccount = function () {
        return this.accountService.getAccount();
    };
    BaseAccountDecorator.prototype.getAccountById = function (id) {
        return this.accountService.getAccountById(id);
    };
    BaseAccountDecorator.prototype.updateAccount = function (id, updateAccountDto) {
        return this.accountService.updateAccount(id, updateAccountDto);
    };
    BaseAccountDecorator.prototype.deleteAccount = function (id) {
        return this.accountService.deleteAccount(id);
    };
    return BaseAccountDecorator;
}());
exports.BaseAccountDecorator = BaseAccountDecorator;
