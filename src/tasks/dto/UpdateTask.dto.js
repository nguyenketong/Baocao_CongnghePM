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
exports.UpdateTaskDto = void 0;
var class_validator_1 = require("class-validator");
var UpdateTaskDto = function () {
    var _a;
    var _taskName_decorators;
    var _taskName_initializers = [];
    var _taskName_extraInitializers = [];
    var _progressName_decorators;
    var _progressName_initializers = [];
    var _progressName_extraInitializers = [];
    var _taskCategory_decorators;
    var _taskCategory_initializers = [];
    var _taskCategory_extraInitializers = [];
    var _taskStart_decorators;
    var _taskStart_initializers = [];
    var _taskStart_extraInitializers = [];
    var _taskEnd_decorators;
    var _taskEnd_initializers = [];
    var _taskEnd_extraInitializers = [];
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
            function UpdateTaskDto() {
                this.taskName = __runInitializers(this, _taskName_initializers, void 0);
                this.progressName = (__runInitializers(this, _taskName_extraInitializers), __runInitializers(this, _progressName_initializers, void 0));
                this.taskCategory = (__runInitializers(this, _progressName_extraInitializers), __runInitializers(this, _taskCategory_initializers, void 0));
                this.taskStart = (__runInitializers(this, _taskCategory_extraInitializers), __runInitializers(this, _taskStart_initializers, void 0));
                this.taskEnd = (__runInitializers(this, _taskStart_extraInitializers), __runInitializers(this, _taskEnd_initializers, void 0));
                this.notificationSent = (__runInitializers(this, _taskEnd_extraInitializers), __runInitializers(this, _notificationSent_initializers, void 0));
                this.taskAssignPerson = (__runInitializers(this, _notificationSent_extraInitializers), __runInitializers(this, _taskAssignPerson_initializers, void 0));
                this.taskRecipient = (__runInitializers(this, _taskAssignPerson_extraInitializers), __runInitializers(this, _taskRecipient_initializers, void 0));
                this.priority = (__runInitializers(this, _taskRecipient_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
                this.description = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.status = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                __runInitializers(this, _status_extraInitializers);
            }
            return UpdateTaskDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _taskName_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'Tên nhiệm vụ phải là chuỗi' }), (0, class_validator_1.MaxLength)(100, { message: 'Tên nhiệm vụ không được quá 100 ký tự' })];
            _progressName_decorators = [(0, class_validator_1.IsOptional)()];
            _taskCategory_decorators = [(0, class_validator_1.IsOptional)()];
            _taskStart_decorators = [(0, class_validator_1.IsOptional)()];
            _taskEnd_decorators = [(0, class_validator_1.IsOptional)()];
            _notificationSent_decorators = [(0, class_validator_1.IsOptional)()];
            _taskAssignPerson_decorators = [(0, class_validator_1.IsOptional)()];
            _taskRecipient_decorators = [(0, class_validator_1.IsOptional)()];
            _priority_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'Mức độ ưu tiên phải là chuỗi' })];
            _description_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'Mô tả nhiệm vụ phải là chuỗi' })];
            _status_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'Trạng thái nhiệm vụ phải là chuỗi' })];
            __esDecorate(null, null, _taskName_decorators, { kind: "field", name: "taskName", static: false, private: false, access: { has: function (obj) { return "taskName" in obj; }, get: function (obj) { return obj.taskName; }, set: function (obj, value) { obj.taskName = value; } }, metadata: _metadata }, _taskName_initializers, _taskName_extraInitializers);
            __esDecorate(null, null, _progressName_decorators, { kind: "field", name: "progressName", static: false, private: false, access: { has: function (obj) { return "progressName" in obj; }, get: function (obj) { return obj.progressName; }, set: function (obj, value) { obj.progressName = value; } }, metadata: _metadata }, _progressName_initializers, _progressName_extraInitializers);
            __esDecorate(null, null, _taskCategory_decorators, { kind: "field", name: "taskCategory", static: false, private: false, access: { has: function (obj) { return "taskCategory" in obj; }, get: function (obj) { return obj.taskCategory; }, set: function (obj, value) { obj.taskCategory = value; } }, metadata: _metadata }, _taskCategory_initializers, _taskCategory_extraInitializers);
            __esDecorate(null, null, _taskStart_decorators, { kind: "field", name: "taskStart", static: false, private: false, access: { has: function (obj) { return "taskStart" in obj; }, get: function (obj) { return obj.taskStart; }, set: function (obj, value) { obj.taskStart = value; } }, metadata: _metadata }, _taskStart_initializers, _taskStart_extraInitializers);
            __esDecorate(null, null, _taskEnd_decorators, { kind: "field", name: "taskEnd", static: false, private: false, access: { has: function (obj) { return "taskEnd" in obj; }, get: function (obj) { return obj.taskEnd; }, set: function (obj, value) { obj.taskEnd = value; } }, metadata: _metadata }, _taskEnd_initializers, _taskEnd_extraInitializers);
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
exports.UpdateTaskDto = UpdateTaskDto;
