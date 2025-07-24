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
exports.CreateTeamDto = void 0;
var class_validator_1 = require("class-validator");
var CreateTeamDto = function () {
    var _a;
    var _teamName_decorators;
    var _teamName_initializers = [];
    var _teamName_extraInitializers = [];
    var _teamLead_decorators;
    var _teamLead_initializers = [];
    var _teamLead_extraInitializers = [];
    var _projectid_decorators;
    var _projectid_initializers = [];
    var _projectid_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateTeamDto() {
                this.teamName = __runInitializers(this, _teamName_initializers, void 0);
                this.teamLead = (__runInitializers(this, _teamName_extraInitializers), __runInitializers(this, _teamLead_initializers, void 0));
                this.projectid = (__runInitializers(this, _teamLead_extraInitializers), __runInitializers(this, _projectid_initializers, void 0));
                __runInitializers(this, _projectid_extraInitializers);
            }
            return CreateTeamDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _teamName_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'Tên đội nhóm là bắt buộc' }), (0, class_validator_1.IsString)({ message: 'Tên đội nhóm phải là chuỗi' })];
            _teamLead_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'Người lãnh đạo là bắt buộc' }), (0, class_validator_1.IsMongoId)({ message: 'teamLead phải là ObjectId hợp lệ' })];
            _projectid_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'Dự án là bắt buộc' }), (0, class_validator_1.IsMongoId)({ message: 'projectid phải là ObjectId hợp lệ' })];
            __esDecorate(null, null, _teamName_decorators, { kind: "field", name: "teamName", static: false, private: false, access: { has: function (obj) { return "teamName" in obj; }, get: function (obj) { return obj.teamName; }, set: function (obj, value) { obj.teamName = value; } }, metadata: _metadata }, _teamName_initializers, _teamName_extraInitializers);
            __esDecorate(null, null, _teamLead_decorators, { kind: "field", name: "teamLead", static: false, private: false, access: { has: function (obj) { return "teamLead" in obj; }, get: function (obj) { return obj.teamLead; }, set: function (obj, value) { obj.teamLead = value; } }, metadata: _metadata }, _teamLead_initializers, _teamLead_extraInitializers);
            __esDecorate(null, null, _projectid_decorators, { kind: "field", name: "projectid", static: false, private: false, access: { has: function (obj) { return "projectid" in obj; }, get: function (obj) { return obj.projectid; }, set: function (obj, value) { obj.projectid = value; } }, metadata: _metadata }, _projectid_initializers, _projectid_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateTeamDto = CreateTeamDto;
