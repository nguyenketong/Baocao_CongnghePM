import mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';
export declare class DatabaseConnection {
    private readonly configService;
    private static instance;
    private connection;
    private connectionAttempts;
    private readonly MAX_RETRIES;
    private constructor();
    static getInstance(configService: ConfigService): DatabaseConnection;
    connect(): Promise<typeof mongoose>;
    disconnect(): Promise<void>;
    getConnection(): typeof mongoose | null;
    getConnectionStatus(): string;
}
