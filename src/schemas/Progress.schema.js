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
exports.ProgressSchema = exports.Progress = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var mongoose = require("mongoose");
var Progress = function () {
    var _classDecorators = [(0, mongoose_1.Schema)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = mongoose_2.Document;
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
    var Progress = _classThis = /** @class */ (function (_super) {
        __extends(Progress_1, _super);
        function Progress_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.progressName = __runInitializers(_this, _progressName_initializers, void 0); // Tên tiến độ công việc
            _this.projectid = (__runInitializers(_this, _progressName_extraInitializers), __runInitializers(_this, _projectid_initializers, void 0)); // Tham chiếu đến Project
            _this.progressCategory = (__runInitializers(_this, _projectid_extraInitializers), __runInitializers(_this, _progressCategory_initializers, void 0)); // Tham chiếu đến ProgressCategory
            _this.progressStart = (__runInitializers(_this, _progressCategory_extraInitializers), __runInitializers(_this, _progressStart_initializers, void 0)); // Ngày bắt đầu tiến độ
            _this.progressEnd = (__runInitializers(_this, _progressStart_extraInitializers), __runInitializers(_this, _progressEnd_initializers, void 0)); // Ngày kết thúc tiến độ
            _this.notificationSent = (__runInitializers(_this, _progressEnd_extraInitializers), __runInitializers(_this, _notificationSent_initializers, void 0)); // Tham chiếu đến NotificationSent
            _this.taskAssignPerson = (__runInitializers(_this, _notificationSent_extraInitializers), __runInitializers(_this, _taskAssignPerson_initializers, void 0)); // Tham chiếu đến Employee (người giao nhiệm vụ)
            _this.taskRecipient = (__runInitializers(_this, _taskAssignPerson_extraInitializers), __runInitializers(_this, _taskRecipient_initializers, void 0)); // Tham chiếu đến Employee (người nhận nhiệm vụ)
            _this.priority = (__runInitializers(_this, _taskRecipient_extraInitializers), __runInitializers(_this, _priority_initializers, void 0)); // Mức độ ưu tiên của tiến độ
            _this.description = (__runInitializers(_this, _priority_extraInitializers), __runInitializers(_this, _description_initializers, void 0)); // Mô tả chi tiết tiến độ
            _this.status = (__runInitializers(_this, _description_extraInitializers), __runInitializers(_this, _status_initializers, void 0)); // Trạng thái của tiến độ (ví dụ: 'Hoàn thành', 'Đang tiến hành', v.v.)
            __runInitializers(_this, _status_extraInitializers);
            return _this;
        }
        return Progress_1;
    }(_classSuper));
    __setFunctionName(_classThis, "Progress");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _progressName_decorators = [(0, mongoose_1.Prop)({ required: true, trim: true })];
        _projectid_decorators = [(0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })];
        _progressCategory_decorators = [(0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'ProgressCategory' })];
        _progressStart_decorators = [(0, mongoose_1.Prop)({ required: true, type: Date })];
        _progressEnd_decorators = [(0, mongoose_1.Prop)({ required: true, type: Date })];
        _notificationSent_decorators = [(0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'NotificationSent' })];
        _taskAssignPerson_decorators = [(0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' })];
        _taskRecipient_decorators = [(0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' })];
        _priority_decorators = [(0, mongoose_1.Prop)({ required: true, trim: true })];
        _description_decorators = [(0, mongoose_1.Prop)({ required: true, trim: true })];
        _status_decorators = [(0, mongoose_1.Prop)({ required: true, trim: true })];
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
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Progress = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Progress = _classThis;
}();
exports.Progress = Progress;
exports.ProgressSchema = mongoose_1.SchemaFactory.createForClass(Progress);
