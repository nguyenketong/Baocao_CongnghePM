import { CreateAccountDto } from './dto/CreateAccount.dto';
import { UpdateAccountDto } from './dto/UpdateAccount.dto';
import { AccountService } from './accounts.service';
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    create(createAccountDto: CreateAccountDto): Promise<import("../schemas/Account.schema").Account>;
    getAccount(): Promise<import("../schemas/Account.schema").Account[]>;
    getAccountById(id: string): Promise<import("../schemas/Account.schema").Account>;
    updateAccount(id: string, updateAccountDto: UpdateAccountDto): Promise<import("../schemas/Account.schema").Account>;
    deleteAccount(id: string): Promise<{
        message: string;
    }>;
}
