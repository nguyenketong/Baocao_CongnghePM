import { Account } from 'src/schemas/Account.schema';
import { BaseAccountDecorator, IAccountService } from './base-account.decorator';
export declare class CacheAccountDecorator extends BaseAccountDecorator {
    private cache;
    constructor(accountService: IAccountService);
    getAccount(): Promise<Account[]>;
    getAccountById(id: string): Promise<Account>;
    create(createAccountDto: any): Promise<Account>;
    updateAccount(id: string, updateAccountDto: any): Promise<Account>;
    deleteAccount(id: string): Promise<{
        message: string;
    }>;
}
