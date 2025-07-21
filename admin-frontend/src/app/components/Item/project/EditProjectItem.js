'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var editprojectItemHanld_1 = require("@/app/components/hook/project/editprojectItemHanld");
var InputField_1 = require("../../input/InputField");
var SelectField_1 = require("../../input/SelectField");
var PriorityState_1 = require("./editProject/PriorityState");
var EditProjectItem = function (_a) {
    var projectId = _a.projectId, onClose = _a.onClose;
    var _b = (0, editprojectItemHanld_1.useEditProjectItem)(projectId, onClose), register = _b.register, handleSubmit = _b.handleSubmit, onSubmit = _b.onSubmit, errors = _b.errors, onFileChange = _b.onFileChange, categories = _b.categories, notifications = _b.notifications, employees = _b.employees, projectData = _b.projectData, existingImage = _b.existingImage, isSubmitting = _b.isSubmitting;
    /** 🔹 State Pattern cho Priority */
    var _c = (0, react_1.useState)(new PriorityState_1.LowPriority()), priorityState = _c[0], setPriorityState = _c[1];
    var handlePriorityChange = function (event) {
        var value = event.target.value;
        switch (value) {
            case 'low':
                setPriorityState(new PriorityState_1.LowPriority());
                break;
            case 'medium':
                setPriorityState(new PriorityState_1.MediumPriority());
                break;
            case 'high':
                setPriorityState(new PriorityState_1.HighPriority());
                break;
            default:
                setPriorityState(new PriorityState_1.LowPriority());
        }
    };
    if (!projectData) {
        return <p className="text-center text-gray-500">Loading project data...</p>;
    }
    return (<div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Project</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 🔹 Project Name */}
        <InputField_1.default label="Project Name" placeholder="Enter project name" type="text" register={register('projectName', { required: 'Project name is required' })} error={errors.projectName}/>

        {/* 🔹 Categories & Notifications */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SelectField_1.default label="Project Category" options={categories.map(function (c) { return ({ value: c._id, label: c.projectCategoryName }); })} optionLabel="label" register={register('projectCategory', { required: 'Category is required' })} error={errors.projectCategory}/>
          <SelectField_1.default label="Notification Sent" options={notifications.map(function (n) { return ({ value: n._id, label: n.notification_name }); })} optionLabel="label" register={register('notificationSent', { required: 'Notification is required' })} error={errors.notificationSent}/>
        </div>

        {/* 🔹 Start Date & End Date */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField_1.default label="Start Date" placeholder="Select start date" type="date" register={register('projectStart', { required: 'Start date is required' })} error={errors.projectStart}/>
          <InputField_1.default label="End Date" placeholder="Select end date" type="date" register={register('projectEnd', { required: 'End date is required' })} error={errors.projectEnd}/>
        </div>

        {/* 🔹 Budget & Priority */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField_1.default label="Budget" placeholder="Enter budget" type="number" register={register('budget', { required: 'Budget is required' })} error={errors.budget}/>

          {/* 🔹 Priority Selector */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Priority</label>
            <select onChange={handlePriorityChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-300">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div className={"mt-2 text-center py-1 px-3 rounded-md ".concat(priorityState.getClass())}>
              {priorityState.getLabel()}
            </div>
          </div>
        </div>

        {/* 🔹 Project Image */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Project Image</label>
          {existingImage && (<img src={"http://localhost:3000".concat(existingImage)} alt="Project" className="w-40 h-40 object-cover mb-2 rounded-md shadow-md"/>)}
          <input type="file" onChange={onFileChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none"/>
        </div>

        {/* 🔹 Assigned Person */}
        <SelectField_1.default label="Assigned Person" options={employees.map(function (e) { return ({ value: e._id, label: e.employeeName }); })} optionLabel="label" register={register('assignedPerson', { required: 'Employee is required' })} error={errors.assignedPerson}/>

        {/* 🔹 Description */}
        <InputField_1.default label="Description" placeholder="Enter project description" type="text" register={register('description')} error={errors.description}/>

        {/* 🔹 Submit & Cancel Buttons */}
        <div className="flex justify-center gap-4">
          <button type="submit" className={"bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition ".concat(isSubmitting ? 'opacity-50 cursor-not-allowed' : '')} disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Project'}
          </button>
          <button type="button" onClick={onClose} className="bg-gray-400 text-white py-2 px-6 rounded-md hover:bg-gray-500 transition">
            Cancel
          </button>
        </div>
      </form>
    </div>);
};
exports.default = EditProjectItem;
