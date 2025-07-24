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
var LoggingProgressDecorator_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingProgressDecorator = void 0;
const common_1 = require("@nestjs/common");
const base_progress_decorator_1 = require("./base-progress.decorator");
let LoggingProgressDecorator = LoggingProgressDecorator_1 = class LoggingProgressDecorator extends base_progress_decorator_1.BaseProgressDecorator {
    constructor(progressService) {
        super(progressService);
        this.logger = new common_1.Logger(LoggingProgressDecorator_1.name);
    }
    async createProgress(createProgressDto) {
        this.logger.log(`Creating progress with name: ${createProgressDto.progressName}`);
        const result = await super.createProgress(createProgressDto);
        this.logger.log(`Progress created successfully with ID: ${result._id}`);
        return result;
    }
    async deleteProgress(id) {
        this.logger.log(`Attempting to delete progress with ID: ${id}`);
        const result = await super.deleteProgress(id);
        this.logger.log(`Progress deleted successfully: ${id}`);
        return result;
    }
};
exports.LoggingProgressDecorator = LoggingProgressDecorator;
exports.LoggingProgressDecorator = LoggingProgressDecorator = LoggingProgressDecorator_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], LoggingProgressDecorator);
//# sourceMappingURL=logging-progress.decorator.js.map