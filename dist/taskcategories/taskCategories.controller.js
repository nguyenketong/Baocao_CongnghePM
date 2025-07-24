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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCategoryController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = __importDefault(require("mongoose"));
const taskCategories_service_1 = require("./taskCategories.service");
const CreateTaskCategory_dto_1 = require("./dto/CreateTaskCategory.dto");
const UpdateTaskCategory_dto_1 = require("./dto/UpdateTaskCategory.dto");
let TaskCategoryController = class TaskCategoryController {
    constructor(taskCategoryService) {
        this.taskCategoryService = taskCategoryService;
    }
    async create(createTaskCategoryDto) {
        return this.taskCategoryService.create(createTaskCategoryDto);
    }
    async getTaskCategory() {
        return this.taskCategoryService.getTaskCategory();
    }
    async getTaskCategoryById(id) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('TaskCategory not found', 404);
        const findTaskCategory = await this.taskCategoryService.getTaskCategoryById(id);
        if (!findTaskCategory)
            throw new common_1.HttpException('TaskCategory not found', 404);
        return findTaskCategory;
    }
    async updateTaskCategory(id, updateTaskCategoryDto) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('Invalid ID', 404);
        const updateTaskCategory = await this.taskCategoryService.updateTaskCategory(id, updateTaskCategoryDto);
        if (!updateTaskCategory)
            throw new common_1.HttpException('TaskCategory not found', 404);
        return updateTaskCategory;
    }
    async deleteTaskCategory(id) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('Invalid Id', 404);
        const deleteTaskCategory = await this.taskCategoryService.deleteTaskCategory(id);
        if (!deleteTaskCategory)
            throw new common_1.HttpException('TaskCategory not found', 404);
        return deleteTaskCategory;
    }
};
exports.TaskCategoryController = TaskCategoryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateTaskCategory_dto_1.CreateTaskCategoryDto]),
    __metadata("design:returntype", Promise)
], TaskCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskCategoryController.prototype, "getTaskCategory", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskCategoryController.prototype, "getTaskCategoryById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateTaskCategory_dto_1.UpdateTaskCategoryDto]),
    __metadata("design:returntype", Promise)
], TaskCategoryController.prototype, "updateTaskCategory", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskCategoryController.prototype, "deleteTaskCategory", null);
exports.TaskCategoryController = TaskCategoryController = __decorate([
    (0, common_1.Controller)('taskcategories'),
    __metadata("design:paramtypes", [taskCategories_service_1.TaskCategoryService])
], TaskCategoryController);
//# sourceMappingURL=taskCategories.controller.js.map