import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export class ApiTeamService {
  async fetchProjects() {
    const token = localStorage.getItem('token');
    return await axios.get(`${API_BASE_URL}/projects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async fetchEmployees() {
    const token = localStorage.getItem('token');
    return await axios.get(`${API_BASE_URL}/employees`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async fetchProjectsForPM(employeeId: string) {
    const token = localStorage.getItem('token');
    return await axios.get(`${API_BASE_URL}/employees/pm/${employeeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
