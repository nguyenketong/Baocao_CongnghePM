'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var axios_1 = require("axios");
var TeamItemPM_1 = require("../../components/Item/teampm/TeamItemPM");
var CreateTeamPMItem_1 = require("../../components/Item/teampm/CreateTeamPMItem");
var swr_1 = require("swr");
var outline_1 = require("@heroicons/react/24/outline");
var debounce_1 = require("lodash/debounce");
require("../../styles/TeamList.css");
var gsap_1 = require("gsap");
var react_toastify_1 = require("react-toastify");
var API_BASE_URL = 'http://localhost:3000';
var API_TEAMS_URL = "".concat(API_BASE_URL, "/teams");
var TeamListPM = function () {
    var _a = (0, react_1.useState)(false), showCreateTeamDialog = _a[0], setShowCreateTeamDialog = _a[1];
    var _b = (0, react_1.useState)(''), searchTerm = _b[0], setSearchTerm = _b[1];
    var _c = (0, react_1.useState)([]), currentUserProjects = _c[0], setCurrentUserProjects = _c[1];
    var getCurrentEmployee = function () {
        var employeeStr = localStorage.getItem('employee');
        if (!employeeStr)
            return null;
        try {
            var employee = JSON.parse(employeeStr);
            console.log('Current Employee:', employee); // Log employee data
            return employee;
        }
        catch (error) {
            console.error('Error parsing employee data:', error);
            return null;
        }
    };
    // Hàm gọi API để lấy danh sách dự án của Project Manager
    var fetchProjectsForPM = function (employeeId) { return __awaiter(void 0, void 0, void 0, function () {
        var token, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    token = localStorage.getItem('token');
                    return [4 /*yield*/, fetch("".concat(API_BASE_URL, "/employees/pm/").concat(employeeId), {
                            headers: {
                                'Authorization': "Bearer ".concat(token)
                            }
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Không thể lấy dự án của Project Manager");
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log("Fetched Projects for PM:", data);
                    return [2 /*return*/, data];
                case 3:
                    error_1 = _a.sent();
                    console.error("Lỗi khi lấy dự án của Project Manager:", error_1);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var fetcher = function (url) { return __awaiter(void 0, void 0, void 0, function () {
        var token, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    token = localStorage.getItem('token');
                    return [4 /*yield*/, axios_1.default.get(url, {
                            headers: {
                                'Authorization': "Bearer ".concat(token)
                            }
                        })];
                case 1:
                    response = _a.sent();
                    console.log('Fetched Teams:', response.data); // Log all teams
                    return [2 /*return*/, response.data.map(function (team) { return (__assign(__assign({}, team), { teamLead: team.teamLead || null, projectid: team.projectid || null })); })];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error fetching teams:', error_2);
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var _d = (0, swr_1.default)(API_TEAMS_URL, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    }), teams = _d.data, error = _d.error, isLoading = _d.isLoading;
    // Lấy danh sách project của IT Project Manager
    (0, react_1.useEffect)(function () {
        var fetchUserProjects = function () { return __awaiter(void 0, void 0, void 0, function () {
            var employee, projectsData, projectIds, error_3;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        employee = getCurrentEmployee();
                        console.log('Employee Designation:', (_a = employee === null || employee === void 0 ? void 0 : employee.designation_id) === null || _a === void 0 ? void 0 : _a.designationName); // Log designation
                        if (!(((_b = employee === null || employee === void 0 ? void 0 : employee.designation_id) === null || _b === void 0 ? void 0 : _b.designationName) === 'IT Project Manager')) return [3 /*break*/, 4];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetchProjectsForPM(employee._id)];
                    case 2:
                        projectsData = _c.sent();
                        projectIds = projectsData.map(function (project) { return project._id; });
                        console.log('Project IDs:', projectIds); // Log project IDs
                        setCurrentUserProjects(projectIds);
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _c.sent();
                        console.error('Error fetching PM projects:', error_3);
                        react_toastify_1.toast.error('Không thể tải danh sách dự án');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchUserProjects();
    }, []);
    var debouncedSearch = (0, react_1.useCallback)((0, debounce_1.default)(function (value) {
        setSearchTerm(value);
    }, 300), []);
    var handleSearchChange = function (e) {
        debouncedSearch(e.target.value);
    };
    // Lọc teams dựa trên quyền và search term
    var filteredTeams = (0, react_1.useMemo)(function () {
        var _a;
        if (!teams)
            return [];
        var employee = getCurrentEmployee();
        var filteredResults = teams;
        console.log('All Teams:', teams); // Log all teams
        console.log('Current User Projects:', currentUserProjects); // Log current user projects
        if (((_a = employee === null || employee === void 0 ? void 0 : employee.designation_id) === null || _a === void 0 ? void 0 : _a.designationName) === 'IT Project Manager') {
            filteredResults = teams.filter(function (team) {
                var _a;
                var isIncluded = team.projectid && currentUserProjects.includes(team.projectid._id);
                console.log('Team:', team.teamName, 'Project ID:', (_a = team.projectid) === null || _a === void 0 ? void 0 : _a._id, 'Is Included:', isIncluded); // Log filtering process
                return isIncluded;
            });
        }
        if (searchTerm) {
            var searchTermLower_1 = searchTerm.toLowerCase();
            filteredResults = filteredResults.filter(function (team) {
                return team.teamName.toLowerCase().includes(searchTermLower_1);
            });
        }
        console.log('Filtered Results:', filteredResults); // Log final filtered results
        return filteredResults;
    }, [teams, searchTerm, currentUserProjects]);
    (0, react_1.useEffect)(function () {
        gsap_1.gsap.to("#addBtn", { opacity: 1, y: -50, delay: 1, backgroundColor: '#2D336B' });
    }, []);
    // Kiểm tra quyền hiển thị nút thêm mới
    var showAddButton = (0, react_1.useMemo)(function () {
        var _a;
        var employee = getCurrentEmployee();
        return ((_a = employee === null || employee === void 0 ? void 0 : employee.designation_id) === null || _a === void 0 ? void 0 : _a.designationName) === 'IT Project Manager';
    }, []);
    // Kiểm tra token và quyền truy cập
    (0, react_1.useEffect)(function () {
        var token = localStorage.getItem('token');
        var employee = getCurrentEmployee();
        if (!token || !employee) {
            window.location.href = '/login';
            return;
        }
        try {
            var tokenData = JSON.parse(atob(token.split('.')[1]));
            if (tokenData.exp * 1000 < Date.now()) {
                window.location.href = '/login';
            }
        }
        catch (error) {
            console.error('Error checking token:', error);
            window.location.href = '/login';
        }
    }, []);
    var handleOpenDialog = function () { return setShowCreateTeamDialog(true); };
    var handleCloseDialog = function () { return setShowCreateTeamDialog(false); };
    return (<>
      <div className="flex flex-col justify-end">
        <div className="flex justify-between items-center w-full h-full p-8 bg-[#f0f0f0] rounded-xl mb-4 border-b-2 pb-0">
          <h2 className="page-title text-4xl font-bold mb-6" id="title">Danh sách nhóm</h2>

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
              {filteredTeams.length ? (filteredTeams.map(function (team) { return (<TeamItemPM_1.default key={team._id} team={team}/>); })) : (<div className="empty-state">
                  {searchTerm ? 'Không tìm thấy nhóm nào.' : 'Không có nhóm nào.'}
                </div>)}
            </div>
          </div>
        </div>
      </div>

      {/* FAB Button - Chỉ hiển thị cho IT Project Manager */}
      {showAddButton && (<button className="fab-button opacity-0" onClick={handleOpenDialog} aria-label="Thêm nhóm mới" id="addBtn">
          <outline_1.PlusIcon className="w-6 h-6"/>
        </button>)}

      {/* Modal */}
      {showCreateTeamDialog && (<div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg w-full max-w-lg">
            <CreateTeamPMItem_1.default onClose={handleCloseDialog}/>
            <button className="close-button mt-4 px-4 py-2 text-white rounded" onClick={handleCloseDialog}>
              Close
            </button>
          </div>
        </div>)}
    </>);
};
exports.default = TeamListPM;
