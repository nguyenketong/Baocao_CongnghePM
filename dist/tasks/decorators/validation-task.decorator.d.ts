import { CreateTaskDto } from '../dto/CreateTask.dto';
import { UpdateTaskDto } from '../dto/UpdateTask.dto';
import { Task } from 'src/schemas/Task.schema';
import { BaseTaskDecorator, ITaskService } from './base-task.decorator';
export declare class ValidationTaskDecorator extends BaseTaskDecorator {
    constructor(taskService: ITaskService);
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task>;
    private validateTaskData;
}
