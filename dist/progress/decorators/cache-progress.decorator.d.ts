import { Progress } from 'src/schemas/Progress.schema';
import { BaseProgressDecorator, IProgressService } from './base-progress.decorator';
import { Types } from 'mongoose';
export declare class CacheProgressDecorator extends BaseProgressDecorator {
    private cache;
    constructor(progressService: IProgressService);
    getAllProgresses(): Promise<Progress[]>;
    getProgressById(id: Types.ObjectId | string): Promise<Progress>;
    createProgress(createProgressDto: any): Promise<Progress>;
    updateProgress(id: string, updateProgressDto: any): Promise<Progress>;
    deleteProgress(id: string): Promise<Progress>;
}
