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
exports.UserSettingsSchema = exports.UserSettings = void 0;
//@Schema() và @Prop() là các decorator 
// framework NestJS và Mongoose hiểu rằng class User là một schema và các thuộc tính của nó sẽ là các trường trong MongoDB.
//SchemaFactory là một "factory"
//Factory (ở đây là SchemaFactory) sẽ tự động tạo ra schema cho bạn từ class User.
var mongoose_1 = require("@nestjs/mongoose");
var UserSettings = function () {
    var _classDecorators = [(0, mongoose_1.Schema)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _receiveNotifications_decorators;
    var _receiveNotifications_initializers = [];
    var _receiveNotifications_extraInitializers = [];
    var _receiveEmail_decorators;
    var _receiveEmail_initializers = [];
    var _receiveEmail_extraInitializers = [];
    var _receiveSMS_decorators;
    var _receiveSMS_initializers = [];
    var _receiveSMS_extraInitializers = [];
    var UserSettings = _classThis = /** @class */ (function () {
        function UserSettings_1() {
            this.receiveNotifications = __runInitializers(this, _receiveNotifications_initializers, void 0);
            this.receiveEmail = (__runInitializers(this, _receiveNotifications_extraInitializers), __runInitializers(this, _receiveEmail_initializers, void 0));
            this.receiveSMS = (__runInitializers(this, _receiveEmail_extraInitializers), __runInitializers(this, _receiveSMS_initializers, void 0));
            __runInitializers(this, _receiveSMS_extraInitializers);
        }
        return UserSettings_1;
    }());
    __setFunctionName(_classThis, "UserSettings");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _receiveNotifications_decorators = [(0, mongoose_1.Prop)({ required: false })];
        _receiveEmail_decorators = [(0, mongoose_1.Prop)({ required: false })];
        _receiveSMS_decorators = [(0, mongoose_1.Prop)({ required: false })];
        __esDecorate(null, null, _receiveNotifications_decorators, { kind: "field", name: "receiveNotifications", static: false, private: false, access: { has: function (obj) { return "receiveNotifications" in obj; }, get: function (obj) { return obj.receiveNotifications; }, set: function (obj, value) { obj.receiveNotifications = value; } }, metadata: _metadata }, _receiveNotifications_initializers, _receiveNotifications_extraInitializers);
        __esDecorate(null, null, _receiveEmail_decorators, { kind: "field", name: "receiveEmail", static: false, private: false, access: { has: function (obj) { return "receiveEmail" in obj; }, get: function (obj) { return obj.receiveEmail; }, set: function (obj, value) { obj.receiveEmail = value; } }, metadata: _metadata }, _receiveEmail_initializers, _receiveEmail_extraInitializers);
        __esDecorate(null, null, _receiveSMS_decorators, { kind: "field", name: "receiveSMS", static: false, private: false, access: { has: function (obj) { return "receiveSMS" in obj; }, get: function (obj) { return obj.receiveSMS; }, set: function (obj, value) { obj.receiveSMS = value; } }, metadata: _metadata }, _receiveSMS_initializers, _receiveSMS_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserSettings = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserSettings = _classThis;
}();
exports.UserSettings = UserSettings;
exports.UserSettingsSchema = mongoose_1.SchemaFactory.createForClass(UserSettings);
