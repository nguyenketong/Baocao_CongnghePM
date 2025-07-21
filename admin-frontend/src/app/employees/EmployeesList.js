"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var EmployeeItem_1 = require("../components/employee/EmployeeItem");
var CreateEmployeeItem_1 = require("../components/employee/CreateEmployeeItem");
var outline_1 = require("@heroicons/react/24/outline");
require("../styles/EmployeeList.css");
var employeeList_Handlers_1 = require("../hook/employeeList.Handlers");
var SortStrategy_1 = require("./SortStrategy");
var EmployeeList = function () {
    var _a = (0, employeeList_Handlers_1.useEmployeeList)(), showCreateEmployeeDialog = _a.showCreateEmployeeDialog, filteredEmployees = _a.filteredEmployees, handleSearchChange = _a.handleSearchChange, handleOpenDialog = _a.handleOpenDialog, handleCloseDialog = _a.handleCloseDialog, handleAddEmployee = _a.handleAddEmployee, setSortStrategy = _a.setSortStrategy;
    return (<>
      <div className="flex flex-col justify-end">
        <div className="header-title flex justify-between items-center w-full h-full">
          <h2 id="title">Employee</h2>

          <div className="search-container">
            <outline_1.MagnifyingGlassIcon className="search-icon"/>
            <input type="text" placeholder="Tìm kiếm nhân viên..." className="search-input" onChange={handleSearchChange}/>
          </div>

          <select onChange={function (e) {
            if (e.target.value === "name")
                setSortStrategy(new SortStrategy_1.SortByName());
            if (e.target.value === "department")
                setSortStrategy(new SortStrategy_1.SortByDepartment());
        }}>
            <option value="name">Sắp xếp theo tên</option>
            <option value="department">Sắp xếp theo phòng ban</option>
          </select>
        </div>

        <div className="bg-[#f0f0f0] p-8 rounded-xl">
          <div className="employees-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {filteredEmployees.length ? (filteredEmployees.map(function (employee) { return (<EmployeeItem_1.default key={employee._id} employee={employee}/>); })) : (<div className="empty-state">Không có nhân viên nào.</div>)}
          </div>
        </div>
      </div>

      <button className="fab-button opacity-0" onClick={handleOpenDialog} id="addBtn">
        <outline_1.PlusIcon className="w-6 h-6"/>
      </button>

      {showCreateEmployeeDialog && (<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <CreateEmployeeItem_1.default onClose={handleCloseDialog} onAdd={handleAddEmployee}/>
        </div>)}
    </>);
};
exports.default = EmployeeList;
