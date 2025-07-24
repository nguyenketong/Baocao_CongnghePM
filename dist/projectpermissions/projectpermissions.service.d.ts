import { Model } from 'mongoose';
import { ProjectPermissions } from '../schemas/ProjectPermissions.schema';
import { CreateProjectPermissionsDto } from './dto/CreateProjectPermission.dto';
import { UpdateProjectPermissionsDto } from './dto/UpdateProjectPermission.dto';
export declare class ProjectPermissionsService {
    private projectPermissionsModel;
    constructor(projectPermissionsModel: Model<ProjectPermissions>);
    createProjectPermission(createProjectPermissionDto: CreateProjectPermissionsDto): Promise<ProjectPermissions>;
    getAll(): Promise<(import("mongoose").Document<unknown, {}, ProjectPermissions> & ProjectPermissions & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getByEmployee(employee_id: string): Promise<(import("mongoose").Document<unknown, {}, ProjectPermissions> & ProjectPermissions & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    update(permission_id: string, updateProjectPermissionDto: UpdateProjectPermissionsDto): Promise<import("mongoose").Document<unknown, {}, ProjectPermissions> & ProjectPermissions & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    delete(permission_id: string): Promise<import("mongoose").Document<unknown, {}, ProjectPermissions> & ProjectPermissions & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
