import { Employee } from "@/app/models/employee";

export class EmployeeFactory {
  static createEmployee(data: Partial<Employee>): Employee {
    return {
      _id: data._id || "",
      employeeName: data.employeeName || "Unknown",
      employeeProfile: data.employeeProfile || "/default-profile.jpg",
      account: data.account || { userName: "No username", email: "No email" }, // ✅ Thêm userName
      designation_id: data.designation_id || { _id: "", designationName: "No Designation" }, // ✅ Thêm _id
      description: data.description || "",
    };
  }
}
