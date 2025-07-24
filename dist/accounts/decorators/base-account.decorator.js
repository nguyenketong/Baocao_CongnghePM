"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAccountDecorator = void 0;
class BaseAccountDecorator {
    constructor(accountService) {
        this.accountService = accountService;
    }
    getAccountByUserName(userName) {
        return this.accountService.getAccountByUserName(userName);
    }
    create(createAccountDto) {
        return this.accountService.create(createAccountDto);
    }
    getAccount() {
        return this.accountService.getAccount();
    }
    getAccountById(id) {
        return this.accountService.getAccountById(id);
    }
    updateAccount(id, updateAccountDto) {
        return this.accountService.updateAccount(id, updateAccountDto);
    }
    deleteAccount(id) {
        return this.accountService.deleteAccount(id);
    }
}
exports.BaseAccountDecorator = BaseAccountDecorator;
//# sourceMappingURL=base-account.decorator.js.map