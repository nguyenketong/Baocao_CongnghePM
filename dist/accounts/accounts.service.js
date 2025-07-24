"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("mongoose");
const Account_schema_1 = require("../schemas/Account.schema");
const account_factory_1 = require("./factory/account.factory");
const database_connection_1 = require("../config/database.connection");
let AccountService = class AccountService {
    constructor(accountModel, accountFactory, dbConnection) {
        this.accountModel = accountModel;
        this.accountFactory = accountFactory;
        this.dbConnection = dbConnection;
        console.log('🏗️ AccountService được khởi tạo');
        console.log('📊 Database connection status:', this.dbConnection.getConnectionStatus());
    }
    async ensureConnection() {
        console.log('🔍 Kiểm tra kết nối database...');
        if (!this.dbConnection.getConnection()) {
            console.log('⚠️ Chưa có kết nối, đang kết nối...');
            await this.dbConnection.connect();
        }
        else {
            console.log('✅ Đã có kết nối database');
        }
        console.log('📊 Trạng thái kết nối hiện tại:', this.dbConnection.getConnectionStatus());
    }
    async getAccountByUserName(userName) {
        return this.accountModel.findOne({ userName }).exec();
    }
    async create(createAccountDto) {
        console.log('📝 Bắt đầu tạo account mới...');
        await this.ensureConnection();
        const newAccount = await this.accountFactory.create(createAccountDto);
        return await newAccount.save();
    }
    async getAccount() {
        console.log('🔍 Lấy danh sách tất cả accounts...');
        await this.ensureConnection();
        const accounts = await this.accountFactory.findAll();
        return accounts;
    }
    async getAccountById(id) {
        await this.ensureConnection();
        const account = await this.accountFactory.findById(id);
        if (!account) {
            throw new common_1.NotFoundException(`Account with ID ${id} not found`);
        }
        return account;
    }
    async updateAccount(id, updateAccountDto) {
        const updatedAccount = await this.accountModel.findByIdAndUpdate(id, updateAccountDto, { new: true });
        if (!updatedAccount) {
            throw new common_1.NotFoundException(`Account with ID ${id} not found`);
        }
        return updatedAccount;
    }
    async deleteAccount(id) {
        const deletedAccount = await this.accountFactory.delete(id);
        if (!deletedAccount) {
            throw new common_1.NotFoundException(`Account with ID ${id} not found`);
        }
        return { message: 'Account deleted successfully' };
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Account_schema_1.Account.name)),
    __param(2, (0, common_1.Inject)('DATABASE_CONNECTION')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        account_factory_1.AccountFactory,
        database_connection_1.DatabaseConnection])
], AccountService);
//# sourceMappingURL=accounts.service.js.map