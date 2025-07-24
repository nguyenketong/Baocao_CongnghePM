import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from 'src/schemas/Project.schema';
import { ProjectService } from './projects.service';
import { ProjectController } from './projects.controller';
import { ProjectCategoryModule } from 'src/projectcategories/projectCategories.module';
import { NotificationModule } from 'src/notifications/notifications.module';
import { EmployeeModule } from 'src/employees/employees.module';
import { Employee, EmployeeSchema } from 'src/schemas/Employee.schema';
import { NotificationSent, NotificationSentSchema } from 'src/schemas/NotificationSent.schema';
import { ProjectCategory, ProjectCategorySchema } from 'src/schemas/ProjectCategory.schema';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TeamModule } from 'src/teams/teams.module';
import { ValidationProjectDecorator } from './decorators/validation-project.decorator';
import { LoggingProjectDecorator } from './decorators/logging-project.decorator';
import { CacheProjectDecorator } from './decorators/cache-project.decorator';
import { ProjectFactory } from './factory/project.fatory';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: 'uploads',
      serveRoot: '/uploads',
    }),

    // ✅ Sử dụng đúng cách MongooseModule.forFeature()
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Employee.name, schema: EmployeeSchema },
      { name: NotificationSent.name, schema: NotificationSentSchema },
      { name: ProjectCategory.name, schema: ProjectCategorySchema },
    ]),

    forwardRef(() => TeamModule), // ✅ Đặt forwardRef() ngoài MongooseModule

    ProjectCategoryModule,
    NotificationModule,
    forwardRef(() => EmployeeModule), // ✅ Dùng forwardRef() nếu có vòng lặp
  ],
  providers: [ProjectService,
    ProjectFactory,
    {
      provide: 'ProjectServiceDecorated',
      useFactory: (projectService: ProjectService) => {
        const withValidation = new ValidationProjectDecorator(projectService);
        const withLogging = new LoggingProjectDecorator(withValidation);
        const withCache = new CacheProjectDecorator(withLogging);
        return withCache;
      },
      inject: [ProjectService]
    }
  ],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule { }
