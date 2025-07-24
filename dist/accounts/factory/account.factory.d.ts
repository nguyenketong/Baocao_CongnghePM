import { Model } from 'mongoose';
import { Account } from 'src/schemas/Account.schema';
import { CreateAccountDto } from '../dto/CreateAccount.dto';
import { UpdateAccountDto } from '../dto/UpdateAccount.dto';
export declare class AccountFactory {
    private accountModel;
    constructor(accountModel: Model<Account>);
    create(createAccountDto: CreateAccountDto): Promise<Account>;
    findAll(): Promise<Account[]>;
    findById(id: string): Promise<Account | null>;
    findByUserName(userName: string): Promise<Account | null>;
    update(id: string, updateAccountDto: UpdateAccountDto): Promise<Account | null>;
    delete(id: string): Promise<Account | null>;
}
