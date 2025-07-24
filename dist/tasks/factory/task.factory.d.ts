import { Task } from 'src/schemas/Task.schema';
import { Model, Types } from 'mongoose';
import { CreateTaskDto } from '../dto/CreateTask.dto';
import { UpdateTaskDto } from '../dto/UpdateTask.dto';
import { TaskCategoryService } from 'src/taskcategories/taskCategories.service';
import { NotificationService } from 'src/notifications/notifications.service';
import { EmployeeService } from 'src/employees/employees.service';
import { ProgressService } from 'src/progress/progress.service';
export declare class TaskFactory {
    private taskModel;
    private taskCategoryService;
    private notificationService;
    private employeeService;
    private progressService;
    constructor(taskModel: Model<Task>, taskCategoryService: TaskCategoryService, notificationService: NotificationService, employeeService: EmployeeService, progressService: ProgressService);
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    findAll(): Promise<Task[]>;
    findById(id: string | Types.ObjectId): Promise<Task>;
    findByProgressId(progressId: string | Types.ObjectId): Promise<Task[]>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
