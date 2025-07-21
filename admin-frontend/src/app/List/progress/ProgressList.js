"use client";
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
var navigation_1 = require("next/navigation");
var ProgressItem_1 = require("../../components/Item/progress/ProgressItem");
var CreateProgressItem_1 = require("../../components/Item/progress/CreateProgressItem");
var progressCommand_1 = require("../../command/progressCommand");
var outline_1 = require("@heroicons/react/24/outline");
var progressHandler_1 = require("../../hook/progressHandler");
var axios_1 = require("axios");
var API_BASE_URL = 'http://localhost:3000/tasks';
var ProgressList = function () {
    var searchParams = (0, navigation_1.useSearchParams)();
    var projectId = searchParams.get("projectId") || undefined;
    var progressId = searchParams.get("id") || undefined;
    var _a = (0, progressCommand_1.useProgressListCommand)(projectId, progressId), paginatedProgresses = _a.paginatedProgresses, isLoading = _a.isLoading, error = _a.error;
    var _b = (0, progressHandler_1.useProgressHandlers)(), showCreateProgressDialog = _b.showCreateProgressDialog, handleDelete = _b.handleDelete, handleEdit = _b.handleEdit, handleOpenDialog = _b.handleOpenDialog, handleCloseDialog = _b.handleCloseDialog;
    var _c = (0, react_1.useState)(false), isTechLead = _c[0], setIsTechLead = _c[1];
    var _d = (0, react_1.useState)(false), isPM = _d[0], setIsPM = _d[1];
    var _e = (0, react_1.useState)([]), tasks = _e[0], setTasks = _e[1];
    // State for filter text and sorting
    var _f = (0, react_1.useState)(""), filterText = _f[0], setFilterText = _f[1]; // Add filterText state
    var _g = (0, react_1.useState)("progressName"), sortBy = _g[0], setSortBy = _g[1]; // Add sortBy state
    var _h = (0, react_1.useState)(), employeeData = _h[0], setEmployeeData = _h[1]; // Khai báo state để lưu thông tin nhân viên
    (0, react_1.useEffect)(function () {
        var _a, _b;
        var storedEmployee = localStorage.getItem("employee");
        if (storedEmployee) {
            var employeeData_1 = JSON.parse(storedEmployee);
            setEmployeeData(employeeData_1); // Lưu thông tin vào state
            // Check if the employee is an IT Project Manager
            if (((_a = employeeData_1 === null || employeeData_1 === void 0 ? void 0 : employeeData_1.designation_id) === null || _a === void 0 ? void 0 : _a.designationName) === "IT Project Manager") {
                setIsPM(true);
            }
            // Check if the employee is a Tech Lead
            if (((_b = employeeData_1 === null || employeeData_1 === void 0 ? void 0 : employeeData_1.designation_id) === null || _b === void 0 ? void 0 : _b.designationName) === "Technical Lead") {
                setIsTechLead(true);
            }
        }
    }, []);
    (0, react_1.useEffect)(function () {
        // Fetch tasks related to this project
        var fetchTasks = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get(API_BASE_URL)];
                    case 1:
                        response = _a.sent();
                        setTasks(response.data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error fetching tasks", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchTasks();
    }, []);
    // Filter and sort progresses
    var filteredAndSortedProgresses = react_1.default.useMemo(function () {
        var filtered = paginatedProgresses.filter(function (progress) {
            return progress.progressName.toLowerCase().includes(filterText.toLowerCase());
        });
        if (sortBy === "progressStart") {
            filtered = filtered.sort(function (a, b) {
                return new Date(a.progressStart).getTime() - new Date(b.progressStart).getTime();
            });
        }
        else {
            filtered = filtered.sort(function (a, b) { return a.progressName.localeCompare(b.progressName); });
        }
        return filtered;
    }, [paginatedProgresses, filterText, sortBy]);
    // Filter progresses for TechLead role
    var filteredProgressesForTechLead = isTechLead && employeeData
        ? filteredAndSortedProgresses.filter(function (progress) {
            return progress.taskRecipient.id === String(employeeData._id);
        } // Compare taskRecipient (string) with employeeData._id (string)
        )
        : filteredAndSortedProgresses;
    var overdueTasks = tasks.filter(function (task) {
        return new Date(task.taskEnd).getTime() < Date.now() && task.status !== "Completed";
    });
    return (<div className="container">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <header className="header-title">
          <h3 className="fw-bold mb-0 py-3 pb-2">Progress</h3>
        </header>
        <input type="text" value={filterText} onChange={function (e) { return setFilterText(e.target.value); }} placeholder="Tìm kiếm progress..." className="border p-2 rounded-md"/>
        <select value={sortBy} onChange={function (e) { return setSortBy(e.target.value); }} className="border p-2 rounded-md">
          <option value="progressName">Sắp xếp theo tên progress</option>
          <option value="progressStart">Sắp xếp theo ngày bắt đầu</option>
        </select>
      </div>

  {/* Container Layout */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
   
 {/* Task Progress */}
 <div className="bg-white p-4 rounded-lg shadow-lg">
  <h3 className="font-bold text-lg">Task Progress</h3>
  <div className="overflow-y-auto max-h-[150px]"> {/* Set max height for scrolling */}
    <div className="space-y-4 mt-2">
      {filteredAndSortedProgresses.map(function (progress) {
            var _a;
            // Filter tasks related to this progress
            var tasksInProgress = tasks.filter(function (task) { var _a; return ((_a = task.progressId) === null || _a === void 0 ? void 0 : _a._id) === progress._id; });
            var completedTasks = tasksInProgress.filter(function (task) { return task.status === "Completed"; });
            var progressPercentage = (completedTasks.length / tasksInProgress.length) * 100;
            return (<div key={progress._id}>
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">
                  {((_a = progress.progressCategory) === null || _a === void 0 ? void 0 : _a.progressCategoryName) || "No Category"}
                </div>
                <div className="text-xs text-gray-500">
                  {completedTasks.length} / {tasksInProgress.length} Completed
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="bg-gray-200 h-2 mt-1 rounded-full">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "".concat(progressPercentage, "%") }}></div>
                </div>
                <div className="absolute inset-0 flex justify-between items-center px-2 text-xs text-white">
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
              </div>
            </div>
          </div>);
        })}
    </div>
  </div>
    </div>


       {/* Recent Activity */}
    <div className="bg-white p-4 rounded-lg shadow-lg">
  <h3 className="font-bold text-lg">Recent Activity</h3>
  <ul className="mt-2 space-y-4 max-h-[150px] overflow-y-auto"> {/* Set max-height and enable vertical scrolling */}
    {paginatedProgresses
            .slice(0, 5) // Show the most recent 5 progress updates
            .map(function (progress) { return (<li key={progress._id} className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
            <span>{progress.progressName[0]}</span>
          </div>
          <div>
            <p className="font-medium">{progress.progressName}</p>
            <p className="text-sm text-gray-500">{new Date(progress.progressStart).toLocaleDateString()} ago</p>
          </div>
        </li>); })}
  </ul>
    </div>


``
  
  {/* Overdue Tasks */}
  <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg mb-4">Overdue Tasks</h3>
          <ul className="space-y-3  max-h-[150px] overflow-y-auto">
            {overdueTasks.length ? (overdueTasks.map(function (task) { return (<li key={task._id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="block font-medium">{task.taskName}</span>
                  </div>
                  <div className="text-xs text-gray-500">Due: {new Date(task.taskEnd).toLocaleDateString()}</div>
                </li>); })) : (<div>No overdue tasks.</div>)}
          </ul>
        </div>
      
    </div>
  

      {isLoading && <div>Đang tải danh sách tiến độ...</div>}
      {error && <div>Lỗi khi tải danh sách tiến độ!</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
     {/* In Progress Column */}
     <div>
          <h3 className="font-bold text-lg mb-4">In Progress</h3>
          <div className="space-y-4">
            {filteredProgressesForTechLead
            .filter(function (progress) { return progress.status === "In Progress"; })
            .map(function (progress) { return (<ProgressItem_1.default key={progress._id} progress={progress} onDelete={handleDelete} onEdit={handleEdit}/>); })}
          </div>
        </div>

    {/* Needs Review Column */}
    <div>
          <h3 className="font-bold text-lg mb-4">Needs Review</h3>
          <div className="space-y-4">
            {filteredProgressesForTechLead
            .filter(function (progress) { return progress.status === "Needs Review"; })
            .map(function (progress) { return (<ProgressItem_1.default key={progress._id} progress={progress} onDelete={handleDelete} onEdit={handleEdit}/>); })}
          </div>
        </div>

        {/* Completed Column */}
        <div>
          <h3 className="font-bold text-lg mb-4">Completed</h3>
          <div className="space-y-4">
            {filteredProgressesForTechLead
            .filter(function (progress) { return progress.status === "Completed"; })
            .map(function (progress) { return (<ProgressItem_1.default key={progress._id} progress={progress} onDelete={handleDelete} onEdit={handleEdit}/>); })}
          </div>
        </div>
      </div>


      {/* Show button only if the user is PM */}
   {/* Show button only if the user is PM */}
        {isPM && (<button className="fab-button fixed bottom-5 right-5 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all duration-200" onClick={handleOpenDialog} aria-label="Add New Task">
    <outline_1.PlusIcon className="w-6 h-6"/>
  </button>)}

        {showCreateProgressDialog && (<div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="modal-content bg-white p-6 rounded-lg w-full max-w-lg">
      <CreateProgressItem_1.default projectId={projectId} onClose={handleCloseDialog}/>
     
    </div>
  </div>)}

    </div>);
};
exports.default = ProgressList;
