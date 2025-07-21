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
var axios_1 = require("axios");
var chart_js_1 = require("chart.js");
// Đăng ký các thành phần của Chart.js
chart_js_1.Chart.register(chart_js_1.Title, chart_js_1.Tooltip, chart_js_1.Legend, chart_js_1.ArcElement, chart_js_1.CategoryScale, chart_js_1.LinearScale);
var IncomeAnalytics = function () {
    // State lưu danh sách project và dữ liệu biểu đồ
    var _a = (0, react_1.useState)({
        labels: [],
        datasets: [{ data: [], backgroundColor: [] }],
    }), chartData = _a[0], setChartData = _a[1];
    var _b = (0, react_1.useState)(0), totalBudget = _b[0], setTotalBudget = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    (0, react_1.useEffect)(function () {
        var fetchProjects = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, projects, labels, data, total, backgroundColors, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, axios_1.default.get("http://localhost:3000/projects")];
                    case 1:
                        response = _a.sent();
                        projects = response.data;
                        labels = projects.map(function (project) { return project.projectName; });
                        data = projects.map(function (project) { return project.budget; });
                        total = data.reduce(function (acc, val) { return acc + val; }, 0);
                        backgroundColors = [
                            "#4CAF50", "#FF9800", "#E91E63", "#3F51B5", "#00BCD4", "#8BC34A",
                            "#FFC107", "#9C27B0", "#795548", "#FF5722"
                        ].slice(0, projects.length);
                        // Cập nhật state
                        setChartData({ labels: labels, datasets: [{ data: data, backgroundColor: backgroundColors }] });
                        setTotalBudget(total);
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error fetching projects:", error_1);
                        return [3 /*break*/, 4];
                    case 3:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchProjects();
    }, []);
    return (<div className="bg-white p-6 rounded-lg shadow-md m-5 flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">📊 Budget Analytics</h2>

      {/* Tổng ngân sách */}
      <div className="mb-4 p-4 bg-blue-100 text-blue-800 rounded-lg shadow-md">
        <p className="text-sm">Tổng ngân sách:</p>
        <h3 className="text-xl font-bold">${totalBudget.toLocaleString()}</h3>
      </div>

      {/* Biểu đồ Doughnut */}
      <div className="w-72 h-72">
        {loading ? (<p className="text-gray-500 text-center animate-pulse">Đang tải dữ liệu...</p>) : (<react_chartjs_2_1.Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: false }}/>)}
      </div>

      {/* Ghi chú */}
      <div className="mt-4 text-sm text-gray-500 text-center">
        Di chuột vào biểu đồ để xem chi tiết.
      </div>
    </div>);
};
exports.default = IncomeAnalytics;
