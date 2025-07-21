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
var react_toastify_1 = require("react-toastify");
require("../../../styles/EditTeamItem.css");
var swr_1 = require("swr");
var TeamFacade_1 = require("@/app/utils/TeamFacade");
var EditTeamPMItem = function (_a) {
    var _b, _c, _d, _e;
    var team = _a.team, onClose = _a.onClose, _f = _a.currentTime, currentTime = _f === void 0 ? "2025-03-02 12:18:12" : _f, _g = _a.currentUser, currentUser = _g === void 0 ? "HMK1510" : _g;
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
    var teamFacade = new TeamFacade_1.default(team._id);
    (0, react_1.useEffect)(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var currentEmployee, technicalLeads, pmProjects, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        currentEmployee = TeamFacade_1.default.getCurrentEmployee();
                        if (!currentEmployee || ((_a = currentEmployee.designation_id) === null || _a === void 0 ? void 0 : _a.designationName) !== 'IT Project Manager') {
                            react_toastify_1.toast.error('Access denied: Only IT Project Managers can access this page');
                            onClose();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, TeamFacade_1.default.fetchTechnicalLeads()];
                    case 1:
                        technicalLeads = _b.sent();
                        setEmployees(technicalLeads);
                        return [4 /*yield*/, TeamFacade_1.default.fetchProjectsForPM(currentEmployee._id)];
                    case 2:
                        pmProjects = _b.sent();
                        setProjects(pmProjects);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.error('Error loading data:', error_1);
                        react_toastify_1.toast.error('Failed to load required data');
                        onClose();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, [onClose]);
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var changes, updateData, error_2;
        var _a, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    if (isSubmitting)
                        return [2 /*return*/];
                    setIsSubmitting(true);
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 5, 6, 7]);
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
                    if (!(Object.keys(changes).length > 0)) return [3 /*break*/, 3];
                    updateData = __assign({ teamName: team.teamName, teamLead: ((_e = team.teamLead) === null || _e === void 0 ? void 0 : _e._id) || '', projectid: ((_f = team.projectid) === null || _f === void 0 ? void 0 : _f._id) || '', lastUpdatedBy: currentUser, lastUpdatedAt: currentTime }, changes);
                    return [4 /*yield*/, TeamFacade_1.default.updateTeamData(team._id, updateData)];
                case 2:
                    _g.sent();
                    (0, swr_1.mutate)("/teams");
                    onClose();
                    return [3 /*break*/, 4];
                case 3:
                    react_toastify_1.toast.info('No changes detected');
                    onClose();
                    _g.label = 4;
                case 4: return [3 /*break*/, 7];
                case 5:
                    error_2 = _g.sent();
                    console.error('Error updating team:', error_2);
                    react_toastify_1.toast.error('An unexpected error occurred');
                    return [3 /*break*/, 7];
                case 6:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
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
              <select className="form-select" {...register('teamLead')}>
                <option value="">Select Team Lead</option>
                {employees.map(function (employee) { return (<option key={employee._id} value={employee._id}>
                    {employee.employeeName}
                  </option>); })}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Project</label>
              <div className="mb-2 text-sm text-gray-600">
                Current Project: {((_e = team.projectid) === null || _e === void 0 ? void 0 : _e.projectName) || 'Not assigned'}
              </div>
              <select className="form-select" {...register('projectid')}>
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
exports.default = EditTeamPMItem;
