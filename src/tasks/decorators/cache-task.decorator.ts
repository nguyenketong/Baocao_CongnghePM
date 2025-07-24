import { Injectable } from '@nestjs/common';

import { Task } from 'src/schemas/Task.schema';
import { CreateTaskDto } from '../dto/CreateTask.dto';
import { UpdateTaskDto } from '../dto/UpdateTask.dto';
import { BaseTaskDecorator, ITaskService } from './base-task.decorator';

@Injectable()
export class CacheTaskDecorator extends BaseTaskDecorator {
  private cache: Map<string, any> = new Map();
  constructor(taskService: ITaskService) {
    super(taskService);
  }

  async getAllTasks(): Promise<Task[]> {
    const cacheKey = 'all_tasks';
    if (this.cache.has(cacheKey)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.cache.get(cacheKey);
    }

    const tasks = await super.getAllTasks();
    this.cache.set(cacheKey, tasks);
    return tasks;
  }

  async getTaskById(id: string): Promise<Task> {
    const cacheKey = `task_${id}`;
    if (this.cache.has(cacheKey)) {
 
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.cache.get(cacheKey);
    }

    const task = await super.getTaskById(id);
    this.cache.set(cacheKey, task);
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const result = await super.createTask(createTaskDto);
    this.cache.clear(); // Xóa cache khi dữ liệu thay đổi
    return result;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const result = await super.updateTask(id, updateTaskDto);
    this.cache.clear(); // Xóa cache khi dữ liệu thay đổi
    return result;
  }

  async deleteTask(id: string): Promise<{ message: string }> {
    const result = await super.deleteTask(id);
    this.cache.clear(); // Xóa cache khi dữ liệu thay đổi
    return result; // Trả về { message: string } thay vì void
  }
  
}
