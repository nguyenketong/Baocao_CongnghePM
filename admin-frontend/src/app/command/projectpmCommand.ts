import { Project } from "../models/project";

// src/hooks/projectCommand.ts
export const fetchEmployeeById = async (employeeId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/employees/${employeeId}`);
      if (!response.ok) {
        throw new Error("Không thể lấy thông tin nhân viên");
      }
      return await response.json();
    } catch (error) {
      console.error("Lỗi khi lấy thông tin nhân viên:", error);
      throw error;
    }
  };
  
  export const fetchProjectsForPM = async (employeeId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/employees/pm/${employeeId}`);
      if (!response.ok) {
        throw new Error("Không thể lấy dự án của Project Manager");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Lỗi khi lấy dự án của Project Manager:", error);
      throw error;
    }
  };
  
  export const filterProjectsByAssignedPerson = (
    projects: Project[],
    employeeId: string
  ) => {
    return projects.filter((project) => String(project.assignedPerson?._id) === String(employeeId));
  };
  