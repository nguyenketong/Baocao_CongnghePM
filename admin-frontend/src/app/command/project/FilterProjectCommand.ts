import { Project } from "@/app/models/project";

export class FilterProjectCommand {
    constructor(private projects: Project[], private filterText: string) {}
  
    execute() {
      return this.projects.filter((project) =>
        project.projectName.toLowerCase().includes(this.filterText.toLowerCase())
      );
    }
  }
  