import { CreateTaskDto } from './dto/CreateTask.dto';
import { UpdateTaskDto } from './dto/UpdateTask.dto';
import { TaskService } from './tasks.service';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    createTask(createTaskDto: CreateTaskDto): Promise<{
        success: boolean;
        data: import("../schemas/Task.schema").Task;
    }>;
    getAllTasks(): Promise<import("../schemas/Task.schema").Task[]>;
    getTaskByProgressId(progressId: string): Promise<import("../schemas/Task.schema").Task[]>;
    getTaskById(id: string): Promise<import("../schemas/Task.schema").Task>;
    updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<import("../schemas/Task.schema").Task>;
    deleteTask(id: string): Promise<{
        message: string;
    }>;
}
