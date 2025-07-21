'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var InputField_1 = require("../../input/InputField");
var SelectField_1 = require("../../input/SelectField");
var editprogressItemHandle_1 = require("@/app/components/hook/progress/editprogressItemHandle");
var editprogressItemCommand_1 = require("@/app/components/command/progress/editprogressItemCommand");
var EditProgressItem = function (_a) {
    var progressId = _a.progressId, onClose = _a.onClose;
    var _b = (0, react_hook_form_1.useForm)(), register = _b.register, handleSubmit = _b.handleSubmit, setValue = _b.setValue, errors = _b.formState.errors;
    var _c = (0, editprogressItemHandle_1.useProgressData)(progressId, setValue), categories = _c.categories, notifications = _c.notifications, employees = _c.employees, loading = _c.loading;
    var _d = (0, editprogressItemCommand_1.useEditProgressCommand)(progressId, onClose), onSubmit = _d.onSubmit, isSubmitting = _d.isSubmitting;
    if (loading) {
        return <p className="text-center text-gray-500">Loading progress data...</p>;
    }
    return (<div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Progress</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Dòng 1 */}
        <div className="grid grid-cols-2 gap-4">
          <InputField_1.default label="Progress Name" type="text" placeholder="Enter project name" register={register('progressName')} error={errors.progressName}/>
          <InputField_1.default label="Priority" type="text" placeholder="Enter priority" register={register('priority')} error={errors.priority}/>
        </div>

        {/* Dòng 2 */}
        <div className="grid grid-cols-2 gap-4">
          <InputField_1.default label="Start Date" type="date" placeholder="Select start date" register={register('progressStart')} error={errors.progressStart}/>
          <InputField_1.default label="End Date" type="date" placeholder="Select end date" register={register('progressEnd')} error={errors.progressEnd}/>
        </div>

        {/* Dòng 3 */}
        <div className="grid grid-cols-2 gap-4">
          <InputField_1.default label="Status" type="text" placeholder="Enter Status" register={register('status')} error={errors.status}/>
          <InputField_1.default label="Description" type="text" placeholder="Enter Description" register={register('description')} error={errors.description}/>
        </div>

        {/* Dòng 4 */}
        <div className="grid grid-cols-2 gap-4">
          <SelectField_1.default optionLabel="label" label="Progress Category" options={categories} register={register('progressCategory')} error={errors.progressCategory}/>
          <SelectField_1.default optionLabel="label" label="Notification Sent" options={notifications} register={register('notificationSent')} error={errors.notificationSent}/>
        </div>

        {/* Dòng 5 */}
        <div className="grid grid-cols-2 gap-4">
          <SelectField_1.default optionLabel="label" label="Assign Person" options={employees} register={register('taskAssignPerson')} error={errors.taskAssignPerson}/>
          <SelectField_1.default optionLabel="label" label="Recipient" options={employees} register={register('taskRecipient')} error={errors.taskRecipient}/>
        </div>

        {/* Button Submit */}
        <div className="text-center">
        <button type="button" className="bg-gray-400 text-white py-2 px-6 rounded-md hover:bg-gray-500" onClick={onClose}>
    Hủy
  </button>
          <button type="submit" className={"bg-blue-500 text-white py-2 px-6 rounded-md ".concat(isSubmitting ? 'opacity-50' : '')} disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Progress'}
          </button>
        </div>
      </form>
    </div>);
};
exports.default = EditProgressItem;
