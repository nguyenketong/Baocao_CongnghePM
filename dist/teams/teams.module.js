"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const employees_module_1 = require("../employees/employees.module");
const Team_schema_1 = require("../schemas/Team.schema");
const projects_module_1 = require("../projects/projects.module");
const teams_service_1 = require("./teams.service");
const teams_controller_1 = require("./teams.controller");
const database_module_1 = require("../config/database.module");
const logging_team_decorator_1 = require("./decorators/logging-team.decorator");
const validation_team_decorator_1 = require("./decorators/validation-team.decorator");
const cache_team_decorator_1 = require("./decorators/cache-team.decorator");
const team_factory_1 = require("./factory/team.factory");
let TeamModule = class TeamModule {
};
exports.TeamModule = TeamModule;
exports.TeamModule = TeamModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            mongoose_1.MongooseModule.forFeature([{ name: Team_schema_1.Team.name, schema: Team_schema_1.TeamSchema }]),
            (0, common_1.forwardRef)(() => employees_module_1.EmployeeModule),
            (0, common_1.forwardRef)(() => projects_module_1.ProjectModule),
            projects_module_1.ProjectModule
        ],
        providers: [
            teams_service_1.TeamsService,
            team_factory_1.TeamFactory,
            {
                provide: 'TeamServiceDecorated',
                useFactory: (teamService) => {
                    const withValidation = new validation_team_decorator_1.ValidationTeamDecorator(teamService);
                    const withLogging = new logging_team_decorator_1.LoggingTeamDecorator(withValidation);
                    const withCache = new cache_team_decorator_1.CacheTeamDecorator(withLogging);
                    return withCache;
                },
                inject: [teams_service_1.TeamsService]
            }
        ],
        controllers: [teams_controller_1.TeamsController],
        exports: [teams_service_1.TeamsService, mongoose_1.MongooseModule]
    })
], TeamModule);
//# sourceMappingURL=teams.module.js.map