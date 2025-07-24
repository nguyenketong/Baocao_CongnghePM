import { Progress } from 'src/schemas/Progress.schema';
import { CreateProgressDto } from '../dto/CreateProgress.dto';
import { UpdateProgressDto } from '../dto/UpdateProgress.dto';
import { BaseProgressDecorator, IProgressService } from './base-progress.decorator';
export declare class ValidationProgressDecorator extends BaseProgressDecorator {
    constructor(progressService: IProgressService);
    createProgress(createProgressDto: CreateProgressDto): Promise<Progress>;
    updateProgress(id: string, updateProgressDto: UpdateProgressDto): Promise<Progress>;
    private validateProgressData;
}
