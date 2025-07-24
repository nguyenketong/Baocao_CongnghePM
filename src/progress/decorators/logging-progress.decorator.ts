import { Injectable, Logger } from '@nestjs/common';
import { Progress } from 'src/schemas/Progress.schema';
import { CreateProgressDto } from '../dto/CreateProgress.dto';
import { BaseProgressDecorator, IProgressService } from './base-progress.decorator';

@Injectable()
export class LoggingProgressDecorator extends BaseProgressDecorator {
    private readonly logger = new Logger(LoggingProgressDecorator.name);

    constructor(progressService: IProgressService) {
        super(progressService);
    }

    async createProgress(createProgressDto: CreateProgressDto): Promise<Progress> {
        this.logger.log(`Creating progress with name: ${createProgressDto.progressName}`);
        const result = await super.createProgress(createProgressDto);
        this.logger.log(`Progress created successfully with ID: ${result._id}`);
        return result;
    }

    async deleteProgress(id: string): Promise<Progress> {
        this.logger.log(`Attempting to delete progress with ID: ${id}`);
        const result = await super.deleteProgress(id);
        this.logger.log(`Progress deleted successfully: ${id}`);
        return result;
    }
}
