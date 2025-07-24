import { Progress } from 'src/schemas/Progress.schema';
import { CreateProgressDto } from '../dto/CreateProgress.dto';
import { BaseProgressDecorator, IProgressService } from './base-progress.decorator';
export declare class LoggingProgressDecorator extends BaseProgressDecorator {
    private readonly logger;
    constructor(progressService: IProgressService);
    createProgress(createProgressDto: CreateProgressDto): Promise<Progress>;
    deleteProgress(id: string): Promise<Progress>;
}
