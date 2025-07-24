import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentModule } from './departments/departments.module';
import { DesignationModule } from './designations/designations.module';
import { AccountModule } from './accounts/accounts.module';
import { EmployeeModule } from './employees/employees.module';
import { ProjectPermissionsModule } from './projectpermissions/projectpermissions.module';
import { ProjectCategoryModule } from './projectcategories/projectCategories.module';
import { NotificationModule } from './notifications/notifications.module';
import { ProjectModule } from './projects/projects.module';
import { TeamModule } from './teams/teams.module';
import { ProgressCategoryModule } from './progresscategories/progressCategories.module';
import { TaskCategoryModule } from './taskcategories/taskCategories.module';
import { ProgressModule } from './progress/progress.module';
import { TaskModule } from './tasks/tasks.module';
import { AuthModule } from './accounts/Auth.module';
import { ReportModule } from './reports/reports.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database.module';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ConfigModule.forRoot({
      isGlobal: true, // Đảm bảo biến môi trường có thể được sử dụng toàn cục
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads'), // Đường dẫn tới thư mục uploads
      serveRoot: '/uploads', // URL cơ sở mà ứng dụng sẽ sử dụng để phục vụ file
    }),
    MongooseModule.forRoot(process.env.MONGO_URI ?? ''),
    DatabaseModule,
    DepartmentModule,
    DesignationModule,
    AccountModule,
    EmployeeModule,
    ProjectPermissionsModule,
    ProjectCategoryModule,
    NotificationModule,
    ProjectModule,
    TeamModule,
    ProgressCategoryModule,
    TaskCategoryModule,
    ProgressModule,
    TaskModule,
    ReportModule,
    AuthModule
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
