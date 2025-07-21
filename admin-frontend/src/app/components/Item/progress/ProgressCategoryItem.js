"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProgressCategoryItem;
var react_toastify_1 = require("react-toastify");
function ProgressCategoryItem(_a) {
    var progressCategory = _a.progressCategory, onDelete = _a.onDelete, onEdit = _a.onEdit;
    var handleEdit = function (id) {
        react_toastify_1.toast.info("\u0110ang ch\u1EC9nh s\u1EEDa: ".concat(progressCategory.progressCategoryName)); // Sửa từ projectCategoryName thành progressCategoryName
        onEdit(id);
    };
    var handleDelete = function (id) {
        react_toastify_1.toast.success("\u0110\u00E3 x\u00F3a: ".concat(progressCategory.progressCategoryName)); // Sửa từ projectCategoryName thành progressCategoryName
        setTimeout(function () { return onDelete(id); }, 500); // Đợi một chút để toast hiển thị trước khi xóa
    };
    return (<div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 min-w-full">
      <span className="text-lg font-semibold text-gray-800 block mb-2">
        {progressCategory.progressCategoryName}  {/* Sửa từ projectCategoryName thành progressCategoryName */}
      </span>
      <div className="flex gap-2">
        <button onClick={function () { return handleEdit(progressCategory._id); }} // Sửa từ projectCategory._id thành progressCategory._id
     className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Chỉnh sửa
        </button>
        <button onClick={function () { return handleDelete(progressCategory._id); }} // Sửa từ projectCategory._id thành progressCategory._id
     className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          Xóa
        </button>
      </div>
    </div>);
}
