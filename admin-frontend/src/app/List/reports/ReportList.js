'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var axios_1 = require("axios");
var ReportItem_1 = require("../../components/Item/report/ReportItem");
var swr_1 = require("swr");
var outline_1 = require("@heroicons/react/24/outline");
var CreateReportItem_1 = require("../../components/Item/report/CreateReportItem");
var navigation_1 = require("next/navigation");
require("../../styles/ReportList.css");
var API_BASE_URL = 'http://localhost:3000/reports';
var ReportList = function () {
    var _a = (0, react_1.useState)(false), showCreateReportDialog = _a[0], setShowCreateReportDialog = _a[1];
    var _b = (0, react_1.useState)(1), page = _b[0], setPage = _b[1];
    var pageSize = (0, react_1.useState)(6)[0];
    var _c = (0, react_1.useState)(''), filterText = _c[0], setFilterText = _c[1];
    var _d = (0, react_1.useState)('reportName'), sortBy = _d[0], setSortBy = _d[1];
    var _e = (0, react_1.useState)(null), employeeId = _e[0], setEmployeeId = _e[1];
    var searchParams = (0, navigation_1.useSearchParams)();
    var taskId = searchParams.get('taskId'); // Lấy taskId từ URL
    console.log('taskId from URL:', taskId); // Kiểm tra giá trị taskId từ URL
    (0, react_1.useEffect)(function () {
        // Lấy employeeId từ localStorage
        var storedEmployeeId = localStorage.getItem('employeeId');
        if (storedEmployeeId) {
            setEmployeeId(storedEmployeeId);
        }
    }, []);
    var fetcher = function (url) { return axios_1.default.get(url).then(function (res) { return res.data; }); };
    var _f = (0, swr_1.default)(API_BASE_URL, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    }), reports = _f.data, error = _f.error, isLoading = _f.isLoading;
    var filteredReports = (0, react_1.useMemo)(function () {
        if (!reports)
            return [];
        var result = reports;
        if (taskId) {
            console.log("Filtering by taskId:", taskId); // Debugging
            result = result.filter(function (report) {
                var reportTaskId = report.id_task ? String(report.id_task._id || report.id_task) : '';
                console.log("Comparing:", reportTaskId, "==", String(taskId));
                return reportTaskId === String(taskId);
            });
        }
        else if (employeeId && !taskId) {
            // Khi có employeeId nhưng không có taskId
            console.log("Filtering by employeeId only:", employeeId); // Debugging
            result = result.filter(function (report) {
                var reportEmployeeId = report.id_employee ? String(report.id_employee._id || report.id_employee) : '';
                console.log("Comparing:", reportEmployeeId, "==", String(employeeId));
                return reportEmployeeId === String(employeeId);
            });
        }
        // Lọc theo tên báo cáo
        result = result.filter(function (report) {
            return report.reportName.toLowerCase().includes(filterText.toLowerCase());
        });
        // Sắp xếp theo tiêu chí được chọn
        return result.sort(function (a, b) {
            if (sortBy === 'reportName') {
                return a.reportName.localeCompare(b.reportName);
            }
            else if (sortBy === 'submission_time') {
                return new Date(a.submission_time).getTime() - new Date(b.submission_time).getTime();
            }
            return 0;
        });
    }, [reports, filterText, sortBy, taskId, employeeId]);
    console.log("Final filteredReports:", filteredReports);
    var paginatedReports = (0, react_1.useMemo)(function () {
        var startIndex = (page - 1) * pageSize;
        var endIndex = page * pageSize;
        return filteredReports.slice(startIndex, endIndex);
    }, [filteredReports, page, pageSize]);
    var handleDelete = function (id) {
        axios_1.default.delete("".concat(API_BASE_URL, "/").concat(id)).then(function () {
            window.location.reload();
        });
    };
    var handleEdit = function (id) {
        console.log("Editing report: ".concat(id));
    };
    var totalPages = Math.ceil(filteredReports.length / pageSize);
    var handleOpenDialog = function () { return setShowCreateReportDialog(true); };
    var handleCloseDialog = function () { return setShowCreateReportDialog(false); };
    return (<div className="flex flex-col justify-end mr-4">
      <div className="flex justify-between items-center 
                      w-full h-full p-8 bg-[#f0f0f0] rounded-xl mb-4 border-b-2 pb-0">
        <h1 className="page-title text-4xl font-bold mb-6">Report List</h1>

        <div className="search-container">
          <outline_1.MagnifyingGlassIcon className="search-icon"/>
          <input type="text" value={filterText} onChange={function (e) { return setFilterText(e.target.value); }} placeholder="Search for reports..." className="search-input"/>
        </div>
      </div>
      <div className="w-full h-full p-6 bg-[#f0f0f0] rounded-xl mb-4 border-b-2 pb-0">
        <div className="flex items-center justify-between mb-4">
          <select className="p-2 border rounded-lg" value={sortBy} onChange={function (e) { return setSortBy(e.target.value); }}>
            <option value="reportName">Sorted by report name</option>
            <option value="submission_time">Sorted by submission time</option>
          </select>
          <div className="pagination-controls text-base flex items-center space-x-2 ml-auto">
            <button className="text-blue-500 hover:underline" onClick={function () { return setPage(page - 1); }} disabled={page === 1}>
              <outline_1.ChevronLeftIcon className="w-6 h-6"/>
            </button>
            <span>
              {page} / {totalPages}
            </span>
            <button className="text-blue-500 hover:underline" onClick={function () { return setPage(page + 1); }} disabled={page === totalPages}>
              <outline_1.ChevronRightIcon className="w-6 h-6"/>
            </button>
          </div>
        </div>


        {isLoading && <div className="loading-state">Loading list report...</div>}
        {error && <div className="error-state">Error loading report list!</div>}

        <div className="grid-wrapper">
          <div className="reports-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {paginatedReports.length ? (paginatedReports.map(function (report) { return (<ReportItem_1.default key={report._id} report={report} onDelete={handleDelete} onEdit={handleEdit}/>); })) : (<div className="empty-state">There are no reports.</div>)}
          </div>
        </div>

        <button className="fab-button fixed bottom-6 right-6 w-14 h-14 m-2 mt-5 bg-[#2D336B] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-600 transition" onClick={handleOpenDialog} aria-label="Add a new report">
          <outline_1.PlusIcon className="w-6 h-6"/>
        </button>
      </div>

      {showCreateReportDialog && (<div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg w-full max-w-lg">
            <CreateReportItem_1.default taskId={taskId !== null && taskId !== void 0 ? taskId : undefined} onClose={handleCloseDialog}/>
          </div>
        </div>)}
    </div>);
};
exports.default = ReportList;
