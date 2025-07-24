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
exports.DesignationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Designation_schema_1 = require("../schemas/Designation.schema");
let DesignationService = class DesignationService {
    constructor(designationModel) {
        this.designationModel = designationModel;
    }
    async create(createDesignationDto) {
        const newDesignation = new this.designationModel(createDesignationDto);
        return newDesignation.save();
    }
    async getDesignation() {
        return this.designationModel.find();
    }
    async getDesignationById(id) {
        return this.designationModel.findById(id);
    }
    async updateDesignation(id, updateDesignationDto) {
        return this.designationModel.findByIdAndUpdate(id, updateDesignationDto, { new: true });
    }
    async deleteDesignation(id) {
        return this.designationModel.findByIdAndDelete(id);
    }
};
exports.DesignationService = DesignationService;
exports.DesignationService = DesignationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Designation_schema_1.Designation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DesignationService);
//# sourceMappingURL=designations.service.js.map