'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import InputField from '../../input/InputField';
import SelectField from '../../input/SelectField';
import { ProjectData } from '@/app/models/project';

import { useCreateProject } from '@/app/components/hook/project/createprojectItemHandle';
import { ProjectCommandFactory } from '../../command/project/ProjectCommandFactory';
import { useProjectState } from './createProject/useProjectState';

const API_PROJECT_URL = 'http://localhost:3000/projects';

interface CreateProjectItemProps {
  onClose: () => void;
}

const CreateProjectItem: React.FC<CreateProjectItemProps> = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProjectData>();
  const { categories, notifications, assignedPerson } = useCreateProject();
  const { priority, setPriority, file, setFile, onFileChange } = useProjectState();

  const onSubmit = (data: ProjectData) => {
    const command = ProjectCommandFactory.createCommand(
      'create',
      { data: { ...data, priority }, file },
      () => {
        reset();
        setFile(null);
        setPriority('');
        mutate(API_PROJECT_URL);
        toast.success('Project created successfully!');
        onClose();
      }
    );

    command.execute();
  };

  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: category.projectCategoryName,
  }));

  const employeeOptions = assignedPerson.map((employee) => ({
    value: employee._id,
    label: employee.employeeName,
  }));

  const notificationOptions = notifications.map((notification) => ({
    value: notification._id,
    label: notification.notification_name,
  }));

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg max-w-3xl mx-auto border border-gray-200 w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">Create Project</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Project Name" placeholder="Enter project name" type="text" register={register('projectName', { required: 'Project name is required' })} error={errors.projectName} />
          <SelectField label="Project Category" options={categoryOptions} optionLabel="label" register={register('projectCategory', { required: 'Category is required' })} error={errors.projectCategory} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-700">Image *</label>
            <input type="file" onChange={onFileChange} required className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <InputField label="Project Start Date" placeholder="mm/dd/yyyy" type="date" register={register('projectStart', { required: 'Start date is required' })} error={errors.projectStart} />
          <InputField label="Project End Date" placeholder="mm/dd/yyyy" type="date" register={register('projectEnd', { required: 'End date is required' })} error={errors.projectEnd} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectField label="Notification Sent" options={notificationOptions} optionLabel="label" register={register('notificationSent', { required: 'Notification is required' })} error={errors.notificationSent} />
          <SelectField label="Task Assign Person" options={employeeOptions} optionLabel="label" register={register('assignedPerson', { required: 'Employee is required' })} error={errors.assignedPerson} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Budget" placeholder="Enter budget" type="number" register={register('budget', { required: 'Budget is required' })} error={errors.budget} />
          <div>
            <label className="block font-medium text-gray-700">Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
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
    </div>
  );
};

export default CreateProjectItem;
