import { Progress } from "src/schemas/Progress.schema";
import { CreateProgressDto } from "../dto/CreateProgress.dto";
import { Types } from "mongoose";
import { UpdateProgressDto } from "../dto/UpdateProgress.dto";

// Interface định nghĩa các phương thức cơ bản của ProgressService
export interface IProgressService {
    createProgress(createProgressDto: CreateProgressDto): Promise<Progress>;
    getAllProgresses(): Promise<Progress[]>;
    getProgressById(id: Types.ObjectId | string): Promise<Progress>;
    getProgressByProjectId(projectId: Types.ObjectId | string): Promise<Progress[]>;
    updateProgress(id: string, updateProgressDto: UpdateProgressDto): Promise<Progress>;
    deleteProgress(id: string): Promise<Progress>;

}

// Base decorator class
export abstract class BaseProgressDecorator implements IProgressService {
    constructor(protected readonly progressService: IProgressService) { }

    createProgress(createProgressDto: CreateProgressDto): Promise<Progress> {
        return this.progressService.createProgress(createProgressDto);
    }

    getAllProgresses(): Promise<Progress[]> {
        return this.progressService.getAllProgresses();
    }

    getProgressById(id: Types.ObjectId | string): Promise<Progress> {
        return this.progressService.getProgressById(id);
    }

    getProgressByProjectId(projectId: Types.ObjectId | string): Promise<Progress[]> {
        return this.progressService.getProgressByProjectId(projectId);
    }

    updateProgress(id: string, updateProgressDto: UpdateProgressDto): Promise<Progress> {
        return this.progressService.updateProgress(id, updateProgressDto);
    }

    deleteProgress(id: string): Promise<Progress> {
        return this.progressService.deleteProgress(id);
    }
}