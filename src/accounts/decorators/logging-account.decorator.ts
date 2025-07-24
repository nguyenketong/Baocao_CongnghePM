import { Injectable, Logger } from '@nestjs/common';
import { Account } from 'src/schemas/Account.schema';
import { CreateAccountDto } from '../dto/CreateAccount.dto';
import { UpdateAccountDto } from '../dto/UpdateAccount.dto';
import { BaseAccountDecorator, IAccountService } from './base-account.decorator';

@Injectable()
export class LoggingAccountDecorator extends BaseAccountDecorator {
    private readonly logger = new Logger(LoggingAccountDecorator.name);

    constructor(accountService: IAccountService) {
        super(accountService);
    }

    async create(createAccountDto: CreateAccountDto): Promise<Account> {
        this.logger.log(`Creating account with username: ${createAccountDto.userName}`);
        const result = await super.create(createAccountDto);
        this.logger.log(`Account created successfully with ID: ${result._id}`);
        return result;
    }

    async deleteAccount(id: string): Promise<{ message: string }> {
        this.logger.log(`Attempting to delete account with ID: ${id}`);
        const result = await super.deleteAccount(id);
        this.logger.log(`Account deleted successfully: ${id}`);
        return result;
    }

    async updateAccount(id: string, updateAccountDto: UpdateAccountDto): Promise<Account> {
        this.logger.log(`Updating account with ID: ${id}`);
        const result = await super.updateAccount(id, updateAccountDto);
        this.logger.log(`Account updated successfully: ${id}`);
        return result;
    }

    async getAccountByUserName(userName: string): Promise<Account | null> {
        this.logger.log(`Fetching account with username: ${userName}`);
        const result = await super.getAccountByUserName(userName);
        if (result) {
            this.logger.log(`Account found: ${result._id}`);
        } else {
            this.logger.log(`Account not found`);
        }
        return result;
    }
}
