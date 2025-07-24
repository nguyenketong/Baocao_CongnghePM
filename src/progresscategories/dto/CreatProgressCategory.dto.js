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
exports.CreateProgressCategoryDto = void 0;
var class_validator_1 = require("class-validator");
var CreateProgressCategoryDto = function () {
    var _a;
    var _progressCategoryName_decorators;
    var _progressCategoryName_initializers = [];
    var _progressCategoryName_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateProgressCategoryDto() {
                this.progressCategoryName = __runInitializers(this, _progressCategoryName_initializers, void 0);
                __runInitializers(this, _progressCategoryName_extraInitializers);
            }
            return CreateProgressCategoryDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _progressCategoryName_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'Tên danh mục tiến độ là bắt buộc' }), (0, class_validator_1.IsString)({ message: 'Tên danh mục tiến độ phải là chuỗi' }), (0, class_validator_1.MaxLength)(100, { message: 'Tên danh mục tiến độ không được quá 100 ký tự' })];
            __esDecorate(null, null, _progressCategoryName_decorators, { kind: "field", name: "progressCategoryName", static: false, private: false, access: { has: function (obj) { return "progressCategoryName" in obj; }, get: function (obj) { return obj.progressCategoryName; }, set: function (obj, value) { obj.progressCategoryName = value; } }, metadata: _metadata }, _progressCategoryName_initializers, _progressCategoryName_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateProgressCategoryDto = CreateProgressCategoryDto;
