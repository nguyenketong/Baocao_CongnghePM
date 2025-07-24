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
exports.DepartmentService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const Department_schema_1 = require("./../schemas/Department.schema");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("mongoose");
let DepartmentService = class DepartmentService {
    constructor(departmentModel) {
        this.departmentModel = departmentModel;
    }
    async create(createDepartmentDto) {
        const createdDepartment = new this.departmentModel(createDepartmentDto);
        return createdDepartment.save();
    }
    async getDepartment() {
        return this.departmentModel.find();
    }
    async getDepartmentById(id) {
        return this.departmentModel.findById(id);
    }
    async updateDepartment(id, updateDepartmentDto) {
        return this.departmentModel.findByIdAndUpdate(id, updateDepartmentDto, { new: true });
    }
    async deleteDepartment(id) {
        return this.departmentModel.findByIdAndDelete(id);
    }
};
exports.DepartmentService = DepartmentService;
exports.DepartmentService = DepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Department_schema_1.Department.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DepartmentService);
//# sourceMappingURL=departments.service.js.map