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
var EditTeamItem_1 = require("./EditTeamItem");
var teamService_1 = require("../../../services/teamService");
var react_toastify_1 = require("react-toastify");
var swr_1 = require("swr");
var outline_1 = require("@heroicons/react/24/outline");
var AddMember_1 = require("./AddMember");
var ViewTeamMembers_1 = require("./ViewTeamMembers"); // Import the new component
require("../../../styles/TeamItem.css");
var observer_1 = require("@/app/utils/observer");
var TeamItem = function (_a) {
    var _b, _c;
    var team = _a.team;
    var _d = (0, react_1.useState)(false), isEditModalOpen = _d[0], setIsEditModalOpen = _d[1];
    var _e = (0, react_1.useState)(false), isAddMemberModalOpen = _e[0], setIsAddMemberModalOpen = _e[1];
    var _f = (0, react_1.useState)(false), isViewMembersModalOpen = _f[0], setIsViewMembersModalOpen = _f[1];
    var _g = (0, react_1.useState)(false), isDeleting = _g[0], setIsDeleting = _g[1];
    var _h = (0, react_1.useState)(team), teamState = _h[0], setTeamState = _h[1];
    (0, react_1.useEffect)(function () {
        var updateTeam = function (updatedTeam) {
            if (updatedTeam._id === team._id) {
                console.log("[TeamItem] Nh\u1EADn th\u00F4ng b\u00E1o c\u1EADp nh\u1EADt t\u1EEB Observer:", updatedTeam);
                setTeamState(updatedTeam);
            }
        };
        console.log("[TeamItem] \u0110\u0103ng k\u00FD observer cho team ".concat(team._id));
        observer_1.teamObserver.subscribe(updateTeam);
        return function () {
            console.log("[TeamItem] H\u1EE7y \u0111\u0103ng k\u00FD observer cho team ".concat(team._id));
            observer_1.teamObserver.unsubscribe(updateTeam);
        };
    }, [team._id]);
    var handleDelete = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.confirm('Are you sure you want to delete this team?')) {
                        return [2 /*return*/];
                    }
                    setIsDeleting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, (0, teamService_1.deleteTeam)(team._id)];
                case 2:
                    _a.sent();
                    react_toastify_1.toast.success('Team deleted successfully');
                    (0, swr_1.mutate)('http://localhost:3000/teams');
                    observer_1.teamObserver.notify({ _id: team._id, deleted: true }); //Notify subscribers
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    react_toastify_1.toast.error('Failed to delete team');
                    console.error('Error deleting team:', error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setIsDeleting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleAddMember = function () {
        setIsAddMemberModalOpen(true);
    };
    var handleViewMembers = function () {
        setIsViewMembersModalOpen(true);
    };
    return (<div className="flex bg-white rounded-lg shadow-md p-5 relative hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col w-full">
        <h3 className="text-lg font-semibold text-gray-800">
          {teamState.teamName}
        </h3>

        <div className="text-xs bg-slate-400 p-2 font-bold inline-block text-center rounded-sm w-fit px-2 py-1 border-2 border-slate-450">
          <span className="text-black">
            {((_b = teamState.projectid) === null || _b === void 0 ? void 0 : _b.projectName) || 'No Project Assigned'}
          </span>
        </div>

        <div className="text-sm">
          <div className="mt-3 pt-3 border-t border-gray-200">
            <span className="font-medium text-gray-700">Team Lead: </span>
            <span className="text-gray-600">
              {((_c = teamState.teamLead) === null || _c === void 0 ? void 0 : _c.employeeName) || 'No Team Lead Assigned'}
            </span>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button onClick={handleAddMember} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isDeleting} title="Add Member">
            <outline_1.PlusIcon className="h-5 w-5"/>
          </button>
          <button onClick={function () { return setIsEditModalOpen(true); }} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isDeleting} title="Edit">
            <outline_1.PencilSquareIcon className="h-5 w-5"/>
          </button>
          <button onClick={handleDelete} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isDeleting} title={isDeleting ? 'Deleting...' : 'Delete'}>
            <outline_1.TrashIcon className="h-5 w-5"/>
          </button>
          <button onClick={handleViewMembers} className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" title="View Members">
            <outline_1.EyeIcon className="h-5 w-5"/>
          </button>
        </div>
      </div>

      {isEditModalOpen && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <EditTeamItem_1.default team={team} onClose={function () { return setIsEditModalOpen(false); }}/>
            <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200" onClick={function () { return setIsEditModalOpen(false); }}>
              Close
            </button>
          </div>
        </div>)}

      {isAddMemberModalOpen && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <AddMember_1.default team={team} onClose={function () { return setIsAddMemberModalOpen(false); }}/>
          </div>
        </div>)}
      
      {isViewMembersModalOpen && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <ViewTeamMembers_1.default team={team} onClose={function () { return setIsViewMembersModalOpen(false); }}/>
          </div>
        </div>)}
    </div>);
};
exports.default = TeamItem;
