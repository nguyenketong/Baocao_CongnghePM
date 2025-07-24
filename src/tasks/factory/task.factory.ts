import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from 'src/schemas/Task.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from '../dto/CreateTask.dto';
import { UpdateTaskDto } from '../dto/UpdateTask.dto';
import { TaskCategoryService } from 'src/taskcategories/taskCategories.service';
import { NotificationService } from 'src/notifications/notifications.service';
import { EmployeeService } from 'src/employees/employees.service';
import { ProgressService } from 'src/progress/progress.service';

@Injectable()
export class TaskFactory {
  constructor(
    @InjectModel(Task.name) 
      private taskModel: Model<Task>,
       private taskCategoryService: TaskCategoryService, // Inject TaskCategoryService
       private notificationService: NotificationService,
       private employeeService: EmployeeService,
       private progressService: ProgressService, 
  
  ) {}


  async create(createTaskDto: CreateTaskDto): Promise<Task> {
   const { taskCategory, notificationSent, taskAssignPerson, taskRecipient, progressId } = createTaskDto;
  
      if (taskCategory) {
        const taskCategoryExists = await this.taskCategoryService.getTaskCategoryById(taskCategory);
        if (!taskCategoryExists) {
          throw new BadRequestException('TaskCategory không tồn tại');
        }
      }
  
      if (notificationSent) {
        const notificationExists = await this.notificationService.getNotificationById(notificationSent);
        if (!notificationExists) {
          throw new BadRequestException('Notification không tồn tại');
        }
      }
  
      if (taskAssignPerson) {
        const taskAssignPersonExists = await this.employeeService.getEmployeeById(taskAssignPerson);
        if (!taskAssignPersonExists) {
          throw new BadRequestException('Employee không tồn tại');
        }
      }
  
      if (taskRecipient) {
        const taskRecipientExists = await this.employeeService.getEmployeeById(taskRecipient);
        if (!taskRecipientExists) {
          throw new BadRequestException('Employee không tồn tại');
        }
      }
  
      if (progressId) {
        const progressExists = await this.progressService.getProgressById(progressId);
        if (!progressExists) {
          throw new BadRequestException('Progress không tồn tại');
        }
      }
  
      const newTask = new this.taskModel(createTaskDto);
      return await newTask.save();
  }

  // 🔍 Lấy tất cả Task
  async findAll(): Promise<Task[]> {
    return await this.taskModel
      .find()
      .populate(['taskCategory', 'notificationSent', 'taskAssignPerson', 'taskRecipient', 'progressId'])
      .exec();
  }

  // 🔍 Lấy Task theo ID
  async findById(id: string | Types.ObjectId): Promise<Task> {
    const task = await this.taskModel
      .findById(id)
      .populate(['taskCategory', 'notificationSent', 'taskAssignPerson', 'taskRecipient', 'progressId'])
      .exec();

    if (!task) {
      throw new NotFoundException('Task không tồn tại');
    }
    return task;
  }

  // 🔍 Lấy Task theo Progress ID
  async findByProgressId(progressId: string | Types.ObjectId): Promise<Task[]> {
    const progressObjectId = Types.ObjectId.isValid(progressId) ? new Types.ObjectId(progressId) : progressId;
    const tasks = await this.taskModel
      .find({ progressId: progressObjectId })
      .populate(['taskCategory', 'notificationSent', 'taskAssignPerson', 'taskRecipient', 'progressId'])
      .exec();

    if (!tasks || tasks.length === 0) {
      throw new NotFoundException('Không có nhiệm vụ nào trong tiến độ này');
    }
    return tasks;
  }

  // ✏️ Cập nhật Task
  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
    if (!updatedTask) {
      throw new NotFoundException('Không tìm thấy Task để cập nhật');
    }
    return updatedTask;
  }

  // 🗑️ Xóa Task
  async delete(id: string): Promise<{ message: string }> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id);
    if (!deletedTask) {
      throw new NotFoundException('Không tìm thấy Task để xóa');
    }
    return { message: 'Task đã được xóa thành công' };
  }
}
