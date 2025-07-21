"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var EditEmployeeItem_1 = require("./EditEmployeeItem");
var outline_1 = require("@heroicons/react/24/outline");
var EmployeeStrategy_1 = require("./employeeItem/EmployeeStrategy");
var employeeItem_1 = require("../hook/employee/employeeItem");
var EmployeeItem = function (_a) {
    var _b;
    var employee = _a.employee;
    var _c = (0, employeeItem_1.useEmployee)(employee), employeeData = _c.employeeData, isDeleting = _c.isDeleting, handleDelete = _c.handleDelete;
    var _d = (0, react_1.useState)(false), isEditModalOpen = _d[0], setIsEditModalOpen = _d[1];
    // Áp dụng chiến lược mặc định
    var getStrategyForEmployee = function (employee) {
        var _a;
        if (((_a = employee.designation_id) === null || _a === void 0 ? void 0 : _a.designationName) === "Technical Lead") {
            return new EmployeeStrategy_1.EmployeeContext(new EmployeeStrategy_1.LeadEmployeeStrategy());
        }
        return new EmployeeStrategy_1.EmployeeContext(new EmployeeStrategy_1.DefaultEmployeeStrategy());
    };
    // Sử dụng chiến lược phù hợp
    var employeeContext = getStrategyForEmployee(employeeData);
    var designation = employeeContext.executeStrategy(employeeData);
    return (<div className="flex bg-white rounded-lg shadow-md p-5 relative hover:shadow-lg transition-shadow duration-200">
      <div className="w-40 border-r-2 mr-3 flex justify-center items-center">
        <img src={employeeData.employeeProfile} alt={employeeData.employeeName} className="w-24 h-24 object-cover rounded-full border-2 border-gray-200" onError={function (e) { return (e.currentTarget.src = "/default-profile.jpg"); }}/>
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
          <span className="text-gray-600">{((_b = employeeData.account) === null || _b === void 0 ? void 0 : _b.email) || "Chưa có email"}</span>
        </div>

        <div className="text-sm">
          <span className="font-medium text-gray-700">Description: </span>
          <span className="text-gray-600">{employeeData.description}</span>
        </div>
        

        <div className="top-9 right-3 flex gap-2 mr-auto pt-4">
          <button onClick={function () { return setIsEditModalOpen(true); }} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isDeleting} title="Edit">
            <outline_1.PencilSquareIcon className="h-5 w-5"/>
          </button>
          <button onClick={handleDelete} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isDeleting} title={isDeleting ? "Deleting..." : "Delete"}>
            <outline_1.TrashIcon className="h-5 w-5"/>
          </button>
        </div>
      </div>

      {isEditModalOpen && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className=" p-2 rounded-lg w-full max-w-lg">
            <EditEmployeeItem_1.default employee={employeeData} onClose={function () { return setIsEditModalOpen(false); }}/>
           
          </div>
        </div>)}
    </div>);
};
exports.default = EmployeeItem;
