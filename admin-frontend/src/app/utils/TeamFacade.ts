// services/TeamFacade.ts
import { toast } from 'react-toastify';
import { addTeamMember, updateTeam } from '../services/teamService';
import { teamObserver } from '@/app/utils/observer';
import { mutate } from 'swr';

const API_BASE_URL = 'http://localhost:3000';
const API_EMPLOYEE_URL = `${API_BASE_URL}/employees`;
const API_TEAM_URL = `${API_BASE_URL}/teams`;

interface Employee {
  _id: string;
  employeeName: string;
  employeeProfile: string;
  joiningDate: string;
  phone: string;
  description: string;
  team_id: string[];
  department_id: string;
  designation_id: {
    _id: string;
    designationName: string;
  };
  account: string;
}

class TeamFacade {
  private teamId: string;

  constructor(teamId: string) {
    this.teamId = teamId;
  }

  static getCurrentEmployee() {
    const employeeStr = localStorage.getItem('employee');
    if (!employeeStr) return null;
    try {
      return JSON.parse(employeeStr);
    } catch (error) {
      console.error('Error parsing employee data:', error);
      return null;
    }
  }

  async fetchAvailableEmployees(): Promise<Employee[]> {
    try {
      const teamResponse = await fetch(`${API_TEAM_URL}/${this.teamId}/members`);
      if (!teamResponse.ok) throw new Error('Không thể tải danh sách thành viên team');
      const teamData = await teamResponse.json();
      const currentTeamMemberIds = new Set(teamData.members.map((member: any) => member._id));

      const response = await fetch(API_EMPLOYEE_URL);
      if (!response.ok) throw new Error('Không thể tải danh sách nhân viên');
      const allEmployees = await response.json();

      const excludedDesignations = [
        'IT Project Manager',
        'Product Manager',
        'Admin',
        'manager',
        'Technical Lead'
      ];

      return allEmployees.filter((emp: Employee) =>
        emp._id && emp.employeeName && !currentTeamMemberIds.has(emp._id) &&
        !excludedDesignations.includes(emp.designation_id?.designationName)
      );
    } catch (error) {
      console.error('Lỗi khi tải danh sách nhân viên:', error);
      throw error;
    }
  }

  static async fetchTechnicalLeads() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_EMPLOYEE_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Không thể lấy danh sách Technical Leads');
      const employees = await response.json();
      return employees.filter((employee: Employee) => employee.designation_id?.designationName === 'Technical Lead');
    } catch (error) {
      console.error('Error fetching technical leads:', error);
      throw error;
    }
  }

  static async fetchProjectsForPM(employeeId: string) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/employees/pm/${employeeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Cannot fetch PM projects");
      return await response.json();
    } catch (error) {
      console.error('Error fetching PM projects:', error);
      throw error;
    }
  }

  async addMember(employeeId: string): Promise<void> {
    try {
      const result = await addTeamMember(this.teamId, employeeId);

      if (result.success) {
        toast.success('Thêm thành viên vào team thành công');
        const updatedTeamRes = await fetch(`${API_TEAM_URL}/${this.teamId}`);
        if (updatedTeamRes.ok) {
          const updatedTeam = await updatedTeamRes.json();
          teamObserver.notify(updatedTeam);
        }
      } else {
        throw new Error(result.message || 'Không thể thêm thành viên vào team');
      }
    } catch (error) {
      console.error('Lỗi khi thêm thành viên:', error);
      throw error;
    }
  }

  static async updateTeamData(teamId: string, updateData: any) {
    try {
      const updatedTeam = await updateTeam(teamId, updateData);
      toast.success('Team updated successfully');
      mutate(`${API_TEAM_URL}`);
      return updatedTeam;
    } catch (error) {
      toast.error('Error updating team');
      console.error('Error:', error);
      throw error;
    }
  }
}

export default TeamFacade;
