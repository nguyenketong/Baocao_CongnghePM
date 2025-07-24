import { CreateProjectPermissionsDto } from './dto/CreateProjectPermission.dto';
import { ProjectPermissionsService } from './projectpermissions.service';
import { UpdateProjectPermissionsDto } from './dto/UpdateProjectPermission.dto';
export declare class ProjectPermissionsController {
    private readonly projectpermissionService;
    constructor(projectpermissionService: ProjectPermissionsService);
    createProjectPermission(createProjectPermissionDto: CreateProjectPermissionsDto): Promise<{
        success: boolean;
        data: import("../schemas/ProjectPermissions.schema").ProjectPermissions;
    }>;
    getAll(): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/ProjectPermissions.schema").ProjectPermissions> & import("../schemas/ProjectPermissions.schema").ProjectPermissions & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getByEmployee(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/ProjectPermissions.schema").ProjectPermissions> & import("../schemas/ProjectPermissions.schema").ProjectPermissions & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    update(id: string, updateProjectPermissionDto: UpdateProjectPermissionsDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/ProjectPermissions.schema").ProjectPermissions> & import("../schemas/ProjectPermissions.schema").ProjectPermissions & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/ProjectPermissions.schema").ProjectPermissions> & import("../schemas/ProjectPermissions.schema").ProjectPermissions & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
