import { ApiTeamService } from './ApiTeamService';

export class ApiTeamProxy extends ApiTeamService {
  private cache: Map<string, any> = new Map();

  async fetchProjects() {
    if (this.cache.has('projects')) {
      console.log('Returning cached projects');
      return this.cache.get('projects');
    }
    const response = await super.fetchProjects();
    this.cache.set('projects', response);
    return response;
  }

  async fetchEmployees() {
    if (this.cache.has('employees')) {
      console.log('Returning cached employees');
      return this.cache.get('employees');
    }
    const response = await super.fetchEmployees();
    this.cache.set('employees', response);
    return response;
  }

  async fetchProjectsForPM(employeeId: string) {
    if (this.cache.has(`projects_pm_${employeeId}`)) {
      console.log(`Returning cached projects for PM ${employeeId}`);
      return this.cache.get(`projects_pm_${employeeId}`);
    }
    const response = await super.fetchProjectsForPM(employeeId);
    this.cache.set(`projects_pm_${employeeId}`, response);
    return response;
  }
}
