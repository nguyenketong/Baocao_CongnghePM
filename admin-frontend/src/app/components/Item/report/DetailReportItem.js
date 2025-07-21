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
var ReportDetailDialog = function (_a) {
    var reportId = _a.reportId, onClose = _a.onClose;
    var _b = (0, react_1.useState)(null), report = _b[0], setReport = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    (0, react_1.useEffect)(function () {
        if (!reportId)
            return;
        var fetchReport = function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, fetch("http://localhost:3000/reports/".concat(reportId))];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        setReport(data);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error loading report:", error_1);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchReport();
    }, [reportId]);
    if (loading)
        return <p className="text-center text-white">Loading...</p>;
    if (!report)
        return <p className="text-center text-white">No reports found</p>;
    return (<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#F9FAFB] p-6 rounded-lg w-full max-w-lg shadow-lg border border-[#E2E8F0]">
        {/* Report Name */}
        <h2 className="flex justify-center text-2xl font-semibold text-[#2D336B] mb-4">{report.reportName}</h2>

        {/* Report Information */}
        <div className="space-y-4 border rounded-lg p-4 flex flex-col h-full bg-white shadow-md">

        <div className="grid grid-cols-2 gap-4 p-2">
          {/* Submission Time */}
          <div className="flex flex-col">
            <strong className="mr-2 mb-2 text-[#4A4A4A]">Submission time:</strong>
            <div className="bg-[#F3F4F6] rounded px-4 py-2 text-sm">{new Date(report.submission_time).toLocaleString()}</div>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <strong className="mr-2 mb-2 text-[#4A4A4A]">Status:</strong>
            <div className="bg-[#F3F4F6] rounded px-4 py-2 text-sm">{report.status}</div>
          </div>
        </div>
          {/* Note */}
          {report.notereport && (<div className="p-2 mt-4 mb-4 flex items-center justify-between">
              <strong className="mr-2 text-[#4A4A4A]">Note:</strong>
              <div className="bg-[#F3F4F6] rounded px-4 py-2 text-sm inline-flex">{report.notereport}</div>
            </div>)}

          {/* Report File */}
          {report.filerepport && (<div className="flex items-center justify-between">
              <strong className="mr-2 text-[#4A4A4A]">Report file:</strong>
              <div className="bg-[#F3F4F6] rounded px-4 py-2 text-sm">
                <a href={report.filerepport} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  View Report
                </a>
              </div>
            </div>)}

          

        <div className="grid grid-cols-2 gap-4 p-2">
          {/* Employee Name */}
          {report.id_employee && (<div className="flex flex-col">
              <strong className="mr-2 mb-2 text-[#4A4A4A]">Employee:</strong>
              <div className="bg-[#F3F4F6] rounded px-4 py-2 text-sm inline-flex">{report.id_employee.employeeName}</div>
            </div>)}

          {/* Task Name */}
          {report.id_task && (<div className="flex flex-col">
              <strong className="mr-2 mb-2 text-[#4A4A4A]">Task:</strong>
              <div className="bg-[#F3F4F6] rounded px-4 py-2 text-sm inline-flex">{report.id_task.taskName}</div>
            </div>)}

          {/* Progress Name */}
          {/*{report.id_progress && (
          <div className="flex flex-col">
            <strong className="mr-2 mb-2 text-[#4A4A4A]">Progress:</strong>
            <div className="bg-[#F3F4F6] rounded px-4 py-2 text-sm inline-flex">{report.id_progress.progressName}</div>
          </div>
        )}*/}

        </div>
        </div>
        {/* Close Button */}
        <div className="flex justify-center mt-4">
        <button onClick={onClose} className="mt-6 w-70 px-4 py-2 bg-[#2D336B] text-white rounded hover:bg-[#4A5568] transition-colors duration-200">
          Close
        </button>
        </div>
      </div>
    </div>);
};
exports.default = ReportDetailDialog;
