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
var employeeFacade_1 = require("./employeeCreate/employeeFacade");
var CreateEmployeeItem = function (_a) {
    var onClose = _a.onClose;
    var _b = (0, react_hook_form_1.useForm)(), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.formState.errors, reset = _b.reset;
    var _c = (0, react_1.useState)(null), file = _c[0], setFile = _c[1];
    var _d = (0, react_1.useState)([]), departments = _d[0], setDepartments = _d[1];
    var _e = (0, react_1.useState)([]), designations = _e[0], setDesignations = _e[1];
    var _f = (0, react_1.useState)(false), isSubmitting = _f[0], setIsSubmitting = _f[1];
    (0, react_1.useEffect)(function () {
        employeeFacade_1.EmployeeFacade.fetchDepartmentsAndDesignations().then(function (_a) {
            var departments = _a.departments, designations = _a.designations;
            setDepartments(departments);
            setDesignations(designations);
        });
    }, []);
    var onFileChange = function (e) {
        var _a;
        if ((_a = e.target.files) === null || _a === void 0 ? void 0 : _a.length) {
            setFile(e.target.files[0]);
        }
    };
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isSubmitting)
                        return [2 /*return*/];
                    setIsSubmitting(true);
                    return [4 /*yield*/, employeeFacade_1.EmployeeFacade.createEmployee(data, file, reset, onClose)];
                case 1:
                    _a.sent();
                    setIsSubmitting(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create New Employee</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Employee Name *</label>
            <input className="w-full p-2 border rounded" {...register('employeeName', { required: true })} placeholder="Enter name"/>
            {errors.employeeName && <span className="text-red-500 text-sm">Required</span>}
          </div>
          <div>
            <label className="block text-sm font-medium">Profile Image *</label>
            <input type="file" onChange={onFileChange} className="w-full p-2 border rounded" required/>
          </div>
          <div>
            <label className="block text-sm font-medium">Joining Date *</label>
            <input type="date" className="w-full p-2 border rounded" {...register('joiningDate', { required: true })}/>
          </div>
          <div>
            <label className="block text-sm font-medium">Phone *</label>
            <input className="w-full p-2 border rounded" {...register('phone', { required: true })} placeholder="Enter phone number"/>
          </div>
          <div>
            <label className="block text-sm font-medium">Department *</label>
            <select className="w-full p-2 border rounded" {...register('department', { required: true })}>
              <option value="">Select Department</option>
              {departments.map(function (dept) { return <option key={dept._id} value={dept._id}>{dept.nameDepartment}</option>; })}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Designation *</label>
            <select className="w-full p-2 border rounded" {...register('designation', { required: true })}>
              <option value="">Select Designation</option>
              {designations.map(function (desig) { return <option key={desig._id} value={desig._id}>{desig.designationName}</option>; })}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea className="w-full p-2 border rounded" {...register('description')} placeholder="Enter description"/>
        </div>
        <h3 className="text-lg font-semibold mt-4">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Username *</label>
            <input className="w-full p-2 border rounded" {...register('account.userName', { required: true })} placeholder="Enter username"/>
          </div>
          <div>
            <label className="block text-sm font-medium">Password *</label>
            <input type="password" className="w-full p-2 border rounded" {...register('account.password', { required: true })} placeholder="Enter password"/>
          </div>
          <div>
            <label className="block text-sm font-medium">Email *</label>
            <input type="email" className="w-full p-2 border rounded" {...register('account.email', { required: true })} placeholder="Enter email"/>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Employee"}
          </button>
        </div>
      </form>
    </div>);
};
exports.default = CreateEmployeeItem;
