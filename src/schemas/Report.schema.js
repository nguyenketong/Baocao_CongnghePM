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
exports.ReportSchema = exports.Report = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var mongoose = require("mongoose");
var Report = function () {
    var _classDecorators = [(0, mongoose_1.Schema)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = mongoose_2.Document;
    var _reportName_decorators;
    var _reportName_initializers = [];
    var _reportName_extraInitializers = [];
    var _submission_time_decorators;
    var _submission_time_initializers = [];
    var _submission_time_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _notereport_decorators;
    var _notereport_initializers = [];
    var _notereport_extraInitializers = [];
    var _filerepport_decorators;
    var _filerepport_initializers = [];
    var _filerepport_extraInitializers = [];
    var _id_employee_decorators;
    var _id_employee_initializers = [];
    var _id_employee_extraInitializers = [];
    var _id_task_decorators;
    var _id_task_initializers = [];
    var _id_task_extraInitializers = [];
    var _id_progress_decorators;
    var _id_progress_initializers = [];
    var _id_progress_extraInitializers = [];
    var Report = _classThis = /** @class */ (function (_super) {
        __extends(Report_1, _super);
        function Report_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.reportName = __runInitializers(_this, _reportName_initializers, void 0); // Tên báo cáo
            _this.submission_time = (__runInitializers(_this, _reportName_extraInitializers), __runInitializers(_this, _submission_time_initializers, void 0)); // Thời gian nộp báo cáo
            _this.status = (__runInitializers(_this, _submission_time_extraInitializers), __runInitializers(_this, _status_initializers, void 0)); // Trạng thái báo cáo
            _this.notereport = (__runInitializers(_this, _status_extraInitializers), __runInitializers(_this, _notereport_initializers, void 0)); // Ghi chú báo cáo
            _this.filerepport = (__runInitializers(_this, _notereport_extraInitializers), __runInitializers(_this, _filerepport_initializers, void 0)); // Đường dẫn file báo cáo
            _this.id_employee = (__runInitializers(_this, _filerepport_extraInitializers), __runInitializers(_this, _id_employee_initializers, void 0)); // Tham chiếu đến Employee
            _this.id_task = (__runInitializers(_this, _id_employee_extraInitializers), __runInitializers(_this, _id_task_initializers, void 0)); // Tham chiếu đến Task
            _this.id_progress = (__runInitializers(_this, _id_task_extraInitializers), __runInitializers(_this, _id_progress_initializers, void 0)); // Tham chiếu đến Progress
            __runInitializers(_this, _id_progress_extraInitializers);
            return _this;
        }
        return Report_1;
    }(_classSuper));
    __setFunctionName(_classThis, "Report");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _reportName_decorators = [(0, mongoose_1.Prop)({ required: true, trim: true })];
        _submission_time_decorators = [(0, mongoose_1.Prop)({ required: true, type: Date, default: Date.now })];
        _status_decorators = [(0, mongoose_1.Prop)({ required: true, trim: true })];
        _notereport_decorators = [(0, mongoose_1.Prop)({ trim: true })];
        _filerepport_decorators = [(0, mongoose_1.Prop)({ trim: true })];
        _id_employee_decorators = [(0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true })];
        _id_task_decorators = [(0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: false })];
        _id_progress_decorators = [(0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Progress', required: false })];
        __esDecorate(null, null, _reportName_decorators, { kind: "field", name: "reportName", static: false, private: false, access: { has: function (obj) { return "reportName" in obj; }, get: function (obj) { return obj.reportName; }, set: function (obj, value) { obj.reportName = value; } }, metadata: _metadata }, _reportName_initializers, _reportName_extraInitializers);
        __esDecorate(null, null, _submission_time_decorators, { kind: "field", name: "submission_time", static: false, private: false, access: { has: function (obj) { return "submission_time" in obj; }, get: function (obj) { return obj.submission_time; }, set: function (obj, value) { obj.submission_time = value; } }, metadata: _metadata }, _submission_time_initializers, _submission_time_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _notereport_decorators, { kind: "field", name: "notereport", static: false, private: false, access: { has: function (obj) { return "notereport" in obj; }, get: function (obj) { return obj.notereport; }, set: function (obj, value) { obj.notereport = value; } }, metadata: _metadata }, _notereport_initializers, _notereport_extraInitializers);
        __esDecorate(null, null, _filerepport_decorators, { kind: "field", name: "filerepport", static: false, private: false, access: { has: function (obj) { return "filerepport" in obj; }, get: function (obj) { return obj.filerepport; }, set: function (obj, value) { obj.filerepport = value; } }, metadata: _metadata }, _filerepport_initializers, _filerepport_extraInitializers);
        __esDecorate(null, null, _id_employee_decorators, { kind: "field", name: "id_employee", static: false, private: false, access: { has: function (obj) { return "id_employee" in obj; }, get: function (obj) { return obj.id_employee; }, set: function (obj, value) { obj.id_employee = value; } }, metadata: _metadata }, _id_employee_initializers, _id_employee_extraInitializers);
        __esDecorate(null, null, _id_task_decorators, { kind: "field", name: "id_task", static: false, private: false, access: { has: function (obj) { return "id_task" in obj; }, get: function (obj) { return obj.id_task; }, set: function (obj, value) { obj.id_task = value; } }, metadata: _metadata }, _id_task_initializers, _id_task_extraInitializers);
        __esDecorate(null, null, _id_progress_decorators, { kind: "field", name: "id_progress", static: false, private: false, access: { has: function (obj) { return "id_progress" in obj; }, get: function (obj) { return obj.id_progress; }, set: function (obj, value) { obj.id_progress = value; } }, metadata: _metadata }, _id_progress_initializers, _id_progress_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Report = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Report = _classThis;
}();
exports.Report = Report;
exports.ReportSchema = mongoose_1.SchemaFactory.createForClass(Report);
