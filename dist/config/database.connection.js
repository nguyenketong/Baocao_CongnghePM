"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class DatabaseConnection {
    constructor(configService) {
        this.configService = configService;
        this.connection = null;
        this.connectionAttempts = 0;
        this.MAX_RETRIES = 3;
        console.log('🏗️ DatabaseConnection constructor được gọi');
        console.log('⚠️ Lưu ý: Constructor chỉ nên được gọi một lần duy nhất');
    }
    static getInstance(configService) {
        if (!DatabaseConnection.instance) {
            console.log('🆕 Tạo instance mới của DatabaseConnection');
            DatabaseConnection.instance = new DatabaseConnection(configService);
        }
        else {
            console.log('♻️ Sử dụng instance đã tồn tại của DatabaseConnection');
        }
        return DatabaseConnection.instance;
    }
    async connect() {
        try {
            if (this.connection) {
                console.log('🔄 Kết nối database đã tồn tại, sử dụng lại');
                return this.connection;
            }
            this.connectionAttempts++;
            console.log(`🔌 Đang thử kết nối database (Lần thử ${this.connectionAttempts}/${this.MAX_RETRIES})`);
            const uri = this.configService.get('MONGODB_URI') ||
<<<<<<< HEAD
                'mongodb+srv://nguyenketong1603:ketong1603@tong.8zcrene.mongodb.net/';
=======
                'mongodb+srv://nguyenketong1603:ketong1603@tong.8zcrene.mongodb.net';
>>>>>>> 0e7d54417416ae0a14fbffb269a941eeeaca510e
            this.connection = await mongoose_1.default.connect(uri, {
                retryWrites: true,
                w: 'majority'
            });
            console.log('✅ Kết nối MongoDB thành công!');
            console.log(`📊 Database: ${this.connection.connection.db?.databaseName}`);
            console.log(`🔗 Host: ${this.connection.connection.host}`);
            this.connection.connection.on('error', (err) => {
                console.error('❌ Database error:', err);
            });
            this.connection.connection.on('disconnected', () => {
                console.log('🔌 Database disconnected');
            });
            this.connection.connection.on('reconnected', () => {
                console.log('🔄 Database reconnected');
            });
            return this.connection;
        }
        catch (error) {
            console.error('❌ Lỗi kết nối MongoDB:', error);
            if (this.connectionAttempts < this.MAX_RETRIES) {
                console.log(`🔄 Thử kết nối lại sau 5 giây...`);
                await new Promise(resolve => setTimeout(resolve, 5000));
                return this.connect();
            }
            throw error;
        }
    }
    async disconnect() {
        if (this.connection) {
            console.log('🔌 Đang ngắt kết nối database...');
            await mongoose_1.default.disconnect();
            this.connection = null;
            console.log('✅ Đã ngắt kết nối database thành công');
        }
        else {
            console.log('ℹ️ Không có kết nối database để ngắt');
        }
    }
    getConnection() {
        if (this.connection) {
            console.log('📡 Trả về kết nối database hiện tại');
        }
        else {
            console.log('⚠️ Chưa có kết nối database');
        }
        return this.connection;
    }
    getConnectionStatus() {
        const status = mongoose_1.default.connection.readyState;
        const statusMap = {
            0: '🔴 Disconnected',
            1: '🟢 Connected',
            2: '🟡 Connecting',
            3: '🟠 Disconnecting'
        };
        console.log(`📊 Trạng thái kết nối: ${statusMap[status] || '❓ Unknown'}`);
        return statusMap[status] || 'Unknown';
    }
}
exports.DatabaseConnection = DatabaseConnection;
//# sourceMappingURL=database.connection.js.map