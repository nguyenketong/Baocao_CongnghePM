"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProjectDto = void 0;
var class_validator_1 = require("class-validator");
var UpdateProjectDto = function () {
    var _a;
    var _projectName_decorators;
    var _projectName_initializers = [];
    var _projectName_extraInitializers = [];
    var _projectCategory_decorators;
    var _projectCategory_initializers = [];
    var _projectCategory_extraInitializers = [];
    var _projectImage_decorators;
    var _projectImage_initializers = [];
    var _projectImage_extraInitializers = [];
    var _projectStart_decorators;
    var _projectStart_initializers = [];
    var _projectStart_extraInitializers = [];
    var _projectEnd_decorators;
    var _projectEnd_initializers = [];
    var _projectEnd_extraInitializers = [];
    var _notificationSent_decorators;
    var _notificationSent_initializers = [];
    var _notificationSent_extraInitializers = [];
    var _assignedPerson_decorators;
    var _assignedPerson_initializers = [];
    var _assignedPerson_extraInitializers = [];
    var _budget_decorators;
    var _budget_initializers = [];
    var _budget_extraInitializers = [];
    var _priority_decorators;
    var _priority_initializers = [];
    var _priority_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateProjectDto() {
                this.projectName = __runInitializers(this, _projectName_initializers, void 0);
                this.projectCategory = (__runInitializers(this, _projectName_extraInitializers), __runInitializers(this, _projectCategory_initializers, void 0));
                this.projectImage = (__runInitializers(this, _projectCategory_extraInitializers), __runInitializers(this, _projectImage_initializers, void 0));
                this.projectStart = (__runInitializers(this, _projectImage_extraInitializers), __runInitializers(this, _projectStart_initializers, void 0));
                this.projectEnd = (__runInitializers(this, _projectStart_extraInitializers), __runInitializers(this, _projectEnd_initializers, void 0));
                this.notificationSent = (__runInitializers(this, _projectEnd_extraInitializers), __runInitializers(this, _notificationSent_initializers, void 0));
                this.assignedPerson = (__runInitializers(this, _notificationSent_extraInitializers), __runInitializers(this, _assignedPerson_initializers, void 0));
                this.budget = (__runInitializers(this, _assignedPerson_extraInitializers), __runInitializers(this, _budget_initializers, void 0));
                this.priority = (__runInitializers(this, _budget_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
                this.description = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                __runInitializers(this, _description_extraInitializers);
            }
            return UpdateProjectDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _projectName_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'Tên dự án phải là chuỗi' }), (0, class_validator_1.MaxLength)(100, { message: 'Tên dự án không được quá 100 ký tự' })];
            _projectCategory_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsMongoId)({ message: 'projectCategory phải là ObjectId hợp lệ' })];
            _projectImage_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'Hình ảnh dự án phải là chuỗi' }), (0, class_validator_1.MaxLength)(255, { message: 'Đường dẫn hình ảnh không được quá 255 ký tự' })];
            _projectStart_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDate)({ message: 'Ngày bắt đầu phải là một ngày hợp lệ' })];
            _projectEnd_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDate)({ message: 'Ngày kết thúc phải là một ngày hợp lệ' })];
            _notificationSent_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsMongoId)({ message: 'notificationSent phải là ObjectId hợp lệ' })];
            _assignedPerson_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsMongoId)({ message: 'assignedPerson phải là ObjectId hợp lệ' })];
            _budget_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)({}, { message: 'Ngân sách phải là số' })];
            _priority_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'Mức độ ưu tiên phải là chuỗi' }), (0, class_validator_1.MaxLength)(50, { message: 'Mức độ ưu tiên không được quá 50 ký tự' })];
            _description_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'Mô tả phải là chuỗi' }), (0, class_validator_1.MaxLength)(500, { message: 'Mô tả dự án không được quá 500 ký tự' })];
            __esDecorate(null, null, _projectName_decorators, { kind: "field", name: "projectName", static: false, private: false, access: { has: function (obj) { return "projectName" in obj; }, get: function (obj) { return obj.projectName; }, set: function (obj, value) { obj.projectName = value; } }, metadata: _metadata }, _projectName_initializers, _projectName_extraInitializers);
            __esDecorate(null, null, _projectCategory_decorators, { kind: "field", name: "projectCategory", static: false, private: false, access: { has: function (obj) { return "projectCategory" in obj; }, get: function (obj) { return obj.projectCategory; }, set: function (obj, value) { obj.projectCategory = value; } }, metadata: _metadata }, _projectCategory_initializers, _projectCategory_extraInitializers);
            __esDecorate(null, null, _projectImage_decorators, { kind: "field", name: "projectImage", static: false, private: false, access: { has: function (obj) { return "projectImage" in obj; }, get: function (obj) { return obj.projectImage; }, set: function (obj, value) { obj.projectImage = value; } }, metadata: _metadata }, _projectImage_initializers, _projectImage_extraInitializers);
            __esDecorate(null, null, _projectStart_decorators, { kind: "field", name: "projectStart", static: false, private: false, access: { has: function (obj) { return "projectStart" in obj; }, get: function (obj) { return obj.projectStart; }, set: function (obj, value) { obj.projectStart = value; } }, metadata: _metadata }, _projectStart_initializers, _projectStart_extraInitializers);
            __esDecorate(null, null, _projectEnd_decorators, { kind: "field", name: "projectEnd", static: false, private: false, access: { has: function (obj) { return "projectEnd" in obj; }, get: function (obj) { return obj.projectEnd; }, set: function (obj, value) { obj.projectEnd = value; } }, metadata: _metadata }, _projectEnd_initializers, _projectEnd_extraInitializers);
            __esDecorate(null, null, _notificationSent_decorators, { kind: "field", name: "notificationSent", static: false, private: false, access: { has: function (obj) { return "notificationSent" in obj; }, get: function (obj) { return obj.notificationSent; }, set: function (obj, value) { obj.notificationSent = value; } }, metadata: _metadata }, _notificationSent_initializers, _notificationSent_extraInitializers);
            __esDecorate(null, null, _assignedPerson_decorators, { kind: "field", name: "assignedPerson", static: false, private: false, access: { has: function (obj) { return "assignedPerson" in obj; }, get: function (obj) { return obj.assignedPerson; }, set: function (obj, value) { obj.assignedPerson = value; } }, metadata: _metadata }, _assignedPerson_initializers, _assignedPerson_extraInitializers);
            __esDecorate(null, null, _budget_decorators, { kind: "field", name: "budget", static: false, private: false, access: { has: function (obj) { return "budget" in obj; }, get: function (obj) { return obj.budget; }, set: function (obj, value) { obj.budget = value; } }, metadata: _metadata }, _budget_initializers, _budget_extraInitializers);
            __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: function (obj) { return "priority" in obj; }, get: function (obj) { return obj.priority; }, set: function (obj, value) { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateProjectDto = UpdateProjectDto;
