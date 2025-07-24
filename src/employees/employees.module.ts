import { Project, ProjectSchema } from 'src/schemas/Project.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { Account, AccountSchema } from 'src/schemas/Account.schema';
import { Employee, EmployeeSchema } from 'src/schemas/Employee.schema';
import { EmployeeService } from './employees.service';
import { EmployeeController } from './employees.controller';
import { DepartmentModule } from 'src/departments/departments.module';
import { DesignationModule } from 'src/designations/designations.module';
import { AccountModule } from 'src/accounts/accounts.module';
import { ProjectPermissions, ProjectPermissionsSchema } from 'src/schemas/ProjectPermissions.schema';
import { ProjectPermissionsModule } from 'src/projectpermissions/projectpermissions.module';
import { TeamModule } from 'src/teams/teams.module';
import { EmployeeFactory } from './factory/employee.factory';
import { ValidationEmployeeDecorator } from './decorators/validation-employee.decorator';
import { LoggingEmployeeDecorator } from './decorators/logging-employee.decorator';
import { CacheEmployeeDecorator } from './decorators/cache-employee.decorator';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: 'uploads',
      serveRoot: '/uploads',
    }),

    // Định nghĩa schema chính xác trong MongooseModule
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: Account.name, schema: AccountSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: ProjectPermissions.name, schema: ProjectPermissionsSchema },
    ]),

    forwardRef(() => TeamModule), // Tránh vòng lặp

    DepartmentModule,
    DesignationModule,
    AccountModule,
    ProjectPermissionsModule,
  ],
  providers: [EmployeeService,
    EmployeeFactory,
    {
      provide: 'EmployeeServiceDecorated',
      useFactory: (employeeService: EmployeeService) => {
        const withValidation = new ValidationEmployeeDecorator(employeeService);
        const withLogging = new LoggingEmployeeDecorator(withValidation);
        const withCache = new CacheEmployeeDecorator(withLogging);
        return withCache;
      },
      inject: [EmployeeService]
    }
  ],
  controllers: [EmployeeController],
  exports: [EmployeeService],
})
export class EmployeeModule { }
