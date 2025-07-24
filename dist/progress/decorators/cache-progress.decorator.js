"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheProgressDecorator = void 0;
const common_1 = require("@nestjs/common");
const base_progress_decorator_1 = require("./base-progress.decorator");
let CacheProgressDecorator = class CacheProgressDecorator extends base_progress_decorator_1.BaseProgressDecorator {
    constructor(progressService) {
        super(progressService);
        this.cache = new Map();
    }
    async getAllProgresses() {
        const cacheKey = 'all_progresses';
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        const progresses = await super.getAllProgresses();
        this.cache.set(cacheKey, progresses);
        return progresses;
    }
    async getProgressById(id) {
        const cacheKey = `progress_${id.toString()}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        const progress = await super.getProgressById(id);
        this.cache.set(cacheKey, progress);
        return progress;
    }
    async createProgress(createProgressDto) {
        const result = await super.createProgress(createProgressDto);
        this.cache.clear();
        return result;
    }
    async updateProgress(id, updateProgressDto) {
        const result = await super.updateProgress(id, updateProgressDto);
        this.cache.clear();
        return result;
    }
    async deleteProgress(id) {
        const result = await super.deleteProgress(id);
        this.cache.clear();
        return result;
    }
};
exports.CacheProgressDecorator = CacheProgressDecorator;
exports.CacheProgressDecorator = CacheProgressDecorator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], CacheProgressDecorator);
//# sourceMappingURL=cache-progress.decorator.js.map