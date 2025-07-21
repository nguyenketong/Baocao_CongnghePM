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
var employeeEdit_1 = require("../hook/employee/employeeEdit");
var EmployeeFacade_1 = require("./employeeEdit/EmployeeFacade");
var EditEmployeeItem = function (_a) {
    var employee = _a.employee, onClose = _a.onClose;
    var _b = (0, employeeEdit_1.useEmployeeForm)(employee), register = _b.register, handleSubmit = _b.handleSubmit, setValue = _b.setValue, errors = _b.errors, file = _b.file, departments = _b.departments, designations = _b.designations, isSubmitting = _b.isSubmitting, setIsSubmitting = _b.setIsSubmitting, onFileChange = _b.onFileChange;
    (0, react_1.useEffect)(function () {
        var _a, _b;
        if (employee) {
            setValue('employeeName', employee.employeeName || '');
            setValue('phone', employee.phone || '');
            setValue('joiningDate', employee.joiningDate ? new Date(employee.joiningDate).toISOString().split('T')[0] : '');
            setValue('department', ((_a = employee.department_id) === null || _a === void 0 ? void 0 : _a._id) || '');
            setValue('designation', ((_b = employee.designation_id) === null || _b === void 0 ? void 0 : _b._id) || '');
            setValue('description', employee.description || '');
        }
    }, [employee, setValue]);
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isSubmitting)
                        return [2 /*return*/];
                    return [4 /*yield*/, EmployeeFacade_1.EmployeeFacade.updateEmployee(employee._id, data, file, setIsSubmitting, onClose)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Employee</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Employee Name *</label>
          <input {...register('employeeName', { required: 'Employee name is required' })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
          {errors.employeeName && <p className="text-red-500 text-sm">{errors.employeeName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Image</label>
          <input type="file" onChange={onFileChange} accept="image/*" className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none"/>
          {employee.employeeProfile && (<img src={"http://localhost:3000".concat(employee.employeeProfile)} alt="Profile" className="mt-2 h-20 w-20 rounded-full border"/>)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Joining Date</label>
            <input type="date" {...register('joiningDate')} max={new Date().toISOString().split('T')[0]} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input {...register('phone')} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select {...register('department')} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select Department</option>
              {departments.map(function (dept) { return (<option key={dept._id} value={dept._id}>{dept.nameDepartment}</option>); })}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Designation</label>
            <select {...register('designation')} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select Designation</option>
              {designations.map(function (desig) { return (<option key={desig._id} value={desig._id}>{desig.designationName}</option>); })}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea {...register('description')} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
        </div>

        <div className="flex justify-end space-x-3">
          <button type="button" className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300" onClick={onClose}>Cancel</button>
          <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
            {isSubmitting ? 'Updating...' : 'Update Employee'}
          </button>
        </div>
      </form>
    </div>);
};
exports.default = EditEmployeeItem;
