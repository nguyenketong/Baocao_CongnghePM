'use client';
"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var axios_1 = require("axios");
var TeamItemPM_1 = require("../../components/Item/teampm/TeamItemPM");
var CreateTeamPMItem_1 = require("../../components/Item/teampm/CreateTeamPMItem");
var swr_1 = require("swr");
var outline_1 = require("@heroicons/react/24/outline");
var debounce_1 = require("lodash/debounce");
require("../../styles/TeamList.css");
var API_BASE_URL = 'http://localhost:3000';
var API_TEAMS_URL = "".concat(API_BASE_URL, "/teams");
var TeamListLead = function () {
    var _a;
    var _b = (0, react_1.useState)(false), showCreateTeamDialog = _b[0], setShowCreateTeamDialog = _b[1];
    var _c = (0, react_1.useState)(''), searchTerm = _c[0], setSearchTerm = _c[1];
    var _d = (0, react_1.useState)([]), currentUserTeams = _d[0], setCurrentUserTeams = _d[1];
    var getCurrentEmployee = function () {
        var employeeStr = localStorage.getItem('employee');
        if (!employeeStr)
            return null;
        try {
            return JSON.parse(employeeStr);
        }
        catch (error) {
            return null;
        }
    };
    var fetcher = function (url) { return __awaiter(void 0, void 0, void 0, function () {
        var token, employee_1, response, allTeams, leadTeams, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    token = localStorage.getItem('token');
                    employee_1 = getCurrentEmployee();
                    if (!(employee_1 === null || employee_1 === void 0 ? void 0 : employee_1._id)) {
                        return [2 /*return*/, []];
                    }
                    return [4 /*yield*/, axios_1.default.get(url, {
                            headers: {
                                'Authorization': "Bearer ".concat(token)
                            }
                        })];
                case 1:
                    response = _a.sent();
                    allTeams = response.data;
                    leadTeams = allTeams.filter(function (team) {
                        return team.teamLead && team.teamLead._id === employee_1._id;
                    });
                    setCurrentUserTeams(leadTeams);
                    return [2 /*return*/, leadTeams];
                case 2:
                    error_1 = _a.sent();
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var _e = (0, swr_1.default)(API_TEAMS_URL, fetcher, {
        revalidateOnMount: true,
        revalidateIfStale: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        dedupingInterval: 0
    }), teams = _e.data, error = _e.error, isLoading = _e.isLoading;
    var debouncedSearch = (0, react_1.useCallback)((0, debounce_1.default)(function (value) {
        setSearchTerm(value);
    }, 300), []);
    var handleSearchChange = function (e) {
        debouncedSearch(e.target.value);
    };
    (0, react_1.useEffect)(function () {
        var _a;
        var employee = getCurrentEmployee();
        if (((_a = employee === null || employee === void 0 ? void 0 : employee.designation_id) === null || _a === void 0 ? void 0 : _a.designationName) !== 'Technical Lead') {
            window.location.href = '/unauthorized';
        }
    }, []);
    var filteredTeams = (0, react_1.useMemo)(function () {
        var filteredResults = __spreadArray([], currentUserTeams, true);
        if (searchTerm) {
            var searchTermLower_1 = searchTerm.toLowerCase();
            filteredResults = filteredResults.filter(function (team) {
                return team.teamName.toLowerCase().includes(searchTermLower_1);
            });
        }
        return filteredResults;
    }, [currentUserTeams, searchTerm]);
    var isPM = function () {
        var _a;
        var employee = getCurrentEmployee();
        return ((_a = employee === null || employee === void 0 ? void 0 : employee.designation_id) === null || _a === void 0 ? void 0 : _a.designationName) === 'IT Project Manager';
    };
    var handleOpenDialog = function () { return setShowCreateTeamDialog(true); };
    var handleCloseDialog = function () { return setShowCreateTeamDialog(false); };
    return (<>
            <div className="flex flex-col justify-end">
                <div className="flex justify-between items-center w-full h-full p-8 bg-[#f0f0f0] rounded-xl mb-4 border-b-2 pb-0">
                    <h2 className="page-title text-4xl font-bold mb-6" id="title">
                        Danh sách nhóm của Technical Lead {(_a = getCurrentEmployee()) === null || _a === void 0 ? void 0 : _a.employeeName}
                    </h2>

                    <div className="search-container">
                        <outline_1.MagnifyingGlassIcon className="search-icon"/>
                        <input type="text" placeholder="Tìm kiếm nhóm..." className="search-input" onChange={handleSearchChange}/>
                    </div>
                </div>

                {isLoading && (<div className="loading-state">
                        Đang tải danh sách nhóm...
                    </div>)}

                {error && (<div className="error-state">
                        Lỗi khi tải danh sách nhóm!
                    </div>)}

                <div className="bg-[#f0f0f0] p-8 rounded-xl">
                    <div className="grid-wrapper gap-10">
                        <div className="teams-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4" id="team-card">
                            {filteredTeams.length ? (filteredTeams.map(function (team) { return (<TeamItemPM_1.default key={team._id} team={team} hideDelete={!isPM()} hideEdit={!isPM()}/>); })) : (<div className="empty-state">
                                    {searchTerm ? 'Không tìm thấy nhóm nào.' : 'Không có nhóm nào.'}
                                </div>)}
                        </div>
                    </div>
                </div>
            </div>

            {showCreateTeamDialog && (<div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal-content bg-white p-6 rounded-lg w-full max-w-lg">
                        <CreateTeamPMItem_1.default onClose={handleCloseDialog} currentTime="2025-03-02 15:38:50" currentUser="HMK1510"/>
                        <button className="close-button mt-4 px-4 py-2 text-white rounded" onClick={handleCloseDialog}>
                            Close
                        </button>
                    </div>
                </div>)}
        </>);
};
exports.default = TeamListLead;
