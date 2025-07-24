import { InjectModel } from '@nestjs/mongoose';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Account } from 'src/schemas/Account.schema';
import { CreateAccountDto } from './dto/CreateAccount.dto';
import { UpdateAccountDto } from './dto/UpdateAccount.dto';
import { AccountFactory } from './factory/account.factory';
import { DatabaseConnection } from 'src/config/database.connection';


@Injectable()
export class AccountService {
  constructor(@InjectModel(Account.name) private accountModel: Model<Account>,
    private readonly accountFactory: AccountFactory,
    @Inject('DATABASE_CONNECTION')
    private readonly dbConnection: DatabaseConnection) {
    console.log('🏗️ AccountService được khởi tạo');
    console.log('📊 Database connection status:', this.dbConnection.getConnectionStatus());
  }

  private async ensureConnection() {
    console.log('🔍 Kiểm tra kết nối database...');
    if (!this.dbConnection.getConnection()) {
      console.log('⚠️ Chưa có kết nối, đang kết nối...');
      await this.dbConnection.connect();
    } else {
      console.log('✅ Đã có kết nối database');
    }
    console.log('📊 Trạng thái kết nối hiện tại:', this.dbConnection.getConnectionStatus());
  }

  async getAccountByUserName(userName: string): Promise<Account | null> {
    return this.accountModel.findOne({ userName }).exec();
  }

  // Tạo mới 
  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    console.log('📝 Bắt đầu tạo account mới...');
    await this.ensureConnection();

    const newAccount = await this.accountFactory.create(createAccountDto);
    return await newAccount.save();
  }

  // Lấy danh sách tất cả 
  async getAccount() {
    console.log('🔍 Lấy danh sách tất cả accounts...');
    await this.ensureConnection();

    const accounts = await this.accountFactory.findAll();
    return accounts;
  }

  // Lấy theo ID
  async getAccountById(id: string): Promise<Account> {
    await this.ensureConnection();

    const account = await this.accountFactory.findById(id);
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return account;
  }

  // Cập nhật 
  async updateAccount(id: string, updateAccountDto: UpdateAccountDto): Promise<Account> {
    const updatedAccount = await this.accountModel.findByIdAndUpdate(id, updateAccountDto, { new: true });

    if (!updatedAccount) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    return updatedAccount;
  }

  // Xóa 
  async deleteAccount(id: string): Promise<{ message: string }> {
    const deletedAccount = await this.accountFactory.delete(id);

    if (!deletedAccount) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    return { message: 'Account deleted successfully' };
  }
}
