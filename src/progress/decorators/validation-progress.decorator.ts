import { BadRequestException, Injectable } from '@nestjs/common';
import { Progress } from 'src/schemas/Progress.schema';
import { CreateProgressDto } from '../dto/CreateProgress.dto';
import { UpdateProgressDto } from '../dto/UpdateProgress.dto';
import { BaseProgressDecorator, IProgressService } from './base-progress.decorator';

@Injectable()
export class ValidationProgressDecorator extends BaseProgressDecorator {
    constructor(progressService: IProgressService) {
        super(progressService);
    }

    async createProgress(createProgressDto: CreateProgressDto): Promise<Progress> {
        this.validateProgressData(createProgressDto);
        return super.createProgress(createProgressDto);
    }

    async updateProgress(id: string, updateProgressDto: UpdateProgressDto): Promise<Progress> {
        this.validateProgressData(updateProgressDto);
        return super.updateProgress(id, updateProgressDto);
    }

    private validateProgressData(progressDto: CreateProgressDto | UpdateProgressDto): void {
        if (progressDto.progressName && progressDto.progressName.length < 3) {
            throw new BadRequestException('Tên progress phải có ít nhất 3 ký tự');
        }
    }
}
