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
var ProjectTimeline_1 = require("@/app/components/dashboard/ProjectTimeline");
var IncomeAnalytics_1 = require("@/app/components/dashboard/IncomeAnalytics");
var axios_1 = require("axios");
var ProjectInformation_1 = require("@/app/components/dashboard/ProjectInformation");
var DashBoardList = function () {
    var _a = (0, react_1.useState)({
        totalTasks: 0,
        completedTasks: 0,
        progressTasks: 0,
    }), taskMetrics = _a[0], setTaskMetrics = _a[1];
    var _b = (0, react_1.useState)({
        totalProjects: 0,
        completedProjects: 0,
        progressProjects: 0,
    }), projectMetrics = _b[0], setProjectMetrics = _b[1];
    (0, react_1.useEffect)(function () {
        var fetchMetrics = function () { return __awaiter(void 0, void 0, void 0, function () {
            var projectResponse, progressResponse, reportResponse, projects, progress, reports, totalProjects, completedProjects, progressProjects, taskResponse, tasks, totalTasks, completedTasks, progressTasks, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, axios_1.default.get("http://localhost:3000/projects")];
                    case 1:
                        projectResponse = _a.sent();
                        return [4 /*yield*/, axios_1.default.get("http://localhost:3000/progress")];
                    case 2:
                        progressResponse = _a.sent();
                        return [4 /*yield*/, axios_1.default.get("http://localhost:3000/reports")];
                    case 3:
                        reportResponse = _a.sent();
                        projects = projectResponse.data;
                        progress = progressResponse.data;
                        reports = reportResponse.data;
                        totalProjects = projects.length;
                        completedProjects = reports.length;
                        progressProjects = progress.length;
                        return [4 /*yield*/, axios_1.default.get("http://localhost:3000/tasks")];
                    case 4:
                        taskResponse = _a.sent();
                        tasks = taskResponse.data;
                        totalTasks = tasks.length;
                        completedTasks = tasks.filter(function (task) { return task.status === "Completed"; }).length;
                        progressTasks = tasks.filter(function (task) { return task.status === "In Progress"; }).length;
                        // Cập nhật state
                        setProjectMetrics({ totalProjects: totalProjects, completedProjects: completedProjects, progressProjects: progressProjects });
                        setTaskMetrics({ totalTasks: totalTasks, completedTasks: completedTasks, progressTasks: progressTasks });
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        console.error("Error fetching metrics", err_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        fetchMetrics();
    }, []);
    return (<div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md p-5">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </header>

      {/* Task Metrics Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
        <div className="bg-yellow-200 p-5 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800">Total Tasks</h3>
          <p className="text-3xl font-bold text-gray-700">{taskMetrics.totalTasks}</p>
        </div>
        <div className="bg-green-200 p-5 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800">Completed Tasks</h3>
          <p className="text-3xl font-bold text-gray-700">{taskMetrics.completedTasks}</p>
        </div>
        <div className="bg-blue-200 p-5 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800">In Progress Tasks</h3>
          <p className="text-3xl font-bold text-gray-700">{taskMetrics.progressTasks}</p>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="flex flex-col md:flex-row gap-5 p-5">
        <div className="flex-2 bg-white p-5 rounded-lg shadow-md">
          <IncomeAnalytics_1.default />
        </div>
        <div className="flex-1 bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Timeline</h2>
          <ProjectTimeline_1.default />
        </div>
      </section>

      {/* Project Metrics Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
        <div className="bg-yellow-200 p-5 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800">Total Projects</h3>
          <p className="text-3xl font-bold text-gray-700">{projectMetrics.totalProjects}</p>
        </div>

        <div className="bg-blue-200 p-5 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800">In Progress Projects</h3>
          <p className="text-3xl font-bold text-gray-700">{projectMetrics.progressProjects}</p>
        </div>
        <div className="bg-green-200 p-5 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800">Finished Projects</h3>
          <p className="text-3xl font-bold text-gray-700">{projectMetrics.completedProjects}</p>
        </div>
      </section>

      {/* Project Table Section */}
      <section className="p-5">
        <ProjectInformation_1.default />
      </section>
    </div>);
};
exports.default = DashBoardList;
