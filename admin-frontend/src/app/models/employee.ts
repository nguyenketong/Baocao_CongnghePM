import { ProjectDataEmployee } from "./project";

export interface Employee {
  _id: string;
  employeeName: string;
  employeeProfile?: string;
  joiningDate?: string;
  phone?: string;
  department_id?: {
    _id: string;
    nameDepartment: string;
  };
  designation_id?: {
    _id: string;
    designationName: string;
  };
  description?: string;
  account: {
    userName: string;
    email: string;
  };
  team_id?: {
    _id: string;
    teamName: string;
    projectid: {
      _id: string;
      projectName: string;
      projectCategory: string;
      projectImage: string;
      projectStart: string;
      projectEnd: string;
      description: string;
      budget?: number;
      priority?: string;
    };
  }[];
  tasks?: {
    _id: string;
    taskName: string;
    progressId: string;
    taskCategory: string;
    taskStart: string;
    taskEnd: string;
    priority: string;
    description: string;
    status: string;
  }[];
  projects?: ProjectDataEmployee[]; 
}


  export interface EmployeeFormData {
    _id: string;
    employeeName: string;
    employeeProfile?: FileList;
    joiningDate?: string;
    phone?: string;
    department?: string;
    designation?: string;
    description?: string;
    account: {
      userName: string;
      email: string;
    };
  }

  //create emloyeeItem
 export interface EmployeeData {
    employeeName: string;
    employeeProfile: FileList;
    joiningDate: string;
    account: {
      userName: string;
      password: string;
      email: string;
    };
    phone: string;
    department: string;
    designation: string;
    description?: string;
  }
  export interface Department {
    _id: string;
    nameDepartment: string;
  }
  
  export  interface Designation {
    _id: string;
    designationName: string;
  }