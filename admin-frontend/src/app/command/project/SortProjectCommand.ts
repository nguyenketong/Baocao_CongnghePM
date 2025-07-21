import { Project } from "@/app/models/project";

export class SortProjectCommand {
    constructor(private projects: Project[], private sortBy: 'projectName' | 'projectStart') {}
  
    execute() {
      return [...this.projects].sort((a, b) => {
        if (this.sortBy === 'projectName') {
          return a.projectName.localeCompare(b.projectName);
        }
        return new Date(a.projectStart).getTime() - new Date(b.projectStart).getTime();
      });
    }
  }
  