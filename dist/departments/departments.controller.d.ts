import { DepartmentService } from './departments.service';
import { CreateDepartmentDto } from './dto/CreateDepartment.dto';
import mongoose from 'mongoose';
import { UpdateDepartmentDto } from './dto/UpdateDepartment.dto';
export declare class DepartmentController {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    create(createDepartmentDto: CreateDepartmentDto): Promise<import("../schemas/Department.schema").Department>;
    getDepartment(): Promise<(mongoose.Document<unknown, {}, import("../schemas/Department.schema").Department> & import("../schemas/Department.schema").Department & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getDepartmentById(id: string): Promise<mongoose.Document<unknown, {}, import("../schemas/Department.schema").Department> & import("../schemas/Department.schema").Department & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateDepartment(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<mongoose.Document<unknown, {}, import("../schemas/Department.schema").Department> & import("../schemas/Department.schema").Department & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteDepartment(id: string): Promise<mongoose.Document<unknown, {}, import("../schemas/Department.schema").Department> & import("../schemas/Department.schema").Department & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
