import { BadRequestException, Injectable } from '@nestjs/common';
import { Account } from 'src/schemas/Account.schema';
import { CreateAccountDto } from '../dto/CreateAccount.dto';
import { UpdateAccountDto } from '../dto/UpdateAccount.dto';
import { BaseAccountDecorator, IAccountService } from './base-account.decorator';

@Injectable()
export class ValidationAccountDecorator extends BaseAccountDecorator {
    constructor(accountService: IAccountService) {
        super(accountService);
    }

    async create(createAccountDto: CreateAccountDto): Promise<Account> {
        this.validateAccountData(createAccountDto);
        return super.create(createAccountDto);
    }

    async updateAccount(id: string, updateAccountDto: UpdateAccountDto): Promise<Account> {
        this.validateAccountData(updateAccountDto);
        return super.updateAccount(id, updateAccountDto);
    }

    private validateAccountData(accountDto: CreateAccountDto | UpdateAccountDto): void {
        if (accountDto.userName && accountDto.userName.length < 3) {
            throw new BadRequestException('Tên tài khoản phải có ít nhất 3 ký tự');
        }
        if (accountDto.password && accountDto.password.length < 6) {
            throw new BadRequestException('Mật khẩu phải có ít nhất 6 ký tự');
        }
    }
}
