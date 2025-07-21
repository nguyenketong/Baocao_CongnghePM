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
var axios_1 = require("axios");
var ProjectTable = function () {
    var _a = (0, react_1.useState)([]), projects = _a[0], setProjects = _a[1];
    (0, react_1.useEffect)(function () {
        var fetchProjects = function () { return __awaiter(void 0, void 0, void 0, function () {
            var projectResponse, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("http://localhost:3000/projects")];
                    case 1:
                        projectResponse = _a.sent();
                        setProjects(projectResponse.data);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.error("Error fetching projects", err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchProjects();
    }, []);
    return (<div className="bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Information</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-left">
            <th className="p-3">TITLE</th>
            <th className="p-3">DATE START</th>
            <th className="p-3">DEADLINE</th>
            <th className="p-3">ASSIGNED PERSON</th>
            <th className="p-3">PRIORITY</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(function (project) { return (<tr key={project._id} className="border-b">
              <td className="p-3">{project.projectName}</td>
              <td className="p-3">{new Date(project.projectStart).toLocaleDateString()}</td>
              <td className="p-3">{new Date(project.projectEnd).toLocaleDateString()}</td>

              {/* Hiển thị thông tin nhân viên */}
              <td className="p-3 flex items-center space-x-2">
                {project.assignedPerson ? (<>
                    <img src={project.assignedPerson.employeeProfile || "/default-avatar.png"} className="w-10 h-10 rounded-full object-cover" alt={project.assignedPerson.employeeName}/>
                    <span>{project.assignedPerson.employeeName}</span>
                  </>) : (<span>No Leader</span>)}
              </td>

              {/* Hiển thị mức độ ưu tiên */}
              <td className="p-3">
                <span className={"px-2 py-1 text-xs font-semibold rounded ".concat(project.priority === "High" ? "bg-red-500 text-white" :
                project.priority === "Medium" ? "bg-yellow-500 text-white" :
                    "bg-green-500 text-white")}>
                  {project.priority}
                </span>
              </td>
            </tr>); })}
        </tbody>
      </table>
    </div>);
};
exports.default = ProjectTable;
