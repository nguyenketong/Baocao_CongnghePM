import { ProjectService } from './projects.service';
import { CreateProjectDto } from './dto/CreateProject.dto';
import { UpdateProjectDto } from './dto/UpdateProject.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    createProject(createProjectDto: CreateProjectDto, file: Express.Multer.File): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/Project.schema").Project> & import("../schemas/Project.schema").Project & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    getAllProjects(): Promise<any[]>;
    getProjectById(id: string): Promise<import("../schemas/Project.schema").Project>;
    updateProject(id: string, updateProjectDto: UpdateProjectDto, file?: Express.Multer.File): Promise<import("../schemas/Project.schema").Project>;
    deleteProject(id: string): Promise<import("../schemas/Project.schema").Project>;
}
