import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from 'src/schemas/Account.schema';
import { CreateAccountDto } from '../dto/CreateAccount.dto';
import { UpdateAccountDto } from '../dto/UpdateAccount.dto';

@Injectable()
export class AccountFactory {
    constructor(@InjectModel(Account.name) private accountModel: Model<Account>) { }

    async create(createAccountDto: CreateAccountDto): Promise<Account> {
        const createdAccounts = new this.accountModel(createAccountDto);
        return createdAccounts.save();
    }

    async findAll(): Promise<Account[]> {
        return this.accountModel.find().exec();
    }

    async findById(id: string): Promise<Account | null> {
        return this.accountModel.findById(id).exec();
    }

    async findByUserName(userName: string): Promise<Account | null> {
        return this.accountModel.findOne({ userName }).exec();
    }

    async update(id: string, updateAccountDto: UpdateAccountDto): Promise<Account | null> {
        return this.accountModel.findByIdAndUpdate(id, updateAccountDto, { new: true }).exec();
    }

    async delete(id: string): Promise<Account | null> {
        return this.accountModel.findByIdAndDelete(id).exec();
    }
}
