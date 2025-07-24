"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const ProgressCategory_schema_1 = require("../schemas/ProgressCategory.schema");
const progressCategories_service_1 = require("./progressCategories.service");
const progressCategories_controller_1 = require("./progressCategories.controller");
let ProgressCategoryModule = class ProgressCategoryModule {
};
exports.ProgressCategoryModule = ProgressCategoryModule;
exports.ProgressCategoryModule = ProgressCategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: ProgressCategory_schema_1.ProgressCategory.name, schema: ProgressCategory_schema_1.ProgressCategorySchema
                }
            ])
        ],
        controllers: [progressCategories_controller_1.ProgressCategoryController],
        providers: [progressCategories_service_1.ProgressCategoryService],
        exports: [progressCategories_service_1.ProgressCategoryService],
    })
], ProgressCategoryModule);
//# sourceMappingURL=progressCategories.module.js.map