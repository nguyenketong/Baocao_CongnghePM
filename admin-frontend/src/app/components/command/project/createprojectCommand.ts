// commands/CreateProjectCommand.ts
import { toast } from 'react-toastify';
import { mutate } from 'swr';

import { ProjectData } from '@/app/models/project';
import { ProjectRepository } from '../../Item/project/createProject/ProjectRepository';

const API_PROJECT_URL = 'http://localhost:3000/projects';

export class CreateProjectCommand {
  private data: ProjectData;
  private file: File | null;
  private onSuccess: () => void;

  constructor(data: ProjectData, file: File | null, onSuccess: () => void) {
    this.data = data;
    this.file = file;
    this.onSuccess = onSuccess;
  }

  async execute() {
    try {
      await ProjectRepository.createProject(this.data, this.file);
      toast.success('Project created successfully');
      mutate(API_PROJECT_URL);
      this.onSuccess();
    } catch  {
      toast.error('Error creating project');
    }
  }
}
