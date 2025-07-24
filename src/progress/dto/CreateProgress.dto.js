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
exports.CreateProgressDto = void 0;
var class_validator_1 = require("class-validator");
var CreateProgressDto = function () {
    var _a;
    var _progressName_decorators;
    var _progressName_initializers = [];
    var _progressName_extraInitializers = [];
    var _projectid_decorators;
    var _projectid_initializers = [];
    var _projectid_extraInitializers = [];
    var _progressCategory_decorators;
    var _progressCategory_initializers = [];
    var _progressCategory_extraInitializers = [];
    var _progressStart_decorators;
    var _progressStart_initializers = [];
    var _progressStart_extraInitializers = [];
    var _progressEnd_decorators;
    var _progressEnd_initializers = [];
    var _progressEnd_extraInitializers = [];
    var _notificationSent_decorators;
    var _notificationSent_initializers = [];
    var _notificationSent_extraInitializers = [];
    var _taskAssignPerson_decorators;
    var _taskAssignPerson_initializers = [];
    var _taskAssignPerson_extraInitializers = [];
    var _taskRecipient_decorators;
    var _taskRecipient_initializers = [];
    var _taskRecipient_extraInitializers = [];
    var _priority_decorators;
    var _priority_initializers = [];
    var _priority_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateProgressDto() {
                this.progressName = __runInitializers(this, _progressName_initializers, void 0);
                this.projectid = (__runInitializers(this, _progressName_extraInitializers), __runInitializers(this, _projectid_initializers, void 0));
                this.progressCategory = (__runInitializers(this, _projectid_extraInitializers), __runInitializers(this, _progressCategory_initializers, void 0));
                this.progressStart = (__runInitializers(this, _progressCategory_extraInitializers), __runInitializers(this, _progressStart_initializers, void 0));
                this.progressEnd = (__runInitializers(this, _progressStart_extraInitializers), __runInitializers(this, _progressEnd_initializers, void 0));
                this.notificationSent = (__runInitializers(this, _progressEnd_extraInitializers), __runInitializers(this, _notificationSent_initializers, void 0));
                this.taskAssignPerson = (__runInitializers(this, _notificationSent_extraInitializers), __runInitializers(this, _taskAssignPerson_initializers, void 0));
                this.taskRecipient = (__runInitializers(this, _taskAssignPerson_extraInitializers), __runInitializers(this, _taskRecipient_initializers, void 0));
                this.priority = (__runInitializers(this, _taskRecipient_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
                this.description = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.status = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                __runInitializers(this, _status_extraInitializers);
            }
            return CreateProgressDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _progressName_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'Tên tiến độ công việc là bắt buộc' }), (0, class_validator_1.IsString)({ message: 'Tên tiến độ công việc phải là chuỗi' }), (0, class_validator_1.MaxLength)(100, { message: 'Tên tiến độ công việc không được quá 100 ký tự' })];
            _projectid_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'project phải là chuỗi ObjectId hợp lệ' })];
            _progressCategory_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'progressCategory phải là chuỗi ObjectId hợp lệ' })];
            _progressStart_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNotEmpty)({ message: 'Ngày bắt đầu tiến độ công việc là bắt buộc' })];
            _progressEnd_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNotEmpty)({ message: 'Ngày kết thúc tiến độ công việc là bắt buộc' })];
            _notificationSent_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'notificationSent phải là chuỗi ObjectId hợp lệ' })];
            _taskAssignPerson_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'taskAssignPerson phải là chuỗi ObjectId hợp lệ' })];
            _taskRecipient_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'taskRecipient phải là chuỗi ObjectId hợp lệ' })];
            _priority_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'Mức độ ưu tiên là bắt buộc' }), (0, class_validator_1.IsString)({ message: 'Mức độ ưu tiên phải là chuỗi' }), (0, class_validator_1.MaxLength)(50, { message: 'Mức độ ưu tiên không được quá 50 ký tự' })];
            _description_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'Mô tả tiến độ công việc là bắt buộc' }), (0, class_validator_1.IsString)({ message: 'Mô tả phải là chuỗi' }), (0, class_validator_1.MaxLength)(500, { message: 'Mô tả tiến độ công việc không được quá 500 ký tự' })];
            _status_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'Trạng thái tiến độ công việc là bắt buộc' }), (0, class_validator_1.IsString)({ message: 'Trạng thái phải là chuỗi' }), (0, class_validator_1.MaxLength)(50, { message: 'Trạng thái không được quá 50 ký tự' })];
            __esDecorate(null, null, _progressName_decorators, { kind: "field", name: "progressName", static: false, private: false, access: { has: function (obj) { return "progressName" in obj; }, get: function (obj) { return obj.progressName; }, set: function (obj, value) { obj.progressName = value; } }, metadata: _metadata }, _progressName_initializers, _progressName_extraInitializers);
            __esDecorate(null, null, _projectid_decorators, { kind: "field", name: "projectid", static: false, private: false, access: { has: function (obj) { return "projectid" in obj; }, get: function (obj) { return obj.projectid; }, set: function (obj, value) { obj.projectid = value; } }, metadata: _metadata }, _projectid_initializers, _projectid_extraInitializers);
            __esDecorate(null, null, _progressCategory_decorators, { kind: "field", name: "progressCategory", static: false, private: false, access: { has: function (obj) { return "progressCategory" in obj; }, get: function (obj) { return obj.progressCategory; }, set: function (obj, value) { obj.progressCategory = value; } }, metadata: _metadata }, _progressCategory_initializers, _progressCategory_extraInitializers);
            __esDecorate(null, null, _progressStart_decorators, { kind: "field", name: "progressStart", static: false, private: false, access: { has: function (obj) { return "progressStart" in obj; }, get: function (obj) { return obj.progressStart; }, set: function (obj, value) { obj.progressStart = value; } }, metadata: _metadata }, _progressStart_initializers, _progressStart_extraInitializers);
            __esDecorate(null, null, _progressEnd_decorators, { kind: "field", name: "progressEnd", static: false, private: false, access: { has: function (obj) { return "progressEnd" in obj; }, get: function (obj) { return obj.progressEnd; }, set: function (obj, value) { obj.progressEnd = value; } }, metadata: _metadata }, _progressEnd_initializers, _progressEnd_extraInitializers);
            __esDecorate(null, null, _notificationSent_decorators, { kind: "field", name: "notificationSent", static: false, private: false, access: { has: function (obj) { return "notificationSent" in obj; }, get: function (obj) { return obj.notificationSent; }, set: function (obj, value) { obj.notificationSent = value; } }, metadata: _metadata }, _notificationSent_initializers, _notificationSent_extraInitializers);
            __esDecorate(null, null, _taskAssignPerson_decorators, { kind: "field", name: "taskAssignPerson", static: false, private: false, access: { has: function (obj) { return "taskAssignPerson" in obj; }, get: function (obj) { return obj.taskAssignPerson; }, set: function (obj, value) { obj.taskAssignPerson = value; } }, metadata: _metadata }, _taskAssignPerson_initializers, _taskAssignPerson_extraInitializers);
            __esDecorate(null, null, _taskRecipient_decorators, { kind: "field", name: "taskRecipient", static: false, private: false, access: { has: function (obj) { return "taskRecipient" in obj; }, get: function (obj) { return obj.taskRecipient; }, set: function (obj, value) { obj.taskRecipient = value; } }, metadata: _metadata }, _taskRecipient_initializers, _taskRecipient_extraInitializers);
            __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: function (obj) { return "priority" in obj; }, get: function (obj) { return obj.priority; }, set: function (obj, value) { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateProgressDto = CreateProgressDto;
