import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateTaskDto } from '../dto/CreateTask.dto';
import { UpdateTaskDto } from '../dto/UpdateTask.dto';

import { Task } from 'src/schemas/Task.schema';
import { BaseTaskDecorator, ITaskService } from './base-task.decorator';

@Injectable()
export class ValidationTaskDecorator extends BaseTaskDecorator {
  constructor(taskService: ITaskService) {
    super(taskService);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    this.validateTaskData(createTaskDto);
    return super.createTask(createTaskDto);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    this.validateTaskData(updateTaskDto);
    return super.updateTask(id, updateTaskDto);
  }

  private validateTaskData(taskDto: CreateTaskDto | UpdateTaskDto): void {
    if (!taskDto.taskName || taskDto.taskName.length < 3) {
      throw new BadRequestException('Tiêu đề nhiệm vụ phải có ít nhất 3 ký tự');
    }

    if (taskDto.description && taskDto.description.length < 10) {
      throw new BadRequestException('Mô tả nhiệm vụ phải có ít nhất 10 ký tự');
    }
  }
}
