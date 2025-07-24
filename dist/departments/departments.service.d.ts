import { Department } from './../schemas/Department.schema';
import { Model, Types } from 'mongoose';
import { CreateDepartmentDto } from './dto/CreateDepartment.dto';
import { UpdateDepartmentDto } from './dto/UpdateDepartment.dto';
export declare class DepartmentService {
    private departmentModel;
    constructor(departmentModel: Model<Department>);
    create(createDepartmentDto: CreateDepartmentDto): Promise<Department>;
    getDepartment(): Promise<(import("mongoose").Document<unknown, {}, Department> & Department & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getDepartmentById(id: Types.ObjectId | string): Promise<(import("mongoose").Document<unknown, {}, Department> & Department & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    updateDepartment(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<(import("mongoose").Document<unknown, {}, Department> & Department & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    deleteDepartment(id: string): Promise<(import("mongoose").Document<unknown, {}, Department> & Department & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
