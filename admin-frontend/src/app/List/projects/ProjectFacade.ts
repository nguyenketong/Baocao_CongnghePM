import { FilterProjectCommand, PaginateProjectCommand, SortProjectCommand } from "@/app/command/projectCommand";
import { Project } from "@/app/models/project";


export class ProjectFacade {
  static processProjects(projects: Project[], filterText: string, sortBy: 'projectName' | 'projectStart', page: number, pageSize: number) {
    const filteredProjects = new FilterProjectCommand(projects, filterText).execute();
    const sortedProjects = new SortProjectCommand(filteredProjects, sortBy).execute();
    return new PaginateProjectCommand(sortedProjects, page, pageSize).execute();
  }
}
