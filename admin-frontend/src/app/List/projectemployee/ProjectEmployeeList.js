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
var ProjectEmployeeItem_1 = require("@/app/components/Item/project/ProjectEmployeeItem");
var projectEmployeeCommand_1 = require("@/app/command/projectEmployeeCommand"); // Import các hàm từ command file
var ProjectEmployeeList = function () {
    var _a = (0, react_1.useState)(null), employee = _a[0], setEmployee = _a[1];
    var _b = (0, react_1.useState)([]), projects = _b[0], setProjects = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    var _d = (0, react_1.useState)(''), filterText = _d[0], setFilterText = _d[1];
    var _e = (0, react_1.useState)('projectName'), sortBy = _e[0], setSortBy = _e[1]; // Add sortBy state
    // Lấy thông tin nhân viên và dự án
    (0, react_1.useEffect)(function () {
        var employeeId = localStorage.getItem("employeeId");
        if (!employeeId) {
            setError("Không có ID nhân viên trong localStorage");
            return;
        }
        var fetchProfileAndProjects = function () { return __awaiter(void 0, void 0, void 0, function () {
            var employeeData, projectsData, projects_1, teamProjects, err_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, (0, projectEmployeeCommand_1.fetchEmployeeById)(employeeId)];
                    case 1:
                        employeeData = _c.sent();
                        setEmployee(employeeData);
                        if (!(((_a = employeeData.designation_id) === null || _a === void 0 ? void 0 : _a.designationName) === "Technical Lead")) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, projectEmployeeCommand_1.fetchProjectsForLead)(employeeId)];
                    case 2:
                        projectsData = _c.sent();
                        projects_1 = projectsData.map(function (team) { return team.projectid; });
                        setProjects(projects_1);
                        return [3 /*break*/, 4];
                    case 3:
                        teamProjects = ((_b = employeeData.team_id) === null || _b === void 0 ? void 0 : _b.map(function (team) { return team.projectid; })) || [];
                        setProjects(teamProjects);
                        _c.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_1 = _c.sent();
                        console.error("Lỗi khi lấy dữ liệu:", err_1);
                        setError("Lỗi khi lấy dữ liệu nhân viên hoặc dự án.");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        fetchProfileAndProjects();
    }, []);
    if (error) {
        return (<div className="flex flex-col items-center justify-center py-10">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          ⚠️ <p>{error}</p>
          <button onClick={function () { return window.location.reload(); }} className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg">
            Thử lại
          </button>
        </div>
      </div>);
    }
    if (!employee) {
        return (<div className="flex flex-col items-center justify-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"/>
        <p className="mt-2 text-gray-600">Đang tải thông tin nhân viên...</p>
      </div>);
    }
    return (<main className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <header className="header-title">
          <h3 className="fw-bold mb-0 py-3 pb-2">Projects</h3>
        </header>
        <input type="text" value={filterText} onChange={function (e) { return setFilterText(e.target.value); }} placeholder="Tìm kiếm project..." className="border p-2 rounded-md"/>
        <select value={sortBy} onChange={function (e) { return setSortBy(e.target.value); }} className="border p-2 rounded-md">
          <option value="projectName">Sắp xếp theo tên project</option>
          <option value="projectStart">Sắp xếp theo ngày bắt đầu</option>
        </select>
      </div>

      <div className="row g-3 gy-5 py-3 row-deck">
        {projects.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {projects.map(function (project) {
                return project ? (<ProjectEmployeeItem_1.default key={project._id} project={project}/>) : (<p key={Math.random()} className="text-center">
                  Không có dự án nào.
                </p>);
            })}
          </div>) : (<p className="text-center">Nhân viên chưa tham gia dự án nào.</p>)}
      </div>
    </main>);
};
exports.default = ProjectEmployeeList;
