"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const Account_schema_1 = require("../schemas/Account.schema");
const accounts_service_1 = require("./accounts.service");
const accounts_controller_1 = require("./accounts.controller");
const validation_project_decorator_1 = require("./decorators/validation-project.decorator");
const logging_account_decorator_1 = require("./decorators/logging-account.decorator");
const cache_account_decorator_1 = require("./decorators/cache-account.decorator");
const account_factory_1 = require("./factory/account.factory");
let AccountModule = class AccountModule {
};
exports.AccountModule = AccountModule;
exports.AccountModule = AccountModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: Account_schema_1.Account.name, schema: Account_schema_1.AccountSchema }]),
        ],
        providers: [accounts_service_1.AccountService,
            account_factory_1.AccountFactory,
            {
                provide: 'AccountServiceDecorated',
                useFactory: (accountService) => {
                    const withValidation = new validation_project_decorator_1.ValidationAccountDecorator(accountService);
                    const withLogging = new logging_account_decorator_1.LoggingAccountDecorator(withValidation);
                    const withCache = new cache_account_decorator_1.CacheAccountDecorator(withLogging);
                    return withCache;
                },
                inject: [accounts_service_1.AccountService]
            }
        ],
        controllers: [accounts_controller_1.AccountController],
        exports: [accounts_service_1.AccountService],
    })
], AccountModule);
//# sourceMappingURL=accounts.module.js.map