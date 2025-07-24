"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSchema = exports.Task = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var mongoose = require("mongoose");
var Task = function () {
    var _classDecorators = [(0, mongoose_1.Schema)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = mongoose_2.Document;
    var _taskName_decorators;
    var _taskName_initializers = [];
    var _taskName_extraInitializers = [];
    var _progressId_decorators;
    var _progressId_initializers = [];
    var _progressId_extraInitializers = [];
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
    var Task = _classThis = /** @class */ (function (_super) {
        __extends(Task_1, _super);
        function Task_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.taskName = __runInitializers(_this, _taskName_initializers, void 0); // Tên nhiệm vụ
            _this.progressId = (__runInitializers(_this, _taskName_extraInitializers), __runInitializers(_this, _progressId_initializers, void 0)); // Tham chiếu đến Progress
            _this.taskCategory = (__runInitializers(_this, _progressId_extraInitializers), __runInitializers(_this, _taskCategory_initializers, void 0)); // Tham chiếu đến TaskCategory
            _this.taskStart = (__runInitializers(_this, _taskCategory_extraInitializers), __runInitializers(_this, _taskStart_initializers, void 0)); // Ngày bắt đầu nhiệm vụ
            _this.taskEnd = (__runInitializers(_this, _taskStart_extraInitializers), __runInitializers(_this, _taskEnd_initializers, void 0)); // Ngày kết thúc nhiệm vụ
            _this.notificationSent = (__runInitializers(_this, _taskEnd_extraInitializers), __runInitializers(_this, _notificationSent_initializers, void 0)); // Tham chiếu đến NotificationSent
            _this.taskAssignPerson = (__runInitializers(_this, _notificationSent_extraInitializers), __runInitializers(_this, _taskAssignPerson_initializers, void 0)); // Tham chiếu đến Employee (người giao nhiệm vụ)
            _this.taskRecipient = (__runInitializers(_this, _taskAssignPerson_extraInitializers), __runInitializers(_this, _taskRecipient_initializers, void 0)); // Tham chiếu đến Employee (người nhận nhiệm vụ)
            _this.priority = (__runInitializers(_this, _taskRecipient_extraInitializers), __runInitializers(_this, _priority_initializers, void 0)); // Mức độ ưu tiên của nhiệm vụ
            _this.description = (__runInitializers(_this, _priority_extraInitializers), __runInitializers(_this, _description_initializers, void 0)); // Mô tả chi tiết nhiệm vụ
            _this.status = (__runInitializers(_this, _description_extraInitializers), __runInitializers(_this, _status_initializers, void 0)); // Trạng thái của nhiệm vụ (ví dụ: "Hoàn thành", "Đang tiến hành")
            __runInitializers(_this, _status_extraInitializers);
            return _this;
        }
        return Task_1;
    }(_classSuper));
    __setFunctionName(_classThis, "Task");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _taskName_decorators = [(0, mongoose_1.Prop)({ required: true, trim: true })];
        _progressId_decorators = [(0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Progress' })];
        _taskCategory_decorators = [(0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'TaskCategory' })];
        _taskStart_decorators = [(0, mongoose_1.Prop)({ required: true, type: Date })];
        _taskEnd_decorators = [(0, mongoose_1.Prop)({ required: true, type: Date })];
        _notificationSent_decorators = [(0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'NotificationSent' })];
        _taskAssignPerson_decorators = [(0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' })];
        _taskRecipient_decorators = [(0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' })];
        _priority_decorators = [(0, mongoose_1.Prop)({ required: true, trim: true })];
        _description_decorators = [(0, mongoose_1.Prop)({ required: true, trim: true })];
        _status_decorators = [(0, mongoose_1.Prop)({ required: true, trim: true })];
        __esDecorate(null, null, _taskName_decorators, { kind: "field", name: "taskName", static: false, private: false, access: { has: function (obj) { return "taskName" in obj; }, get: function (obj) { return obj.taskName; }, set: function (obj, value) { obj.taskName = value; } }, metadata: _metadata }, _taskName_initializers, _taskName_extraInitializers);
        __esDecorate(null, null, _progressId_decorators, { kind: "field", name: "progressId", static: false, private: false, access: { has: function (obj) { return "progressId" in obj; }, get: function (obj) { return obj.progressId; }, set: function (obj, value) { obj.progressId = value; } }, metadata: _metadata }, _progressId_initializers, _progressId_extraInitializers);
        __esDecorate(null, null, _taskCategory_decorators, { kind: "field", name: "taskCategory", static: false, private: false, access: { has: function (obj) { return "taskCategory" in obj; }, get: function (obj) { return obj.taskCategory; }, set: function (obj, value) { obj.taskCategory = value; } }, metadata: _metadata }, _taskCategory_initializers, _taskCategory_extraInitializers);
        __esDecorate(null, null, _taskStart_decorators, { kind: "field", name: "taskStart", static: false, private: false, access: { has: function (obj) { return "taskStart" in obj; }, get: function (obj) { return obj.taskStart; }, set: function (obj, value) { obj.taskStart = value; } }, metadata: _metadata }, _taskStart_initializers, _taskStart_extraInitializers);
        __esDecorate(null, null, _taskEnd_decorators, { kind: "field", name: "taskEnd", static: false, private: false, access: { has: function (obj) { return "taskEnd" in obj; }, get: function (obj) { return obj.taskEnd; }, set: function (obj, value) { obj.taskEnd = value; } }, metadata: _metadata }, _taskEnd_initializers, _taskEnd_extraInitializers);
        __esDecorate(null, null, _notificationSent_decorators, { kind: "field", name: "notificationSent", static: false, private: false, access: { has: function (obj) { return "notificationSent" in obj; }, get: function (obj) { return obj.notificationSent; }, set: function (obj, value) { obj.notificationSent = value; } }, metadata: _metadata }, _notificationSent_initializers, _notificationSent_extraInitializers);
        __esDecorate(null, null, _taskAssignPerson_decorators, { kind: "field", name: "taskAssignPerson", static: false, private: false, access: { has: function (obj) { return "taskAssignPerson" in obj; }, get: function (obj) { return obj.taskAssignPerson; }, set: function (obj, value) { obj.taskAssignPerson = value; } }, metadata: _metadata }, _taskAssignPerson_initializers, _taskAssignPerson_extraInitializers);
        __esDecorate(null, null, _taskRecipient_decorators, { kind: "field", name: "taskRecipient", static: false, private: false, access: { has: function (obj) { return "taskRecipient" in obj; }, get: function (obj) { return obj.taskRecipient; }, set: function (obj, value) { obj.taskRecipient = value; } }, metadata: _metadata }, _taskRecipient_initializers, _taskRecipient_extraInitializers);
        __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: function (obj) { return "priority" in obj; }, get: function (obj) { return obj.priority; }, set: function (obj, value) { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Task = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Task = _classThis;
}();
exports.Task = Task;
exports.TaskSchema = mongoose_1.SchemaFactory.createForClass(Task);
