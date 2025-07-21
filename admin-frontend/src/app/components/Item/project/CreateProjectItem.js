'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var react_toastify_1 = require("react-toastify");
var swr_1 = require("swr");
var InputField_1 = require("../../input/InputField");
var SelectField_1 = require("../../input/SelectField");
var createprojectItemHandle_1 = require("@/app/components/hook/project/createprojectItemHandle");
var ProjectCommandFactory_1 = require("../../command/project/ProjectCommandFactory");
var useProjectState_1 = require("./createProject/useProjectState");
var API_PROJECT_URL = 'http://localhost:3000/projects';
var CreateProjectItem = function (_a) {
    var onClose = _a.onClose;
    var _b = (0, react_hook_form_1.useForm)(), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.formState.errors, reset = _b.reset;
    var _c = (0, createprojectItemHandle_1.useCreateProject)(), categories = _c.categories, notifications = _c.notifications, assignedPerson = _c.assignedPerson;
    var _d = (0, useProjectState_1.useProjectState)(), priority = _d.priority, setPriority = _d.setPriority, file = _d.file, setFile = _d.setFile, onFileChange = _d.onFileChange;
    var onSubmit = function (data) {
        var command = ProjectCommandFactory_1.ProjectCommandFactory.createCommand('create', { data: __assign(__assign({}, data), { priority: priority }), file: file }, function () {
            reset();
            setFile(null);
            setPriority('');
            (0, swr_1.mutate)(API_PROJECT_URL);
            react_toastify_1.toast.success('Project created successfully!');
            onClose();
        });
        command.execute();
    };
    var categoryOptions = categories.map(function (category) { return ({
        value: category._id,
        label: category.projectCategoryName,
    }); });
    var employeeOptions = assignedPerson.map(function (employee) { return ({
        value: employee._id,
        label: employee.employeeName,
    }); });
    var notificationOptions = notifications.map(function (notification) { return ({
        value: notification._id,
        label: notification.notification_name,
    }); });
    return (<div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg max-w-3xl mx-auto border border-gray-200 w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">Create Project</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField_1.default label="Project Name" placeholder="Enter project name" type="text" register={register('projectName', { required: 'Project name is required' })} error={errors.projectName}/>
          <SelectField_1.default label="Project Category" options={categoryOptions} optionLabel="label" register={register('projectCategory', { required: 'Category is required' })} error={errors.projectCategory}/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-700">Image *</label>
            <input type="file" onChange={onFileChange} required className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
          </div>
          <InputField_1.default label="Project Start Date" placeholder="mm/dd/yyyy" type="date" register={register('projectStart', { required: 'Start date is required' })} error={errors.projectStart}/>
          <InputField_1.default label="Project End Date" placeholder="mm/dd/yyyy" type="date" register={register('projectEnd', { required: 'End date is required' })} error={errors.projectEnd}/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectField_1.default label="Notification Sent" options={notificationOptions} optionLabel="label" register={register('notificationSent', { required: 'Notification is required' })} error={errors.notificationSent}/>
          <SelectField_1.default label="Task Assign Person" options={employeeOptions} optionLabel="label" register={register('assignedPerson', { required: 'Employee is required' })} error={errors.assignedPerson}/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField_1.default label="Budget" placeholder="Enter budget" type="number" register={register('budget', { required: 'Budget is required' })} error={errors.budget}/>
          <div>
            <label className="block font-medium text-gray-700">Priority</label>
            <select value={priority} onChange={function (e) { return setPriority(e.target.value); }} className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="">Select priority</option>
              <option value="Highest">Highest</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
              <option value="Lowest">Lowest</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Description (optional)</label>
          <textarea {...register('description')} placeholder="Add any extra details about the request" className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
        </div>
        <div className="text-center">
          <button type="submit" className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Create Project
          </button>
        </div>
      </form>
    </div>);
};
exports.default = CreateProjectItem;
