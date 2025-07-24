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
exports.TeamSchema = exports.Team = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var mongoose = require("mongoose");
var Team = function () {
    var _classDecorators = [(0, mongoose_1.Schema)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = mongoose_2.Document;
    var _teamName_decorators;
    var _teamName_initializers = [];
    var _teamName_extraInitializers = [];
    var _teamLead_decorators;
    var _teamLead_initializers = [];
    var _teamLead_extraInitializers = [];
    var _projectid_decorators;
    var _projectid_initializers = [];
    var _projectid_extraInitializers = [];
    var Team = _classThis = /** @class */ (function (_super) {
        __extends(Team_1, _super);
        function Team_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.teamName = __runInitializers(_this, _teamName_initializers, void 0); // Bắt buộc, loại bỏ khoảng trắng thừa
            _this.teamLead = (__runInitializers(_this, _teamName_extraInitializers), __runInitializers(_this, _teamLead_initializers, void 0)); // Liên kết với Employee, đây là người lãnh đạo của đội nhóm
            _this.projectid = (__runInitializers(_this, _teamLead_extraInitializers), __runInitializers(_this, _projectid_initializers, void 0)); // Liên kết với Project, đây là dự án mà đội nhóm này làm việc
            __runInitializers(_this, _projectid_extraInitializers);
            return _this;
        }
        return Team_1;
    }(_classSuper));
    __setFunctionName(_classThis, "Team");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _teamName_decorators = [(0, mongoose_1.Prop)({ required: true, trim: true })];
        _teamLead_decorators = [(0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' })];
        _projectid_decorators = [(0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })];
        __esDecorate(null, null, _teamName_decorators, { kind: "field", name: "teamName", static: false, private: false, access: { has: function (obj) { return "teamName" in obj; }, get: function (obj) { return obj.teamName; }, set: function (obj, value) { obj.teamName = value; } }, metadata: _metadata }, _teamName_initializers, _teamName_extraInitializers);
        __esDecorate(null, null, _teamLead_decorators, { kind: "field", name: "teamLead", static: false, private: false, access: { has: function (obj) { return "teamLead" in obj; }, get: function (obj) { return obj.teamLead; }, set: function (obj, value) { obj.teamLead = value; } }, metadata: _metadata }, _teamLead_initializers, _teamLead_extraInitializers);
        __esDecorate(null, null, _projectid_decorators, { kind: "field", name: "projectid", static: false, private: false, access: { has: function (obj) { return "projectid" in obj; }, get: function (obj) { return obj.projectid; }, set: function (obj, value) { obj.projectid = value; } }, metadata: _metadata }, _projectid_initializers, _projectid_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Team = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Team = _classThis;
}();
exports.Team = Team;
exports.TeamSchema = mongoose_1.SchemaFactory.createForClass(Team);
