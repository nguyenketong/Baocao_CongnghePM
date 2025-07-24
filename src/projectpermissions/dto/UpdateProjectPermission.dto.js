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
exports.UpdateProjectPermissionsDto = void 0;
var class_validator_1 = require("class-validator");
var UpdateProjectPermissionsDto = function () {
    var _a;
    var _resourceName_decorators;
    var _resourceName_initializers = [];
    var _resourceName_extraInitializers = [];
    var _can_read_decorators;
    var _can_read_initializers = [];
    var _can_read_extraInitializers = [];
    var _can_write_decorators;
    var _can_write_initializers = [];
    var _can_write_extraInitializers = [];
    var _can_create_decorators;
    var _can_create_initializers = [];
    var _can_create_extraInitializers = [];
    var _can_delete_decorators;
    var _can_delete_initializers = [];
    var _can_delete_extraInitializers = [];
    var _can_import_decorators;
    var _can_import_initializers = [];
    var _can_import_extraInitializers = [];
    var _can_export_decorators;
    var _can_export_initializers = [];
    var _can_export_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateProjectPermissionsDto() {
                this.resourceName = __runInitializers(this, _resourceName_initializers, void 0);
                this.can_read = (__runInitializers(this, _resourceName_extraInitializers), __runInitializers(this, _can_read_initializers, void 0));
                this.can_write = (__runInitializers(this, _can_read_extraInitializers), __runInitializers(this, _can_write_initializers, void 0));
                this.can_create = (__runInitializers(this, _can_write_extraInitializers), __runInitializers(this, _can_create_initializers, void 0));
                this.can_delete = (__runInitializers(this, _can_create_extraInitializers), __runInitializers(this, _can_delete_initializers, void 0));
                this.can_import = (__runInitializers(this, _can_delete_extraInitializers), __runInitializers(this, _can_import_initializers, void 0));
                this.can_export = (__runInitializers(this, _can_import_extraInitializers), __runInitializers(this, _can_export_initializers, void 0));
                __runInitializers(this, _can_export_extraInitializers);
            }
            return UpdateProjectPermissionsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _resourceName_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'Tên tài nguyên phải là chuỗi' })];
            _can_read_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)({ message: 'Giá trị phải là true hoặc false' })];
            _can_write_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)({ message: 'Giá trị phải là true hoặc false' })];
            _can_create_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)({ message: 'Giá trị phải là true hoặc false' })];
            _can_delete_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)({ message: 'Giá trị phải là true hoặc false' })];
            _can_import_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)({ message: 'Giá trị phải là true hoặc false' })];
            _can_export_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)({ message: 'Giá trị phải là true hoặc false' })];
            __esDecorate(null, null, _resourceName_decorators, { kind: "field", name: "resourceName", static: false, private: false, access: { has: function (obj) { return "resourceName" in obj; }, get: function (obj) { return obj.resourceName; }, set: function (obj, value) { obj.resourceName = value; } }, metadata: _metadata }, _resourceName_initializers, _resourceName_extraInitializers);
            __esDecorate(null, null, _can_read_decorators, { kind: "field", name: "can_read", static: false, private: false, access: { has: function (obj) { return "can_read" in obj; }, get: function (obj) { return obj.can_read; }, set: function (obj, value) { obj.can_read = value; } }, metadata: _metadata }, _can_read_initializers, _can_read_extraInitializers);
            __esDecorate(null, null, _can_write_decorators, { kind: "field", name: "can_write", static: false, private: false, access: { has: function (obj) { return "can_write" in obj; }, get: function (obj) { return obj.can_write; }, set: function (obj, value) { obj.can_write = value; } }, metadata: _metadata }, _can_write_initializers, _can_write_extraInitializers);
            __esDecorate(null, null, _can_create_decorators, { kind: "field", name: "can_create", static: false, private: false, access: { has: function (obj) { return "can_create" in obj; }, get: function (obj) { return obj.can_create; }, set: function (obj, value) { obj.can_create = value; } }, metadata: _metadata }, _can_create_initializers, _can_create_extraInitializers);
            __esDecorate(null, null, _can_delete_decorators, { kind: "field", name: "can_delete", static: false, private: false, access: { has: function (obj) { return "can_delete" in obj; }, get: function (obj) { return obj.can_delete; }, set: function (obj, value) { obj.can_delete = value; } }, metadata: _metadata }, _can_delete_initializers, _can_delete_extraInitializers);
            __esDecorate(null, null, _can_import_decorators, { kind: "field", name: "can_import", static: false, private: false, access: { has: function (obj) { return "can_import" in obj; }, get: function (obj) { return obj.can_import; }, set: function (obj, value) { obj.can_import = value; } }, metadata: _metadata }, _can_import_initializers, _can_import_extraInitializers);
            __esDecorate(null, null, _can_export_decorators, { kind: "field", name: "can_export", static: false, private: false, access: { has: function (obj) { return "can_export" in obj; }, get: function (obj) { return obj.can_export; }, set: function (obj, value) { obj.can_export = value; } }, metadata: _metadata }, _can_export_initializers, _can_export_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateProjectPermissionsDto = UpdateProjectPermissionsDto;
