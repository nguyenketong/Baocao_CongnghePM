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
exports.EmployeeSchema = exports.Employee = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var mongoose = require("mongoose");
var Employee = function () {
    var _classDecorators = [(0, mongoose_1.Schema)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = mongoose_2.Document;
    var _employeeName_decorators;
    var _employeeName_initializers = [];
    var _employeeName_extraInitializers = [];
    var _employeeProfile_decorators;
    var _employeeProfile_initializers = [];
    var _employeeProfile_extraInitializers = [];
    var _joiningDate_decorators;
    var _joiningDate_initializers = [];
    var _joiningDate_extraInitializers = [];
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _team_id_decorators;
    var _team_id_initializers = [];
    var _team_id_extraInitializers = [];
    var _department_id_decorators;
    var _department_id_initializers = [];
    var _department_id_extraInitializers = [];
    var _designation_id_decorators;
    var _designation_id_initializers = [];
    var _designation_id_extraInitializers = [];
    var _account_decorators;
    var _account_initializers = [];
    var _account_extraInitializers = [];
    var _projectpermission_decorators;
    var _projectpermission_initializers = [];
    var _projectpermission_extraInitializers = [];
    var Employee = _classThis = /** @class */ (function (_super) {
        __extends(Employee_1, _super);
        function Employee_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.employeeName = __runInitializers(_this, _employeeName_initializers, void 0);
            _this.employeeProfile = (__runInitializers(_this, _employeeName_extraInitializers), __runInitializers(_this, _employeeProfile_initializers, void 0));
            _this.joiningDate = (__runInitializers(_this, _employeeProfile_extraInitializers), __runInitializers(_this, _joiningDate_initializers, void 0));
            _this.phone = (__runInitializers(_this, _joiningDate_extraInitializers), __runInitializers(_this, _phone_initializers, void 0));
            _this.description = (__runInitializers(_this, _phone_extraInitializers), __runInitializers(_this, _description_initializers, void 0));
            _this.team_id = (__runInitializers(_this, _description_extraInitializers), __runInitializers(_this, _team_id_initializers, void 0));
            _this.department_id = (__runInitializers(_this, _team_id_extraInitializers), __runInitializers(_this, _department_id_initializers, void 0));
            _this.designation_id = (__runInitializers(_this, _department_id_extraInitializers), __runInitializers(_this, _designation_id_initializers, void 0));
            _this.account = (__runInitializers(_this, _designation_id_extraInitializers), __runInitializers(_this, _account_initializers, void 0));
            _this.projectpermission = (__runInitializers(_this, _account_extraInitializers), __runInitializers(_this, _projectpermission_initializers, void 0));
            __runInitializers(_this, _projectpermission_extraInitializers);
            return _this;
        }
        return Employee_1;
    }(_classSuper));
    __setFunctionName(_classThis, "Employee");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _employeeName_decorators = [(0, mongoose_1.Prop)({ required: true, trim: true })];
        _employeeProfile_decorators = [(0, mongoose_1.Prop)({ required: false, trim: true })];
        _joiningDate_decorators = [(0, mongoose_1.Prop)({ required: true, type: Date })];
        _phone_decorators = [(0, mongoose_1.Prop)({
                required: false,
                trim: true,
                match: [/^\+?[0-9]{7,15}$/, 'Số điện thoại không hợp lệ'],
            })];
        _description_decorators = [(0, mongoose_1.Prop)({ required: false, trim: true, maxlength: 500 })];
        _team_id_decorators = [(0, mongoose_1.Prop)({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }] })];
        _department_id_decorators = [(0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Department' })];
        _designation_id_decorators = [(0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Designation' })];
        _account_decorators = [(0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })];
        _projectpermission_decorators = [(0, mongoose_1.Prop)({ type: [mongoose.Schema.Types.ObjectId], ref: 'ProjectPermissions' })];
        __esDecorate(null, null, _employeeName_decorators, { kind: "field", name: "employeeName", static: false, private: false, access: { has: function (obj) { return "employeeName" in obj; }, get: function (obj) { return obj.employeeName; }, set: function (obj, value) { obj.employeeName = value; } }, metadata: _metadata }, _employeeName_initializers, _employeeName_extraInitializers);
        __esDecorate(null, null, _employeeProfile_decorators, { kind: "field", name: "employeeProfile", static: false, private: false, access: { has: function (obj) { return "employeeProfile" in obj; }, get: function (obj) { return obj.employeeProfile; }, set: function (obj, value) { obj.employeeProfile = value; } }, metadata: _metadata }, _employeeProfile_initializers, _employeeProfile_extraInitializers);
        __esDecorate(null, null, _joiningDate_decorators, { kind: "field", name: "joiningDate", static: false, private: false, access: { has: function (obj) { return "joiningDate" in obj; }, get: function (obj) { return obj.joiningDate; }, set: function (obj, value) { obj.joiningDate = value; } }, metadata: _metadata }, _joiningDate_initializers, _joiningDate_extraInitializers);
        __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _team_id_decorators, { kind: "field", name: "team_id", static: false, private: false, access: { has: function (obj) { return "team_id" in obj; }, get: function (obj) { return obj.team_id; }, set: function (obj, value) { obj.team_id = value; } }, metadata: _metadata }, _team_id_initializers, _team_id_extraInitializers);
        __esDecorate(null, null, _department_id_decorators, { kind: "field", name: "department_id", static: false, private: false, access: { has: function (obj) { return "department_id" in obj; }, get: function (obj) { return obj.department_id; }, set: function (obj, value) { obj.department_id = value; } }, metadata: _metadata }, _department_id_initializers, _department_id_extraInitializers);
        __esDecorate(null, null, _designation_id_decorators, { kind: "field", name: "designation_id", static: false, private: false, access: { has: function (obj) { return "designation_id" in obj; }, get: function (obj) { return obj.designation_id; }, set: function (obj, value) { obj.designation_id = value; } }, metadata: _metadata }, _designation_id_initializers, _designation_id_extraInitializers);
        __esDecorate(null, null, _account_decorators, { kind: "field", name: "account", static: false, private: false, access: { has: function (obj) { return "account" in obj; }, get: function (obj) { return obj.account; }, set: function (obj, value) { obj.account = value; } }, metadata: _metadata }, _account_initializers, _account_extraInitializers);
        __esDecorate(null, null, _projectpermission_decorators, { kind: "field", name: "projectpermission", static: false, private: false, access: { has: function (obj) { return "projectpermission" in obj; }, get: function (obj) { return obj.projectpermission; }, set: function (obj, value) { obj.projectpermission = value; } }, metadata: _metadata }, _projectpermission_initializers, _projectpermission_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Employee = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Employee = _classThis;
}();
exports.Employee = Employee;
// 🔹 Tạo Schema từ class Employee
var EmployeeSchema = mongoose_1.SchemaFactory.createForClass(Employee);
exports.EmployeeSchema = EmployeeSchema;
// 🔹 Thêm Virtual Populate để lấy danh sách Task của Employee
EmployeeSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id', // Employee._id
    foreignField: 'taskRecipient', // Task.taskRecipient
});
// 🔹 Bật Virtuals khi chuyển đổi JSON hoặc Object
EmployeeSchema.set('toJSON', { virtuals: true });
EmployeeSchema.set('toObject', { virtuals: true });
