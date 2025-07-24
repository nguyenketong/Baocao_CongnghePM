import { Injectable } from '@nestjs/common';
import { Progress } from 'src/schemas/Progress.schema';
import { BaseProgressDecorator, IProgressService } from './base-progress.decorator';
import { Types } from 'mongoose';

@Injectable()
export class CacheProgressDecorator extends BaseProgressDecorator {
    private cache: Map<string, any> = new Map();

    constructor(progressService: IProgressService) {
        super(progressService);
    }

    async getAllProgresses(): Promise<Progress[]> {
        const cacheKey = 'all_progresses';
        if (this.cache.has(cacheKey)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return this.cache.get(cacheKey);
        }

        const progresses = await super.getAllProgresses();
        this.cache.set(cacheKey, progresses);
        return progresses;
    }

    async getProgressById(id: Types.ObjectId | string): Promise<Progress> {
        const cacheKey = `progress_${id.toString()}`;
        if (this.cache.has(cacheKey)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return this.cache.get(cacheKey);
        }

        const progress = await super.getProgressById(id);
        this.cache.set(cacheKey, progress);
        return progress;
    }

    async createProgress(createProgressDto: any): Promise<Progress> {
        const result = await super.createProgress(createProgressDto);
        this.cache.clear(); // Clear cache when data changes
        return result;
    }

    async updateProgress(id: string, updateProgressDto: any): Promise<Progress> {
        const result = await super.updateProgress(id, updateProgressDto);
        this.cache.clear(); // Clear cache when data changes
        return result;
    }

    async deleteProgress(id: string): Promise<Progress> {
        const result = await super.deleteProgress(id);
        this.cache.clear(); // Clear cache when data changes
        return result;
    }
}
