"use client";
import React from "react";
import EmployeeItem from "../components/employee/EmployeeItem";
import CreateEmployeeItem from "../components/employee/CreateEmployeeItem";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import "../styles/EmployeeList.css";
import { useEmployeeList } from "../hook/employeeList.Handlers";
import { SortByDepartment, SortByName } from "./SortStrategy";


const EmployeeList: React.FC = () => {
  const {
    showCreateEmployeeDialog,
    filteredEmployees,
    handleSearchChange,
    handleOpenDialog,
    handleCloseDialog,
    handleAddEmployee,
    setSortStrategy,
  } = useEmployeeList();

  return (
    <>
      <div className="flex flex-col justify-end">
        <div className="header-title flex justify-between items-center w-full h-full">
          <h2 id="title">Employee</h2>

          <div className="search-container">
            <MagnifyingGlassIcon className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm nhân viên..."
              className="search-input"
              onChange={handleSearchChange}
            />
          </div>

          <select
            onChange={(e) => {
              if (e.target.value === "name") setSortStrategy(new SortByName());
              if (e.target.value === "department") setSortStrategy(new SortByDepartment());
            }}
          >
            <option value="name">Sắp xếp theo tên</option>
            <option value="department">Sắp xếp theo phòng ban</option>
          </select>
        </div>

        <div className="bg-[#f0f0f0] p-8 rounded-xl">
          <div className="employees-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {filteredEmployees.length ? (
              filteredEmployees.map((employee) => (
                <EmployeeItem key={employee._id} employee={employee} />
              ))
            ) : (
              <div className="empty-state">Không có nhân viên nào.</div>
            )}
          </div>
        </div>
      </div>

      <button className="fab-button opacity-0" onClick={handleOpenDialog} id="addBtn">
        <PlusIcon className="w-6 h-6" />
      </button>

      {showCreateEmployeeDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <CreateEmployeeItem onClose={handleCloseDialog} onAdd={handleAddEmployee} />
        </div>
      )}
    </>
  );
};

export default EmployeeList;
