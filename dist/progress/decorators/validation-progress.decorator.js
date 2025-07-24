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
exports.ValidationProgressDecorator = void 0;
const common_1 = require("@nestjs/common");
const base_progress_decorator_1 = require("./base-progress.decorator");
let ValidationProgressDecorator = class ValidationProgressDecorator extends base_progress_decorator_1.BaseProgressDecorator {
    constructor(progressService) {
        super(progressService);
    }
    async createProgress(createProgressDto) {
        this.validateProgressData(createProgressDto);
        return super.createProgress(createProgressDto);
    }
    async updateProgress(id, updateProgressDto) {
        this.validateProgressData(updateProgressDto);
        return super.updateProgress(id, updateProgressDto);
    }
    validateProgressData(progressDto) {
        if (progressDto.progressName && progressDto.progressName.length < 3) {
            throw new common_1.BadRequestException('Tên progress phải có ít nhất 3 ký tự');
        }
    }
};
exports.ValidationProgressDecorator = ValidationProgressDecorator;
exports.ValidationProgressDecorator = ValidationProgressDecorator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], ValidationProgressDecorator);
//# sourceMappingURL=validation-progress.decorator.js.map