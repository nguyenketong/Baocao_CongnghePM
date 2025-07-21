import { Employee } from "../models/employee";

class EmployeeFactory {
    static createEmployee(data: Partial<Employee>): Employee {
      return {
        _id: data._id || crypto.randomUUID(),
        employeeName: data.employeeName || "Chưa xác định",
        employeeProfile: data.employeeProfile || "",
        designation_id: data.designation_id || { _id: crypto.randomUUID(), designationName: "Không có chức vụ" },
        account: data.account || { userName: "unknown", email: "unknown@example.com" },
        description: data.description || "",
      };
    }
  }
  
  export default EmployeeFactory;
  