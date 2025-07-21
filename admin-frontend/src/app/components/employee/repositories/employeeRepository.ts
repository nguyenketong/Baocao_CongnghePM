import { Department } from "@/app/models/department";
import { Employee } from "@/app/models/employee";
import { Designation } from "@/app/services/designationService";

export interface IEmployeeRepository {
    getDepartments(): Promise<Department>;
    getDesignations(): Promise<Designation>;
    updateEmployee(id: string, formData: FormData): Promise<Employee>;
  }
  