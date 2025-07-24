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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = void 0;
//@Schema() và @Prop() là các decorator 
// framework NestJS và Mongoose hiểu rằng class User là một schema và các thuộc tính của nó sẽ là các trường trong MongoDB.
//SchemaFactory là một "factory"
//Factory (ở đây là SchemaFactory) sẽ tự động tạo ra schema cho bạn từ class User.
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var User = function () {
    var _classDecorators = [(0, mongoose_1.Schema)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _username_decorators;
    var _username_initializers = [];
    var _username_extraInitializers = [];
    var _displayName_decorators;
    var _displayName_initializers = [];
    var _displayName_extraInitializers = [];
    var _avatarUrl_decorators;
    var _avatarUrl_initializers = [];
    var _avatarUrl_extraInitializers = [];
    var _setting_decorators;
    var _setting_initializers = [];
    var _setting_extraInitializers = [];
    var _posts_decorators;
    var _posts_initializers = [];
    var _posts_extraInitializers = [];
    var User = _classThis = /** @class */ (function () {
        function User_1() {
            this.username = __runInitializers(this, _username_initializers, void 0);
            this.displayName = (__runInitializers(this, _username_extraInitializers), __runInitializers(this, _displayName_initializers, void 0));
            this.avatarUrl = (__runInitializers(this, _displayName_extraInitializers), __runInitializers(this, _avatarUrl_initializers, void 0));
            this.setting = (__runInitializers(this, _avatarUrl_extraInitializers), __runInitializers(this, _setting_initializers, void 0));
            this.posts = (__runInitializers(this, _setting_extraInitializers), __runInitializers(this, _posts_initializers, void 0));
            __runInitializers(this, _posts_extraInitializers);
        }
        return User_1;
    }());
    __setFunctionName(_classThis, "User");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _username_decorators = [(0, mongoose_1.Prop)({ required: true })];
        _displayName_decorators = [(0, mongoose_1.Prop)({ required: false })];
        _avatarUrl_decorators = [(0, mongoose_1.Prop)({ required: false })];
        _setting_decorators = [(0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'UserSettings' })];
        _posts_decorators = [(0, mongoose_1.Prop)({ type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Post' }] })];
        __esDecorate(null, null, _username_decorators, { kind: "field", name: "username", static: false, private: false, access: { has: function (obj) { return "username" in obj; }, get: function (obj) { return obj.username; }, set: function (obj, value) { obj.username = value; } }, metadata: _metadata }, _username_initializers, _username_extraInitializers);
        __esDecorate(null, null, _displayName_decorators, { kind: "field", name: "displayName", static: false, private: false, access: { has: function (obj) { return "displayName" in obj; }, get: function (obj) { return obj.displayName; }, set: function (obj, value) { obj.displayName = value; } }, metadata: _metadata }, _displayName_initializers, _displayName_extraInitializers);
        __esDecorate(null, null, _avatarUrl_decorators, { kind: "field", name: "avatarUrl", static: false, private: false, access: { has: function (obj) { return "avatarUrl" in obj; }, get: function (obj) { return obj.avatarUrl; }, set: function (obj, value) { obj.avatarUrl = value; } }, metadata: _metadata }, _avatarUrl_initializers, _avatarUrl_extraInitializers);
        __esDecorate(null, null, _setting_decorators, { kind: "field", name: "setting", static: false, private: false, access: { has: function (obj) { return "setting" in obj; }, get: function (obj) { return obj.setting; }, set: function (obj, value) { obj.setting = value; } }, metadata: _metadata }, _setting_initializers, _setting_extraInitializers);
        __esDecorate(null, null, _posts_decorators, { kind: "field", name: "posts", static: false, private: false, access: { has: function (obj) { return "posts" in obj; }, get: function (obj) { return obj.posts; }, set: function (obj, value) { obj.posts = value; } }, metadata: _metadata }, _posts_initializers, _posts_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        User = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return User = _classThis;
}();
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
