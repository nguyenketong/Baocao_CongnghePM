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
var react_hook_form_1 = require("react-hook-form");
var axios_1 = require("axios");
var react_toastify_1 = require("react-toastify");
require("../../../styles/EditTeamItem.css");
var teamService_1 = require("../../../services/teamService");
var observer_1 = require("@/app/utils/observer");
var API_BASE_URL = 'http://localhost:3000';
var API_PROJECT_URL = "".concat(API_BASE_URL, "/projects");
var API_EMPLOYEE_URL = "".concat(API_BASE_URL, "/employees");
var API_TEAM_URL = "".concat(API_BASE_URL, "/teams");
var EditTeamItem = function (_a) {
    var _b, _c, _d, _e, _f, _g;
    var team = _a.team, onClose = _a.onClose;
    var _h = (0, react_hook_form_1.useForm)({
        defaultValues: {
            teamName: team.teamName,
            teamLead: (_b = team.teamLead) === null || _b === void 0 ? void 0 : _b._id,
            projectid: (_c = team.projectid) === null || _c === void 0 ? void 0 : _c._id,
        }
    }), register = _h.register, handleSubmit = _h.handleSubmit;
    var _j = (0, react_1.useState)([]), projects = _j[0], setProjects = _j[1];
    var _k = (0, react_1.useState)([]), employees = _k[0], setEmployees = _k[1];
    var _l = (0, react_1.useState)(false), isSubmitting = _l[0], setIsSubmitting = _l[1];
    (0, react_1.useEffect)(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, projectRes, employeeRes, technicalLeads, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.all([
                                axios_1.default.get(API_PROJECT_URL),
                                axios_1.default.get(API_EMPLOYEE_URL)
                            ])];
                    case 1:
                        _a = _b.sent(), projectRes = _a[0], employeeRes = _a[1];
                        setProjects(projectRes.data);
                        technicalLeads = employeeRes.data.filter(function (employee) { var _a; return ((_a = employee.designation_id) === null || _a === void 0 ? void 0 : _a.designationName) === 'Technical Lead'; });
                        console.log('Filtered Technical Leads:', technicalLeads);
                        setEmployees(technicalLeads);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.error('Error fetching data:', error_1);
                        react_toastify_1.toast.error('Failed to load initial data');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    var addTeamLeadToTeam = function (teamId, employeeId) { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post("".concat(API_TEAM_URL, "/").concat(teamId, "/members"), {
                            employeeId: employeeId
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error adding team lead to team:', error_2);
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var changes, updateData, updatedTeam, error_3, error_4, errorMessage;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    if (isSubmitting)
                        return [2 /*return*/];
                    setIsSubmitting(true);
                    _l.label = 1;
                case 1:
                    _l.trys.push([1, 9, 10, 11]);
                    changes = {};
                    if (((_a = data.teamName) === null || _a === void 0 ? void 0 : _a.trim()) !== team.teamName) {
                        changes.teamName = ((_b = data.teamName) === null || _b === void 0 ? void 0 : _b.trim()) || '';
                    }
                    if (data.teamLead !== ((_c = team.teamLead) === null || _c === void 0 ? void 0 : _c._id)) {
                        changes.teamLead = data.teamLead || '';
                    }
                    if (data.projectid !== ((_d = team.projectid) === null || _d === void 0 ? void 0 : _d._id)) {
                        changes.projectid = data.projectid || '';
                    }
                    if (!(Object.keys(changes).length > 0)) return [3 /*break*/, 7];
                    console.log("[EditTeamItem] G\u1EEDi d\u1EEF li\u1EC7u c\u1EADp nh\u1EADt:", changes);
                    updateData = __assign({ teamName: team.teamName, teamLead: ((_e = team.teamLead) === null || _e === void 0 ? void 0 : _e._id) || '', projectid: ((_f = team.projectid) === null || _f === void 0 ? void 0 : _f._id) || '', lastUpdatedBy: 'HMK1510', lastUpdatedAt: new Date().toISOString() }, changes);
                    return [4 /*yield*/, (0, teamService_1.updateTeam)(team._id, updateData)];
                case 2:
                    updatedTeam = _l.sent();
                    console.log("[EditTeamItem] Team \u0111\u00E3 c\u1EADp nh\u1EADt th\u00E0nh c\u00F4ng:", updatedTeam);
                    if (!(changes.teamLead && changes.teamLead !== ((_g = team.teamLead) === null || _g === void 0 ? void 0 : _g._id))) return [3 /*break*/, 6];
                    _l.label = 3;
                case 3:
                    _l.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, addTeamLeadToTeam(team._id, changes.teamLead)];
                case 4:
                    _l.sent();
                    console.log("[EditTeamItem] Team lead ".concat(changes.teamLead, " \u0111\u00E3 \u0111\u01B0\u1EE3c th\u00EAm v\u00E0o team"));
                    return [3 /*break*/, 6];
                case 5:
                    error_3 = _l.sent();
                    console.error("[EditTeamItem] L\u1ED7i khi th\u00EAm team lead v\u00E0o team:", error_3);
                    react_toastify_1.toast.warning('Team updated but failed to add team lead to team members');
                    return [3 /*break*/, 6];
                case 6:
                    if (updatedTeam) {
                        react_toastify_1.toast.success('Team updated successfully');
                        // 🔥 Gửi thông báo cập nhật qua Observer
                        console.log("[EditTeamItem] G\u1EEDi th\u00F4ng b\u00E1o qua Observer:", updatedTeam);
                        observer_1.teamObserver.notify(updatedTeam);
                        onClose();
                    }
                    return [3 /*break*/, 8];
                case 7:
                    react_toastify_1.toast.info('No changes detected');
                    onClose();
                    _l.label = 8;
                case 8: return [3 /*break*/, 11];
                case 9:
                    error_4 = _l.sent();
                    if (axios_1.default.isAxiosError(error_4)) {
                        errorMessage = (_j = (_h = error_4.response) === null || _h === void 0 ? void 0 : _h.data) === null || _j === void 0 ? void 0 : _j.message;
                        if (Array.isArray(errorMessage)) {
                            react_toastify_1.toast.error(errorMessage[0]);
                        }
                        else {
                            react_toastify_1.toast.error(errorMessage || 'Error updating team');
                        }
                        console.error('[EditTeamItem] API Error:', (_k = error_4.response) === null || _k === void 0 ? void 0 : _k.data);
                    }
                    else {
                        react_toastify_1.toast.error('An unexpected error occurred');
                        console.error('[EditTeamItem] Error:', error_4);
                    }
                    return [3 /*break*/, 11];
                case 10:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="create-team-container">
      <div className="flex justify-between items-center mb-4">
        <h2 className="form-title">Edit Team</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="create-team-form">
        <div className="form-grid">
          <div className="form-section">
            <h3 className="section-title">Team Information</h3>
            
            <div className="form-group">
              <label className="form-label">Team Name</label>
              <input className="form-input" {...register('teamName')} placeholder="Enter team name"/>
            </div>

            <div className="form-group">
              <label className="form-label">Team Lead</label>
              <div className="mb-2 text-sm text-gray-600">
                Current Team Lead: {((_d = team.teamLead) === null || _d === void 0 ? void 0 : _d.employeeName) || 'Not assigned'}
              </div>
              <select className="form-select" defaultValue={((_e = team.teamLead) === null || _e === void 0 ? void 0 : _e._id) || ""} {...register('teamLead')}>
                <option value="">Select Team Lead</option>
                {employees.map(function (employee) { return (<option key={employee._id} value={employee._id}>
                    {employee.employeeName}
                  </option>); })}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Project</label>
              <div className="mb-2 text-sm text-gray-600">
                Current Project: {((_f = team.projectid) === null || _f === void 0 ? void 0 : _f.projectName) || 'Not assigned'}
              </div>
              <select className="form-select" defaultValue={((_g = team.projectid) === null || _g === void 0 ? void 0 : _g._id) || ""} {...register('projectid')}>
                <option value="">Select Project</option>
                {projects.map(function (project) { return (<option key={project._id} value={project._id}>
                    {project.projectName}
                  </option>); })}
              </select>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className={"submit-button ".concat(isSubmitting ? 'submitting' : '')} disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Team'}
          </button>
        </div>
      </form>
    </div>);
};
exports.default = EditTeamItem;
