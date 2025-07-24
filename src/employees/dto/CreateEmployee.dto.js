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
exports.CreateEmployeeDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var CreateAccount_dto_1 = require("../../../../../../src/accounts/dto/CreateAccount.dto");
var CreateProjectPermission_dto_1 = require("../../../../../../src/projectpermissions/dto/CreateProjectPermission.dto");
var CreateEmployeeDto = function () {
    var _a;
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
    return _a = /** @class */ (function () {
            function CreateEmployeeDto() {
                this.employeeName = __runInitializers(this, _employeeName_initializers, void 0);
                this.employeeProfile = (__runInitializers(this, _employeeName_extraInitializers), __runInitializers(this, _employeeProfile_initializers, void 0));
                this.joiningDate = (__runInitializers(this, _employeeProfile_extraInitializers), __runInitializers(this, _joiningDate_initializers, void 0));
                this.phone = (__runInitializers(this, _joiningDate_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
                this.description = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.team_id = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _team_id_initializers, void 0));
                this.department_id = (__runInitializers(this, _team_id_extraInitializers), __runInitializers(this, _department_id_initializers, void 0));
                this.designation_id = (__runInitializers(this, _department_id_extraInitializers), __runInitializers(this, _designation_id_initializers, void 0));
                this.account = (__runInitializers(this, _designation_id_extraInitializers), __runInitializers(this, _account_initializers, void 0));
                this.projectpermission = (__runInitializers(this, _account_extraInitializers), __runInitializers(this, _projectpermission_initializers, void 0));
                __runInitializers(this, _projectpermission_extraInitializers);
            }
            return CreateEmployeeDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _employeeName_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'Tên nhân viên là bắt buộc' }), (0, class_validator_1.IsString)({ message: 'Tên nhân viên phải là chuỗi' }), (0, class_validator_1.MaxLength)(100, { message: 'Tên nhân viên không được quá 100 ký tự' })];
            _employeeProfile_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'Ảnh hồ sơ phải là chuỗi' }), (0, class_validator_1.MaxLength)(255, { message: 'Đường dẫn ảnh hồ sơ không được quá 255 ký tự' })];
            _joiningDate_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDate)({ message: 'Ngày tham gia phải là một ngày hợp lệ' }), (0, class_transformer_1.Type)(function () { return Date; })];
            _phone_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsPhoneNumber)(undefined, { message: 'Số điện thoại không hợp lệ' })];
            _description_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'Mô tả phải là chuỗi' }), (0, class_validator_1.MaxLength)(500, { message: 'Mô tả không được quá 500 ký tự' })];
            _team_id_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'team_id phải là chuỗi ObjectId hợp lệ' })];
            _department_id_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'department_id phải là chuỗi ObjectId hợp lệ' })];
            _designation_id_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'designation_id phải là chuỗi ObjectId hợp lệ' })];
            _account_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return CreateAccount_dto_1.CreateAccountDto; })];
            _projectpermission_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return CreateProjectPermission_dto_1.CreateProjectPermissionsDto; })];
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
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateEmployeeDto = CreateEmployeeDto;
