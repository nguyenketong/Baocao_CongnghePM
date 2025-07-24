import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConnection } from './database.connection';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: 'DATABASE_CONNECTION',
            useFactory: async (configService: ConfigService) => {
                const dbConnection = DatabaseConnection.getInstance(configService);
                await dbConnection.connect();
                return dbConnection;
            },
            inject: [ConfigService],
        },
    ],
    exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}