// repositories/ProjectRepository.ts
import axios from 'axios';
import { ProjectData } from '@/app/models/project';

const API_PROJECT_URL = 'http://localhost:3000/projects';

export class ProjectRepository {
  static async createProject(data: ProjectData, file: File | null) {
    try {
      const formData = new FormData();
      formData.append('projectName', data.projectName.trim());
      if (file) formData.append('projectImage', file);
      formData.append('projectStart', data.projectStart);
      formData.append('projectEnd', data.projectEnd);
      formData.append('budget', data.budget.toString());
      formData.append('priority', data.priority.trim());
      formData.append('description', data.description || '');
      formData.append('projectCategory', data.projectCategory || '');
      formData.append('notificationSent', data.notificationSent || '');
      formData.append('assignedPerson', data.assignedPerson || '');

      const response = await axios.post(API_PROJECT_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }
}
