import { Task } from 'src/schemas/Task.schema';
import { CreateTaskDto } from '../dto/CreateTask.dto';
import { UpdateTaskDto } from '../dto/UpdateTask.dto';

export interface ITaskService {
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    getAllTasks(): Promise<Task[]>;
    getTaskById(id: string): Promise<Task>;
    getTaskByProgressId(progressId: string): Promise<Task[]>;
    updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task>;
    deleteTask(id: string): Promise<{ message: string }>;
}
export abstract class BaseTaskDecorator implements ITaskService {
    constructor(protected readonly taskService: ITaskService) {}

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(createTaskDto);
    }

    getAllTasks(): Promise<Task[]> {
        return this.taskService.getAllTasks();
    }

    getTaskById(id: string): Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    getTaskByProgressId(progressId: string): Promise<Task[]> {
        return this.taskService.getTaskByProgressId(progressId);
    }

    updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        return this.taskService.updateTask(id, updateTaskDto);
    }

    deleteTask(id: string): Promise<{ message: string }> {
        return this.taskService.deleteTask(id);
    }
}
