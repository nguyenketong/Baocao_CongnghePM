import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/schemas/Task.schema';  // Chỉnh sửa tên schema thành Task

import { TaskCategoryModule } from 'src/taskcategories/taskCategories.module';  // Chỉnh sửa tên module TaskCategory
import { NotificationModule } from 'src/notifications/notifications.module';
import { EmployeeModule } from 'src/employees/employees.module';
import { Employee, EmployeeSchema } from 'src/schemas/Employee.schema';
import { NotificationSent, NotificationSentSchema } from 'src/schemas/NotificationSent.schema';
import { TaskCategory, TaskCategorySchema } from 'src/schemas/TaskCategory.schema';  // Sửa lại TaskCategorySchema
import { Progress, ProgressSchema } from 'src/schemas/Progress.schema';
import { ProgressModule } from 'src/progress/progress.module';
import { TaskService } from './tasks.service';
import { TaskController } from './tasks.controller';
import { TaskFactory } from './factory/task.factory';

import { CacheTaskDecorator } from './decorators/cache-task.decorator';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: Task.name, schema: TaskSchema },  // Sửa lại TaskSchema
        { name: Employee.name, schema: EmployeeSchema },
        { name: NotificationSent.name, schema: NotificationSentSchema },
        { name: TaskCategory.name, schema: TaskCategorySchema },  // Chỉnh sửa thành TaskCategory
        { name: Progress.name, schema: ProgressSchema },
    ]),
    TaskCategoryModule, 
    NotificationModule,
    EmployeeModule,
    ProgressModule
  ],
  providers: [TaskService,TaskFactory,
    {
        provide: 'TaskServiceDecorated',
        useFactory: (taskService: TaskService) => new CacheTaskDecorator(taskService),
        inject: [TaskService],
    }
  
  ],  
  controllers: [TaskController],  
  exports: [TaskService,'TaskServiceDecorated'],  
})
export class TaskModule {}
