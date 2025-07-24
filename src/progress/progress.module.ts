import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Progress, ProgressSchema } from 'src/schemas/Progress.schema';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { ProgressCategoryModule } from 'src/progresscategories/progressCategories.module';
import { NotificationModule } from 'src/notifications/notifications.module';
import { EmployeeModule } from 'src/employees/employees.module';
import { Employee, EmployeeSchema } from 'src/schemas/Employee.schema';
import { NotificationSent, NotificationSentSchema } from 'src/schemas/NotificationSent.schema';
import { ProgressCategory, ProgressCategorySchema } from 'src/schemas/ProgressCategory.schema';
import { Project, ProjectSchema } from 'src/schemas/Project.schema';
import { ProjectModule } from 'src/projects/projects.module';
import { CacheProgressDecorator } from './decorators/cache-progress.decorator';
import { LoggingProgressDecorator } from './decorators/logging-progress.decorator';
import { ValidationProgressDecorator } from './decorators/validation-progress.decorator';
import { ProgressFactory } from './factory/progress.factory';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Progress.name, schema: ProgressSchema },
      { name: Employee.name, schema: EmployeeSchema },
      { name: NotificationSent.name, schema: NotificationSentSchema },
      { name: ProgressCategory.name, schema: ProgressCategorySchema },
      { name: Project.name, schema: ProjectSchema },
    ]),
    ProgressCategoryModule,
    NotificationModule,
    EmployeeModule,
    ProjectModule
  ],
  providers: [ProgressService,
    ProgressFactory,
    {
      provide: 'ProgressServiceDecorated',
      useFactory: (progressService: ProgressService) => {
        const withValidation = new ValidationProgressDecorator(progressService);
        const withLogging = new LoggingProgressDecorator(withValidation);
        const withCache = new CacheProgressDecorator(withLogging);
        return withCache;
      },
      inject: [ProgressService]
    }
  ],
  controllers: [ProgressController],
  exports: [ProgressService],
})
export class ProgressModule { }
