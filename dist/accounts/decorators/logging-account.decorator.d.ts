import { Account } from 'src/schemas/Account.schema';
import { CreateAccountDto } from '../dto/CreateAccount.dto';
import { UpdateAccountDto } from '../dto/UpdateAccount.dto';
import { BaseAccountDecorator, IAccountService } from './base-account.decorator';
export declare class LoggingAccountDecorator extends BaseAccountDecorator {
    private readonly logger;
    constructor(accountService: IAccountService);
    create(createAccountDto: CreateAccountDto): Promise<Account>;
    deleteAccount(id: string): Promise<{
        message: string;
    }>;
    updateAccount(id: string, updateAccountDto: UpdateAccountDto): Promise<Account>;
    getAccountByUserName(userName: string): Promise<Account | null>;
}
