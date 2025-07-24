import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Account, AccountSchema } from 'src/schemas/Account.schema';
import { AccountService } from './accounts.service';
import { AccountController } from './accounts.controller';
import { ValidationAccountDecorator } from './decorators/validation-project.decorator';
import { LoggingAccountDecorator } from './decorators/logging-account.decorator';
import { CacheAccountDecorator } from './decorators/cache-account.decorator';
import { AccountFactory } from './factory/account.factory';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),

  ],
  providers: [AccountService,
    AccountFactory,
    {
      provide: 'AccountServiceDecorated',
      useFactory: (accountService: AccountService) => {
        const withValidation = new ValidationAccountDecorator(accountService);
        const withLogging = new LoggingAccountDecorator(withValidation);
        const withCache = new CacheAccountDecorator(withLogging);
        return withCache;
      },
      inject: [AccountService]
    }
  ],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule { }
