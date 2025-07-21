"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AccountItem;
// AccountItem.tsx
var react_toastify_1 = require("react-toastify");
var Button_1 = require("../button/Button");
var fi_1 = require("react-icons/fi");
var command_1 = require("../command/command");
function AccountItem(_a) {
    var account = _a.account, onDelete = _a.onDelete, onEdit = _a.onEdit;
    var editCommand = new command_1.EditCommand(account._id, onEdit);
    var deleteCommand = new command_1.DeleteCommand(account._id, onDelete);
    return (<div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 min-w-full">
      <span className="text-lg font-semibold text-gray-800 block mb-2">
        {account.userName}
      </span>
      <span className="text-sm text-gray-600 block mb-2">Email: {account.email}</span>
      <span className="text-sm text-gray-600 block mb-2">Mật khẩu: {account.password}</span>
      <div className="flex gap-2">
        <Button_1.Button label="Chỉnh sửa" onClick={function () {
            react_toastify_1.toast.info("\u0110ang ch\u1EC9nh s\u1EEDa: ".concat(account.userName));
            editCommand.execute();
        }} variant="primary" icon={<fi_1.FiEdit />}/>
        <Button_1.Button label="Xóa" onClick={function () { return deleteCommand.execute(); }} variant="danger" icon={<fi_1.FiTrash />}/>
      </div>
    </div>);
}
