'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import InputField from '../../input/InputField';
import SelectField from '../../input/SelectField';

const API_TASK_URL = 'http://localhost:3000/tasks';
const API_CATEGORY_URL = 'http://localhost:3000/taskcategories';
const API_NOTIFICATION_URL = 'http://localhost:3000/notifications';
const API_ASSIGNPERSON_URL = 'http://localhost:3000/employees';

interface EditTaskItemProps {
  taskId: string;
  onClose: () => void;
}

interface TaskData {
  taskName?: string;
  progressName?: string;
  taskCategory?: string;
  taskStart?: string;
  taskEnd?: string;
  notificationSent?: string;
  taskAssignPerson?: string;
  taskRecipient?: string;
  priority?: string;
  description?: string;
  status?: string;
}

const statusOptions = [
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Needs Review', label: 'Needs Review' },
  { value: 'Completed', label: 'Completed' },
];

const priorityOptions = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
]
const EditTaskItem: React.FC<EditTaskItemProps> = ({ taskId, onClose }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<TaskData>();
  const [categories, setCategories] = useState<{ _id: string; taskCategoryName: string }[]>([]);
  const [notifications, setNotifications] = useState<{ _id: string; notification_name: string }[]>([]);
  const [employees, setEmployees] = useState<{ _id: string; employeeName: string }[]>([]);
  const [taskData, setTaskData] = useState<TaskData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [taskRes, categoriesRes, employeesRes, notificationsRes] = await Promise.all([
          axios.get(`${API_TASK_URL}/${taskId}`),
          axios.get(API_CATEGORY_URL),
          axios.get(API_ASSIGNPERSON_URL),
          axios.get(API_NOTIFICATION_URL)
        ]);

        const task = taskRes.data;
        setTaskData(task);
        const formatDate = (isoString: string) => isoString?.split('T')[0];
        setValue('taskName', task.taskName);
        setValue('taskStart', formatDate(task.taskStart));
        setValue('taskEnd', formatDate(task.taskEnd));
        setValue('priority', task.priority || '');
        setValue('description', task.description || '');
        setValue('status', task.status || '');
        setValue('taskCategory', task.taskCategory?._id || '');
        setValue('notificationSent', task.notificationSent?._id || '');
        setValue('taskAssignPerson', task.taskAssignPerson?._id || '');
        setValue('taskRecipient', task.taskRecipient?._id || '');

        setCategories(categoriesRes.data);
        setEmployees(employeesRes.data);
        setNotifications(notificationsRes.data);
      } catch (error) {
        toast.error('Failed to load task data');
        console.error('Fetch Data Error:', error);
      }
    };

    fetchData();
  }, [taskId, setValue]);

  const onSubmit = async (data: TaskData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await axios.patch(`${API_TASK_URL}/${taskId}`, data);
      toast.success('Task updated successfully');
      onClose();
      window.location.reload();

    } catch (error) {
      toast.error('Error updating task');
      console.error('API Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!taskData) {
    return <p className="text-center text-gray-500">Loading task data...</p>;
  }

  return (
    <div className="flex flex-col bg-gray-100 p-6 rounded-lg shadow-lg max-w-4xl mx-auto ">
      <div className="border-b-[1px] w-full  pb-3 mb-3 border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">Edit Task</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-sm">
        <InputField placeholder="Enter Task Name" label="Task" type="text" register={register('taskName')} error={errors.taskName} />
        <div className="flex gap-4 justify-between">
          <InputField placeholder="Select start date" label="Start Date" type="date" register={register('taskStart')} error={errors.taskStart} />
          <InputField placeholder="Select end date" label="End Date" type="date" register={register('taskEnd')} error={errors.taskEnd} />
        </div>

        <InputField placeholder="Enter description" label="Description" type="text" register={register('description')} error={errors.description} />

        <div className="flex gap-4 justify-between">
          <SelectField
            optionLabel="label"
            label="Status"
            options={statusOptions}
            register={register('status', { required: "Status is required" })}
            error={errors.status}
          />
          <SelectField
            optionLabel="label"
            label="Priority"
            options={priorityOptions}
            register={register('priority', { required: "Priority is required" })}
            error={errors.priority}
          />
        </div>


        <SelectField optionLabel="label" label="Task Category" options={categories.map(c => ({ value: c._id, label: c.taskCategoryName }))} register={register('taskCategory')} error={errors.taskCategory} />
        <SelectField optionLabel="label" label="Notification Sent" options={notifications.map(n => ({ value: n._id, label: n.notification_name }))} register={register('notificationSent')} error={errors.notificationSent} />
        <div className="flex gap-4">
          <SelectField optionLabel="label" label="Assign Person" options={employees.map(e => ({ value: e._id, label: e.employeeName }))} register={register('taskAssignPerson')} error={errors.taskAssignPerson} />
          <SelectField optionLabel="label" label="Recipient" options={employees.map(e => ({ value: e._id, label: e.employeeName }))} register={register('taskRecipient')} error={errors.taskRecipient} />
        </div>


        <div className="text-center flex gap-2 justify-between ">

          <button type="submit" className={`bg-blue-500 mt-4 text-white py-2 px-4 rounded-md ${isSubmitting ? 'opacity-50' : ''}`} disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Task'}
          </button>
          <button
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskItem;