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
var react_toastify_1 = require("react-toastify");
var teamService_1 = require("../../../services/teamService");
var observer_1 = require("@/app/utils/observer");
var TeamFacade_1 = require("@/app/utils/TeamFacade");
// SearchIcon component
var SearchIcon = function () { return (<svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
  </svg>); };
var ITEMS_PER_PAGE = 5;
var AddMember = function (_a) {
    var team = _a.team, onClose = _a.onClose;
    var _b = (0, react_1.useState)(false), isSubmitting = _b[0], setIsSubmitting = _b[1];
    var _c = (0, react_1.useState)([]), employees = _c[0], setEmployees = _c[1];
    var _d = (0, react_1.useState)(true), loading = _d[0], setLoading = _d[1];
    var _e = (0, react_1.useState)(null), error = _e[0], setError = _e[1];
    // Search and pagination states
    var _f = (0, react_1.useState)(''), searchQuery = _f[0], setSearchQuery = _f[1];
    var _g = (0, react_1.useState)(1), currentPage = _g[0], setCurrentPage = _g[1];
    var _h = (0, react_1.useState)(null), selectedEmployee = _h[0], setSelectedEmployee = _h[1];
    //Initialize TeamFacade
    var teamFacade = (0, react_1.useMemo)(function () { return new TeamFacade_1.default(team._id); }, [team._id]);
    // Fetch available employees
    (0, react_1.useEffect)(function () {
        var fetchAvailableEmployees = function () { return __awaiter(void 0, void 0, void 0, function () {
            var availableEmployees, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        setError(null);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, teamFacade.fetchAvailableEmployees()];
                    case 2:
                        availableEmployees = _a.sent();
                        setEmployees(availableEmployees);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Lỗi khi tải danh sách nhân viên:', error_1);
                        setError(error_1 instanceof Error ? error_1.message : 'Không thể tải danh sách nhân viên');
                        react_toastify_1.toast.error('Không thể tải danh sách nhân viên');
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchAvailableEmployees();
    }, [teamFacade]);
    // Filter and paginate employees
    var filteredEmployees = (0, react_1.useMemo)(function () {
        return employees.filter(function (emp) {
            var _a;
            return emp.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ((_a = emp.phone) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchQuery.toLowerCase()));
        });
    }, [employees, searchQuery]);
    var totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
    var paginatedEmployees = (0, react_1.useMemo)(function () {
        var start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredEmployees.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredEmployees, currentPage]);
    // Handle employee selection
    var handleEmployeeSelect = function (employee) {
        setSelectedEmployee(employee === selectedEmployee ? null : employee);
    };
    // Handle form submission
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var result, updatedTeamRes, updatedTeam, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!selectedEmployee) {
                        react_toastify_1.toast.error('Vui lòng chọn nhân viên');
                        return [2 /*return*/];
                    }
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, 9, 10]);
                    return [4 /*yield*/, (0, teamService_1.addTeamMember)(team._id, selectedEmployee._id)];
                case 2:
                    result = _a.sent();
                    if (!result.success) return [3 /*break*/, 6];
                    react_toastify_1.toast.success('Thêm thành viên vào team thành công');
                    return [4 /*yield*/, fetch("http://localhost:3000/teams/".concat(team._id))];
                case 3:
                    updatedTeamRes = _a.sent();
                    if (!updatedTeamRes.ok) return [3 /*break*/, 5];
                    return [4 /*yield*/, updatedTeamRes.json()];
                case 4:
                    updatedTeam = _a.sent();
                    console.log("[AddMember] G\u1EEDi th\u00F4ng b\u00E1o c\u1EADp nh\u1EADt team sau khi th\u00EAm th\u00E0nh vi\u00EAn:", updatedTeam);
                    observer_1.teamObserver.notify(updatedTeam);
                    _a.label = 5;
                case 5:
                    onClose();
                    return [3 /*break*/, 7];
                case 6: throw new Error(result.message || 'Không thể thêm thành viên vào team');
                case 7: return [3 /*break*/, 10];
                case 8:
                    error_2 = _a.sent();
                    console.error('Lỗi khi thêm thành viên:', error_2);
                    react_toastify_1.toast.error(error_2 instanceof Error ? error_2.message : 'Không thể thêm thành viên vào team. Vui lòng thử lại sau.');
                    return [3 /*break*/, 10];
                case 9:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    }); };
    if (loading) {
        return (<div className="w-full text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4">Đang tải danh sách nhân viên...</p>
      </div>);
    }
    if (error) {
        return (<div className="w-full text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Đóng
        </button>
      </div>);
    }
    return (<div className="w-full max-h-[80vh] overflow-y-auto">
      <div className="sticky top-0 bg-white z-10 pb-4">
        <h2 className="text-2xl font-bold mb-4">Thêm Thành Viên</h2>
        
        {/* Search box */}
        <div className="relative mb-4">
          <div className="absolute left-3 top-3">
            <SearchIcon />
          </div>
          <input type="text" placeholder="Tìm kiếm theo tên hoặc số điện thoại..." value={searchQuery} onChange={function (e) {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
        }} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
        </div>
      </div>

      {filteredEmployees.length === 0 ? (<div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            {searchQuery
                ? 'Không tìm thấy nhân viên phù hợp'
                : 'Không còn nhân viên nào có thể thêm vào team này'}
          </p>
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Đóng
          </button>
        </div>) : (<form onSubmit={handleSubmit}>
          <div className="space-y-2 mb-4">
            {paginatedEmployees.map(function (employee) {
                var _a;
                return (<div key={employee._id} onClick={function () { return handleEmployeeSelect(employee); }} className={"p-4 rounded-lg border cursor-pointer transition-colors duration-200 ".concat((selectedEmployee === null || selectedEmployee === void 0 ? void 0 : selectedEmployee._id) === employee._id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300')}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img src={employee.employeeProfile || '/default-avatar.png'} alt={employee.employeeName} className="h-12 w-12 rounded-full object-cover"/>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{employee.employeeName}</h3>
                    <p className="text-sm text-gray-500">
                      {employee.phone || 'Chưa cập nhật SĐT'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {((_a = employee.team_id) === null || _a === void 0 ? void 0 : _a.length)
                        ? "\u0110ang tham gia ".concat(employee.team_id.length, " team kh\u00E1c")
                        : 'Chưa tham gia team nào'}
                    </p>
                  </div>
                </div>
              </div>);
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (<div className="flex justify-center space-x-2 mb-4">
              <button type="button" onClick={function () { return setCurrentPage(function (prev) { return Math.max(prev - 1, 1); }); }} disabled={currentPage === 1} className="px-3 py-1 rounded border disabled:opacity-50">
                Trước
              </button>
              <span className="px-3 py-1">
                Trang {currentPage} / {totalPages}
              </span>
              <button type="button" onClick={function () { return setCurrentPage(function (prev) { return Math.min(prev + 1, totalPages); }); }} disabled={currentPage === totalPages} className="px-3 py-1 rounded border disabled:opacity-50">
                Sau
              </button>
            </div>)}

          <div className="sticky bottom-0 bg-white pt-4 pb-4 border-t">
            <div className="flex gap-3">
              <button type="submit" disabled={isSubmitting || !selectedEmployee} className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Đang thêm...' : 'Thêm thành viên'}
              </button>
              <button type="button" onClick={onClose} className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200">
                Hủy
              </button>
            </div>
            <div className="text-xs text-gray-500 text-right mt-2">
            </div>
          </div>
        </form>)}
    </div>);
};
exports.default = AddMember;
