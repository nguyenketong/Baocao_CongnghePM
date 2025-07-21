'use client';
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import InputField from '../../input/InputField';
import FileUpload from '../../input/FileUpload';
import { useForm } from 'react-hook-form';

const API_BASE_URL = 'http://localhost:3000';
const API_REPORT_URL = `${API_BASE_URL}/reports`;
const API_EMPLOYEE_URL = `${API_BASE_URL}/employees`;
const API_TASK_URL = `${API_BASE_URL}/tasks`;
const API_PROGRESS_URL = `${API_BASE_URL}/progress`;

interface CreateReportItemProps {
  onClose: () => void;
  taskId?: string;
}

interface ReportData {
  reportName: string;
  submission_time: string;
  status: string;
  notereport?: string;
  filerepport?: FileList;
  id_employee: string;
  id_task?: string;
  id_progress?: string;
}

interface Employee {
  _id: string;
  employeeName: string;
}

interface Task {
  _id: string;
  taskName: string;
}

interface Progress {
  _id: string;
  progressName: string;
}

const CreateReportItem: React.FC<CreateReportItemProps> = ({ taskId, onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ReportData>({
    defaultValues: {
      reportName: '',
      submission_time: '',
      status: '',
      id_employee: localStorage.getItem('employeeId') || '',
      id_task: taskId || undefined,
      id_progress: '',
    },
  });

  const [file, setFile] = useState<File | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [progresses, setProgresses] = useState<Progress[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeesRes, tasksRes, progressesRes] = await Promise.all([
          axios.get(API_EMPLOYEE_URL),
          axios.get(API_TASK_URL),
          axios.get(API_PROGRESS_URL)
        ]);

        setEmployees(employeesRes.data);
        setTasks(tasksRes.data);
        setProgresses(progressesRes.data);
      } catch (error) {
        toast.error('Error loading data');
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (taskId) {
      // Dynamically set the value of taskId if it's passed in as a prop
      setValue('id_task', taskId);
    }
  }, [taskId, setValue]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: ReportData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('reportName', data.reportName.trim());
      formData.append('submission_time', data.submission_time);
      formData.append('status', data.status.trim());
      formData.append('notereport', data.notereport || '');
      formData.append('id_employee', data.id_employee);
      if (data.id_task) formData.append('id_task', data.id_task);
      if (data.id_progress) formData.append('id_progress', data.id_progress);
      if (file) formData.append('filerepport', file);

      await axios.post(API_REPORT_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('The report has been created successfully');
      reset();
      setFile(null);
      mutate(API_REPORT_URL);
      onClose();
    } catch (error) {
      toast.error('Error while generating report');
      console.error('API Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // const taskOptions = tasks.map((task) => ({
  //   value: task._id,
  //   label: task.taskName,
  // }));

  // const employeeOptions = employees.map((employee) => ({
  //   value: employee._id,
  //   label: employee.employeeName,
  // }));

    const progressOptions = progresses.map((progress) => ({
    value: progress._id,
    label: progress.progressName,
  }));

  // Find selected task and employee from the list using taskId and employeeId
  const selectedTask = tasks.find((task) => task._id === taskId);
  const selectedEmployee = employees.find((employee) => employee._id === localStorage.getItem('employeeId'));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Create Report</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col">
          <strong className="mb-2">Enter Name </strong>
          <InputField
            placeholder="Enter name"
            label=""
            type="text"
            register={register('reportName', { required: 'Report name is required' })}
            error={errors.reportName}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <strong className="w-full mr-2">Submission Time </strong>
            <div className='w-full'>
              <InputField
                placeholder="Enter date"
                label=""
                type="date"
                register={register('submission_time', { required: 'Submission deadline is required' })}
                error={errors.submission_time}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <strong className="w-full mr-2 mb-2">Status </strong>
            <select {...register('status', { required: 'Status is required' })}
              className="w-full border border-gray-300 p-2 rounded-md">
              <option value="">Select status</option>
              <option value="Success">Success</option>
              <option value="In Progress">In Progress</option>
              <option value="Need Review">Need Review</option>
            </select>
            {errors.status && <span className="text-red-500 text-sm">{errors.status.message}</span>}
          </div>
        </div>

        <div className="flex flex-col">
          <strong className="mb-2">Note </strong>
          <InputField
            placeholder="Enter note"
            label=""
            type="text"
            register={register('notereport')}
            error={errors.notereport}
          />
        </div>

        <FileUpload onChange={onFileChange} error={errors.filerepport} />

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <strong className="mr-2 mb-2">Employee </strong>
            {/* Display selected employee name and disable select */}
            <div className="text-gray-600 font-semibold w-full p-2 border rounded-md h-10">
            {selectedEmployee ? selectedEmployee.employeeName : 'No employee selected'}
            
          </div>
            {/* Hidden input to store the employee ID */}
            <input 
            type="hidden" 
            value={localStorage.getItem('employeeId') ?? undefined}
            {...register('id_employee')}
            
          />
          </div>

          <div className="flex flex-col">
            <strong className="mr-2 mb-2">Task </strong>
            {/* Display selected task name and disable select */}
            <div className="text-gray-600 font-semibold w-full p-2 border rounded-md h-10">
              {selectedTask ? selectedTask.taskName : 'No task selected'}
            </div>
            {/* Hidden input to store the task ID */}
            <input 
              type="hidden" 
              value={taskId ?? undefined}
              {...register('id_task')}
            />
        </div>
        </div>

        {/*<div className="flex flex-col">
          <strong className="mr-2">Progress </strong>
            <SelectField
              optionLabel="label"
              label=""
              options={progressOptions}
              register={register('id_progress')}
              error={errors.id_progress}
            />
        </div>*/}

        <div className="flex justify-between w-100 items-center">
          <button type="submit" className="bg-[#2D336B] hover:bg-gray-600 text-white py-2 px-6 rounded-md" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create'}
          </button>
          <button
            className="mt-6 w-70 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateReportItem;
