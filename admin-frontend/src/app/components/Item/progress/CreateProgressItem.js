'use client';
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
var createprogressItemCommand_1 = require("../../command/progress/createprogressItemCommand");
var InputField_1 = require("../../input/InputField");
var SelectField_1 = require("../../input/SelectField");
var axios_1 = require("axios");
var react_toastify_1 = require("react-toastify");
var PriorityState_1 = require("./createProgress/PriorityState");
var StatusState_1 = require("./createProgress/StatusState");
var API_EMPLOYEE_URL = 'http://localhost:3000/employees';
var CreateProgressItem = function (_a) {
    var _b;
    var projectId = _a.projectId, onClose = _a.onClose;
    var _c = (0, react_1.useState)([]), employees = _c[0], setEmployees = _c[1];
    var _d = (0, react_1.useState)(null), selectedEmployee = _d[0], setSelectedEmployee = _d[1];
    // Trạng thái cho độ ưu tiên và trạng thái tiến độ
    var _e = (0, react_1.useState)(new PriorityState_1.PriorityContext(new PriorityState_1.MediumPriority())), priorityContext = _e[0], setPriorityContext = _e[1];
    var _f = (0, react_1.useState)(new StatusState_1.StatusContext(new StatusState_1.NotStarted())), statusContext = _f[0], setStatusContext = _f[1];
    var handlePriorityChange = function (event) {
        var selectedPriority = event.target.value;
        setPriorityContext(new PriorityState_1.PriorityContext(selectedPriority === 'high' ? new PriorityState_1.HighPriority() :
            selectedPriority === 'low' ? new PriorityState_1.LowPriority() :
                new PriorityState_1.MediumPriority()));
    };
    var handleStatusChange = function (event) {
        var selectedStatus = event.target.value;
        setStatusContext(new StatusState_1.StatusContext(selectedStatus === 'in_progress' ? new StatusState_1.InProgress() :
            selectedStatus === 'completed' ? new StatusState_1.Completed() :
                new StatusState_1.NotStarted()));
    };
    var _g = (0, createprogressItemCommand_1.useCreateProgressItemCommand)(projectId, onClose), register = _g.register, handleSubmit = _g.handleSubmit, errors = _g.errors, reset = _g.reset, isSubmitting = _g.isSubmitting, onSubmit = _g.onSubmit, setValue = _g.setValue, projectOptions = _g.projectOptions, categoryOptions = _g.categoryOptions, notificationOptions = _g.notificationOptions, employeeOptions = _g.employeeOptions, projects = _g.projects;
    (0, react_1.useEffect)(function () {
        var fetchEmployees = function () { return __awaiter(void 0, void 0, void 0, function () {
            var data, storedEmployeeId_1, foundUser, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get(API_EMPLOYEE_URL)];
                    case 1:
                        data = (_a.sent()).data;
                        setEmployees(data);
                        storedEmployeeId_1 = localStorage.getItem('employeeId');
                        if (storedEmployeeId_1) {
                            foundUser = data.find(function (e) { return e._id === storedEmployeeId_1; });
                            if (foundUser) {
                                setSelectedEmployee(foundUser);
                                setValue('taskAssignPerson', foundUser._id);
                            }
                            else {
                                react_toastify_1.toast.warn('Không tìm thấy nhân viên phù hợp!');
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        react_toastify_1.toast.error('Lỗi khi tải danh sách nhân viên');
                        console.error('Lỗi API:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchEmployees();
    }, [setValue]);
    return (<div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Thêm Tiến Độ</h2>
      <form onSubmit={handleSubmit(function (data) { return onSubmit(data, reset); })} className="grid grid-cols-2 gap-6">
        <InputField_1.default label="Tên Tiến Độ" placeholder="Nhập tên tiến độ" type="text" register={register('progressName', { required: 'Tên tiến độ không được để trống' })} error={errors.progressName}/>

        {projectId ? (<div>
            <label className="block text-sm font-medium text-gray-700">Dự án</label>
            <p className="mt-1 text-base font-semibold text-gray-900">
              {((_b = projects.find(function (p) { return p._id === projectId; })) === null || _b === void 0 ? void 0 : _b.projectName) || 'Không tìm thấy dự án'}
            </p>
          </div>) : (<SelectField_1.default label="Dự án" options={projectOptions} optionLabel="label" register={register('projectid', { required: 'Vui lòng chọn dự án' })} error={errors.projectid}/>)}

        <InputField_1.default label="Ngày Bắt Đầu" type="date" placeholder="Enter date" register={register('progressStart', { required: 'Vui lòng nhập ngày bắt đầu' })} error={errors.progressStart}/>

        <InputField_1.default label="Ngày Kết Thúc" type="date" placeholder="Enter date" register={register('progressEnd', { required: 'Vui lòng nhập ngày kết thúc' })} error={errors.progressEnd}/>

        <SelectField_1.default label="Loại Tiến Độ" options={categoryOptions} optionLabel="label" register={register('progressCategory', { required: 'Vui lòng chọn loại tiến độ' })} error={errors.progressCategory}/>

        <SelectField_1.default label="Thông Báo" options={notificationOptions} optionLabel="label" register={register('notificationSent', { required: 'Vui lòng chọn thông báo' })} error={errors.notificationSent}/>

        <SelectField_1.default label="Người Nhận Việc" options={employeeOptions} optionLabel="label" register={register('taskRecipient', { required: 'Vui lòng chọn người nhận việc' })} error={errors.taskRecipient}/>

        <div>
          <label className="block text-sm font-medium text-gray-700">Độ Ưu Tiên</label>
          <select onChange={handlePriorityChange} className="w-full border p-2 rounded-md">
            <option value="high">Cao</option>
            <option value="medium">Trung bình</option>
            <option value="low">Thấp</option>
          </select>
          <p className="mt-1 text-gray-600">Mức ưu tiên: {priorityContext.getLabel()}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Trạng Thái</label>
          <select onChange={handleStatusChange} className="w-full border p-2 rounded-md">
            <option value="not_started">Needs Review</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <p className="mt-1 text-gray-600">Trạng thái: {statusContext.getLabel()}</p>
        </div>

        <InputField_1.default label="Mô tả" placeholder="Nhập Mô tả" type="text" register={register('description', { required: 'Vui lòng nhập Mô tả' })} error={errors.description}/>
    <div className="flex items-center">
  <strong className="mr-2">Employee</strong>
  <div className="text-gray-600 font-semibold">
    {selectedEmployee ? selectedEmployee.employeeName : 'No employee selected'}
  </div>
  <input type="hidden" value={(selectedEmployee === null || selectedEmployee === void 0 ? void 0 : selectedEmployee._id) || ''} {...register('taskAssignPerson')}/>
    </div>

    <div className="col-span-2 flex justify-center space-x-4">
  <button type="button" className="bg-gray-400 text-white py-2 px-6 rounded-md hover:bg-gray-500" onClick={onClose}>
    Hủy
  </button>
  <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 disabled:opacity-50" disabled={isSubmitting}>
    {isSubmitting ? 'Đang tạo...' : 'Tạo Tiến Độ'}
  </button>
    </div>

      </form>
    </div>);
};
exports.default = CreateProgressItem;
