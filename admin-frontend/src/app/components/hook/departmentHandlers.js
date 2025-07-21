"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDepartmentHandlers = useDepartmentHandlers;
var react_toastify_1 = require("react-toastify");
function useDepartmentHandlers(onEdit, onDelete) {
    var handleEdit = function (id, name) {
        react_toastify_1.toast.info("\u0110ang ch\u1EC9nh s\u1EEDa: ".concat(name));
        onEdit(id);
    };
    var handleDelete = function (id, name) {
        react_toastify_1.toast.success("\u0110\u00E3 x\u00F3a: ".concat(name));
        setTimeout(function () { return onDelete(id); }, 500); // Đợi một chút để toast hiển thị trước khi xóa
    };
    return { handleEdit: handleEdit, handleDelete: handleDelete };
}
