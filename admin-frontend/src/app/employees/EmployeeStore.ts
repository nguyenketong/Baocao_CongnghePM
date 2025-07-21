// EmployeeStore.ts
import axios from "axios";
import { Employee } from "../models/employee";

class EmployeeStore {
  private static instance: EmployeeStore;
  private observers: (() => void)[] = [];
  private employees: Employee[] = [];

  private constructor() {} // Ngăn chặn khởi tạo từ bên ngoài

  static getInstance(): EmployeeStore {
    if (!EmployeeStore.instance) {
      EmployeeStore.instance = new EmployeeStore();
    }
    return EmployeeStore.instance;
  }

  getEmployees(): Employee[] {
    return this.employees;
  }

  async fetchEmployees() {
    try {
      const response = await axios.get("http://localhost:3000/employees");
      this.employees = response.data;
      this.notifyObservers();
    } catch (error) {
      console.error("Lỗi khi lấy danh sách nhân viên:", error);
    }
  }

  addObserver(observer: () => void) {
    this.observers.push(observer);
  }

  removeObserver(observer: () => void) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  private notifyObservers() {
    this.observers.forEach((obs) => obs());
  }
}

export const employeeStore = EmployeeStore.getInstance();
