import { Project } from "@/app/models/project";

export class PaginateProjectCommand {
    constructor(private projects: Project[], private page: number, private pageSize: number) {}
  
    execute() {
      const start = (this.page - 1) * this.pageSize;
      return this.projects.slice(start, start + this.pageSize);
    }
  }
  