"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseProgressDecorator = void 0;
class BaseProgressDecorator {
    constructor(progressService) {
        this.progressService = progressService;
    }
    createProgress(createProgressDto) {
        return this.progressService.createProgress(createProgressDto);
    }
    getAllProgresses() {
        return this.progressService.getAllProgresses();
    }
    getProgressById(id) {
        return this.progressService.getProgressById(id);
    }
    getProgressByProjectId(projectId) {
        return this.progressService.getProgressByProjectId(projectId);
    }
    updateProgress(id, updateProgressDto) {
        return this.progressService.updateProgress(id, updateProgressDto);
    }
    deleteProgress(id) {
        return this.progressService.deleteProgress(id);
    }
}
exports.BaseProgressDecorator = BaseProgressDecorator;
//# sourceMappingURL=base-progress.decorator.js.map