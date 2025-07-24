import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/CreateProgress.dto';
import { UpdateProgressDto } from './dto/UpdateProgress.dto';
export declare class ProgressController {
    private readonly progressService;
    constructor(progressService: ProgressService);
    createProgress(createProgressDto: CreateProgressDto): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../schemas/Progress.schema").Progress> & import("../schemas/Progress.schema").Progress & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    getAllProgresses(): Promise<import("../schemas/Progress.schema").Progress[]>;
    getProgressByProjectId(projectId: string): Promise<import("../schemas/Progress.schema").Progress[]>;
    getProgressById(id: string): Promise<import("../schemas/Progress.schema").Progress>;
    updateProgress(id: string, updateProgressDto: UpdateProgressDto): Promise<import("../schemas/Progress.schema").Progress>;
    deleteProgress(id: string): Promise<import("../schemas/Progress.schema").Progress>;
}
