import { Model } from 'mongoose';
import { Account } from 'src/schemas/Account.schema';
import { CreateAccountDto } from './dto/CreateAccount.dto';
import { UpdateAccountDto } from './dto/UpdateAccount.dto';
import { AccountFactory } from './factory/account.factory';
import { DatabaseConnection } from 'src/config/database.connection';
export declare class AccountService {
    private accountModel;
    private readonly accountFactory;
    private readonly dbConnection;
    constructor(accountModel: Model<Account>, accountFactory: AccountFactory, dbConnection: DatabaseConnection);
    private ensureConnection;
    getAccountByUserName(userName: string): Promise<Account | null>;
    create(createAccountDto: CreateAccountDto): Promise<Account>;
    getAccount(): Promise<Account[]>;
    getAccountById(id: string): Promise<Account>;
    updateAccount(id: string, updateAccountDto: UpdateAccountDto): Promise<Account>;
    deleteAccount(id: string): Promise<{
        message: string;
    }>;
}
