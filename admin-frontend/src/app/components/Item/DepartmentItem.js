"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DepartmentItem;
var Button_1 = require("../button/Button");
var fi_1 = require("react-icons/fi");
var departmentHandlers_1 = require("../../components/hook/departmentHandlers");
function DepartmentItem(_a) {
    var department = _a.department, onDelete = _a.onDelete, onEdit = _a.onEdit;
    var _b = (0, departmentHandlers_1.useDepartmentHandlers)(onEdit, onDelete), handleEdit = _b.handleEdit, handleDelete = _b.handleDelete;
    return (<div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 min-w-full">
      <span className="text-lg font-semibold text-gray-800 block mb-2">
        {department.nameDepartment}
      </span>
      <div className="flex gap-2">
        <Button_1.Button label="Chỉnh sửa" onClick={function () { return handleEdit(department._id, department.nameDepartment); }} variant="primary" icon={<fi_1.FiEdit />}/>
        <Button_1.Button label="Xóa" onClick={function () { return handleDelete(department._id, department.nameDepartment); }} variant="danger" icon={<fi_1.FiDelete />}/>
      </div>
    </div>);
}
