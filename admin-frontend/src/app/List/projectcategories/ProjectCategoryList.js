"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProjectCategoryList;
var react_1 = require("react");
var react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
var projectCategoryHandlers_1 = require("@/app/hook/projectCategoryHandlers"); // Import các hàm từ file command
var ProjectCategoryItem_1 = require("../../components/Item/project/ProjectCategoryItem"); // Thay tên component nếu cần
function ProjectCategoryList() {
    var _a = (0, react_1.useState)([]), projectCategories = _a[0], setProjectCategories = _a[1];
    var _b = (0, react_1.useState)(""), name = _b[0], setName = _b[1];
    var _c = (0, react_1.useState)(null), editId = _c[0], setEditId = _c[1];
    var _d = (0, react_1.useState)(""), editName = _d[0], setEditName = _d[1];
    (0, react_1.useEffect)(function () {
        (0, projectCategoryHandlers_1.fetchProjectCategories)(setProjectCategories);
    }, []);
    return (<div className="p-6">
      <react_toastify_1.ToastContainer position="top-right" autoClose={3000}/>
      <h1 className="text-2xl font-bold mb-4">Danh sách danh mục</h1>

      {/* Form thêm mới */}
      <div className="mb-4">
        <input type="text" value={name} onChange={function (e) { return setName(e.target.value); }} className="border p-2 rounded mr-2" placeholder="Nhập tên danh mục"/>
        <button onClick={function () { return (0, projectCategoryHandlers_1.handleAdd)(name, setName, function () { return (0, projectCategoryHandlers_1.fetchProjectCategories)(setProjectCategories); }); }} className="bg-blue-500 text-white px-4 py-2 rounded">
          Thêm
        </button>
      </div>

      {/* Form chỉnh sửa */}
      {editId && (<div className="mb-4">
          <input type="text" value={editName} onChange={function (e) { return setEditName(e.target.value); }} className="border p-2 rounded mr-2"/>
          <button onClick={function () { return (0, projectCategoryHandlers_1.handleUpdate)(editId, editName, setEditId, setEditName, function () { return (0, projectCategoryHandlers_1.fetchProjectCategories)(setProjectCategories); }); }} className="bg-green-500 text-white px-4 py-2 rounded">
            Cập nhật
          </button>
          <button onClick={function () { return setEditId(null); }} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
            Hủy
          </button>
        </div>)}

      {/* Danh sách danh mục */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {projectCategories.map(function (projectCategory) { return (<ProjectCategoryItem_1.default key={projectCategory._id} projectCategory={projectCategory} // Đổi designation thành projectCategory
         onDelete={function () { return (0, projectCategoryHandlers_1.handleDelete)(projectCategory._id, function () { return (0, projectCategoryHandlers_1.fetchProjectCategories)(setProjectCategories); }); }} onEdit={function () { return (0, projectCategoryHandlers_1.handleEditClick)(projectCategory._id, setEditId, setEditName); }}/>); })}
      </div>
    </div>);
}
