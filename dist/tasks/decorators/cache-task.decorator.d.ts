import { Task } from 'src/schemas/Task.schema';
import { CreateTaskDto } from '../dto/CreateTask.dto';
import { UpdateTaskDto } from '../dto/UpdateTask.dto';
import { BaseTaskDecorator, ITaskService } from './base-task.decorator';
export declare class CacheTaskDecorator extends BaseTaskDecorator {
    private cache;
    constructor(taskService: ITaskService);
    getAllTasks(): Promise<Task[]>;
    getTaskById(id: string): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task>;
    deleteTask(id: string): Promise<{
        message: string;
    }>;
}
