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
var EmployeeItemPM_1 = require("../components/employee/EmployeeItemPM");
var CreateEmployeeItem_1 = require("../components/employee/CreateEmployeeItem");
var outline_1 = require("@heroicons/react/24/outline");
var debounce_1 = require("lodash/debounce");
require("../styles/EmployeeList.css");
var gsap_1 = require("gsap");
var react_toastify_1 = require("react-toastify");
var API_BASE_URL = 'http://localhost:3000';
var EmployeesListPM = function () {
    var _a = (0, react_1.useState)(false), showCreateEmployeeDialog = _a[0], setShowCreateEmployeeDialog = _a[1];
    var _b = (0, react_1.useState)(''), searchTerm = _b[0], setSearchTerm = _b[1];
    var _c = (0, react_1.useState)([]), teams = _c[0], setTeams = _c[1];
    var _d = (0, react_1.useState)(true), loading = _d[0], setLoading = _d[1];
    var _e = (0, react_1.useState)(null), error = _e[0], setError = _e[1];
    var _f = (0, react_1.useState)([]), currentUserProjects = _f[0], setCurrentUserProjects = _f[1];
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
    var fetchProjectsForPM = function (employeeId) { return __awaiter(void 0, void 0, void 0, function () {
        var token, response, error_1;
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
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    error_1 = _a.sent();
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        var fetchTeamsAndEmployees = function () { return __awaiter(void 0, void 0, void 0, function () {
            var employee, projectsData, projectIds_1, token_1, teamsResponse, allTeams, relevantTeams, teamsWithMembers, error_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        employee = getCurrentEmployee();
                        setLoading(true);
                        if (!(((_a = employee === null || employee === void 0 ? void 0 : employee.designation_id) === null || _a === void 0 ? void 0 : _a.designationName) === 'IT Project Manager')) return [3 /*break*/, 8];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, 6, 7]);
                        return [4 /*yield*/, fetchProjectsForPM(employee._id)];
                    case 2:
                        projectsData = _b.sent();
                        projectIds_1 = projectsData.map(function (project) { return project._id; });
                        setCurrentUserProjects(projectIds_1);
                        token_1 = localStorage.getItem('token');
                        return [4 /*yield*/, axios_1.default.get("".concat(API_BASE_URL, "/teams"), {
                                headers: {
                                    'Authorization': "Bearer ".concat(token_1)
                                }
                            })];
                    case 3:
                        teamsResponse = _b.sent();
                        allTeams = teamsResponse.data;
                        relevantTeams = allTeams.filter(function (team) {
                            if (team.projectid && typeof team.projectid === 'object' && '_id' in team.projectid) {
                                return projectIds_1.includes(team.projectid._id);
                            }
                            else if (typeof team.projectid === 'string') {
                                return projectIds_1.includes(team.projectid);
                            }
                            return false;
                        });
                        return [4 /*yield*/, Promise.all(relevantTeams.map(function (team) { return __awaiter(void 0, void 0, void 0, function () {
                                var membersResponse, membersWithDetails, error_3;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 3, , 4]);
                                            return [4 /*yield*/, axios_1.default.get("".concat(API_BASE_URL, "/teams/").concat(team._id, "/members"), {
                                                    headers: {
                                                        'Authorization': "Bearer ".concat(token_1)
                                                    }
                                                })];
                                        case 1:
                                            membersResponse = _a.sent();
                                            return [4 /*yield*/, Promise.all(membersResponse.data.members.map(function (member) { return __awaiter(void 0, void 0, void 0, function () {
                                                    var memberDetailResponse, error_4;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 2, , 3]);
                                                                return [4 /*yield*/, axios_1.default.get("".concat(API_BASE_URL, "/employees/").concat(member._id), {
                                                                        headers: {
                                                                            'Authorization': "Bearer ".concat(token_1)
                                                                        }
                                                                    })];
                                                            case 1:
                                                                memberDetailResponse = _a.sent();
                                                                return [2 /*return*/, memberDetailResponse.data];
                                                            case 2:
                                                                error_4 = _a.sent();
                                                                return [2 /*return*/, member];
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); }))];
                                        case 2:
                                            membersWithDetails = _a.sent();
                                            return [2 /*return*/, __assign(__assign({}, team), { team_members: membersWithDetails })];
                                        case 3:
                                            error_3 = _a.sent();
                                            return [2 /*return*/, __assign(__assign({}, team), { team_members: [] })];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 4:
                        teamsWithMembers = _b.sent();
                        setTeams(teamsWithMembers);
                        return [3 /*break*/, 7];
                    case 5:
                        error_2 = _b.sent();
                        setError('Không thể tải danh sách nhân viên');
                        react_toastify_1.toast.error('Không thể tải danh sách nhân viên');
                        return [3 /*break*/, 7];
                    case 6:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        setLoading(false);
                        _b.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        fetchTeamsAndEmployees();
    }, []);
    var debouncedSearch = (0, react_1.useCallback)((0, debounce_1.default)(function (value) {
        setSearchTerm(value);
    }, 300), []);
    var handleSearchChange = function (e) {
        debouncedSearch(e.target.value);
    };
    var filteredEmployees = (0, react_1.useMemo)(function () {
        var allEmployees = teams.flatMap(function (team) { return team.team_members || []; });
        var uniqueEmployees = Array.from(new Map(allEmployees.map(function (emp) { return [emp._id, emp]; })).values());
        if (searchTerm) {
            var searchTermLower_1 = searchTerm.toLowerCase();
            return uniqueEmployees.filter(function (emp) {
                return emp.employeeName.toLowerCase().includes(searchTermLower_1);
            });
        }
        return uniqueEmployees;
    }, [teams, searchTerm]);
    (0, react_1.useEffect)(function () {
        gsap_1.gsap.to("#addBtn", { opacity: 1, y: -50, delay: 1, backgroundColor: '#2D336B' });
    }, []);
    var showAddButton = (0, react_1.useMemo)(function () {
        var _a;
        var employee = getCurrentEmployee();
        return ((_a = employee === null || employee === void 0 ? void 0 : employee.designation_id) === null || _a === void 0 ? void 0 : _a.designationName) === 'IT Project Manager';
    }, []);
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
            window.location.href = '/login';
        }
    }, []);
    return (<>
      <div className="flex flex-col justify-end">
        <div className="flex justify-between items-center w-full h-full p-8 bg-[#f0f0f0] rounded-xl mb-4 border-b-2 pb-0">
          <h2 className="page-title text-4xl font-bold mb-6" id="title">
            Danh sách nhân viên trong các dự án
          </h2>

          <div className="search-container">
            <outline_1.MagnifyingGlassIcon className="search-icon"/>
            <input type="text" placeholder="Tìm kiếm nhân viên..." className="search-input" onChange={handleSearchChange}/>
          </div>
        </div>

        {loading && (<div className="loading-state">
            Đang tải danh sách nhân viên...
          </div>)}

        {error && (<div className="error-state">
            {error}
          </div>)}

        <div className="bg-[#f0f0f0] p-8 rounded-xl">
          <div className="grid-wrapper gap-10">
            <div className="employees-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4" id="employee-card">
              {filteredEmployees.length ? (filteredEmployees.map(function (employee) { return (<EmployeeItemPM_1.default key={employee._id} employee={__assign(__assign({}, employee), { designation_id: employee.designation_id || undefined, account: employee.account || { userName: '', email: '' } })}/>); })) : (<div className="empty-state">
                  {searchTerm ? 'Không tìm thấy nhân viên nào.' : 'Không có nhân viên nào trong các dự án của bạn.'}
                </div>)}
            </div>
          </div>
        </div>
      </div>

      {showCreateEmployeeDialog && (<div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg w-full max-w-lg">
            <CreateEmployeeItem_1.default onClose={function () { return setShowCreateEmployeeDialog(false); }}/>
            <button className="close-button mt-4 px-4 py-2 text-white rounded" onClick={function () { return setShowCreateEmployeeDialog(false); }}>
              Đóng
            </button>
          </div>
        </div>)}
    </>);
};
exports.default = EmployeesListPM;
