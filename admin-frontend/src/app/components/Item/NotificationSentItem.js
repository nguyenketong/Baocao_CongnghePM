"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotificationSentItem;
var react_toastify_1 = require("react-toastify");
function NotificationSentItem(_a) {
    var notificationSent = _a.notificationSent, onDelete = _a.onDelete, onEdit = _a.onEdit;
    var handleEdit = function (id) {
        react_toastify_1.toast.info("\u0110ang ch\u1EC9nh s\u1EEDa: ".concat(notificationSent.notification_name)); // Sửa projectCategoryName thành notification_name
        onEdit(id);
    };
    var handleDelete = function (id) {
        react_toastify_1.toast.success("\u0110\u00E3 x\u00F3a: ".concat(notificationSent.notification_name)); // Sửa projectCategoryName thành notification_name
        setTimeout(function () { return onDelete(id); }, 500); // Đợi một chút để toast hiển thị trước khi xóa
    };
    return (<div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 min-w-full">
      <span className="text-lg font-semibold text-gray-800 block mb-2">
        {notificationSent.notification_name}  {/* Sửa projectCategoryName thành notification_name */}
      </span>
      <div className="flex gap-2">
        <button onClick={function () { return handleEdit(notificationSent._id); }} // Sửa projectCategory._id thành notificationSent._id
     className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Chỉnh sửa
        </button>
        <button onClick={function () { return handleDelete(notificationSent._id); }} // Sửa projectCategory._id thành notificationSent._id
     className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          Xóa
        </button>
      </div>
    </div>);
}
