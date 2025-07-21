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
var react_hook_form_1 = require("react-hook-form");
var axios_1 = require("axios");
var react_toastify_1 = require("react-toastify");
var swr_1 = require("swr");
var InputField_1 = require("../../input/InputField");
var SelectField_1 = require("../../input/SelectField");
var API_BASE_URL = 'http://localhost:3000';
var API_NOTIFICATION_URL = "".concat(API_BASE_URL, "/notifications");
var API_CATEGORY_URL = "".concat(API_BASE_URL, "/taskcategories");
var API_TASK_URL = "".concat(API_BASE_URL, "/tasks");
var API_ASSIGNPERSON_URL = "".concat(API_BASE_URL, "/employees");
var API_PROGRESS_URL = "".concat(API_BASE_URL, "/progress");
var statusOptions = [
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Needs Review', label: 'Needs Review' },
    { value: 'Completed', label: 'Completed' },
];
var priorityOptions = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
];
var CreateTaskItem = function (_a) {
    var _b;
    var progressId = _a.progressId, onClose = _a.onClose;
    var _c = (0, react_hook_form_1.useForm)({
        defaultValues: {
            progressId: progressId || undefined,
        },
    }), register = _c.register, handleSubmit = _c.handleSubmit, errors = _c.formState.errors, reset = _c.reset, setValue = _c.setValue;
    var _d = (0, react_1.useState)([]), categories = _d[0], setCategories = _d[1];
    var _e = (0, react_1.useState)([]), notifications = _e[0], setNotifications = _e[1];
    var _f = (0, react_1.useState)([]), progresses = _f[0], setProgresses = _f[1];
    var _g = (0, react_1.useState)(false), isSubmitting = _g[0], setIsSubmitting = _g[1];
    var _h = (0, react_1.useState)(null), currentUser = _h[0], setCurrentUser = _h[1];
    var _j = (0, react_1.useState)([]), filteredEmployees = _j[0], setFilteredEmployees = _j[1];
    (0, react_1.useEffect)(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, categoriesRes, employeesRes, notificationsRes, progressesRes, storedEmployeeId_1, foundUser_1, filtered, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.all([
                                axios_1.default.get(API_CATEGORY_URL),
                                axios_1.default.get(API_ASSIGNPERSON_URL),
                                axios_1.default.get(API_NOTIFICATION_URL),
                                axios_1.default.get(API_PROGRESS_URL),
                            ])];
                    case 1:
                        _a = _b.sent(), categoriesRes = _a[0], employeesRes = _a[1], notificationsRes = _a[2], progressesRes = _a[3];
                        setCategories(categoriesRes.data || []);
                        setNotifications(notificationsRes.data || []);
                        setProgresses(progressesRes.data || []);
                        storedEmployeeId_1 = localStorage.getItem('employeeId');
                        if (storedEmployeeId_1) {
                            foundUser_1 = employeesRes.data.find(function (e) { return e._id === storedEmployeeId_1; });
                            console.log("Nhân viên tìm thấy:", foundUser_1);
                            if (foundUser_1) {
                                setCurrentUser(foundUser_1);
                                setValue('taskAssignPerson', foundUser_1._id);
                                filtered = employeesRes.data.filter(function (employee) { var _a; return (_a = employee.team_id) === null || _a === void 0 ? void 0 : _a.some(function (team) { var _a, _b; return ((_a = team.teamLead) === null || _a === void 0 ? void 0 : _a.toString()) === ((_b = foundUser_1._id) === null || _b === void 0 ? void 0 : _b.toString()); }); });
                                setFilteredEmployees(filtered);
                            }
                            else {
                                react_toastify_1.toast.warn('Không tìm thấy nhân viên với ID đã lưu');
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        react_toastify_1.toast.error('Lỗi khi tải dữ liệu');
                        console.error('Lỗi API:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, [setValue]);
    (0, react_1.useEffect)(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, categoriesRes, employeesRes, notificationsRes, progressesRes, storedEmployeeId_2, foundUser_2, filtered, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.all([
                                axios_1.default.get(API_CATEGORY_URL),
                                axios_1.default.get(API_ASSIGNPERSON_URL),
                                axios_1.default.get(API_NOTIFICATION_URL),
                                axios_1.default.get(API_PROGRESS_URL),
                            ])];
                    case 1:
                        _a = _b.sent(), categoriesRes = _a[0], employeesRes = _a[1], notificationsRes = _a[2], progressesRes = _a[3];
                        setCategories(categoriesRes.data || []);
                        setNotifications(notificationsRes.data || []);
                        setProgresses(progressesRes.data || []);
                        storedEmployeeId_2 = localStorage.getItem('employeeId');
                        if (storedEmployeeId_2) {
                            foundUser_2 = employeesRes.data.find(function (e) { return e._id === storedEmployeeId_2; });
                            console.log("Nhân viên tìm thấy:", foundUser_2);
                            if (foundUser_2) {
                                setCurrentUser(foundUser_2);
                                setValue('taskAssignPerson', foundUser_2._id);
                                filtered = employeesRes.data.filter(function (employee) {
                                    return employee.team_id.some(function (team) { return team.teamLead === foundUser_2._id; });
                                } // Kiểm tra nếu teamLead của team bằng với foundUser._id
                                );
                                setFilteredEmployees(filtered);
                            }
                            else {
                                react_toastify_1.toast.warn('Không tìm thấy nhân viên với ID đã lưu');
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        react_toastify_1.toast.error('Lỗi khi tải dữ liệu');
                        console.error('Lỗi API:', error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, [setValue]);
    (0, react_1.useEffect)(function () {
        if (progressId) {
            setValue('progressId', progressId);
        }
    }, [progressId, setValue]);
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isSubmitting)
                        return [2 /*return*/];
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, axios_1.default.post(API_TASK_URL, data)];
                case 2:
                    response = _a.sent();
                    if (response.status === 200 || response.status === 201) {
                        react_toastify_1.toast.success('Nhiệm vụ đã được tạo thành công');
                        reset();
                        (0, swr_1.mutate)(API_TASK_URL);
                        onClose();
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_3 = _a.sent();
                    react_toastify_1.toast.error('Lỗi khi tạo nhiệm vụ. Vui lòng thử lại.');
                    console.error('Lỗi API:', error_3);
                    return [3 /*break*/, 5];
                case 4:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var categoryOptions = categories.map(function (category) { return ({
        value: category._id,
        label: category.taskCategoryName,
    }); });
    var notificationOptions = notifications.map(function (notification) { return ({
        value: notification._id,
        label: notification.notification_name,
    }); });
    var progressOptions = progresses.map(function (progress) { return ({
        value: progress._id,
        label: progress.progressName,
    }); });
    return (<div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="border-b-[1px] w-full  pb-3 mb-3 border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">Create Task</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-sm">
        <InputField_1.default label="Task Name" type="text" placeholder="Enter Task Name" register={register('taskName', { required: 'Task name is required' })} error={errors.taskName}/>

        {progressId ? (<div>
            <label className="block text-sm font-medium text-gray-700">Progress</label>
            <p className="mt-1 text-base font-semibold text-gray-900">
              {((_b = progresses.find(function (p) { return p._id === progressId; })) === null || _b === void 0 ? void 0 : _b.progressName) || 'Progress not found'}
            </p>
          </div>) : (<SelectField_1.default label="Progress" options={progressOptions} optionLabel="label" register={register('progressId', { required: 'Please select progress' })} error={errors.progressId}/>)}

        <div className="flex gap-4 justify-between">
          <InputField_1.default placeholder="Enter date" label="Start Date" type="date" register={register('taskStart', { required: 'Please select start date' })} error={errors.taskStart}/>
          <InputField_1.default placeholder="Enter date" label="End Date" type="date" register={register('taskEnd', { required: 'Please select end date' })} error={errors.taskEnd}/>
        </div>
        <SelectField_1.default label="Task Category" options={categoryOptions} optionLabel="label" register={register('taskCategory', { required: 'Please select task category' })} error={errors.taskCategory}/>

        <div className="flex gap-4 justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700">Assigner</label>
            <p className="mt-1 text-base font-semibold text-gray-900">
              {currentUser ? currentUser.employeeName : 'Employee not found'}
            </p>
          </div>

          <SelectField_1.default label="Recipient" options={filteredEmployees.map(function (employee) { return ({
            value: employee._id,
            label: employee.employeeName,
        }); })} optionLabel="label" register={register('taskRecipient', { required: 'Please select recipient' })} error={errors.taskRecipient}/>
        </div>



        <SelectField_1.default label="Notification" options={notificationOptions} optionLabel="label" register={register('notificationSent', { required: 'Please select notification' })} error={errors.notificationSent}/>

        <div className="flex gap-4 justify-between">
          <SelectField_1.default optionLabel="label" label="Status" options={statusOptions} register={register('status', { required: "Status is required" })} error={errors.status}/>
          <SelectField_1.default optionLabel="label" label="Priority" options={priorityOptions} register={register('priority', { required: "Priority is required" })} error={errors.priority}/>
        </div>

        <InputField_1.default placeholder="Enter description" label="Description" type="text" register={register('description', { required: 'Please enter description' })} error={errors.description}/>

        <div className="text-center flex gap-2 justify-between">
          <button type="submit" className="bg-blue-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-blue-600" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Task'}
          </button>
          <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
            Close
          </button>
        </div>
      </form>
    </div>);
};
exports.default = CreateTaskItem;
