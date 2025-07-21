import axios from "axios";
import { EmployeeData } from "@/app/models/employee";
import { mutate } from "swr";

const API_EMPLOYEE_URL = "http://localhost:3000/employees";

export class CreateEmployeeCommand {
  private employeeData: EmployeeData;
  private file: File | null;

  constructor(employeeData: EmployeeData, file: File | null) {
    this.employeeData = employeeData;
    this.file = file;
  }

  async execute() {
    const formData = new FormData();

    // Thêm thông tin Employee
    formData.append("employeeName", this.employeeData.employeeName.trim());
    if (this.file) {
      formData.append("employeeProfile", this.file);
    }
    formData.append("joiningDate", this.employeeData.joiningDate);
    formData.append("phone", this.employeeData.phone.trim());
    formData.append("description", (this.employeeData.description || "").trim());
    formData.append("department_id", this.employeeData.department);
    formData.append("designation_id", this.employeeData.designation);

    // Thêm thông tin tài khoản
    formData.append("account[userName]", this.employeeData.account.userName.trim());
    formData.append("account[password]", this.employeeData.account.password);
    formData.append("account[email]", this.employeeData.account.email.trim());

    try {
      const response = await axios.post(API_EMPLOYEE_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201 || response.status === 200) {
        mutate(API_EMPLOYEE_URL);
        return { success: true, message: "Employee created successfully" };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { success: false, message: error.response?.data?.message || "Error creating employee" };
      }
      return { success: false, message: "An unexpected error occurred" };
    }
  }
}
