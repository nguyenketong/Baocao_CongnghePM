"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDepartmentCommand = exports.EditDepartmentCommand = void 0;
var react_toastify_1 = require("react-toastify");
var EditDepartmentCommand = /** @class */ (function () {
    function EditDepartmentCommand(id, name, onEdit) {
        this.id = id;
        this.name = name;
        this.onEdit = onEdit;
    }
    EditDepartmentCommand.prototype.execute = function () {
        react_toastify_1.toast.info("\u0110ang ch\u1EC9nh s\u1EEDa: ".concat(this.name));
        this.onEdit(this.id);
    };
    return EditDepartmentCommand;
}());
exports.EditDepartmentCommand = EditDepartmentCommand;
var DeleteDepartmentCommand = /** @class */ (function () {
    function DeleteDepartmentCommand(id, name, onDelete) {
        this.id = id;
        this.name = name;
        this.onDelete = onDelete;
    }
    DeleteDepartmentCommand.prototype.execute = function () {
        var _this = this;
        react_toastify_1.toast.success("\u0110\u00E3 x\u00F3a: ".concat(this.name));
        setTimeout(function () { return _this.onDelete(_this.id); }, 500); // Đợi một chút để toast hiển thị trước khi xóa
    };
    return DeleteDepartmentCommand;
}());
exports.DeleteDepartmentCommand = DeleteDepartmentCommand;
