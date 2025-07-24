import { Account } from 'src/schemas/Account.schema';
import { CreateAccountDto } from '../dto/CreateAccount.dto';
import { UpdateAccountDto } from '../dto/UpdateAccount.dto';
export interface IAccountService {
    getAccountByUserName(userName: string): Promise<Account | null>;
    create(createAccountDto: CreateAccountDto): Promise<Account>;
    getAccount(): Promise<Account[]>;
    getAccountById(id: string): Promise<Account>;
    updateAccount(id: string, updateAccountDto: UpdateAccountDto): Promise<Account>;
    deleteAccount(id: string): Promise<{
        message: string;
    }>;
}
export declare abstract class BaseAccountDecorator implements IAccountService {
    protected readonly accountService: IAccountService;
    constructor(accountService: IAccountService);
    getAccountByUserName(userName: string): Promise<Account | null>;
    create(createAccountDto: CreateAccountDto): Promise<Account>;
    getAccount(): Promise<Account[]>;
    getAccountById(id: string): Promise<Account>;
    updateAccount(id: string, updateAccountDto: UpdateAccountDto): Promise<Account>;
    deleteAccount(id: string): Promise<{
        message: string;
    }>;
}
