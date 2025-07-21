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
exports.getTeamsByTeamLead = exports.getTeamsByProject = exports.removeTeamMember = exports.getTeamMembers = exports.addTeamMember = exports.deleteTeam = exports.updateTeam = exports.createTeam = exports.getTeam = exports.getTeamByEmployeeId = exports.getTeams = void 0;
var axios_1 = require("axios");
var API_URL = 'http://localhost:3000';
// Get all teams
var getTeams = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("".concat(API_URL, "/teams"))];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data.map(function (team) { return (__assign(__assign({}, team), { teamLead: team.teamLead || null, projectid: team.projectid || null })); })];
            case 2:
                error_1 = _a.sent();
                console.error('Error fetching teams:', error_1);
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTeams = getTeams;
var getTeamByEmployeeId = function (employeeId) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("".concat(API_URL, "?employeeId=").concat(employeeId))];
            case 1:
                response = _a.sent();
                if (!response.ok)
                    throw new Error("Không thể lấy dữ liệu nhóm");
                return [4 /*yield*/, response.json()];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_2 = _a.sent();
                console.error("❌ Lỗi khi lấy team:", error_2);
                throw error_2;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getTeamByEmployeeId = getTeamByEmployeeId;
// Get a single team by ID
var getTeam = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("".concat(API_URL, "/teams/").concat(id))];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_3 = _a.sent();
                console.error('Error fetching team:', error_3);
                throw error_3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTeam = getTeam;
// Create a new team
var createTeam = function (teamData) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.post("".concat(API_URL, "/teams"), teamData)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_4 = _a.sent();
                console.error('Error creating team:', error_4);
                throw error_4;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createTeam = createTeam;
// Update a team
var updateTeam = function (id, updateData) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_5;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                console.log('Sending update data:', updateData);
                return [4 /*yield*/, axios_1.default.patch("".concat(API_URL, "/teams/").concat(id), updateData)];
            case 1:
                response = _b.sent();
                console.log('Response from server:', response.data);
                return [2 /*return*/, __assign(__assign({}, response.data), { teamLead: response.data.teamLead || null, projectid: response.data.projectid || null })];
            case 2:
                error_5 = _b.sent();
                console.error('Error updating team:', error_5);
                if (axios_1.default.isAxiosError(error_5)) {
                    console.error('Server response:', (_a = error_5.response) === null || _a === void 0 ? void 0 : _a.data);
                }
                throw error_5;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateTeam = updateTeam;
// Delete a team
var deleteTeam = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.delete("".concat(API_URL, "/teams/").concat(id))];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error('Error deleting team:', error_6);
                throw error_6;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteTeam = deleteTeam;
// Add member to team
var addTeamMember = function (teamId, employeeId) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_7;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.post("".concat(API_URL, "/teams/").concat(teamId, "/members"), { employeeId: employeeId })];
            case 1:
                response = _b.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_7 = _b.sent();
                console.error('Error adding team member:', error_7);
                if (axios_1.default.isAxiosError(error_7)) {
                    console.error('Server response:', (_a = error_7.response) === null || _a === void 0 ? void 0 : _a.data);
                }
                throw error_7;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addTeamMember = addTeamMember;
// Get team members
var getTeamMembers = function (teamId) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("".concat(API_URL, "/teams/").concat(teamId, "/members"))];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_8 = _a.sent();
                console.error('Error fetching team members:', error_8);
                throw error_8;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTeamMembers = getTeamMembers;
// Remove member from team
var removeTeamMember = function (teamId, employeeId) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_9, errorMessage;
    var _a, _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.delete("".concat(API_URL, "/teams/").concat(teamId, "/members/").concat(employeeId))];
            case 1:
                response = _f.sent();
                // Log response để debug
                console.log('Remove member response:', response.data);
                if (response.data && response.data.success) {
                    return [2 /*return*/, response.data];
                }
                else {
                    throw new Error(((_a = response.data) === null || _a === void 0 ? void 0 : _a.message) || 'Failed to remove team member');
                }
                return [3 /*break*/, 3];
            case 2:
                error_9 = _f.sent();
                console.error('Error removing team member:', error_9);
                if (axios_1.default.isAxiosError(error_9)) {
                    errorMessage = ((_c = (_b = error_9.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message)
                        || ((_e = (_d = error_9.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.error)
                        || error_9.message
                        || 'Failed to remove team member';
                    throw new Error(errorMessage);
                }
                throw error_9;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.removeTeamMember = removeTeamMember;
// Get teams by project ID
var getTeamsByProject = function (projectId) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("".concat(API_URL, "/teams/project/").concat(projectId))];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_10 = _a.sent();
                console.error('Error fetching teams by project:', error_10);
                throw error_10;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTeamsByProject = getTeamsByProject;
// Get teams by team lead ID
var getTeamsByTeamLead = function (teamLeadId) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("".concat(API_URL, "/teams/teamlead/").concat(teamLeadId))];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_11 = _a.sent();
                console.error('Error fetching teams by team lead:', error_11);
                throw error_11;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTeamsByTeamLead = getTeamsByTeamLead;
