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
var axios_1 = require("axios");
var react_toastify_1 = require("react-toastify");
var swr_1 = require("swr");
var InputField_1 = require("../../input/InputField");
var FileUpload_1 = require("../../input/FileUpload");
var react_hook_form_1 = require("react-hook-form");
var API_BASE_URL = 'http://localhost:3000';
var API_REPORT_URL = "".concat(API_BASE_URL, "/reports");
var API_EMPLOYEE_URL = "".concat(API_BASE_URL, "/employees");
var API_TASK_URL = "".concat(API_BASE_URL, "/tasks");
var API_PROGRESS_URL = "".concat(API_BASE_URL, "/progress");
var CreateReportItem = function (_a) {
    var _b;
    var taskId = _a.taskId, onClose = _a.onClose;
    var _c = (0, react_hook_form_1.useForm)({
        defaultValues: {
            reportName: '',
            submission_time: '',
            status: '',
            id_employee: localStorage.getItem('employeeId') || '',
            id_task: taskId || undefined,
            id_progress: '',
        },
    }), register = _c.register, handleSubmit = _c.handleSubmit, errors = _c.formState.errors, reset = _c.reset, setValue = _c.setValue;
    var _d = (0, react_1.useState)(null), file = _d[0], setFile = _d[1];
    var _e = (0, react_1.useState)([]), employees = _e[0], setEmployees = _e[1];
    var _f = (0, react_1.useState)([]), tasks = _f[0], setTasks = _f[1];
    var _g = (0, react_1.useState)([]), progresses = _g[0], setProgresses = _g[1];
    var _h = (0, react_1.useState)(false), isSubmitting = _h[0], setIsSubmitting = _h[1];
    (0, react_1.useEffect)(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, employeesRes, tasksRes, progressesRes, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.all([
                                axios_1.default.get(API_EMPLOYEE_URL),
                                axios_1.default.get(API_TASK_URL),
                                axios_1.default.get(API_PROGRESS_URL)
                            ])];
                    case 1:
                        _a = _b.sent(), employeesRes = _a[0], tasksRes = _a[1], progressesRes = _a[2];
                        setEmployees(employeesRes.data);
                        setTasks(tasksRes.data);
                        setProgresses(progressesRes.data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        react_toastify_1.toast.error('Error loading data');
                        console.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    (0, react_1.useEffect)(function () {
        if (taskId) {
            // Dynamically set the value of taskId if it's passed in as a prop
            setValue('id_task', taskId);
        }
    }, [taskId, setValue]);
    var onFileChange = function (e) {
        var _a;
        if ((_a = e.target.files) === null || _a === void 0 ? void 0 : _a.length) {
            setFile(e.target.files[0]);
        }
    };
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var formData, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isSubmitting)
                        return [2 /*return*/];
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    formData = new FormData();
                    formData.append('reportName', data.reportName.trim());
                    formData.append('submission_time', data.submission_time);
                    formData.append('status', data.status.trim());
                    formData.append('notereport', data.notereport || '');
                    formData.append('id_employee', data.id_employee);
                    if (data.id_task)
                        formData.append('id_task', data.id_task);
                    if (data.id_progress)
                        formData.append('id_progress', data.id_progress);
                    if (file)
                        formData.append('filerepport', file);
                    return [4 /*yield*/, axios_1.default.post(API_REPORT_URL, formData, {
                            headers: { 'Content-Type': 'multipart/form-data' },
                        })];
                case 2:
                    _a.sent();
                    react_toastify_1.toast.success('The report has been created successfully');
                    reset();
                    setFile(null);
                    (0, swr_1.mutate)(API_REPORT_URL);
                    onClose();
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    react_toastify_1.toast.error('Error while generating report');
                    console.error('API Error:', error_2);
                    return [3 /*break*/, 5];
                case 4:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // const taskOptions = tasks.map((task) => ({
    //   value: task._id,
    //   label: task.taskName,
    // }));
    // const employeeOptions = employees.map((employee) => ({
    //   value: employee._id,
    //   label: employee.employeeName,
    // }));
    var progressOptions = progresses.map(function (progress) { return ({
        value: progress._id,
        label: progress.progressName,
    }); });
    // Find selected task and employee from the list using taskId and employeeId
    var selectedTask = tasks.find(function (task) { return task._id === taskId; });
    var selectedEmployee = employees.find(function (employee) { return employee._id === localStorage.getItem('employeeId'); });
    return (<div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Create Report</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col">
          <strong className="mb-2">Enter Name </strong>
          <InputField_1.default placeholder="Enter name" label="" type="text" register={register('reportName', { required: 'Report name is required' })} error={errors.reportName}/>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <strong className="w-full mr-2">Submission Time </strong>
            <div className='w-full'>
              <InputField_1.default placeholder="Enter date" label="" type="date" register={register('submission_time', { required: 'Submission deadline is required' })} error={errors.submission_time}/>
            </div>
          </div>

          <div className="flex flex-col">
            <strong className="w-full mr-2 mb-2">Status </strong>
            <select {...register('status', { required: 'Status is required' })} className="w-full border border-gray-300 p-2 rounded-md">
              <option value="">Select status</option>
              <option value="Success">Success</option>
              <option value="In Progress">In Progress</option>
              <option value="Need Review">Need Review</option>
            </select>
            {errors.status && <span className="text-red-500 text-sm">{errors.status.message}</span>}
          </div>
        </div>

        <div className="flex flex-col">
          <strong className="mb-2">Note </strong>
          <InputField_1.default placeholder="Enter note" label="" type="text" register={register('notereport')} error={errors.notereport}/>
        </div>

        <FileUpload_1.default onChange={onFileChange} error={errors.filerepport}/>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <strong className="mr-2 mb-2">Employee </strong>
            {/* Display selected employee name and disable select */}
            <div className="text-gray-600 font-semibold w-full p-2 border rounded-md h-10">
            {selectedEmployee ? selectedEmployee.employeeName : 'No employee selected'}
            
          </div>
            {/* Hidden input to store the employee ID */}
            <input type="hidden" value={(_b = localStorage.getItem('employeeId')) !== null && _b !== void 0 ? _b : undefined} {...register('id_employee')}/>
          </div>

          <div className="flex flex-col">
            <strong className="mr-2 mb-2">Task </strong>
            {/* Display selected task name and disable select */}
            <div className="text-gray-600 font-semibold w-full p-2 border rounded-md h-10">
              {selectedTask ? selectedTask.taskName : 'No task selected'}
            </div>
            {/* Hidden input to store the task ID */}
            <input type="hidden" value={taskId !== null && taskId !== void 0 ? taskId : undefined} {...register('id_task')}/>
        </div>
        </div>

        {/*<div className="flex flex-col">
          <strong className="mr-2">Progress </strong>
            <SelectField
              optionLabel="label"
              label=""
              options={progressOptions}
              register={register('id_progress')}
              error={errors.id_progress}
            />
        </div>*/}

        <div className="flex justify-between w-100 items-center">
          <button type="submit" className="bg-[#2D336B] hover:bg-gray-600 text-white py-2 px-6 rounded-md" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create'}
          </button>
          <button className="mt-6 w-70 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </div>);
};
exports.default = CreateReportItem;
