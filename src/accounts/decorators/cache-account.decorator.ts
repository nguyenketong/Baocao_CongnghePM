import { Injectable } from '@nestjs/common';
import { Account } from 'src/schemas/Account.schema';
import { BaseAccountDecorator, IAccountService } from './base-account.decorator';

@Injectable()
export class CacheAccountDecorator extends BaseAccountDecorator {
    private cache: Map<string, any> = new Map();

    constructor(accountService: IAccountService) {
        super(accountService);
    }

    async getAccount(): Promise<Account[]> {
        const cacheKey = 'all_accounts';
        if (this.cache.has(cacheKey)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return this.cache.get(cacheKey);
        }

        const accounts = await super.getAccount();
        this.cache.set(cacheKey, accounts);
        return accounts;
    }

    async getAccountById(id: string): Promise<Account> {
        const cacheKey = `account_${id}`;
        if (this.cache.has(cacheKey)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return this.cache.get(cacheKey);
        }

        const account = await super.getAccountById(id);
        this.cache.set(cacheKey, account);
        return account;
    }

    async create(createAccountDto: any): Promise<Account> {
        const result = await super.create(createAccountDto);
        this.cache.clear(); // Clear cache when data changes
        return result;
    }

    async updateAccount(id: string, updateAccountDto: any): Promise<Account> {
        const result = await super.updateAccount(id, updateAccountDto);
        this.cache.clear(); // Clear cache when data changes
        return result;
    }

    async deleteAccount(id: string): Promise<{ message: string }> {
        const result = await super.deleteAccount(id);
        this.cache.clear(); // Clear cache when data changes
        return result;
    }
}
