'use client';
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
var swr_1 = require("swr");
var navigation_1 = require("next/navigation");
var outline_1 = require("@heroicons/react/24/outline");
var TaskItem_1 = require("../../components/Item/task/TaskItem");
var CreateTaskItem_1 = require("../../components/Item/task/CreateTaskItem");
var API_BASE_URL = 'http://localhost:3000/tasks';
var TaskList = function () {
    var _a;
    var _b = (0, react_1.useState)(false), showCreateTaskDialog = _b[0], setShowCreateTaskDialog = _b[1];
    var _c = (0, react_1.useState)(1), page = _c[0], setPage = _c[1];
    var pageSize = (0, react_1.useState)(6)[0];
    var _d = (0, react_1.useState)(''), filterText = _d[0], setFilterText = _d[1];
    var _e = (0, react_1.useState)('taskName'), sortBy = _e[0], setSortBy = _e[1];
    var _f = (0, react_1.useState)(null), employeeId = _f[0], setEmployeeId = _f[1];
    var searchParams = (0, navigation_1.useSearchParams)();
    var progressId = searchParams.get('progressId');
    (0, react_1.useEffect)(function () {
        // Lấy employeeId từ localStorage
        var storedEmployeeId = localStorage.getItem('employeeId');
        if (storedEmployeeId) {
            setEmployeeId(storedEmployeeId);
        }
    }, []);
    var fetcher = function (url) { return axios_1.default.get(url).then(function (res) { return res.data; }); };
    var _g = (0, swr_1.default)(API_BASE_URL, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    }), tasks = _g.data, error = _g.error, isLoading = _g.isLoading;
    var storedEmployee = localStorage.getItem('employee');
    var employeeData = storedEmployee ? JSON.parse(storedEmployee) : null;
    var designationName = ((_a = employeeData === null || employeeData === void 0 ? void 0 : employeeData.designation_id) === null || _a === void 0 ? void 0 : _a.designationName) || '';
    var isPM = designationName === 'IT Project Manager';
    var isMember = !['Admin', 'Technical Lead', 'IT Project Manager'].includes(designationName);
    console.log('Role:', designationName); // Debug xem role của user hiện tại
    var filteredTasks = (0, react_1.useMemo)(function () {
        if (!tasks)
            return [];
        var result = tasks;
        if (progressId) {
            if (isPM) {
                // Nếu là PM -> Hiển thị tất cả task thuộc progressId
                result = result.filter(function (task) { return task.progressId && task.progressId._id === progressId; });
            }
            else if (employeeId) {
                if (isMember) {
                    // Nếu là Member -> Chỉ hiển thị task mà employeeId là taskRecipient
                    result = result.filter(function (task) {
                        var _a;
                        return task.progressId &&
                            task.progressId._id === progressId &&
                            ((_a = task.taskRecipient) === null || _a === void 0 ? void 0 : _a._id) === employeeId;
                    });
                }
                else {
                    // Nếu không phải Member -> Chỉ hiển thị task mà employeeId là taskAssignPerson
                    result = result.filter(function (task) {
                        var _a;
                        return task.progressId &&
                            task.progressId._id === progressId &&
                            ((_a = task.taskAssignPerson) === null || _a === void 0 ? void 0 : _a._id) === employeeId;
                    });
                }
            }
        }
        else if (employeeId) {
            if (isMember) {
                // Nếu là Member -> Chỉ hiển thị task mà employeeId là taskRecipient
                result = result.filter(function (task) { var _a; return ((_a = task.taskRecipient) === null || _a === void 0 ? void 0 : _a._id) === employeeId; });
            }
            else {
                // Nếu không phải Member -> Chỉ hiển thị task mà employeeId là taskAssignPerson
                result = result.filter(function (task) { var _a; return ((_a = task.taskAssignPerson) === null || _a === void 0 ? void 0 : _a._id) === employeeId; });
            }
        }
        // Lọc theo tên nhiệm vụ
        result = result.filter(function (task) {
            return task.taskName.toLowerCase().includes(filterText.toLowerCase());
        });
        // Sắp xếp dữ liệu
        return result.sort(function (a, b) {
            return sortBy === 'taskName'
                ? a.taskName.localeCompare(b.taskName)
                : new Date(a.taskStart).getTime() - new Date(b.taskStart).getTime();
        });
    }, [tasks, filterText, sortBy, progressId, employeeId]);
    var paginatedTasks = (0, react_1.useMemo)(function () {
        var startIndex = (page - 1) * pageSize;
        return filteredTasks.slice(startIndex, startIndex + pageSize);
    }, [filteredTasks, page, pageSize]);
    var handleDelete = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.delete("".concat(API_BASE_URL, "/").concat(id))];
                case 1:
                    _a.sent();
                    window.location.reload();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Lỗi khi xóa nhiệm vụ:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleOpenDialog = function () { return setShowCreateTaskDialog(true); };
    var handleCloseDialog = function () { return setShowCreateTaskDialog(false); };
    var totalPages = Math.ceil(filteredTasks.length / pageSize);
    var calculateTimeAgo = function (dateString) {
        var now = new Date();
        var taskDate = new Date(dateString);
        var diffInSeconds = Math.floor((now.getTime() - taskDate.getTime()) / 1000);
        var minutes = Math.floor(diffInSeconds / 60);
        var hours = Math.floor(diffInSeconds / 3600);
        var days = Math.floor(diffInSeconds / 86400);
        if (days > 0) {
            return "".concat(days, " day").concat(days > 1 ? 's' : '');
        }
        if (hours > 0) {
            return "".concat(hours, " hour").concat(hours > 1 ? 's' : '');
        }
        if (minutes > 0) {
            return "".concat(minutes, " minute").concat(minutes > 1 ? 's' : '');
        }
        return 'Just now';
    };
    // Function to calculate the completion percentage based on task status
    var calculateProgress = function (taskStatus) {
        // Check the status of the task and return the corresponding progress
        if (taskStatus === 'In Progress') {
            return 0; // 0% when the task is in progress
        }
        if (taskStatus === 'Needs Review') {
            return 50; // 50% when the task needs review
        }
        if (taskStatus === 'Completed') {
            return 100; // 100% when the task is completed
        }
        return 0; // Default to 0% if the status is not recognized
    };
    var handleStatusChange = function (taskId, newStatus) { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.patch("".concat(API_BASE_URL, "/").concat(taskId), { status: newStatus })];
                case 1:
                    _a.sent();
                    // After updating the status on the server, we could refresh the list or
                    // optimistically update the state (if necessary).
                    window.location.reload();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error updating task status:', error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">

        <header className="header-title">
          <h3 className="fw-bold mb-0 py-3 pb-2">Tasks Management</h3>
        </header>
        <input type="text" value={filterText} onChange={function (e) { return setFilterText(e.target.value); }} placeholder="Tìm kiếm nhiệm vụ..." className="border p-2 rounded-md"/>
        <select value={sortBy} onChange={function (e) { return setSortBy(e.target.value); }} className="border p-2 rounded-md">
          <option value="taskName">Sắp xếp theo tên nhiệm vụ</option>
          <option value="taskStart">Sắp xếp theo ngày bắt đầu</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Task Progress */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg ">Task Progress</h3>

          <div className="mt-2 max-h-[150px] overflow-y-auto">
            {filteredTasks.map(function (task) {
            var _a;
            // Calculate the progress based on the task status
            var progress = calculateProgress(task.status);
            return (<div key={task._id} className="mb-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">{((_a = task.taskCategory) === null || _a === void 0 ? void 0 : _a.taskCategoryName) || 'No Category'}</div>
                    <div className="text-xs text-gray-500">
                      {/* Here you can update the current task count if necessary */}
                      1 / 3
                    </div>
                  </div>

                  {/* Task Progress Bar */}
                  <div className="relative">
                    <div className="bg-gray-200 h-2 mt-1 rounded-full">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "".concat(progress, "%") }} // Set width based on the progress percentage
            ></div>
                    </div>
                    <div className="absolute inset-0 flex justify-between items-center px-2 text-xs text-white">
                      <span>{progress}%</span>
                    </div>
                  </div>
                </div>);
        })}
          </div>
        </div>


        {/* Recent Activity */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg">Recent Activity</h3>
          <ul className="mt-2 space-y-4 max-h-[150px] overflow-y-auto">
            {tasks === null || tasks === void 0 ? void 0 : tasks.filter(function (task) { var _a; return !progressId || ((_a = task.progressId) === null || _a === void 0 ? void 0 : _a._id) === progressId; }).sort(function (a, b) { return new Date(b.taskStart).getTime() - new Date(a.taskStart).getTime(); }).slice(0, 5).map(function (task) {
            // Example activity initials, you can customize based on task data
            var activityInitials = task.taskName.split(" ")[0].substring(0, 2).toUpperCase(); // Getting first 2 letters
            var activityColor = task.taskName.includes("Completed") ? "bg-blue-500" : "bg-green-500"; // Color based on task status
            return (<li key={task._id} className="flex items-center space-x-4">
                    {/* Activity Circle with initials */}
                    <div className={"w-8 h-8 rounded-full ".concat(activityColor, " text-white flex items-center justify-center")}>
                      <span>{activityInitials}</span>
                    </div>
                    {/* Task Name and Time */}
                    <div>
                      <p className="font-medium">{task.taskName}</p>
                      <p className="text-sm text-gray-500">{calculateTimeAgo(task.taskStart)} ago</p>
                    </div>
                  </li>);
        })}
          </ul>
        </div>



        {/* Allocated Task Members */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg mb-4">Allocated Task Members</h3>
          <ul className="space-y-4 max-h-[150px] overflow-y-auto">
            {/* Filter and get unique task recipients */}
            {tasks === null || tasks === void 0 ? void 0 : tasks.filter(function (task) {
            var _a;
            // If progressId exists, filter by progressId; otherwise, include all tasks
            if (progressId) {
                return ((_a = task.progressId) === null || _a === void 0 ? void 0 : _a._id) === progressId && task.taskRecipient;
            }
            else {
                return task.taskRecipient; // If no progressId, show all tasks with a taskRecipient
            }
        }).map(function (task) { return task.taskRecipient; }).filter(function (value, index, self) {
            return index === self.findIndex(function (t) { return t._id === value._id; });
        } // Ensures uniqueness based on _id
        ).map(function (taskRecipient) {
            var _a, _b;
            var employeeProfile = (taskRecipient === null || taskRecipient === void 0 ? void 0 : taskRecipient.employeeProfile) || ''; // Get the employee profile URL
            var designationName = ((_a = taskRecipient === null || taskRecipient === void 0 ? void 0 : taskRecipient.designation_id) === null || _a === void 0 ? void 0 : _a.designationName) || 'No Designation'; // Get designation name or fallback
            return (<li key={taskRecipient._id} className="flex items-center justify-between">
                    {/* Employee Profile Image */}
                    <div className="flex items-center space-x-3">
                      {employeeProfile ? (<img src={employeeProfile} alt={taskRecipient === null || taskRecipient === void 0 ? void 0 : taskRecipient.employeeName} className="w-12 h-12 rounded-full object-cover"/>) : (<div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xl font-bold text-gray-500">{(_b = taskRecipient === null || taskRecipient === void 0 ? void 0 : taskRecipient.employeeName) === null || _b === void 0 ? void 0 : _b[0]}</span>
                        </div>)}
                      <div>
                        <span className="block font-medium">{taskRecipient === null || taskRecipient === void 0 ? void 0 : taskRecipient.employeeName}</span>
                        <span className="text-sm text-gray-500">{designationName}</span>
                      </div>
                    </div>
                  </li>);
        })}
          </ul>
        </div>



      </div>


      {isLoading && <div className="text-center">Đang tải danh sách nhiệm vụ...</div>}
      {error && <div className="text-center text-red-500">Lỗi khi tải danh sách nhiệm vụ!</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[5px]">
        {/* In Progress */}
        <div>
          <h4 className="font-semibold text-lg mb-2">In Progress</h4>
          {paginatedTasks
            .filter(function (task) { return task.status === 'In Progress'; }) // Filter tasks by 'In Progress' status
            .map(function (task) { return (<TaskItem_1.default key={task._id} task={task} onDelete={handleDelete} onStatusChange={handleStatusChange}/>); })}
          {!paginatedTasks.some(function (task) { return task.status === 'In Progress'; }) && (<div className="text-center text-gray-500">No tasks in progress.</div>)}
        </div>

        {/* Needs Review */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Needs Review</h4>
          {paginatedTasks
            .filter(function (task) { return task.status === 'Needs Review'; }) // Filter tasks by 'Needs Review' status
            .map(function (task) { return (<TaskItem_1.default key={task._id} task={task} onDelete={handleDelete} onStatusChange={handleStatusChange}/>); })}
          {!paginatedTasks.some(function (task) { return task.status === 'Needs Review'; }) && (<div className="text-center text-gray-500">No tasks need review.</div>)}
        </div>

        {/* Completed */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Completed</h4>
          {paginatedTasks
            .filter(function (task) { return task.status === 'Completed'; }) // Filter tasks by 'Completed' status
            .map(function (task) { return (<TaskItem_1.default key={task._id} task={task} onDelete={handleDelete} onStatusChange={handleStatusChange}/>); })}
          {!paginatedTasks.some(function (task) { return task.status === 'Completed'; }) && (<div className="text-center text-gray-500">No completed tasks.</div>)}
        </div>
      </div>



      <div className="flex justify-center items-center mt-4">
        <button onClick={function () { return setPage(page - 1); }} disabled={page === 1} className="px-4 py-2 border rounded-md mr-2 disabled:opacity-50">
          Trước
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button onClick={function () { return setPage(page + 1); }} disabled={page === totalPages} className="px-4 py-2 border rounded-md ml-2 disabled:opacity-50">
          Tiếp theo
        </button>
      </div>
      {!isMember && (<button className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition" onClick={handleOpenDialog} aria-label="Thêm nhiệm vụ mới">
          <outline_1.PlusIcon className="w-6 h-6"/>
        </button>)}
      {showCreateTaskDialog && (<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <CreateTaskItem_1.default progressId={progressId !== null && progressId !== void 0 ? progressId : undefined} onClose={handleCloseDialog}/>
        </div>)}
    </div>);
};
exports.default = TaskList;
