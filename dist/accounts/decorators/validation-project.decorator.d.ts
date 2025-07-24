import { Account } from 'src/schemas/Account.schema';
import { CreateAccountDto } from '../dto/CreateAccount.dto';
import { UpdateAccountDto } from '../dto/UpdateAccount.dto';
import { BaseAccountDecorator, IAccountService } from './base-account.decorator';
export declare class ValidationAccountDecorator extends BaseAccountDecorator {
    constructor(accountService: IAccountService);
    create(createAccountDto: CreateAccountDto): Promise<Account>;
    updateAccount(id: string, updateAccountDto: UpdateAccountDto): Promise<Account>;
    private validateAccountData;
}
