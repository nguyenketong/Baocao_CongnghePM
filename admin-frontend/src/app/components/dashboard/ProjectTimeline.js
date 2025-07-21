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
var react_chartjs_2_1 = require("react-chartjs-2");
var chart_js_1 = require("chart.js");
var axios_1 = require("axios");
// Register necessary chart elements
chart_js_1.Chart.register(chart_js_1.CategoryScale, chart_js_1.LinearScale, chart_js_1.PointElement, chart_js_1.LineElement, chart_js_1.Title, chart_js_1.Tooltip, chart_js_1.Legend);
var ProjectTimelineChart = function () {
    var _a = (0, react_1.useState)(null), chartData = _a[0], setChartData = _a[1]; // State to hold the chart data
    var _b = (0, react_1.useState)(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    (0, react_1.useEffect)(function () {
        var fetchProjectData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var projectResponse, projects, progressPromises, progressResponses_1, filteredProgressData_1, labels, datasets, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, axios_1.default.get("http://localhost:3000/projects")];
                    case 1:
                        projectResponse = _a.sent();
                        projects = projectResponse.data;
                        progressPromises = projects.map(function (project) {
                            return axios_1.default.get("http://localhost:3000/progress?projectId=".concat(project._id));
                        });
                        return [4 /*yield*/, Promise.all(progressPromises)];
                    case 2:
                        progressResponses_1 = _a.sent();
                        filteredProgressData_1 = projects.map(function (project, index) {
                            var projectProgress = progressResponses_1[index].data;
                            // Debugging: Log each progress status to check the values
                            console.log("Project Progress Data for Project:", project._id, projectProgress);
                            // Filter progress that is associated with the current project and is marked as "Completed"
                            var completedProgress = projectProgress.filter(function (progress) { return progress.projectid._id === project._id && progress.status.trim() === "Completed"; });
                            // Debugging: Check the completed progress for this project
                            console.log("Completed Progresses for Project:", project._id, completedProgress);
                            return completedProgress.length; // Return the number of completed progresses for each project
                        });
                        labels = [
                            "Mar '20", "02 Mar", "03 Mar", "04 Mar", "05 Mar", "06 Mar",
                            "07 Mar", "08 Mar", "09 Mar", "10 Mar", "11 Mar", "12 Mar",
                            "13 Mar", "14 Mar"
                        ];
                        datasets = projects.map(function (project, index) {
                            return {
                                label: project.projectName,
                                data: [filteredProgressData_1[index]], // Just showing the number of completed progresses for each project
                                backgroundColor: "rgba(54, 162, 235, 0.2)", // Color for the project
                                borderColor: "rgba(54, 162, 235, 1)",
                                borderWidth: 1,
                            };
                        });
                        // Set the chart data
                        setChartData({
                            labels: labels,
                            datasets: datasets,
                        });
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        setError("Lỗi khi lấy dữ liệu dự án và tiến độ.");
                        console.error("Error fetching project or progress data", err_1);
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchProjectData();
    }, []);
    var options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Project Timeline",
                font: {
                    size: 16,
                },
            },
            legend: {
                position: "top", // Valid position for legend
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Date",
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Completed Progresses",
                },
            },
        },
    };
    if (isLoading) {
        return <div>Đang tải thông tin...</div>;
    }
    if (error) {
        return <div>Lỗi khi lấy dữ liệu dự án và tiến độ.</div>;
    }
    return (<div className="bg-white p-5 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Project Timeline</h2>
      {chartData ? <react_chartjs_2_1.Line data={chartData} options={options}/> : <p>Không có dữ liệu để hiển thị.</p>}
    </div>);
};
exports.default = ProjectTimelineChart;
