"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var EditTaskItem_1 = require("./EditTaskItem");
var react_toastify_1 = require("react-toastify");
var swr_1 = require("swr");
var outline_1 = require("@heroicons/react/24/outline");
var taskItemHanlder_1 = require("../../hook/task/taskItemHanlder");
var TasksItem = function (_a) {
    var _b, _c, _d, _e;
    var task = _a.task, onDelete = _a.onDelete, onStatusChange = _a.onStatusChange;
    var _f = (0, taskItemHanlder_1.useTaskActions)(task._id), isEditModalOpen = _f.isEditModalOpen, setIsEditModalOpen = _f.setIsEditModalOpen, handleAddReport = _f.handleAddReport, handleEdit = _f.handleEdit;
    var _g = (0, react_1.useState)(false), showStatusTag = _g[0], setShowStatusTag = _g[1];
    var _h = (0, react_1.useState)(task.status), selectedStatus = _h[0], setSelectedStatus = _h[1];
    var _j = (0, react_1.useState)(false), isDeleting = _j[0], setIsDeleting = _j[1];
    var storedEmployee = localStorage.getItem('employee');
    var employeeData = storedEmployee ? JSON.parse(storedEmployee) : null;
    var designationName = ((_b = employeeData === null || employeeData === void 0 ? void 0 : employeeData.designation_id) === null || _b === void 0 ? void 0 : _b.designationName) || '';
    var isMember = !['Admin', 'Technical Lead', 'IT Project Manager'].includes(designationName);
    var handleStatusChange = function (status) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setSelectedStatus(status);
            onStatusChange(task._id, status); // Notify parent to update status
            setShowStatusTag(false); // Hide the tag after selecting a status
            return [2 /*return*/];
        });
    }); };
    var handleDelete = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.confirm('Bạn có chắc chắn muốn xóa nhiệm vụ này không?')) {
                        return [2 /*return*/];
                    }
                    setIsDeleting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, onDelete(task._id)];
                case 2:
                    _a.sent();
                    react_toastify_1.toast.success('Nhiệm vụ đã được xóa thành công');
                    (0, swr_1.mutate)('http://localhost:3000/tasks');
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    react_toastify_1.toast.error('Lỗi khi xóa nhiệm vụ');
                    console.error('Error deleting task:', error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setIsDeleting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var toggleStatusTag = function () {
        setShowStatusTag(!showStatusTag); // Toggle the dropdown visibility
    };
    // Prevent dropdown from closing when clicking on the dropdown options
    var handleDropdownClick = function (e) {
        e.stopPropagation(); // Prevent click on dropdown from closing the task item
    };
    return (<div className="bg-white rounded-lg shadow-md p-5 relative hover:shadow-lg transition-shadow duration-200 mb-6" onClick={toggleStatusTag} // Clicking on the task item toggles the dropdown
    >
      {/* Task Category and Task Assign Person in the Same Row */}
      <div className="flex justify-between items-center mt-2">
        {/* Task Category */}
        <div className="bg-green-100 text-green-600 px-2 py-1 rounded-md">
          <div className="light-success-bg py-1 px-2 rounded-1 d-inline-block fw-bold small-14 mb-0">
            <span className="text-gray-600">
              {((_c = task.taskCategory) === null || _c === void 0 ? void 0 : _c.taskCategoryName) || 'Không có danh mục'}
            </span>
          </div>
        </div>

        {/* Task Assign Person and Recipient */}
        <div className="flex flex-row gap-2">
          {/* Task Assign Person */}
          {((_d = task.taskAssignPerson) === null || _d === void 0 ? void 0 : _d.employeeProfile) ? (<img src={task.taskAssignPerson.employeeProfile} className="w-8 h-8 rounded-full border-2 border-white shadow-md" alt="Assign Person"/>) : (<div className="w-8 h-8 rounded-full bg-gray-300"/>)}

          {/* Task Recipient */}
          {((_e = task.taskRecipient) === null || _e === void 0 ? void 0 : _e.employeeProfile) ? (<img src={task.taskRecipient.employeeProfile} className="w-8 h-8 rounded-full border-2 border-white shadow-md" alt="Recipient"/>) : (<div className="w-8 h-8 rounded-full bg-gray-300"/>)}
        </div>
      </div>

      {/* Priority Level Below */}
      <div className="absolute top-16 right-3 bg-yellow-100 text-yellow-600 px-2 py-1 rounded-md">
        <span className="text-gray-600">{task.priority || 'Không xác định'}</span>
      </div>

      {/* Task Description */}
      <div className="w-full mt-12 space-y-2">
        <p className="tpy-2 mb-0 overflow-hidden overflow-ellipsis line-clamp-2">
          {task.description || 'Không có mô tả'}
        </p>
      </div>

      {/* Task Start and End Dates */}
      <div className="text-sm mt-2">
        <span className="font-medium text-gray-700">Ngày bắt đầu: </span>
        <span className="text-gray-600">
          {task.taskStart ? new Date(task.taskStart).toLocaleDateString() : 'Chưa có ngày'}
        </span>
      </div>
      <div className="text-sm">
        <span className="font-medium text-gray-700">Ngày kết thúc: </span>
        <span className="text-gray-600">
          {task.taskEnd ? new Date(task.taskEnd).toLocaleDateString() : 'Chưa có ngày'}
        </span>
      </div>

      {/* Buttons: "Add Report", Edit, and Delete all aligned horizontally */}
      <div className="flex gap-3 mt-4">
        {/* "Add report" button */}
        <button onClick={function () { return handleAddReport(); }} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200">
          Thêm report
        </button>

        {/* Edit and Delete Buttons */}
        {!isMember && (<div className="flex gap-2 ml-auto">
            <button onClick={handleEdit} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isDeleting} title="Chỉnh sửa">
              <outline_1.PencilSquareIcon className="h-5 w-5"/>
            </button>
            <button onClick={handleDelete} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isDeleting} title={isDeleting ? 'Đang xóa...' : 'Xóa'}>
              <outline_1.TrashIcon className="h-5 w-5"/>
            </button>
          </div>)}
      </div>

      {/* Conditionally render status change dropdown */}
      {showStatusTag && (<div className="status-update flex flex-col gap-2 max-w-xs mt-4" onClick={handleDropdownClick} // Prevent dropdown from closing on interaction
        >
          <label className="text-sm font-semibold text-gray-800">Update Status</label>
          <select value={selectedStatus} onChange={function (e) { return handleStatusChange(e.target.value); }} className="status-dropdown p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer bg-white text-gray-900">
            <option value="In Progress" className="text-yellow-600">In Progress</option>
            <option value="Needs Review" className="text-orange-600">Needs Review</option>
            <option value="Completed" className="text-green-600">Completed</option>
          </select>
        </div>)}

      {/* Edit Modal */}
      {isEditModalOpen && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <EditTaskItem_1.default taskId={task._id} onClose={function () { return setIsEditModalOpen(false); }}/>
        </div>)}
    </div>);
};
exports.default = TasksItem;
