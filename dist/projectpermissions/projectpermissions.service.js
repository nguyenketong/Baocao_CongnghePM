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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectPermissionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const ProjectPermissions_schema_1 = require("../schemas/ProjectPermissions.schema");
let ProjectPermissionsService = class ProjectPermissionsService {
    constructor(projectPermissionsModel) {
        this.projectPermissionsModel = projectPermissionsModel;
    }
    async createProjectPermission(createProjectPermissionDto) {
        const newPermission = new this.projectPermissionsModel(createProjectPermissionDto);
        return await newPermission.save();
    }
    async getAll() {
        return await this.projectPermissionsModel.find().populate('employee_id');
    }
    async getByEmployee(employee_id) {
        const permissions = await this.projectPermissionsModel.find({ employee_id }).populate('employee_id');
        if (!permissions.length)
            throw new common_1.NotFoundException('Không tìm thấy quyền cho nhân viên này');
        return permissions;
    }
    async update(permission_id, updateProjectPermissionDto) {
        const updatedPermission = await this.projectPermissionsModel.findByIdAndUpdate(permission_id, updateProjectPermissionDto, { new: true });
        if (!updatedPermission)
            throw new common_1.NotFoundException('Không tìm thấy quyền để cập nhật');
        return updatedPermission;
    }
    async delete(permission_id) {
        const deletedPermission = await this.projectPermissionsModel.findByIdAndDelete(permission_id);
        if (!deletedPermission)
            throw new common_1.NotFoundException('Không tìm thấy quyền để xóa');
        return deletedPermission;
    }
};
exports.ProjectPermissionsService = ProjectPermissionsService;
exports.ProjectPermissionsService = ProjectPermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(ProjectPermissions_schema_1.ProjectPermissions.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProjectPermissionsService);
//# sourceMappingURL=projectpermissions.service.js.map