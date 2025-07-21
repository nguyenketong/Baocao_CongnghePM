import axios from 'axios';
import { IEmployeeRepository } from './employeeRepository';

const API_BASE_URL = 'http://localhost:3000';
const API_DEPARTMENT_URL = `${API_BASE_URL}/departments`;
const API_DESIGNATION_URL = `${API_BASE_URL}/designations`;
const API_EMPLOYEE_URL = `${API_BASE_URL}/employees`;

export class EmployeeRepositoryImpl implements IEmployeeRepository {
  async getDepartments() {
    const response = await axios.get(API_DEPARTMENT_URL);
    return response.data;
  }

  async getDesignations() {
    const response = await axios.get(API_DESIGNATION_URL);
    return response.data;
  }

  async updateEmployee(id: string, formData: FormData) {
    const response = await axios.put(`${API_EMPLOYEE_URL}/${id}`, formData);
    return response.data;
  }
}
