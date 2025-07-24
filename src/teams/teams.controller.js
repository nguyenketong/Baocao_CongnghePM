"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsController = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("mongoose");
var TeamsController = function () {
    var _classDecorators = [(0, common_1.Controller)('teams')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _createTeam_decorators;
    var _getAll_decorators;
    var _getById_decorators;
    var _update_decorators;
    var _delete_decorators;
    var _addTeamMember_decorators;
    var _getTeamMembers_decorators;
    var _removeTeamMember_decorators;
    var TeamsController = _classThis = /** @class */ (function () {
        function TeamsController_1(teamsService) {
            this.teamsService = (__runInitializers(this, _instanceExtraInitializers), teamsService);
        }
        TeamsController_1.prototype.createTeam = function (createTeamDto) {
            return __awaiter(this, void 0, void 0, function () {
                var newTeam;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.teamsService.createTeam(createTeamDto)];
                        case 1:
                            newTeam = _a.sent();
                            return [2 /*return*/, { success: true, data: newTeam }];
                    }
                });
            });
        };
        TeamsController_1.prototype.getAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.teamsService.getAll()];
                });
            });
        };
        TeamsController_1.prototype.getById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.teamsService.getTeamById(id)];
                });
            });
        };
        TeamsController_1.prototype.update = function (id, updateTeamDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.teamsService.update(id, updateTeamDto)];
                });
            });
        };
        TeamsController_1.prototype.delete = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.teamsService.deleteTeam(id)];
                });
            });
        };
        TeamsController_1.prototype.addTeamMember = function (teamId, body) {
            return __awaiter(this, void 0, void 0, function () {
                var addMemberData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!mongoose_1.Types.ObjectId.isValid(teamId) || !mongoose_1.Types.ObjectId.isValid(body.employeeId)) {
                                throw new common_1.BadRequestException('ID không hợp lệ');
                            }
                            addMemberData = {
                                employeeId: body.employeeId,
                                timestamp: '2025-02-25 09:48:30',
                                addedBy: 'HMK1510'
                            };
                            return [4 /*yield*/, this.teamsService.addTeamMember(teamId, addMemberData)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        TeamsController_1.prototype.getTeamMembers = function (teamId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!mongoose_1.Types.ObjectId.isValid(teamId)) {
                                throw new common_1.BadRequestException('Team ID không hợp lệ');
                            }
                            return [4 /*yield*/, this.teamsService.getTeamMembers(teamId)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        TeamsController_1.prototype.removeTeamMember = function (teamId, employeeId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!mongoose_1.Types.ObjectId.isValid(teamId) || !mongoose_1.Types.ObjectId.isValid(employeeId)) {
                                throw new common_1.BadRequestException('ID không hợp lệ');
                            }
                            return [4 /*yield*/, this.teamsService.removeTeamMember(teamId, employeeId)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return TeamsController_1;
    }());
    __setFunctionName(_classThis, "TeamsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createTeam_decorators = [(0, common_1.Post)()];
        _getAll_decorators = [(0, common_1.Get)()];
        _getById_decorators = [(0, common_1.Get)(':id')];
        _update_decorators = [(0, common_1.Patch)(':id')];
        _delete_decorators = [(0, common_1.Delete)(':id')];
        _addTeamMember_decorators = [(0, common_1.Post)(':teamId/members')];
        _getTeamMembers_decorators = [(0, common_1.Get)(':teamId/members')];
        _removeTeamMember_decorators = [(0, common_1.Delete)(':teamId/members/:employeeId')];
        __esDecorate(_classThis, null, _createTeam_decorators, { kind: "method", name: "createTeam", static: false, private: false, access: { has: function (obj) { return "createTeam" in obj; }, get: function (obj) { return obj.createTeam; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAll_decorators, { kind: "method", name: "getAll", static: false, private: false, access: { has: function (obj) { return "getAll" in obj; }, get: function (obj) { return obj.getAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getById_decorators, { kind: "method", name: "getById", static: false, private: false, access: { has: function (obj) { return "getById" in obj; }, get: function (obj) { return obj.getById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _delete_decorators, { kind: "method", name: "delete", static: false, private: false, access: { has: function (obj) { return "delete" in obj; }, get: function (obj) { return obj.delete; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addTeamMember_decorators, { kind: "method", name: "addTeamMember", static: false, private: false, access: { has: function (obj) { return "addTeamMember" in obj; }, get: function (obj) { return obj.addTeamMember; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getTeamMembers_decorators, { kind: "method", name: "getTeamMembers", static: false, private: false, access: { has: function (obj) { return "getTeamMembers" in obj; }, get: function (obj) { return obj.getTeamMembers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removeTeamMember_decorators, { kind: "method", name: "removeTeamMember", static: false, private: false, access: { has: function (obj) { return "removeTeamMember" in obj; }, get: function (obj) { return obj.removeTeamMember; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TeamsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TeamsController = _classThis;
}();
exports.TeamsController = TeamsController;
