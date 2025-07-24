import { Progress } from "src/schemas/Progress.schema";
import { CreateProgressDto } from "../dto/CreateProgress.dto";
import { Types } from "mongoose";
import { UpdateProgressDto } from "../dto/UpdateProgress.dto";
export interface IProgressService {
    createProgress(createProgressDto: CreateProgressDto): Promise<Progress>;
    getAllProgresses(): Promise<Progress[]>;
    getProgressById(id: Types.ObjectId | string): Promise<Progress>;
    getProgressByProjectId(projectId: Types.ObjectId | string): Promise<Progress[]>;
    updateProgress(id: string, updateProgressDto: UpdateProgressDto): Promise<Progress>;
    deleteProgress(id: string): Promise<Progress>;
}
export declare abstract class BaseProgressDecorator implements IProgressService {
    protected readonly progressService: IProgressService;
    constructor(progressService: IProgressService);
    createProgress(createProgressDto: CreateProgressDto): Promise<Progress>;
    getAllProgresses(): Promise<Progress[]>;
    getProgressById(id: Types.ObjectId | string): Promise<Progress>;
    getProgressByProjectId(projectId: Types.ObjectId | string): Promise<Progress[]>;
    updateProgress(id: string, updateProgressDto: UpdateProgressDto): Promise<Progress>;
    deleteProgress(id: string): Promise<Progress>;
}
