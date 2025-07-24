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
exports.CreateReportDto = void 0;
var class_validator_1 = require("class-validator");
var CreateReportDto = function () {
    var _a;
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
    return _a = /** @class */ (function () {
            function CreateReportDto() {
                this.reportName = __runInitializers(this, _reportName_initializers, void 0);
                this.submission_time = (__runInitializers(this, _reportName_extraInitializers), __runInitializers(this, _submission_time_initializers, void 0));
                this.status = (__runInitializers(this, _submission_time_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                this.notereport = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _notereport_initializers, void 0));
                this.filerepport = (__runInitializers(this, _notereport_extraInitializers), __runInitializers(this, _filerepport_initializers, void 0));
                this.id_employee = (__runInitializers(this, _filerepport_extraInitializers), __runInitializers(this, _id_employee_initializers, void 0));
                this.id_task = (__runInitializers(this, _id_employee_extraInitializers), __runInitializers(this, _id_task_initializers, void 0));
                this.id_progress = (__runInitializers(this, _id_task_extraInitializers), __runInitializers(this, _id_progress_initializers, void 0));
                __runInitializers(this, _id_progress_extraInitializers);
            }
            return CreateReportDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _reportName_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'Tên báo cáo là bắt buộc' })];
            _submission_time_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'Thời gian nộp báo cáo là bắt buộc' })];
            _status_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'Trạng thái báo cáo là bắt buộc' }), (0, class_validator_1.IsString)({ message: 'Trạng thái phải là chuỗi' }), (0, class_validator_1.MaxLength)(50, { message: 'Trạng thái không được quá 50 ký tự' })];
            _notereport_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'Ghi chú báo cáo phải là chuỗi' }), (0, class_validator_1.MaxLength)(500, { message: 'Ghi chú báo cáo không được quá 500 ký tự' })];
            _filerepport_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'Đường dẫn file báo cáo phải là chuỗi' }), (0, class_validator_1.MaxLength)(255, { message: 'Đường dẫn file báo cáo không được quá 255 ký tự' })];
            _id_employee_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNotEmpty)({ message: 'ID nhân viên là bắt buộc' }), (0, class_validator_1.IsString)({ message: 'ID nhân viên phải là chuỗi ObjectId hợp lệ' })];
            _id_task_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'ID nhiệm vụ phải là chuỗi ObjectId hợp lệ' })];
            _id_progress_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'ID tiến độ phải là chuỗi ObjectId hợp lệ' })];
            __esDecorate(null, null, _reportName_decorators, { kind: "field", name: "reportName", static: false, private: false, access: { has: function (obj) { return "reportName" in obj; }, get: function (obj) { return obj.reportName; }, set: function (obj, value) { obj.reportName = value; } }, metadata: _metadata }, _reportName_initializers, _reportName_extraInitializers);
            __esDecorate(null, null, _submission_time_decorators, { kind: "field", name: "submission_time", static: false, private: false, access: { has: function (obj) { return "submission_time" in obj; }, get: function (obj) { return obj.submission_time; }, set: function (obj, value) { obj.submission_time = value; } }, metadata: _metadata }, _submission_time_initializers, _submission_time_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _notereport_decorators, { kind: "field", name: "notereport", static: false, private: false, access: { has: function (obj) { return "notereport" in obj; }, get: function (obj) { return obj.notereport; }, set: function (obj, value) { obj.notereport = value; } }, metadata: _metadata }, _notereport_initializers, _notereport_extraInitializers);
            __esDecorate(null, null, _filerepport_decorators, { kind: "field", name: "filerepport", static: false, private: false, access: { has: function (obj) { return "filerepport" in obj; }, get: function (obj) { return obj.filerepport; }, set: function (obj, value) { obj.filerepport = value; } }, metadata: _metadata }, _filerepport_initializers, _filerepport_extraInitializers);
            __esDecorate(null, null, _id_employee_decorators, { kind: "field", name: "id_employee", static: false, private: false, access: { has: function (obj) { return "id_employee" in obj; }, get: function (obj) { return obj.id_employee; }, set: function (obj, value) { obj.id_employee = value; } }, metadata: _metadata }, _id_employee_initializers, _id_employee_extraInitializers);
            __esDecorate(null, null, _id_task_decorators, { kind: "field", name: "id_task", static: false, private: false, access: { has: function (obj) { return "id_task" in obj; }, get: function (obj) { return obj.id_task; }, set: function (obj, value) { obj.id_task = value; } }, metadata: _metadata }, _id_task_initializers, _id_task_extraInitializers);
            __esDecorate(null, null, _id_progress_decorators, { kind: "field", name: "id_progress", static: false, private: false, access: { has: function (obj) { return "id_progress" in obj; }, get: function (obj) { return obj.id_progress; }, set: function (obj, value) { obj.id_progress = value; } }, metadata: _metadata }, _id_progress_initializers, _id_progress_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateReportDto = CreateReportDto;
