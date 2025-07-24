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
exports.TeamModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var employees_module_1 = require("../../../../../src/employees/employees.module");
var Team_schema_1 = require("../../../../../src/schemas/Team.schema");
var projects_module_1 = require("../../../../../src/projects/projects.module");
var teams_service_1 = require("./teams.service");
var teams_controller_1 = require("./teams.controller");
var database_module_1 = require("../../../../../src/config/database.module");
var logging_team_decorator_1 = require("./decorators/logging-team.decorator");
var validation_team_decorator_1 = require("./decorators/validation-team.decorator");
var cache_team_decorator_1 = require("./decorators/cache-team.decorator");
var team_factory_1 = require("./factory/team.factory");
var TeamModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                database_module_1.DatabaseModule,
                mongoose_1.MongooseModule.forFeature([{ name: Team_schema_1.Team.name, schema: Team_schema_1.TeamSchema }]),
                (0, common_1.forwardRef)(function () { return employees_module_1.EmployeeModule; }),
                (0, common_1.forwardRef)(function () { return projects_module_1.ProjectModule; }), // Sử dụng forwardRef để tránh vòng lặp
                projects_module_1.ProjectModule
            ],
            providers: [
                teams_service_1.TeamsService,
                team_factory_1.TeamFactory,
                {
                    provide: 'TeamServiceDecorated',
                    useFactory: function (teamService) {
                        var withValidation = new validation_team_decorator_1.ValidationTeamDecorator(teamService);
                        var withLogging = new logging_team_decorator_1.LoggingTeamDecorator(withValidation);
                        var withCache = new cache_team_decorator_1.CacheTeamDecorator(withLogging);
                        return withCache;
                    },
                    inject: [teams_service_1.TeamsService]
                }
            ],
            controllers: [teams_controller_1.TeamsController],
            exports: [teams_service_1.TeamsService, mongoose_1.MongooseModule]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TeamModule = _classThis = /** @class */ (function () {
        function TeamModule_1() {
        }
        return TeamModule_1;
    }());
    __setFunctionName(_classThis, "TeamModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TeamModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TeamModule = _classThis;
}();
exports.TeamModule = TeamModule;
