import { Account } from 'src/schemas/Account.schema';
import { CreateAccountDto } from '../dto/CreateAccount.dto';
import { UpdateAccountDto } from '../dto/UpdateAccount.dto';

// Interface định nghĩa các phương thức cơ bản của AccountService
export interface IAccountService {
    getAccountByUserName(userName: string): Promise<Account | null>;
    create(createAccountDto: CreateAccountDto): Promise<Account>;
    getAccount(): Promise<Account[]>;
    getAccountById(id: string): Promise<Account>;
    updateAccount(id: string, updateAccountDto: UpdateAccountDto): Promise<Account>;
    deleteAccount(id: string): Promise<{ message: string }>;
}

// Base decorator class
export abstract class BaseAccountDecorator implements IAccountService {
    constructor(protected readonly accountService: IAccountService) { }

    getAccountByUserName(userName: string): Promise<Account | null> {
        return this.accountService.getAccountByUserName(userName);
    }

    create(createAccountDto: CreateAccountDto): Promise<Account> {
        return this.accountService.create(createAccountDto);
    }

    getAccount(): Promise<Account[]> {
        return this.accountService.getAccount();
    }

    getAccountById(id: string): Promise<Account> {
        return this.accountService.getAccountById(id);
    }

    updateAccount(id: string, updateAccountDto: UpdateAccountDto): Promise<Account> {
        return this.accountService.updateAccount(id, updateAccountDto);
    }

    deleteAccount(id: string): Promise<{ message: string }> {
        return this.accountService.deleteAccount(id);
    }
}
