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
var react_hook_form_1 = require("react-hook-form");
var axios_1 = require("axios");
var react_toastify_1 = require("react-toastify");
var navigation_1 = require("next/navigation");
var InputField_1 = require("../../input/InputField");
var SelectField_1 = require("../../input/SelectField");
var API_TASK_URL = 'http://localhost:3000/tasks';
var API_CATEGORY_URL = 'http://localhost:3000/taskcategories';
var API_NOTIFICATION_URL = 'http://localhost:3000/notifications';
var API_ASSIGNPERSON_URL = 'http://localhost:3000/employees';
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
var EditTaskItem = function (_a) {
    var taskId = _a.taskId, onClose = _a.onClose;
    var _b = (0, react_hook_form_1.useForm)(), register = _b.register, handleSubmit = _b.handleSubmit, setValue = _b.setValue, errors = _b.formState.errors;
    var _c = (0, react_1.useState)([]), categories = _c[0], setCategories = _c[1];
    var _d = (0, react_1.useState)([]), notifications = _d[0], setNotifications = _d[1];
    var _e = (0, react_1.useState)([]), employees = _e[0], setEmployees = _e[1];
    var _f = (0, react_1.useState)(null), taskData = _f[0], setTaskData = _f[1];
    var _g = (0, react_1.useState)(false), isSubmitting = _g[0], setIsSubmitting = _g[1];
    var router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, taskRes, categoriesRes, employeesRes, notificationsRes, task, formatDate, error_1;
            var _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.all([
                                axios_1.default.get("".concat(API_TASK_URL, "/").concat(taskId)),
                                axios_1.default.get(API_CATEGORY_URL),
                                axios_1.default.get(API_ASSIGNPERSON_URL),
                                axios_1.default.get(API_NOTIFICATION_URL)
                            ])];
                    case 1:
                        _a = _f.sent(), taskRes = _a[0], categoriesRes = _a[1], employeesRes = _a[2], notificationsRes = _a[3];
                        task = taskRes.data;
                        setTaskData(task);
                        formatDate = function (isoString) { return isoString === null || isoString === void 0 ? void 0 : isoString.split('T')[0]; };
                        setValue('taskName', task.taskName);
                        setValue('taskStart', formatDate(task.taskStart));
                        setValue('taskEnd', formatDate(task.taskEnd));
                        setValue('priority', task.priority || '');
                        setValue('description', task.description || '');
                        setValue('status', task.status || '');
                        setValue('taskCategory', ((_b = task.taskCategory) === null || _b === void 0 ? void 0 : _b._id) || '');
                        setValue('notificationSent', ((_c = task.notificationSent) === null || _c === void 0 ? void 0 : _c._id) || '');
                        setValue('taskAssignPerson', ((_d = task.taskAssignPerson) === null || _d === void 0 ? void 0 : _d._id) || '');
                        setValue('taskRecipient', ((_e = task.taskRecipient) === null || _e === void 0 ? void 0 : _e._id) || '');
                        setCategories(categoriesRes.data);
                        setEmployees(employeesRes.data);
                        setNotifications(notificationsRes.data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _f.sent();
                        react_toastify_1.toast.error('Failed to load task data');
                        console.error('Fetch Data Error:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, [taskId, setValue]);
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isSubmitting)
                        return [2 /*return*/];
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, axios_1.default.patch("".concat(API_TASK_URL, "/").concat(taskId), data)];
                case 2:
                    _a.sent();
                    react_toastify_1.toast.success('Task updated successfully');
                    onClose();
                    window.location.reload();
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    react_toastify_1.toast.error('Error updating task');
                    console.error('API Error:', error_2);
                    return [3 /*break*/, 5];
                case 4:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    if (!taskData) {
        return <p className="text-center text-gray-500">Loading task data...</p>;
    }
    return (<div className="flex flex-col bg-gray-100 p-6 rounded-lg shadow-lg max-w-4xl mx-auto ">
      <div className="border-b-[1px] w-full  pb-3 mb-3 border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">Edit Task</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-sm">
        <InputField_1.default placeholder="Enter Task Name" label="Task" type="text" register={register('taskName')} error={errors.taskName}/>
        <div className="flex gap-4 justify-between">
          <InputField_1.default placeholder="Select start date" label="Start Date" type="date" register={register('taskStart')} error={errors.taskStart}/>
          <InputField_1.default placeholder="Select end date" label="End Date" type="date" register={register('taskEnd')} error={errors.taskEnd}/>
        </div>

        <InputField_1.default placeholder="Enter description" label="Description" type="text" register={register('description')} error={errors.description}/>

        <div className="flex gap-4 justify-between">
          <SelectField_1.default optionLabel="label" label="Status" options={statusOptions} register={register('status', { required: "Status is required" })} error={errors.status}/>
          <SelectField_1.default optionLabel="label" label="Priority" options={priorityOptions} register={register('priority', { required: "Priority is required" })} error={errors.priority}/>
        </div>


        <SelectField_1.default optionLabel="label" label="Task Category" options={categories.map(function (c) { return ({ value: c._id, label: c.taskCategoryName }); })} register={register('taskCategory')} error={errors.taskCategory}/>
        <SelectField_1.default optionLabel="label" label="Notification Sent" options={notifications.map(function (n) { return ({ value: n._id, label: n.notification_name }); })} register={register('notificationSent')} error={errors.notificationSent}/>
        <div className="flex gap-4">
          <SelectField_1.default optionLabel="label" label="Assign Person" options={employees.map(function (e) { return ({ value: e._id, label: e.employeeName }); })} register={register('taskAssignPerson')} error={errors.taskAssignPerson}/>
          <SelectField_1.default optionLabel="label" label="Recipient" options={employees.map(function (e) { return ({ value: e._id, label: e.employeeName }); })} register={register('taskRecipient')} error={errors.taskRecipient}/>
        </div>


        <div className="text-center flex gap-2 justify-between ">

          <button type="submit" className={"bg-blue-500 mt-4 text-white py-2 px-4 rounded-md ".concat(isSubmitting ? 'opacity-50' : '')} disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Task'}
          </button>
          <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </div>);
};
exports.default = EditTaskItem;
