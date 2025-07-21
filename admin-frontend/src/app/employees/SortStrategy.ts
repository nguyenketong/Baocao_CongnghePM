import { Employee } from "../models/employee";

export interface SortStrategy {
  sort(employees: Employee[]): Employee[];
}

export class SortByName implements SortStrategy {
  sort(employees: Employee[]): Employee[] {
    return [...employees].sort((a, b) => a.employeeName.localeCompare(b.employeeName));
  }
}



export class SortByDepartment implements SortStrategy {
  sort(employees: Employee[]): Employee[] {
    return [...employees].sort((a, b) => 
      (a.department_id?.nameDepartment || "").localeCompare(b.department_id?.nameDepartment || "")
    );
  }
}
