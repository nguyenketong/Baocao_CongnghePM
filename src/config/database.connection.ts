import mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

export class DatabaseConnection {
    private static instance: DatabaseConnection;
    private connection: typeof mongoose | null = null;
    private connectionAttempts: number = 0;
    private readonly MAX_RETRIES = 3;

    private constructor(private readonly configService: ConfigService) {
        console.log('🏗️ DatabaseConnection constructor được gọi');
        console.log('⚠️ Lưu ý: Constructor chỉ nên được gọi một lần duy nhất');
    }

    public static getInstance(configService: ConfigService): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            console.log('🆕 Tạo instance mới của DatabaseConnection');
            DatabaseConnection.instance = new DatabaseConnection(configService);
        } else {
            console.log('♻️ Sử dụng instance đã tồn tại của DatabaseConnection');
        }
        return DatabaseConnection.instance;
    }

    public async connect(): Promise<typeof mongoose> {
        try {
            if (this.connection) {
                console.log('🔄 Kết nối database đã tồn tại, sử dụng lại');
                return this.connection;
            }

            this.connectionAttempts++;
            console.log(`🔌 Đang thử kết nối database (Lần thử ${this.connectionAttempts}/${this.MAX_RETRIES})`);

            const uri = this.configService.get<string>('MONGODB_URI') || 
                'mongodb+srv://nguyenketong1603:ketong1603@tong.8zcrene.mongodb.net/';
            this.connection = await mongoose.connect(uri, {
                retryWrites: true,
                w: 'majority'
            });
            
            console.log('✅ Kết nối MongoDB thành công!');
            console.log(`📊 Database: ${this.connection.connection.db?.databaseName}`);
            console.log(`🔗 Host: ${this.connection.connection.host}`);
            
            // Thêm event listeners cho connection
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
        } catch (error) {
            console.error('❌ Lỗi kết nối MongoDB:', error);
            
            if (this.connectionAttempts < this.MAX_RETRIES) {
                console.log(`🔄 Thử kết nối lại sau 5 giây...`);
                await new Promise(resolve => setTimeout(resolve, 5000));
                return this.connect();
            }
            
            throw error;
        }
    }

    public async disconnect(): Promise<void> {
        if (this.connection) {
            console.log('🔌 Đang ngắt kết nối database...');
            await mongoose.disconnect();
            this.connection = null;
            console.log('✅ Đã ngắt kết nối database thành công');
        } else {
            console.log('ℹ️ Không có kết nối database để ngắt');
        }
    }

    public getConnection(): typeof mongoose | null {
        if (this.connection) {
            console.log('📡 Trả về kết nối database hiện tại');
        } else {
            console.log('⚠️ Chưa có kết nối database');
        }
        return this.connection;
    }

    public getConnectionStatus(): string {
        const status = mongoose.connection.readyState;
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