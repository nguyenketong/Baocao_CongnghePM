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
exports.ProjectPermissionsSchema = exports.ProjectPermissions = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var ProjectPermissions = function () {
    var _classDecorators = [(0, mongoose_1.Schema)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = mongoose_2.Document;
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
    var ProjectPermissions = _classThis = /** @class */ (function (_super) {
        __extends(ProjectPermissions_1, _super);
        function ProjectPermissions_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.resourceName = __runInitializers(_this, _resourceName_initializers, void 0);
            _this.can_read = (__runInitializers(_this, _resourceName_extraInitializers), __runInitializers(_this, _can_read_initializers, void 0));
            _this.can_write = (__runInitializers(_this, _can_read_extraInitializers), __runInitializers(_this, _can_write_initializers, void 0));
            _this.can_create = (__runInitializers(_this, _can_write_extraInitializers), __runInitializers(_this, _can_create_initializers, void 0));
            _this.can_delete = (__runInitializers(_this, _can_create_extraInitializers), __runInitializers(_this, _can_delete_initializers, void 0));
            _this.can_import = (__runInitializers(_this, _can_delete_extraInitializers), __runInitializers(_this, _can_import_initializers, void 0));
            _this.can_export = (__runInitializers(_this, _can_import_extraInitializers), __runInitializers(_this, _can_export_initializers, void 0));
            __runInitializers(_this, _can_export_extraInitializers);
            return _this;
        }
        return ProjectPermissions_1;
    }(_classSuper));
    __setFunctionName(_classThis, "ProjectPermissions");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _resourceName_decorators = [(0, mongoose_1.Prop)({ required: true, trim: true })];
        _can_read_decorators = [(0, mongoose_1.Prop)({ trim: true })];
        _can_write_decorators = [(0, mongoose_1.Prop)({ trim: true })];
        _can_create_decorators = [(0, mongoose_1.Prop)({ default: false })];
        _can_delete_decorators = [(0, mongoose_1.Prop)({ default: false })];
        _can_import_decorators = [(0, mongoose_1.Prop)({ default: false })];
        _can_export_decorators = [(0, mongoose_1.Prop)({ default: false })];
        __esDecorate(null, null, _resourceName_decorators, { kind: "field", name: "resourceName", static: false, private: false, access: { has: function (obj) { return "resourceName" in obj; }, get: function (obj) { return obj.resourceName; }, set: function (obj, value) { obj.resourceName = value; } }, metadata: _metadata }, _resourceName_initializers, _resourceName_extraInitializers);
        __esDecorate(null, null, _can_read_decorators, { kind: "field", name: "can_read", static: false, private: false, access: { has: function (obj) { return "can_read" in obj; }, get: function (obj) { return obj.can_read; }, set: function (obj, value) { obj.can_read = value; } }, metadata: _metadata }, _can_read_initializers, _can_read_extraInitializers);
        __esDecorate(null, null, _can_write_decorators, { kind: "field", name: "can_write", static: false, private: false, access: { has: function (obj) { return "can_write" in obj; }, get: function (obj) { return obj.can_write; }, set: function (obj, value) { obj.can_write = value; } }, metadata: _metadata }, _can_write_initializers, _can_write_extraInitializers);
        __esDecorate(null, null, _can_create_decorators, { kind: "field", name: "can_create", static: false, private: false, access: { has: function (obj) { return "can_create" in obj; }, get: function (obj) { return obj.can_create; }, set: function (obj, value) { obj.can_create = value; } }, metadata: _metadata }, _can_create_initializers, _can_create_extraInitializers);
        __esDecorate(null, null, _can_delete_decorators, { kind: "field", name: "can_delete", static: false, private: false, access: { has: function (obj) { return "can_delete" in obj; }, get: function (obj) { return obj.can_delete; }, set: function (obj, value) { obj.can_delete = value; } }, metadata: _metadata }, _can_delete_initializers, _can_delete_extraInitializers);
        __esDecorate(null, null, _can_import_decorators, { kind: "field", name: "can_import", static: false, private: false, access: { has: function (obj) { return "can_import" in obj; }, get: function (obj) { return obj.can_import; }, set: function (obj, value) { obj.can_import = value; } }, metadata: _metadata }, _can_import_initializers, _can_import_extraInitializers);
        __esDecorate(null, null, _can_export_decorators, { kind: "field", name: "can_export", static: false, private: false, access: { has: function (obj) { return "can_export" in obj; }, get: function (obj) { return obj.can_export; }, set: function (obj, value) { obj.can_export = value; } }, metadata: _metadata }, _can_export_initializers, _can_export_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProjectPermissions = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProjectPermissions = _classThis;
}();
exports.ProjectPermissions = ProjectPermissions;
exports.ProjectPermissionsSchema = mongoose_1.SchemaFactory.createForClass(ProjectPermissions);
