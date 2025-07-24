import { Model, Types } from 'mongoose';
import { Task } from 'src/schemas/Task.schema';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { UpdateTaskDto } from './dto/UpdateTask.dto';
import { TaskFactory } from './factory/task.factory';
export declare class TaskService {
    private taskModel;
    private readonly taskFactory;
    constructor(taskModel: Model<Task>, taskFactory: TaskFactory);
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    getAllTasks(): Promise<Task[]>;
    getTaskByProgressId(progressId: Types.ObjectId | string): Promise<Task[]>;
    getTaskById(id: Types.ObjectId | string): Promise<Task>;
    updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task>;
    deleteTask(id: string): Promise<{
        message: string;
    }>;
}
