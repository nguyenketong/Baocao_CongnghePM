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
var API_REPORT_URL = 'http://localhost:3000/reports';
var API_EMPLOYEE_URL = 'http://localhost:3000/employees';
var API_TASK_URL = 'http://localhost:3000/tasks';
var API_PROGRESS_URL = 'http://localhost:3000/progress';
var EditReportItem = function (_a) {
    var reportId = _a.reportId, onClose = _a.onClose;
    var _b = (0, react_hook_form_1.useForm)(), register = _b.register, handleSubmit = _b.handleSubmit, setValue = _b.setValue, errors = _b.formState.errors;
    var _c = (0, react_1.useState)(null), file = _c[0], setFile = _c[1];
    var _d = (0, react_1.useState)([]), employees = _d[0], setEmployees = _d[1];
    var _e = (0, react_1.useState)([]), tasks = _e[0], setTasks = _e[1];
    var _f = (0, react_1.useState)([]), setProgresses = _f[1];
    var _g = (0, react_1.useState)(null), existingFile = _g[0], setExistingFile = _g[1];
    var _h = (0, react_1.useState)(false), isSubmitting = _h[0], setIsSubmitting = _h[1];
    var router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, reportRes, employeesRes, tasksRes, progressesRes, report, error_1;
            var _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.all([
                                axios_1.default.get("".concat(API_REPORT_URL, "/").concat(reportId)),
                                axios_1.default.get(API_EMPLOYEE_URL),
                                axios_1.default.get(API_TASK_URL),
                                axios_1.default.get(API_PROGRESS_URL)
                            ])];
                    case 1:
                        _a = _e.sent(), reportRes = _a[0], employeesRes = _a[1], tasksRes = _a[2], progressesRes = _a[3];
                        report = reportRes.data;
                        setExistingFile(report.filerepport || null);
                        setValue('reportName', report.reportName);
                        setValue('submission_time', report.submission_time);
                        setValue('status', report.status);
                        setValue('notereport', report.notereport);
                        setValue('id_employee', ((_b = report.id_employee) === null || _b === void 0 ? void 0 : _b._id) || '');
                        setValue('id_task', ((_c = report.id_task) === null || _c === void 0 ? void 0 : _c._id) || '');
                        setValue('id_progress', ((_d = report.id_progress) === null || _d === void 0 ? void 0 : _d._id) || '');
                        setEmployees(employeesRes.data);
                        setTasks(tasksRes.data);
                        setProgresses(progressesRes.data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _e.sent();
                        react_toastify_1.toast.error('Failed to load report data');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, [reportId, setValue]);
    var onFileChange = function (e) {
        var _a;
        if ((_a = e.target.files) === null || _a === void 0 ? void 0 : _a.length) {
            setFile(e.target.files[0]);
        }
    };
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var formData, error_2;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (isSubmitting)
                        return [2 /*return*/];
                    setIsSubmitting(true);
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, 4, 5]);
                    formData = new FormData();
                    formData.append('reportName', ((_a = data.reportName) === null || _a === void 0 ? void 0 : _a.trim()) || '');
                    formData.append('submission_time', data.submission_time || '');
                    formData.append('status', ((_b = data.status) === null || _b === void 0 ? void 0 : _b.trim()) || '');
                    formData.append('notereport', ((_c = data.notereport) === null || _c === void 0 ? void 0 : _c.trim()) || '');
                    formData.append('id_employee', data.id_employee || '');
                    if (data.id_task && data.id_task !== '') {
                        formData.append('id_task', data.id_task);
                    }
                    if (data.id_progress && data.id_progress !== '') {
                        formData.append('id_progress', data.id_progress);
                    }
                    if (file) {
                        formData.append('filerepport', file);
                    }
                    else if (existingFile) {
                        formData.append('filerepport', existingFile);
                    }
                    return [4 /*yield*/, axios_1.default.patch("".concat(API_REPORT_URL, "/").concat(reportId), formData, {
                            headers: { 'Content-Type': 'multipart/form-data' },
                        })];
                case 2:
                    _d.sent();
                    react_toastify_1.toast.success('Report updated successfully');
                    onClose();
                    router.refresh();
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _d.sent();
                    react_toastify_1.toast.error('Error updating report');
                    return [3 /*break*/, 5];
                case 4:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (<div className=" bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Report</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <div className="flex flex-col">
          <strong className="mb-2">Report Name </strong>
          <InputField_1.default label="" placeholder="Enter report name" type="text" register={register('reportName')} error={errors.reportName}/>
        </div>

        <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <strong className="mb-2">Submission Time </strong>
          <InputField_1.default label="" placeholder="Select date" type="date" register={register('submission_time')} error={errors.submission_time}/>       
        </div>
        
        <div className="flex flex-col">
          <strong className="mb-2">Status </strong>
          <InputField_1.default label="" placeholder="Enter status" type="text" register={register('status')} error={errors.status}/>       
        </div>
        </div>
        <div className="flex flex-col">
          <strong className="mb-2">Note Report </strong>
          <InputField_1.default label="" placeholder="Enter note" type="text" register={register('notereport')} error={errors.notereport}/>       
        </div>

        <div className="form-group flex flex-col">
          <strong className="mb-2">Report File</strong>
          {existingFile && <a href={"http://localhost:3000".concat(existingFile)} target="_blank" className="text-blue-500 mb-2">View existing file</a>}
          <input type="file" onChange={onFileChange} className="form-input file-input mb-2"/>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <strong className="w-full mr-2">Employee</strong>
          <div className='w-full'>
          <SelectField_1.default optionLabel="label" label="" options={employees.map(function (e) { return ({ value: e._id, label: e.employeeName }); })} register={register('id_employee')} error={errors.id_employee}/>
            </div>
        </div>

        <div className="flex flex-col">
          <strong className="w-full mr-2">Task</strong>
          <div className='w-full'>
            <SelectField_1.default optionLabel="label" label="" options={tasks.map(function (t) { return ({ value: t._id, label: t.taskName }); })} register={register('id_task')} error={errors.id_task}/></div>
        </div>
        </div>

        <div className="flex justify-between w-100 items-center">
          <button type="submit" className={"mt-6 w-70 h-15 px-4 py-2 flex flex-col bg-[#2D336B] text-white rounded hover:bg-gray-600 transition-colors duration-200\n                    ".concat(isSubmitting ? 'opacity-50' : '')} disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Update Report'}
          </button>
          <button className="mt-6 w-70 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200" onClick={onClose} // Close modal on click
    >
            Close
          </button>
        </div>
      </form>
    </div>);
};
exports.default = EditReportItem;
