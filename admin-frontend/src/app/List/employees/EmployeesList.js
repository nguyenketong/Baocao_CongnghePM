'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var axios_1 = require("axios");
var EmployeeItem_1 = require("../../components/employee/EmployeeItem");
var CreateEmployeeItem_1 = require("../../components/employee/CreateEmployeeItem");
var swr_1 = require("swr");
var outline_1 = require("@heroicons/react/24/outline");
var debounce_1 = require("lodash/debounce");
require("../styles/EmployeeList.css");
var gsap_1 = require("gsap");
var employeeCommand_1 = require("@/app/command/employeeCommand");
var API_BASE_URL = 'http://localhost:3000/employees';
var EmployeeList = function () {
    var _a = (0, react_1.useState)(false), showCreateEmployeeDialog = _a[0], setShowCreateEmployeeDialog = _a[1];
    var _b = (0, react_1.useState)(''), searchTerm = _b[0], setSearchTerm = _b[1];
    var fetcher = function (url) { return axios_1.default.get(url).then(function (res) { return res.data; }); };
    var _c = (0, swr_1.default)(API_BASE_URL, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    }), employees = _c.data, error = _c.error, isLoading = _c.isLoading;
    // Debounce search handler
    var debouncedSearch = (0, react_1.useCallback)((0, debounce_1.default)(function (value) {
        setSearchTerm(value);
    }, 300), [setSearchTerm] // Đã thêm dependency
    );
    var handleSearchChange = function (e) {
        debouncedSearch(e.target.value);
    };
    var filteredEmployees = (0, react_1.useMemo)(function () {
        if (!employees)
            return [];
        if (!searchTerm)
            return employees;
        var searchTermLower = searchTerm.toLowerCase();
        return employees.filter(function (employee) {
            return employee.employeeName.toLowerCase().includes(searchTermLower);
        });
    }, [employees, searchTerm]);
    // Command instances
    var openDialogCommand = new employeeCommand_1.OpenDialogCommand(setShowCreateEmployeeDialog);
    var closeDialogCommand = new employeeCommand_1.CloseDialogCommand(setShowCreateEmployeeDialog);
    var addEmployeeCommand = new employeeCommand_1.AddEmployeeCommand({}, swr_1.mutate, API_BASE_URL);
    (0, react_1.useEffect)(function () {
        gsap_1.gsap.to("#addBtn", { opacity: 1, y: -50, delay: 0.5, backgroundColor: '#2D336B' });
    }, []);
    return (<>
      <div className="flex flex-col justify-end">
        <div className="header-title flex justify-between items-center w-full h-full">
          <h2 id="title">Employee</h2>

          <div className="search-container">
            <outline_1.MagnifyingGlassIcon className="search-icon"/>
            <input type="text" placeholder="Tìm kiếm nhân viên..." className="search-input" onChange={handleSearchChange}/>
          </div>
        </div>

        {isLoading && <div className="loading-state">Đang tải danh sách nhân viên...</div>}
        {error && <div className="error-state">Lỗi khi tải danh sách nhân viên!</div>}

        <div className="bg-[#f0f0f0] p-8 rounded-xl">
          <div className="grid-wrapper gap-10">
            <div className="employees-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4" id="employee-card">
              {filteredEmployees.length ? (filteredEmployees.map(function (employee) { return (<EmployeeItem_1.default key={employee._id || Math.random()} employee={employee}/>); })) : (<div className="empty-state">
                  {searchTerm ? 'Không tìm thấy nhân viên nào.' : 'Không có nhân viên nào.'}
                </div>)}
            </div>
          </div>
        </div>
      </div>

      {/* FAB Button */}
      <button className="fab-button opacity-0" onClick={function () { return openDialogCommand.execute(); }} aria-label="Thêm nhân viên mới" id="addBtn">
        <outline_1.PlusIcon className="w-6 h-6"/>
      </button>

      {/* Modal */}
      {showCreateEmployeeDialog && (<div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg w-full max-w-lg">
            <CreateEmployeeItem_1.default onClose={function () { return closeDialogCommand.execute(); }} onAdd={function () { return addEmployeeCommand.execute(); }}/>
            <button className="close-button mt-4 px-4 py-2 text-white rounded" onClick={function () { return closeDialogCommand.execute(); }}>
              Close
            </button>
          </div>
        </div>)}
    </>);
};
exports.default = EmployeeList;
