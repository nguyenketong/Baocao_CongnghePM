'use client';
import React, { useEffect, useState } from 'react';
import { useCreateProgressItemCommand } from '../../command/progress/createprogressItemCommand';
import InputField from '../../input/InputField';
import SelectField from '../../input/SelectField';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HighPriority, LowPriority, MediumPriority, PriorityContext } from './createProgress/PriorityState';
import { Completed, InProgress, NotStarted, StatusContext } from './createProgress/StatusState';


const API_EMPLOYEE_URL = 'http://localhost:3000/employees';

interface CreateProgressItemProps {
  projectId?: string | null;
  onClose: () => void;
}

interface Employee {
  _id: string;
  employeeName: string;
}

const CreateProgressItem: React.FC<CreateProgressItemProps> = ({ projectId, onClose }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Trạng thái cho độ ưu tiên và trạng thái tiến độ
  const [priorityContext, setPriorityContext] = useState(new PriorityContext(new MediumPriority()));
  const [statusContext, setStatusContext] = useState(new StatusContext(new NotStarted()));

  const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPriority = event.target.value;
    setPriorityContext(new PriorityContext(
      selectedPriority === 'high' ? new HighPriority() :
      selectedPriority === 'low' ? new LowPriority() :
      new MediumPriority()
    ));
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = event.target.value;
    setStatusContext(new StatusContext(
      selectedStatus === 'in_progress' ? new InProgress() :
      selectedStatus === 'completed' ? new Completed() :
      new NotStarted()
    ));
  };

  const {
    register,
    handleSubmit,
    errors,
    reset,
    isSubmitting,
    onSubmit,
    setValue,
    projectOptions,
    categoryOptions,
    notificationOptions,
    employeeOptions,
    projects,
  } = useCreateProgressItemCommand(projectId, onClose);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await axios.get<Employee[]>(API_EMPLOYEE_URL);
        setEmployees(data);

        const storedEmployeeId = localStorage.getItem('employeeId');
        if (storedEmployeeId) {
          const foundUser = data.find((e) => e._id === storedEmployeeId);
          if (foundUser) {
            setSelectedEmployee(foundUser);
            setValue('taskAssignPerson', foundUser._id);
          } else {
            toast.warn('Không tìm thấy nhân viên phù hợp!');
          }
        }
      } catch (error) {
        toast.error('Lỗi khi tải danh sách nhân viên');
        console.error('Lỗi API:', error);
      }
    };

    fetchEmployees();
  }, [setValue]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Thêm Tiến Độ</h2>
      <form onSubmit={handleSubmit((data) => onSubmit(data, reset))} className="grid grid-cols-2 gap-6">
        <InputField
          label="Tên Tiến Độ"
          placeholder="Nhập tên tiến độ"
          type="text"
          register={register('progressName', { required: 'Tên tiến độ không được để trống' })}
          error={errors.progressName}
        />

        {projectId ? (
          <div>
            <label className="block text-sm font-medium text-gray-700">Dự án</label>
            <p className="mt-1 text-base font-semibold text-gray-900">
              {projects.find((p) => p._id === projectId)?.projectName || 'Không tìm thấy dự án'}
            </p>
          </div>
        ) : (
          <SelectField
            label="Dự án"
            options={projectOptions}
            optionLabel="label"
            register={register('projectid', { required: 'Vui lòng chọn dự án' })}
            error={errors.projectid}
          />
        )}

        <InputField
          label="Ngày Bắt Đầu"
          type="date"
          placeholder="Enter date"
          register={register('progressStart', { required: 'Vui lòng nhập ngày bắt đầu' })}
          error={errors.progressStart}
        />

        <InputField
          label="Ngày Kết Thúc"
          type="date"
          placeholder="Enter date"
          register={register('progressEnd', { required: 'Vui lòng nhập ngày kết thúc' })}
          error={errors.progressEnd}
        />

        <SelectField
          label="Loại Tiến Độ"
          options={categoryOptions}
          optionLabel="label"
          register={register('progressCategory', { required: 'Vui lòng chọn loại tiến độ' })}
          error={errors.progressCategory}
        />

        <SelectField
          label="Thông Báo"
          options={notificationOptions}
          optionLabel="label"
          register={register('notificationSent', { required: 'Vui lòng chọn thông báo' })}
          error={errors.notificationSent}
        />

        <SelectField
          label="Người Nhận Việc"
          options={employeeOptions}
          optionLabel="label"
          register={register('taskRecipient', { required: 'Vui lòng chọn người nhận việc' })}
          error={errors.taskRecipient}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">Độ Ưu Tiên</label>
          <input 
            type="hidden" 
            value={priorityContext.getLabel()} 
            {...register('priority', { required: true })}
            />
          <select onChange={handlePriorityChange} className="w-full border p-2 rounded-md">
            {/* <option value="high">Cao</option>
            <option value="medium">Trung bình</option>
            <option value="low">Thấp</option> */}
          </select>
          <p className="mt-1 text-gray-600">Mức ưu tiên: {priorityContext.getLabel()}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Trạng Thái</label>
          <input 
              type="hidden" 
              value={statusContext.getLabel()} 
              {...register('status', { required: true })}
            />
          <select onChange={handleStatusChange} className="w-full border p-2 rounded-md">
            {/* <option value="not_started">Needs Review</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option> */}           
          </select>
          <p className="mt-1 text-gray-600">Trạng thái: {statusContext.getLabel()}</p>
        </div>

        <InputField
          label="Mô tả"
          placeholder="Nhập Mô tả"
          type="text"
          register={register('description', { required: 'Vui lòng nhập Mô tả' })}
          error={errors.description}
        />
<div className="flex items-center">
  <strong className="mr-2">Employee</strong>
  <div className="text-gray-600 font-semibold">
    {selectedEmployee ? selectedEmployee.employeeName : 'No employee selected'}
  </div>
  <input 
    type="hidden" 
    value={selectedEmployee?._id || ''}
    {...register('taskAssignPerson')}
  />
</div>

<div className="col-span-2 flex justify-center space-x-4">
  <button
    type="button"
    className="bg-gray-400 text-white py-2 px-6 rounded-md hover:bg-gray-500"
    onClick={onClose}
  >
    Hủy
  </button>
  <button
    type="submit"
    className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 disabled:opacity-50"
    disabled={isSubmitting}
  >
    {isSubmitting ? 'Đang tạo...' : 'Tạo Tiến Độ'}
  </button>
</div>

      </form>
    </div>
  );
};

export default CreateProgressItem;


