"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmployeeFactory = /** @class */ (function () {
    function EmployeeFactory() {
    }
    EmployeeFactory.createEmployee = function (data) {
        return {
            _id: data._id || crypto.randomUUID(),
            employeeName: data.employeeName || "Chưa xác định",
            employeeProfile: data.employeeProfile || "",
            designation_id: data.designation_id || { _id: crypto.randomUUID(), designationName: "Không có chức vụ" },
            account: data.account || { userName: "unknown", email: "unknown@example.com" },
            description: data.description || "",
        };
    };
    return EmployeeFactory;
}());
exports.default = EmployeeFactory;
