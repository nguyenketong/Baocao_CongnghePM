'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../input/InputField';
import SelectField from '../../input/SelectField';
import { ProgressData } from '@/app/models/Progress';
import { useProgressData } from '@/app/components/hook/progress/editprogressItemHandle';
import { useEditProgressCommand } from '@/app/components/command/progress/editprogressItemCommand';

interface EditProgressItemProps {
  progressId: string;
  onClose: () => void;
}

const EditProgressItem: React.FC<EditProgressItemProps> = ({ progressId, onClose }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProgressData>();
  const { categories, notifications, employees, loading } = useProgressData(progressId, setValue);
  const { onSubmit, isSubmitting } = useEditProgressCommand(progressId, onClose);

  if (loading) {
    return <p className="text-center text-gray-500">Loading progress data...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Progress</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Dòng 1 */}
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Progress Name" type="text" placeholder="Enter project name" register={register('progressName')} error={errors.progressName} />
          <InputField label="Priority" type="text" placeholder="Enter priority" register={register('priority')} error={errors.priority} />
        </div>

        {/* Dòng 2 */}
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Start Date" type="date" placeholder="Select start date" register={register('progressStart')} error={errors.progressStart} />
          <InputField label="End Date" type="date" placeholder="Select end date" register={register('progressEnd')} error={errors.progressEnd} />
        </div>

        {/* Dòng 3 */}
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Status" type="text" placeholder="Enter Status" register={register('status')} error={errors.status} />
          <InputField label="Description" type="text" placeholder="Enter Description" register={register('description')} error={errors.description} />
        </div>

        {/* Dòng 4 */}
        <div className="grid grid-cols-2 gap-4">
          <SelectField optionLabel="label" label="Progress Category" options={categories} register={register('progressCategory')} error={errors.progressCategory} />
          <SelectField optionLabel="label" label="Notification Sent" options={notifications} register={register('notificationSent')} error={errors.notificationSent} />
        </div>

        {/* Dòng 5 */}
        <div className="grid grid-cols-2 gap-4">
          <SelectField optionLabel="label" label="Assign Person" options={employees} register={register('taskAssignPerson')} error={errors.taskAssignPerson} />
          <SelectField optionLabel="label" label="Recipient" options={employees} register={register('taskRecipient')} error={errors.taskRecipient} />
        </div>

        {/* Button Submit */}
        <div className="text-center">
        <button
    type="button"
    className="bg-gray-400 text-white py-2 px-6 rounded-md hover:bg-gray-500"
    onClick={onClose}
  >
    Hủy
  </button>
          <button type="submit" className={`bg-blue-500 text-white py-2 px-6 rounded-md ${isSubmitting ? 'opacity-50' : ''}`} disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Progress'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProgressItem;