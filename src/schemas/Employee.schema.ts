import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';



@Schema()
export class Employee extends Document {
  @Prop({ required: true, trim: true })
  employeeName: string;

  @Prop({ required: false, trim: true })
  employeeProfile?: string;

  @Prop({ required: true, type: Date })
  joiningDate: Date;

  @Prop({
    required: false,
    trim: true,
    match: [/^\+?[0-9]{7,15}$/, 'Số điện thoại không hợp lệ'],
  })
  phone?: string;

  @Prop({ required: false, trim: true, maxlength: 500 })
  description?: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }] })
  team_id?: mongoose.Types.ObjectId[];
  

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Department' })
  department_id?: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Designation' })
  designation_id?: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  account?: mongoose.Types.ObjectId;
  
  

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'ProjectPermissions' })
  projectpermission?: Types.ObjectId[];
}

// 🔹 Tạo Schema từ class Employee
const EmployeeSchema = SchemaFactory.createForClass(Employee);

// 🔹 Thêm Virtual Populate để lấy danh sách Task của Employee
EmployeeSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',            // Employee._id
  foreignField: 'taskRecipient', // Task.taskRecipient
});

// 🔹 Bật Virtuals khi chuyển đổi JSON hoặc Object
EmployeeSchema.set('toJSON', { virtuals: true });
EmployeeSchema.set('toObject', { virtuals: true });

// 🔹 Xuất Schema duy nhất một lần
export { EmployeeSchema };
