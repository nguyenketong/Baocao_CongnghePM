"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProgressListCommand = void 0;
var react_1 = require("react");
var swr_1 = require("swr");
var axios_1 = require("axios");
var API_BASE_URL = 'http://localhost:3000/progress';
var useProgressListCommand = function (projectId, progressId) {
    var _a = (0, react_1.useState)(1), page = _a[0], setPage = _a[1];
    var pageSize = (0, react_1.useState)(6)[0];
    var _b = (0, react_1.useState)(''), filterText = _b[0], setFilterText = _b[1];
    var _c = (0, react_1.useState)('progressName'), sortBy = _c[0], setSortBy = _c[1];
    var apiUrl = API_BASE_URL;
    if (projectId) {
        apiUrl = "".concat(API_BASE_URL, "/by-project?projectId=").concat(projectId); // Thay đổi đúng endpoint
    }
    else if (progressId) {
        apiUrl = "".concat(API_BASE_URL, "/").concat(progressId);
    }
    var fetcher = function (url) { return axios_1.default.get(url).then(function (res) { return res.data; }); };
    var _d = (0, swr_1.default)(apiUrl, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    }), progresses = _d.data, error = _d.error, isLoading = _d.isLoading;
    var filteredProgresses = (0, react_1.useMemo)(function () {
        if (!progresses)
            return [];
        return progresses
            .filter(function (progress) {
            return progress.progressName.toLowerCase().includes(filterText.toLowerCase());
        })
            .sort(function (a, b) {
            if (sortBy === 'progressName') {
                return a.progressName.localeCompare(b.progressName);
            }
            else if (sortBy === 'progressStart') {
                return new Date(a.progressStart).getTime() - new Date(b.progressStart).getTime();
            }
            return 0;
        });
    }, [progresses, filterText, sortBy]);
    var paginatedProgresses = (0, react_1.useMemo)(function () {
        var startIndex = (page - 1) * pageSize;
        var endIndex = page * pageSize;
        return filteredProgresses.slice(startIndex, endIndex);
    }, [filteredProgresses, page, pageSize]);
    var totalPages = Math.ceil(filteredProgresses.length / pageSize);
    return {
        projectId: projectId,
        progresses: progresses,
        error: error,
        isLoading: isLoading,
        page: page,
        totalPages: totalPages,
        paginatedProgresses: paginatedProgresses,
        filterText: filterText,
        setFilterText: setFilterText,
        sortBy: sortBy,
        setSortBy: setSortBy,
        setPage: setPage,
    };
};
exports.useProgressListCommand = useProgressListCommand;
