import React, { useState } from "react";
import EditEmployeeItem from "./EditEmployeeItem";
import { Employee } from "../../models/employee";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { DefaultEmployeeStrategy,LeadEmployeeStrategy, EmployeeContext } from "./employeeItem/EmployeeStrategy";
import { useEmployee } from "../hook/employee/employeeItem";

interface EmployeeItemProps {
  employee: Employee;
}

const EmployeeItem: React.FC<EmployeeItemProps> = ({ employee }) => {
  const { employeeData, isDeleting, handleDelete } = useEmployee(employee);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Áp dụng chiến lược mặc định

const getStrategyForEmployee = (employee: Employee): EmployeeContext => {
  if (employee.designation_id?.designationName === "Technical Lead") {
    return new EmployeeContext(new LeadEmployeeStrategy());
  }
  return new EmployeeContext(new DefaultEmployeeStrategy());
};

// Sử dụng chiến lược phù hợp
const employeeContext = getStrategyForEmployee(employeeData);
const designation = employeeContext.executeStrategy(employeeData);

  return (
    <div className="flex bg-white rounded-lg shadow-md p-5 relative hover:shadow-lg transition-shadow duration-200">
      <div className="w-40 border-r-2 mr-3 flex justify-center items-center">
        <img
          src={employeeData.employeeProfile}
          alt={employeeData.employeeName}
          className="w-24 h-24 object-cover rounded-full border-2 border-gray-200"
          onError={(e) => (e.currentTarget.src = "/default-profile.jpg")}
        />
      </div>

      <div className="flex flex-col">
        <h3 className="text-lg font-semibold mt-3 text-gray-800">
          {employeeData.employeeName}
        </h3>

        <div className="text-xs bg-slate-300 p-2 font-bold inline-block text-center rounded-sm w-fit px-2 py-1 border-2 border-slate-450">
          <span className="text-black">{designation || "Chưa có chức vụ"}</span>
        </div>

        <div className="text-sm mt-3">
          <span className="font-medium text-gray-700">Email: </span>
          <span className="text-gray-600">{employeeData.account?.email || "Chưa có email"}</span>
        </div>

        <div className="text-sm">
          <span className="font-medium text-gray-700">Description: </span>
          <span className="text-gray-600">{employeeData.description}</span>
        </div>
        

        <div className="top-9 right-3 flex gap-2 mr-auto pt-4">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isDeleting}
            title="Edit"
          >
            <PencilSquareIcon className="h-5 w-5" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isDeleting}
            title={isDeleting ? "Deleting..." : "Delete"}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className=" p-2 rounded-lg w-full max-w-lg">
            <EditEmployeeItem employee={employeeData} onClose={() => setIsEditModalOpen(false)} />
           
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeItem;
