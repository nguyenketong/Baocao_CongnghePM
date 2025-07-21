"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var EditProgressItem_1 = require("./EditProgressItem");
var outline_1 = require("@heroicons/react/24/outline");
var progressItemHandle_1 = require("@/app/components/hook/progress/progressItemHandle");
var calculateMonthsDifference = function (startDate, endDate) {
    var start = new Date(startDate);
    var end = new Date(endDate);
    var months = end.getMonth() - start.getMonth();
    var years = end.getFullYear() - start.getFullYear();
    months += years * 12;
    return months >= 0 ? months : 0;
};
var ProgressItem = function (_a) {
    var _b, _c, _d;
    var progress = _a.progress;
    var _e = (0, progressItemHandle_1.useProgressHandler)(), isEditModalOpen = _e.isEditModalOpen, setIsEditModalOpen = _e.setIsEditModalOpen, isDeleting = _e.isDeleting, handleAddTasks = _e.handleAddTasks, handleDelete = _e.handleDelete;
    var _f = (0, react_1.useState)(false), isTechLead = _f[0], setIsTechLead = _f[1];
    var _g = (0, react_1.useState)(false), isAdmin = _g[0], setIsAdmin = _g[1];
    var _h = (0, react_1.useState)(false), isPM = _h[0], setIsPM = _h[1];
    (0, react_1.useEffect)(function () {
        var _a, _b, _c;
        var storedEmployee = localStorage.getItem('employee');
        if (storedEmployee) {
            var employeeData = JSON.parse(storedEmployee);
            setIsTechLead(((_a = employeeData === null || employeeData === void 0 ? void 0 : employeeData.designation_id) === null || _a === void 0 ? void 0 : _a.designationName) === 'Technical Lead');
            setIsAdmin(((_b = employeeData === null || employeeData === void 0 ? void 0 : employeeData.designation_id) === null || _b === void 0 ? void 0 : _b.designationName) === 'Admin');
            setIsPM(((_c = employeeData === null || employeeData === void 0 ? void 0 : employeeData.designation_id) === null || _c === void 0 ? void 0 : _c.designationName) === 'IT Project Manager');
        }
    }, []);
    var monthsRequired = progress.progressStart && progress.progressEnd
        ? calculateMonthsDifference(progress.progressStart, progress.progressEnd)
        : 0;
    return (<div className="bg-white rounded-lg shadow-md p-5 relative hover:shadow-lg transition-shadow duration-200">
      <div className="absolute top-3 right-3 flex items-center gap-2">
        {((_b = progress.taskAssignPerson) === null || _b === void 0 ? void 0 : _b.employeeProfile) ? (<img src={progress.taskAssignPerson.employeeProfile} className="w-10 h-10 rounded-full object-cover" alt={progress.taskAssignPerson.employeeName}/>) : (<div className="w-10 h-10 bg-gray-300 rounded-full"></div>)}

        {((_c = progress.taskRecipient) === null || _c === void 0 ? void 0 : _c.employeeProfile) ? (<img src={progress.taskRecipient.employeeProfile} className="w-10 h-10 rounded-full object-cover -ml-4" alt={progress.taskRecipient.employeeName}/>) : (<div className="w-10 h-10 bg-gray-300 rounded-full"></div>)}
      </div>

      <div className="absolute top-3 left-3 bg-green-100 text-green-600 px-2 py-1 rounded-md">
        {(_d = progress.progressCategory) === null || _d === void 0 ? void 0 : _d.progressCategoryName}
      </div>

      <div className="flex flex-col items-center mt-16">
        <h3 className="text-lg font-semibold text-gray-800">
          {progress.progressName || 'Không có tên'}
        </h3>

        <div className="absolute top-16 right-3 bg-yellow-100 text-yellow-600 px-2 py-1 rounded-md">
          {progress.priority}
        </div>

        <div className="w-full mt-3 space-y-2">
          <div className="text-sm">
            <span className="text-gray-600">{progress.description || 'Không có dữ liệu'}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Ngày bắt đầu: </span>
            <span className="text-gray-600">{progress.progressStart ? new Date(progress.progressStart).toLocaleDateString() : 'Chưa có ngày'}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Ngày kết thúc: </span>
            <span className="text-gray-600">{progress.progressEnd ? new Date(progress.progressEnd).toLocaleDateString() : 'Chưa có ngày'}</span>
          </div>
          <div className="text-sm flex items-center gap-1">
            <outline_1.ClockIcon className="h-5 w-5 text-gray-600"/>
            <span className="font-medium text-gray-700">Thời gian thực hiện: </span>
            <span className="text-gray-600">{monthsRequired} tháng</span>
          </div>
        </div>

        {(isTechLead || isPM) ? (<button onClick={function () { return handleAddTasks(progress._id); }} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200">
    Thêm công việc
  </button>) : (<button onClick={function () { return handleAddTasks(progress._id); }} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
    Xem công việc
  </button>)}


      </div>

      {/* Nút Hành động: Chỉ hiển thị nếu là Admin hoặc PM */}
      {(isAdmin || isPM) && (<div className="absolute bottom-3 right-3 flex gap-2">
          {/* Nút Sửa */}
          <button onClick={function () { return setIsEditModalOpen(true); }} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isDeleting} title="Chỉnh sửa">
            <outline_1.PencilSquareIcon className="h-5 w-5"/>
          </button>

          {/* Nút Xóa */}
          <button onClick={function () { return handleDelete(progress._id); }} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isDeleting} title={isDeleting ? 'Đang xóa...' : 'Xóa'}>
            <outline_1.TrashIcon className="h-5 w-5"/>
          </button>
        </div>)}

      {/* Modal chỉnh sửa */}
      {isEditModalOpen && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <EditProgressItem_1.default progressId={progress._id} onClose={function () { return setIsEditModalOpen(false); }}/>
           
          </div>
        </div>)}
    </div>);
};
exports.default = ProgressItem;
