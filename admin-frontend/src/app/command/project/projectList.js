"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProjectListCommand = void 0;
var react_1 = require("react");
var swr_1 = require("swr");
var axios_1 = require("axios");
var ProjectObserver_1 = require("@/app/List/projects/ProjectObserver");
var ProjectFacade_1 = require("@/app/List/projects/ProjectFacade");
var projectCommand_1 = require("../projectCommand");
var API_BASE_URL = 'http://localhost:3000/projects';
var observer = new ProjectObserver_1.ProjectObserver();
var useProjectListCommand = function () {
    var _a = (0, react_1.useState)(1), page = _a[0], setPage = _a[1];
    var pageSize = (0, react_1.useState)(6)[0];
    var _b = (0, react_1.useState)(''), filterText = _b[0], setFilterText = _b[1];
    var _c = (0, react_1.useState)('projectName'), sortBy = _c[0], setSortBy = _c[1];
    var _d = (0, react_1.useState)(false), showCreateProjectDialog = _d[0], setShowCreateProjectDialog = _d[1];
    var fetcher = function (url) { return axios_1.default.get(url).then(function (res) { return res.data; }); };
    var _e = (0, swr_1.default)(API_BASE_URL, fetcher), projects = _e.data, error = _e.error, isLoading = _e.isLoading, mutate = _e.mutate;
    (0, react_1.useEffect)(function () {
        observer.subscribe(function () { return mutate(); });
        return function () { return observer.unsubscribe(function () { return mutate(); }); };
    }, [mutate]);
    var paginatedProjects = (0, react_1.useMemo)(function () {
        if (!projects)
            return [];
        return ProjectFacade_1.ProjectFacade.processProjects(projects, filterText, sortBy, page, pageSize);
    }, [projects, filterText, sortBy, page, pageSize]);
    var handleDelete = function (id) {
        new projectCommand_1.DeleteProjectCommand(id, function () { return observer.notify(); }).execute();
    };
    return {
        isLoading: isLoading,
        error: error,
        paginatedProjects: paginatedProjects,
        totalPages: Math.ceil(((projects === null || projects === void 0 ? void 0 : projects.length) || 0) / pageSize),
        page: page,
        setPage: setPage,
        filterText: filterText,
        setFilterText: setFilterText,
        sortBy: sortBy,
        setSortBy: setSortBy,
        handleDelete: handleDelete,
        showCreateProjectDialog: showCreateProjectDialog,
        setShowCreateProjectDialog: setShowCreateProjectDialog,
    };
};
exports.useProjectListCommand = useProjectListCommand;
