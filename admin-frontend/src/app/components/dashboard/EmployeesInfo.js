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
var axios_1 = require("axios");
var chart_js_1 = require("chart.js");
// Register necessary chart elements and Filler plugin
chart_js_1.Chart.register(chart_js_1.CategoryScale, chart_js_1.LinearScale, chart_js_1.PointElement, chart_js_1.LineElement, chart_js_1.Title, chart_js_1.Tooltip, chart_js_1.Legend, chart_js_1.Filler // Register the Filler plugin
);
var EmployeeInfoChart = function () {
    var _a = (0, react_1.useState)([]), employeeData = _a[0], setEmployeeData = _a[1];
    // Fetch data from API
    (0, react_1.useEffect)(function () {
        var fetchEmployeeData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, employees_1, dates, employeeCount, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("http://localhost:3000/employees")];
                    case 1:
                        response = _a.sent();
                        employees_1 = response.data;
                        dates = ["0 Jan", "31 Jan", "22 Feb", "15 Mar", "05 Apr", "26 Apr", "17 May", "08 Jun", "29 Jun", "20 Jul"];
                        employeeCount = dates.map(function (date, index) {
                            // Filter and count employees based on their joining or leaving date (adjust this based on your data structure)
                            var count = employees_1.filter(function (employee) {
                                // Assuming employee has `joinDate` field (format as YYYY-MM-DD)
                                var joinDate = new Date(employee.joiningDate);
                                return joinDate.getMonth() === index; // Modify the condition based on your data
                            }).length;
                            return count;
                        });
                        setEmployeeData(employeeCount);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.error("Error fetching employee data:", err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchEmployeeData();
    }, []);
    // Data for the chart (this will be dynamic data)
    var data = {
        labels: [
            "0 Jan", "31 Jan", "22 Feb", "15 Mar", "05 Apr", "26 Apr", "17 May", "08 Jun", "29 Jun", "20 Jul"
        ],
        datasets: [
            {
                label: "Employees Info",
                data: employeeData, // Using the dynamic employee count
                fill: true, // Enable the fill option
                backgroundColor: "rgba(255, 159, 64, 0.2)", // Gradient background
                borderColor: "rgba(255, 159, 64, 1)", // Line color
                borderWidth: 2,
                pointBackgroundColor: "rgba(255, 159, 64, 1)", // Point color
                pointRadius: 5, // Size of the point
                tension: 0.4, // Makes the line curve
                pointHitRadius: 10,
            },
        ],
    };
    // Chart options
    var options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Employees Info",
                font: {
                    size: 18,
                },
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
                    text: "Number of Employees",
                },
            },
        },
    };
    return (<div className="bg-white p-5 rounded-lg shadow-md">
      {/* Heading */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Employees Info</h2>

      {/* Chart */}
      <div className="h-72 sm:h-96"> {/* Set a fixed height for the chart */}
        <react_chartjs_2_1.Line data={data} options={options}/>
      </div>

      {/* Additional Information (Optional) */}
      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
          <p>New Employees</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <p>Returning Employees</p>
        </div>
      </div>
    </div>);
};
exports.default = EmployeeInfoChart;
