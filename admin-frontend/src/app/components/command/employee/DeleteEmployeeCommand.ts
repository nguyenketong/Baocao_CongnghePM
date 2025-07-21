
import { deleteEmployee } from "@/app/services/employeeService";
import { toast } from "react-toastify";
import { mutate } from "swr";

export class DeleteEmployeeCommand {
  private employeeId: string;

  constructor(employeeId: string) {
    this.employeeId = employeeId;
  }

  async execute() {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      await deleteEmployee(this.employeeId);
      toast.success("Employee deleted successfully");
      mutate("http://localhost:3000/employees");
    } catch (error) {
      toast.error("Failed to delete employee");
      console.error("Error deleting employee:", error);
    }
  }
}
