"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseProgressDecorator = void 0;
// Base decorator class
var BaseProgressDecorator = /** @class */ (function () {
    function BaseProgressDecorator(progressService) {
        this.progressService = progressService;
    }
    BaseProgressDecorator.prototype.createProgress = function (createProgressDto) {
        return this.progressService.createProgress(createProgressDto);
    };
    BaseProgressDecorator.prototype.getAllProgresses = function () {
        return this.progressService.getAllProgresses();
    };
    BaseProgressDecorator.prototype.getProgressById = function (id) {
        return this.progressService.getProgressById(id);
    };
    BaseProgressDecorator.prototype.getProgressByProjectId = function (projectId) {
        return this.progressService.getProgressByProjectId(projectId);
    };
    BaseProgressDecorator.prototype.updateProgress = function (id, updateProgressDto) {
        return this.progressService.updateProgress(id, updateProgressDto);
    };
    BaseProgressDecorator.prototype.deleteProgress = function (id) {
        return this.progressService.deleteProgress(id);
    };
    return BaseProgressDecorator;
}());
exports.BaseProgressDecorator = BaseProgressDecorator;
