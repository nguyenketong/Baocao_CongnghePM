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
var react_1 = require("react");
var react_toastify_1 = require("react-toastify");
var outline_1 = require("@heroicons/react/24/outline");
var teamService_1 = require("../../../services/teamService");
var ViewTeamMembers = function (_a) {
    var team = _a.team, onClose = _a.onClose, _b = _a.hideDelete, hideDelete = _b === void 0 ? false : _b;
    var _c = (0, react_1.useState)([]), members = _c[0], setMembers = _c[1];
    var _d = (0, react_1.useState)(true), loading = _d[0], setLoading = _d[1];
    var _e = (0, react_1.useState)(null), error = _e[0], setError = _e[1];
    (0, react_1.useEffect)(function () {
        var fetchTeamMembers = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, fetch("http://localhost:3000/teams/".concat(team._id, "/members"))];
                    case 1:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error('Failed to fetch team members');
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        setMembers(data.members);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        setError(error_1 instanceof Error ? error_1.message : 'Failed to load team members');
                        react_toastify_1.toast.error('Failed to load team members');
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchTeamMembers();
    }, [team._id]);
    var handleRemoveMember = function (employeeId) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2, errorMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.confirm('Are you sure you want to remove this member from the team?')) {
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    // Log thông tin trước khi gọi API
                    console.log('Removing member:', {
                        teamId: team._id,
                        employeeId: employeeId
                    });
                    return [4 /*yield*/, (0, teamService_1.removeTeamMember)(team._id, employeeId)];
                case 2:
                    response = _a.sent();
                    // Log response để debug
                    console.log('Remove member response:', response);
                    if (response && response.success) {
                        react_toastify_1.toast.success(response.message || 'Member removed successfully');
                        // Cập nhật lại danh sách members ngay lập tức
                        setMembers(function (prevMembers) { return prevMembers.filter(function (member) { return member._id !== employeeId; }); });
                    }
                    else {
                        throw new Error((response === null || response === void 0 ? void 0 : response.message) || 'Failed to remove member');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error removing member:', error_2);
                    errorMessage = error_2 instanceof Error ? error_2.message : 'Failed to remove member';
                    react_toastify_1.toast.error(errorMessage, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    // Log error details để debug
                    if (error_2 instanceof Error) {
                        console.log('Error details:', {
                            message: error_2.message,
                            stack: error_2.stack
                        });
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    if (loading) {
        return (<div className="text-center py-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4">Loading team members...</p>
      </div>);
    }
    if (error) {
        return (<div className="text-center py-4">
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Close
        </button>
      </div>);
    }
    return (<div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Team Members</h2>

      {members.length === 0 ? (<p className="text-gray-600">No members in this team</p>) : (<ul className="space-y-2">
          {members.map(function (member) { return (<li key={member._id} className="flex items-center space-x-4 p-3 rounded-md border bg-gray-50">
              <img src={member.employeeProfile || '/default-avatar.png'} alt={member.employeeName} className="h-12 w-12 rounded-full object-cover"/>
              <div className="flex-1">
                <h3 className="font-medium">{member.employeeName}</h3>
                <p className="text-sm text-gray-500">{member.phone || 'No phone number'}</p>
              </div>
              {!hideDelete && (<button onClick={function () { return handleRemoveMember(member._id); }} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200" title="Remove Member">
                <outline_1.TrashIcon className="h-5 w-5"/>
              </button>)}
              
            </li>); })}
        </ul>)}

      <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200">
        Close
      </button>
    </div>);
};
exports.default = ViewTeamMembers;
