'use client';
import React, { useState } from 'react';
import { useEditProjectItem } from '@/app/components/hook/project/editprojectItemHanld';
import InputField from '../../input/InputField';
import SelectField from '../../input/SelectField';
import { HighPriority, LowPriority, MediumPriority, PriorityState } from './editProject/PriorityState';

interface EditProjectItemProps {
  projectId: string;
  onClose: () => void;
}

const EditProjectItem: React.FC<EditProjectItemProps> = ({ projectId, onClose }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    onFileChange,
    categories,
    notifications,
    employees,
    projectData,
    existingImage,
    isSubmitting,
  } = useEditProjectItem(projectId, onClose);

  /** 🔹 State Pattern cho Priority */
  const [priorityState, setPriorityState] = useState<PriorityState>(new LowPriority());

  const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    switch (value) {
      case 'low':
        setPriorityState(new LowPriority());
        break;
      case 'medium':
        setPriorityState(new MediumPriority());
        break;
      case 'high':
        setPriorityState(new HighPriority());
        break;
      default:
        setPriorityState(new LowPriority());
    }
  };

  if (!projectData) {
    return <p className="text-center text-gray-500">Loading project data...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Project</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 🔹 Project Name */}
        <InputField
          label="Project Name"
          placeholder="Enter project name"
          type="text"
          register={register('projectName', { required: 'Project name is required' })}
          error={errors.projectName}
        />

        {/* 🔹 Categories & Notifications */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SelectField
            label="Project Category"
            options={categories.map(c => ({ value: c._id, label: c.projectCategoryName }))}
            optionLabel="label"
            register={register('projectCategory', { required: 'Category is required' })}
            error={errors.projectCategory}
          />
          <SelectField
            label="Notification Sent"
            options={notifications.map(n => ({ value: n._id, label: n.notification_name }))}
            optionLabel="label"
            register={register('notificationSent', { required: 'Notification is required' })}
            error={errors.notificationSent}
          />
        </div>

        {/* 🔹 Start Date & End Date */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField
            label="Start Date"
            placeholder="Select start date"
            type="date"
            register={register('projectStart', { required: 'Start date is required' })}
            error={errors.projectStart}
          />
          <InputField
            label="End Date"
            placeholder="Select end date"
            type="date"
            register={register('projectEnd', { required: 'End date is required' })}
            error={errors.projectEnd}
          />
        </div>

        {/* 🔹 Budget & Priority */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField
            label="Budget"
            placeholder="Enter budget"
            type="number"
            register={register('budget', { required: 'Budget is required' })}
            error={errors.budget}
          />

          {/* 🔹 Priority Selector */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Priority</label>
            <select
              onChange={handlePriorityChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-300"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div className={`mt-2 text-center py-1 px-3 rounded-md ${priorityState.getClass()}`}>
              {priorityState.getLabel()}
            </div>
          </div>
        </div>

        {/* 🔹 Project Image */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Project Image</label>
          {existingImage && (
            <img
              src={`http://localhost:3000${existingImage}`}
              alt="Project"
              className="w-40 h-40 object-cover mb-2 rounded-md shadow-md"
            />
          )}
          <input
            type="file"
            onChange={onFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none"
          />
        </div>

        {/* 🔹 Assigned Person */}
        <SelectField
          label="Assigned Person"
          options={employees.map(e => ({ value: e._id, label: e.employeeName }))}
          optionLabel="label"
          register={register('assignedPerson', { required: 'Employee is required' })}
          error={errors.assignedPerson}
        />

        {/* 🔹 Description */}
        <InputField
          label="Description"
          placeholder="Enter project description"
          type="text"
          register={register('description')}
          error={errors.description}
        />

        {/* 🔹 Submit & Cancel Buttons */}
        <div className="flex justify-center gap-4">
          <button
            type="submit"
            className={`bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update Project'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white py-2 px-6 rounded-md hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProjectItem;
