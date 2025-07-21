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
var outline_1 = require("@heroicons/react/24/outline");
var react_toastify_1 = require("react-toastify");
var swr_1 = require("swr");
var DetailReportItem_1 = require("./DetailReportItem");
var EditReportItem_1 = require("./EditReportItem"); // Import modal chỉnh sửa
var ReportItem = function (_a) {
    var report = _a.report, onDelete = _a.onDelete;
    var _b = (0, react_1.useState)(false), isDetailOpen = _b[0], setIsDetailOpen = _b[1];
    var _c = (0, react_1.useState)(false), isEditModalOpen = _c[0], setIsEditModalOpen = _c[1];
    var _d = (0, react_1.useState)(false), isDeleting = _d[0], setIsDeleting = _d[1];
    var _e = (0, react_1.useState)(false), isMenuOpen = _e[0], setIsMenuOpen = _e[1]; // Toggle menu visibility
    var handleDelete = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.confirm("Are you sure you want to delete this report?")) {
                        return [2 /*return*/];
                    }
                    setIsDeleting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, onDelete(report._id)];
                case 2:
                    _a.sent();
                    react_toastify_1.toast.success("The report has been successfully deleted");
                    (0, swr_1.mutate)("http://localhost:3000/reports");
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    react_toastify_1.toast.error("Error while deleting report");
                    console.error("Error deleting report:", error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setIsDeleting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (<>
      <div className="bg-white rounded-lg shadow-lg  relative
                  p-6 hover:shadow-xl 
                  hover:scale-105">
        {/* Menu Button (Three Dots) */}
        <div className="flex">
          <button onClick={function () { return setIsMenuOpen(!isMenuOpen); }} className="ml-auto p-1 bg-gray-500 text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400">
            <outline_1.EllipsisHorizontalIcon className="h-6 w-6"/>
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (<div className="absolute right-0 mt-4 w-40 bg-white rounded-lg shadow-lg z-50">
              <ul className="space-y-2 text-sm text-gray-700">
                {/* View Details Button */}
                <li>
                  <button onClick={function () {
                setIsDetailOpen(true);
                setIsMenuOpen(false); // Close menu after selecting an action
            }} className="w-full text-left p-2 hover:bg-gray-100 rounded-md" title="Look details">
                    <div className="flex items-center space-x-2">
                      <outline_1.EyeIcon className="h-5 w-5"/>
                      <span>View Details</span>
                    </div>
                  </button>
                </li>

                {/* Edit Button */}
                <li>
                  <button onClick={function () {
                setIsEditModalOpen(true);
                setIsMenuOpen(false); // Close menu after selecting an action
            }} className="w-full text-left p-2 hover:bg-gray-100 rounded-md" title="Edit">
                    <div className="flex items-center space-x-2">
                      <outline_1.PencilSquareIcon className="h-5 w-5"/>
                      <span>Edit</span>
                    </div>
                  </button>
                </li>

                {/* Delete Button */}
                <li>
                  <button onClick={function () {
                handleDelete();
                setIsMenuOpen(false); // Close menu after selecting an action
            }} className="w-full text-left p-2 hover:bg-gray-100 rounded-md text-red-500" disabled={isDeleting} title={isDeleting ? "Deleting..." : "Delete"}>
                    <div className="flex items-center space-x-2">
                      <outline_1.TrashIcon className="h-5 w-5"/>
                      <span>Delete</span>
                    </div>
                  </button>
                </li>
              </ul>
            </div>)}
        </div>

        {/* Display Basic Information */}
        <div className="flex flex-col p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-[#2D336B]">{report.reportName}</h2>

          <hr className="border-gray-300 my-4"/>

          <div className="bg-gray-100 text-lg p-3 mb-4 text-[#2D336B] flex text-ellipsis line-clamp-2">
            {report.notereport}
          </div>

          <hr className="border-gray-300 my-4"/>

          <div className="mt-auto pt-2 flex justify-between text-sm text-gray-600">
            <p>📅 {new Date(report.submission_time).toLocaleDateString()}</p>
            <p className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white rounded-full bg-blue-500">
              {report.status}
            </p>
          </div>
        </div>
        


      </div>
      {/* Detail Dialog */}
      {isDetailOpen && (<div className="modal-overlay fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <DetailReportItem_1.default reportId={report._id} onClose={function () { return setIsDetailOpen(false); }}/>
          </div>
        </div>)}

      {/* Edit Modal */}
      {isEditModalOpen && (<div className="modal-overlay flex items-center justify-center fixed inset-0 bg-gray-900 bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <EditReportItem_1.default reportId={report._id} onClose={function () { return setIsEditModalOpen(false); }}/>
          </div>
        </div>)}
    </>);
};
exports.default = ReportItem;
