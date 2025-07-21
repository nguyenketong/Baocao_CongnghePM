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
Object.defineProperty(exports, "__esModule", { value: true });
// services/TeamFacade.ts
var react_toastify_1 = require("react-toastify");
var teamService_1 = require("../services/teamService");
var observer_1 = require("@/app/utils/observer");
var swr_1 = require("swr");
var API_BASE_URL = 'http://localhost:3000';
var API_EMPLOYEE_URL = "".concat(API_BASE_URL, "/employees");
var API_TEAM_URL = "".concat(API_BASE_URL, "/teams");
var TeamFacade = /** @class */ (function () {
    function TeamFacade(teamId) {
        this.teamId = teamId;
    }
    TeamFacade.getCurrentEmployee = function () {
        var employeeStr = localStorage.getItem('employee');
        if (!employeeStr)
            return null;
        try {
            return JSON.parse(employeeStr);
        }
        catch (error) {
            console.error('Error parsing employee data:', error);
            return null;
        }
    };
    TeamFacade.prototype.fetchAvailableEmployees = function () {
        return __awaiter(this, void 0, void 0, function () {
            var teamResponse, teamData, currentTeamMemberIds_1, response, allEmployees, excludedDesignations_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, fetch("".concat(API_TEAM_URL, "/").concat(this.teamId, "/members"))];
                    case 1:
                        teamResponse = _a.sent();
                        if (!teamResponse.ok)
                            throw new Error('Không thể tải danh sách thành viên team');
                        return [4 /*yield*/, teamResponse.json()];
                    case 2:
                        teamData = _a.sent();
                        currentTeamMemberIds_1 = new Set(teamData.members.map(function (member) { return member._id; }));
                        return [4 /*yield*/, fetch(API_EMPLOYEE_URL)];
                    case 3:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error('Không thể tải danh sách nhân viên');
                        return [4 /*yield*/, response.json()];
                    case 4:
                        allEmployees = _a.sent();
                        excludedDesignations_1 = [
                            'IT Project Manager',
                            'Product Manager',
                            'Admin',
                            'manager',
                            'Technical Lead'
                        ];
                        return [2 /*return*/, allEmployees.filter(function (emp) {
                                var _a;
                                return emp._id && emp.employeeName && !currentTeamMemberIds_1.has(emp._id) &&
                                    !excludedDesignations_1.includes((_a = emp.designation_id) === null || _a === void 0 ? void 0 : _a.designationName);
                            })];
                    case 5:
                        error_1 = _a.sent();
                        console.error('Lỗi khi tải danh sách nhân viên:', error_1);
                        throw error_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TeamFacade.fetchTechnicalLeads = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, response, employees, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        token = localStorage.getItem('token');
                        return [4 /*yield*/, fetch(API_EMPLOYEE_URL, {
                                headers: { Authorization: "Bearer ".concat(token) }
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error('Không thể lấy danh sách Technical Leads');
                        return [4 /*yield*/, response.json()];
                    case 2:
                        employees = _a.sent();
                        return [2 /*return*/, employees.filter(function (employee) { var _a; return ((_a = employee.designation_id) === null || _a === void 0 ? void 0 : _a.designationName) === 'Technical Lead'; })];
                    case 3:
                        error_2 = _a.sent();
                        console.error('Error fetching technical leads:', error_2);
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TeamFacade.fetchProjectsForPM = function (employeeId) {
        return __awaiter(this, void 0, void 0, function () {
            var token, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        token = localStorage.getItem('token');
                        return [4 /*yield*/, fetch("".concat(API_BASE_URL, "/employees/pm/").concat(employeeId), {
                                headers: { Authorization: "Bearer ".concat(token) }
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error("Cannot fetch PM projects");
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_3 = _a.sent();
                        console.error('Error fetching PM projects:', error_3);
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TeamFacade.prototype.addMember = function (employeeId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, updatedTeamRes, updatedTeam, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, (0, teamService_1.addTeamMember)(this.teamId, employeeId)];
                    case 1:
                        result = _a.sent();
                        if (!result.success) return [3 /*break*/, 5];
                        react_toastify_1.toast.success('Thêm thành viên vào team thành công');
                        return [4 /*yield*/, fetch("".concat(API_TEAM_URL, "/").concat(this.teamId))];
                    case 2:
                        updatedTeamRes = _a.sent();
                        if (!updatedTeamRes.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, updatedTeamRes.json()];
                    case 3:
                        updatedTeam = _a.sent();
                        observer_1.teamObserver.notify(updatedTeam);
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5: throw new Error(result.message || 'Không thể thêm thành viên vào team');
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_4 = _a.sent();
                        console.error('Lỗi khi thêm thành viên:', error_4);
                        throw error_4;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    TeamFacade.updateTeamData = function (teamId, updateData) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedTeam, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, teamService_1.updateTeam)(teamId, updateData)];
                    case 1:
                        updatedTeam = _a.sent();
                        react_toastify_1.toast.success('Team updated successfully');
                        (0, swr_1.mutate)("".concat(API_TEAM_URL));
                        return [2 /*return*/, updatedTeam];
                    case 2:
                        error_5 = _a.sent();
                        react_toastify_1.toast.error('Error updating team');
                        console.error('Error:', error_5);
                        throw error_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TeamFacade;
}());
exports.default = TeamFacade;
