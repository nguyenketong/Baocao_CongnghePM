import { Task } from 'src/schemas/Task.schema';
import { CreateTaskDto } from '../dto/CreateTask.dto';
import { UpdateTaskDto } from '../dto/UpdateTask.dto';
export interface ITaskService {
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    getAllTasks(): Promise<Task[]>;
    getTaskById(id: string): Promise<Task>;
    getTaskByProgressId(progressId: string): Promise<Task[]>;
    updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task>;
    deleteTask(id: string): Promise<{
        message: string;
    }>;
}
export declare abstract class BaseTaskDecorator implements ITaskService {
    protected readonly taskService: ITaskService;
    constructor(taskService: ITaskService);
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    getAllTasks(): Promise<Task[]>;
    getTaskById(id: string): Promise<Task>;
    getTaskByProgressId(progressId: string): Promise<Task[]>;
    updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task>;
    deleteTask(id: string): Promise<{
        message: string;
    }>;
}
