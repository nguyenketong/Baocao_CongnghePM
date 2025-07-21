"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var md_1 = require("react-icons/md");
var taskHandlers_1 = require("../../hook/task/taskHandlers");
var TaskEmployeeItem = function (_a) {
    var task = _a.task;
    var _b = (0, taskHandlers_1.useTaskHandlers)(task), showStatusTag = _b.showStatusTag, selectedStatus = _b.selectedStatus, showMenu = _b.showMenu, setShowMenu = _b.setShowMenu, handleTaskClick = _b.handleTaskClick, handleStatusChange = _b.handleStatusChange, handleReportClick = _b.handleReportClick;
    return (<div className="bg-white rounded-lg shadow-lg hover:shadow-xl p-6 w-full relative cursor-pointer" onClick={handleTaskClick}>
      <h2 className="text-lg font-semibold">{task.taskName}</h2>
      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
      <p className="text-sm mt-2">
        📅 {new Date(task.taskStart).toLocaleDateString("vi-VN")} -{" "}
        {new Date(task.taskEnd).toLocaleDateString("vi-VN")}
      </p>

      <div className="mt-4 flex space-x-4 justify-end">
        <p className="text-sm px-3 py-1 bg-blue-500 text-white rounded-full">
          {task.priority}
        </p>
        <p className="text-sm px-3 py-1 bg-yellow-500 text-white rounded-full">
          {selectedStatus}
        </p>
      </div>

      <div className="absolute top-3 right-3">
        <button onClick={function (e) {
            e.stopPropagation();
            setShowMenu(!showMenu);
        }} className="text-gray-500 hover:text-gray-700">
          <md_1.MdMoreVert className="h-6 w-6"/>
        </button>

        {showMenu && (<div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50">
            <ul className="text-sm text-gray-700">
              <li>
                <button onClick={handleReportClick} className="w-full text-left p-2 hover:bg-gray-100 rounded-md">
                  Báo cáo
                </button>
              </li>
            </ul>
          </div>)}
      </div>

      {showStatusTag && (<div className="status-update flex flex-col gap-2 max-w-xs mt-4" onClick={function (e) { return e.stopPropagation(); }}>
          <label className="text-sm font-semibold text-gray-800">
            Cập nhật trạng thái
          </label>
          <select value={selectedStatus} onChange={function (e) { return handleStatusChange(e.target.value); }} className="p-2 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 cursor-pointer">
            <option value="In Progress">Đang thực hiện</option>
            <option value="Needs Review">Cần kiểm tra</option>
            <option value="Completed">Hoàn thành</option>
          </select>
        </div>)}
    </div>);
};
exports.default = TaskEmployeeItem;
