"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectCommandFactory = void 0;
var createprojectCommand_1 = require("./createprojectCommand");
var projectItemCommand_1 = require("./projectItemCommand");
var ProjectCommandFactory = /** @class */ (function () {
    function ProjectCommandFactory() {
    }
    ProjectCommandFactory.createCommand = function (type, payload, onSuccess) {
        switch (type) {
            case 'create': {
                var _a = payload, data = _a.data, file = _a.file;
                return new createprojectCommand_1.CreateProjectCommand(data, file, onSuccess || (function () { }));
            }
            case 'delete': {
                var id = payload.id;
                return new projectItemCommand_1.DeleteProjectCommand(id, onSuccess || (function () { }));
            }
            default:
                throw new Error("Command type ".concat(type, " is not supported"));
        }
    };
    return ProjectCommandFactory;
}());
exports.ProjectCommandFactory = ProjectCommandFactory;
