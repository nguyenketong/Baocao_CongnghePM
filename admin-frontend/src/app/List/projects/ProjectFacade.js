"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectFacade = void 0;
var projectCommand_1 = require("@/app/command/projectCommand");
var ProjectFacade = /** @class */ (function () {
    function ProjectFacade() {
    }
    ProjectFacade.processProjects = function (projects, filterText, sortBy, page, pageSize) {
        var filteredProjects = new projectCommand_1.FilterProjectCommand(projects, filterText).execute();
        var sortedProjects = new projectCommand_1.SortProjectCommand(filteredProjects, sortBy).execute();
        return new projectCommand_1.PaginateProjectCommand(sortedProjects, page, pageSize).execute();
    };
    return ProjectFacade;
}());
exports.ProjectFacade = ProjectFacade;
