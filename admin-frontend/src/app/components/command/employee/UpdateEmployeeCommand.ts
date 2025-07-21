import axios from 'axios';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

import { EmployeeFormData } from '@/app/models/employee'; // Thay any bằng kiểu dữ liệu cụ thể

import { EmployeeSubject } from '../../employee/employeeEdit/EmployeeObserver';
import { UpdateEmployeeContext, UpdateWithImageStrategy, UpdateWithoutImageStrategy } from '../../employee/employeeEdit/UpdateEmployeeStrategy';

const API_BASE_URL = 'http://localhost:3000';
const CURRENT_USER = 'HMK1510';
const CURRENT_UTC_TIME = '2025-02-16 07:40:55';

export class UpdateEmployeeCommand {
  private employeeId: string;
  private data: EmployeeFormData; // Thay any bằng EmployeeFormData
  private file: File | null;
  private setIsSubmitting: (value: boolean) => void;
  private onClose: () => void;
  private observerSubject: EmployeeSubject;
  constructor(
    employeeId: string,
    data: EmployeeFormData, // Thay any bằng EmployeeFormData
    file: File | null,
    setIsSubmitting: (value: boolean) => void,
    onClose: () => void,
    observerSubject: EmployeeSubject
  ) {
    this.employeeId = employeeId;
    this.data = data;
    this.file = file;
    this.setIsSubmitting = setIsSubmitting;
    this.onClose = onClose;
    this.observerSubject = observerSubject;
  }

  private formatDateForServer(dateString: string) {
    try {
      const date = new Date(dateString);
      return date.toISOString();
    } catch (error) {
      console.error('Error formatting date:', error);
      return null;
    }
  }

  public async execute() {
    this.setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('employeeName', this.data.employeeName.trim());
      if (this.file) formData.append('employeeProfile', this.file);
      if (this.data.joiningDate) {
        const formattedDate = this.formatDateForServer(this.data.joiningDate);
        if (formattedDate) formData.append('joiningDate', formattedDate);
      }
      if (this.data.phone) formData.append('phone', this.data.phone.trim());
      if (this.data.description) formData.append('description', this.data.description.trim());
      if (this.data.department) formData.append('department_id', this.data.department);
      if (this.data.designation) formData.append('designation_id', this.data.designation);
      
      formData.append('lastUpdatedBy', CURRENT_USER);
      formData.append('lastUpdatedAt', CURRENT_UTC_TIME);

      // Chọn chiến lược cập nhật
      const strategy = this.file ? new UpdateWithImageStrategy() : new UpdateWithoutImageStrategy();
      const context = new UpdateEmployeeContext(strategy);
      await context.executeStrategy(this.employeeId, formData);
      toast.success('Employee updated successfully');
      mutate(`${API_BASE_URL}/employees`);
       // Thông báo đến observer
       this.observerSubject.notifyObservers(this.employeeId);
      this.onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        toast.error(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage || 'Error updating employee');
        console.error('API Error:', error.response?.data);
      } else {
        toast.error('An unexpected error occurred');
        console.error('Error:', error);
      }
    } finally {
      this.setIsSubmitting(false);
    }
  }
}
