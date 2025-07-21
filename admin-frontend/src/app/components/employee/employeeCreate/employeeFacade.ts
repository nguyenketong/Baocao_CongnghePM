import axios from 'axios';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { EmployeeData } from '@/app/models/employee';
import { createEmployeeFormData } from './formDataFactory';
import { employeeObserver } from './observer';

const API_BASE_URL = 'http://localhost:3000';
const API_DEPARTMENT_URL = `${API_BASE_URL}/departments`;
const API_DESIGNATION_URL = `${API_BASE_URL}/designations`;
const API_EMPLOYEE_URL = `${API_BASE_URL}/employees`;

export class EmployeeFacade {
  static async fetchDepartmentsAndDesignations() {
    try {
      const [deptRes, desigRes] = await Promise.all([
        axios.get(API_DEPARTMENT_URL),
        axios.get(API_DESIGNATION_URL)
      ]);
      return { departments: deptRes.data, designations: desigRes.data };
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load initial data');
      return { departments: [], designations: [] };
    }
  }

  static async createEmployee(data: EmployeeData, file: File | null, reset: () => void, onClose: () => void) {
    try {
      const formData = createEmployeeFormData(data, file);
      const response = await axios.post(API_EMPLOYEE_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 201 || response.status === 200) {
        toast.success('Employee created successfully');
        reset();
        mutate(API_EMPLOYEE_URL);
        employeeObserver.notify();
        onClose();
      }
    } catch (error) {
      toast.error('Error creating employee');
      console.error('Error:', error);
    }
  }
}
