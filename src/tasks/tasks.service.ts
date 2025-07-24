import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Task } from 'src/schemas/Task.schema';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { UpdateTaskDto } from './dto/UpdateTask.dto';
import { TaskFactory } from './factory/task.factory';


@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>,
    private readonly taskFactory: TaskFactory,

  ) { }

  // ✅ Tạo mới Task
  async createTask(createTaskDto: CreateTaskDto) {
    const newTask = await this.taskFactory.create(createTaskDto);
    return await newTask.save();
  }

  // ✅ Lấy danh sách tất cả Task
  async getAllTasks(): Promise<Task[]> {
    const getAllTask = await this.taskFactory.findAll();
    return getAllTask;
  }


  async getTaskByProgressId(progressId: Types.ObjectId | string): Promise<Task[]> {
    const getIdTaskbyProgress = await this.taskFactory.findByProgressId(progressId);
    return getIdTaskbyProgress;
  }

  // ✅ Lấy Task theo ID
  async getTaskById(id: Types.ObjectId | string): Promise<Task> {
    const getIdTask = await this.taskFactory.findById(id);
    return getIdTask;
  }

  // ✅ Cập nhật Task
  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updateTask = await this.taskFactory.update(id, updateTaskDto);
    return updateTask;
  }

  // ✅ Xóa Task
  async deleteTask(id: string): Promise<{ message: string }> {
    const deleteTask = await this.taskFactory.delete(id);
    return deleteTask;
  }
}
