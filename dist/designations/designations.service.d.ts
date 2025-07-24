import { Model, Types } from 'mongoose';
import { Designation } from '../schemas/Designation.schema';
import { CreateDesignationDto } from './dto/CreateDesignation.dto';
import { UpdateDesignationDto } from './dto/UpdateDesignation.dto';
export declare class DesignationService {
    private designationModel;
    constructor(designationModel: Model<Designation>);
    create(createDesignationDto: CreateDesignationDto): Promise<Designation>;
    getDesignation(): Promise<(import("mongoose").Document<unknown, {}, Designation> & Designation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getDesignationById(id: Types.ObjectId | string): Promise<(import("mongoose").Document<unknown, {}, Designation> & Designation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    updateDesignation(id: string, updateDesignationDto: UpdateDesignationDto): Promise<(import("mongoose").Document<unknown, {}, Designation> & Designation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    deleteDesignation(id: string): Promise<(import("mongoose").Document<unknown, {}, Designation> & Designation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
