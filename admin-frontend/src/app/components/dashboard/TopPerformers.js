"use client";
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
var axios_1 = require("axios");
var TopPerformers = function () {
    var _a = (0, react_1.useState)([]), topPerformers = _a[0], setTopPerformers = _a[1];
    var _b = (0, react_1.useState)(0), newTasks = _b[0], setNewTasks = _b[1];
    var _c = (0, react_1.useState)(0), completedTasks = _c[0], setCompletedTasks = _c[1];
    var _d = (0, react_1.useState)(0), totalEmployees = _d[0], setTotalEmployees = _d[1];
    (0, react_1.useEffect)(function () {
        // Gọi API để lấy danh sách nhân viên và công việc
        var fetchTopPerformers = function () { return __awaiter(void 0, void 0, void 0, function () {
            var employeesResponse, taskResponse, employees, tasks_1, employeesWithPerformance, sortedEmployees, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get("http://localhost:3000/employees")];
                    case 1:
                        employeesResponse = _a.sent();
                        return [4 /*yield*/, axios_1.default.get("http://localhost:3000/tasks")];
                    case 2:
                        taskResponse = _a.sent();
                        employees = employeesResponse.data;
                        tasks_1 = taskResponse.data;
                        // Log all tasks for debugging
                        console.log("All Tasks:", tasks_1);
                        employeesWithPerformance = employees.map(function (employee) {
                            // Log the employee's _id and task recipient for debugging
                            console.log("Employee _id:", employee._id);
                            // Filter tasks assigned to the employee (where taskRecipient._id matches employee._id)
                            var assignedTasks = tasks_1.filter(function (task) {
                                var taskRecipient = task.taskRecipient ? String(task.taskRecipient._id).trim() : null; // Extract _id from taskRecipient
                                var employeeId = String(employee._id).trim();
                                console.log("Comparing taskRecipient: ".concat(taskRecipient, " with employeeId: ").concat(employeeId));
                                return taskRecipient === employeeId; // Compare the _id values
                            });
                            // Log assigned tasks for debugging
                            console.log("Assigned Tasks for Employee:", assignedTasks);
                            // Calculate completed tasks for this employee
                            var completed = assignedTasks.filter(function (task) { return task.status === "Completed"; }).length;
                            console.log("Completed Tasks:", completed);
                            // Calculate performance as percentage of completed tasks
                            var performance = assignedTasks.length > 0 ? (completed / assignedTasks.length) * 100 : 0;
                            console.log("Performance:", performance);
                            return __assign(__assign({}, employee), { performance: performance }); // Attach performance to the employee object
                        });
                        sortedEmployees = employeesWithPerformance
                            .sort(function (a, b) { return b.performance - a.performance; }) // Sort by performance
                            .slice(0, 6);
                        // Set the top performers in the state
                        setTopPerformers(sortedEmployees);
                        setTotalEmployees(employees.length);
                        // Count new and completed tasks
                        setNewTasks(tasks_1.filter(function (task) { return task.status === "In Progress"; }).length);
                        setCompletedTasks(tasks_1.filter(function (task) { return task.status === "Completed"; }).length);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Lỗi khi lấy dữ liệu:", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchTopPerformers();
    }, []);
    return (<div className="bg-pink-200 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Top Performers</h2>
      <p className="text-sm text-gray-600 mb-4">
        You have <strong>{totalEmployees} employees</strong> in your company.
      </p>

      {/* Thống kê công việc */}
      <div className="flex space-x-8 mb-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{newTasks}</p>
          <p className="text-sm text-gray-500">New Task</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{completedTasks}</p>
          <p className="text-sm text-gray-500">Task Completed</p>
        </div>
      </div>

      {/* Danh sách nhân viên hiệu suất cao */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {topPerformers.map(function (person, index) {
            var _a;
            return (<div key={index} className="bg-white p-4 rounded-lg shadow-lg text-center">
            <img src={person.employeeProfile || "/default-avatar.png"} // Nếu không có avatar thì dùng ảnh mặc định
             alt={person.employeeName} className="w-12 h-12 mx-auto mb-2 rounded-full"/>
            <h3 className="text-sm font-semibold text-gray-800">{person.employeeName}</h3>
            <p className="text-xs text-gray-500">@{(_a = person.account) === null || _a === void 0 ? void 0 : _a.email}</p>
            <p className="text-lg font-bold text-indigo-600 mt-2">
              {person.performance ? person.performance.toFixed(2) : '0.00'}%
            </p>
          </div>);
        })}
      </div>
    </div>);
};
exports.default = TopPerformers;
