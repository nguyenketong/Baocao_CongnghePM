import { DesignationService } from './designations.service';
import { CreateDesignationDto } from './dto/CreateDesignation.dto';
import mongoose from 'mongoose';
import { UpdateDesignationDto } from './dto/UpdateDesignation.dto';
export declare class DesignationController {
    private readonly designationService;
    constructor(designationService: DesignationService);
    create(createDesignationDto: CreateDesignationDto): Promise<import("../schemas/Designation.schema").Designation>;
    getDesignation(): Promise<(mongoose.Document<unknown, {}, import("../schemas/Designation.schema").Designation> & import("../schemas/Designation.schema").Designation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getDesignationById(id: string): Promise<mongoose.Document<unknown, {}, import("../schemas/Designation.schema").Designation> & import("../schemas/Designation.schema").Designation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateDesignation(id: string, updateDesignationDto: UpdateDesignationDto): Promise<mongoose.Document<unknown, {}, import("../schemas/Designation.schema").Designation> & import("../schemas/Designation.schema").Designation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteDesignation(id: string): Promise<mongoose.Document<unknown, {}, import("../schemas/Designation.schema").Designation> & import("../schemas/Designation.schema").Designation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
