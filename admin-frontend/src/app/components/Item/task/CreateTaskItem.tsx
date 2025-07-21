import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import InputField from '../../input/InputField';
import SelectField from '../../input/SelectField';
import { Team as TeamModel } from '@/app/models/team';

const API_BASE_URL = 'http://localhost:3000';
const API_NOTIFICATION_URL = `${API_BASE_URL}/notifications`;
const API_CATEGORY_URL = `${API_BASE_URL}/taskcategories`;
const API_TASK_URL = `${API_BASE_URL}/tasks`;
const API_ASSIGNPERSON_URL = `${API_BASE_URL}/employees`;
const API_PROGRESS_URL = `${API_BASE_URL}/progress`;

interface CreateTaskItemProps {
  progressId?: string | null;
  onClose: () => void;
}

interface TaskData {
  taskName: string;
  taskStart: string;
  taskEnd: string;
  priority: string;
  description: string;
  status: string;
  progressId?: string;
  taskCategory?: string;
  notificationSent?: string;
  taskAssignPerson?: string;
  taskRecipient?: string;
}

interface Category {
  _id: string;
  taskCategoryName: string;
}

interface Notification {
  _id: string;
  notification_name: string;
}

interface Employee {
  _id: string;
  employeeName: string;
  team_id: TeamModel[];
}

interface Progress {
  _id: string;
  progressName: string;
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

const CreateTaskItem: React.FC<CreateTaskItemProps> = ({ progressId, onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<TaskData>({
    defaultValues: {
      progressId: progressId || undefined,
    },
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [progresses, setProgresses] = useState<Progress[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, employeesRes, notificationsRes, progressesRes] = await Promise.all([
          axios.get(API_CATEGORY_URL),
          axios.get(API_ASSIGNPERSON_URL),
          axios.get(API_NOTIFICATION_URL),
          axios.get(API_PROGRESS_URL),
        ]);

        setCategories(categoriesRes.data || []);
        setNotifications(notificationsRes.data || []);
        setProgresses(progressesRes.data || []);

        const storedEmployeeId = localStorage.getItem('employeeId');
        if (storedEmployeeId) {
          const foundUser = employeesRes.data.find((e: Employee) => e._id === storedEmployeeId);
          console.log("Nhân viên tìm thấy:", foundUser);
          if (foundUser) {
            setCurrentUser(foundUser);
            setValue('taskAssignPerson', foundUser._id);

            // Lọc nhân viên dựa trên teamLead
            const filtered = employeesRes.data.filter((employee: Employee) =>
              employee.team_id?.some((team) => team.teamLead?.toString() === foundUser._id?.toString())

            );

            setFilteredEmployees(filtered);
          } else {
            toast.warn('Không tìm thấy nhân viên với ID đã lưu');
          }
        }
      } catch (error) {
        toast.error('Lỗi khi tải dữ liệu');
        console.error('Lỗi API:', error);
      }
    };

    fetchData();
  }, [setValue]); useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, employeesRes, notificationsRes, progressesRes] = await Promise.all([
          axios.get(API_CATEGORY_URL),
          axios.get(API_ASSIGNPERSON_URL),
          axios.get(API_NOTIFICATION_URL),
          axios.get(API_PROGRESS_URL),
        ]);

        setCategories(categoriesRes.data || []);
        setNotifications(notificationsRes.data || []);
        setProgresses(progressesRes.data || []);

        const storedEmployeeId = localStorage.getItem('employeeId');
        if (storedEmployeeId) {
          const foundUser = employeesRes.data.find((e: Employee) => e._id === storedEmployeeId);
          console.log("Nhân viên tìm thấy:", foundUser);
          if (foundUser) {
            setCurrentUser(foundUser);
            setValue('taskAssignPerson', foundUser._id);

            // Lọc nhân viên dựa trên teamLead
            const filtered = employeesRes.data.filter((employee: Employee) =>
              employee.team_id.some((team) => team.teamLead === foundUser._id) // Kiểm tra nếu teamLead của team bằng với foundUser._id
            );

            setFilteredEmployees(filtered);
          } else {
            toast.warn('Không tìm thấy nhân viên với ID đã lưu');
          }
        }
      } catch (error) {
        toast.error('Lỗi khi tải dữ liệu');
        console.error('Lỗi API:', error);
      }
    };

    fetchData();
  }, [setValue]);


  useEffect(() => {
    if (progressId) {
      setValue('progressId', progressId);
    }
  }, [progressId, setValue]);

  const onSubmit = async (data: TaskData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await axios.post(API_TASK_URL, data);
      if (response.status === 200 || response.status === 201) {
        toast.success('Nhiệm vụ đã được tạo thành công');
        reset();
        mutate(API_TASK_URL);
        onClose();
      }
    } catch (error) {
      toast.error('Lỗi khi tạo nhiệm vụ. Vui lòng thử lại.');
      console.error('Lỗi API:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: category.taskCategoryName,
  }));

  const notificationOptions = notifications.map((notification) => ({
    value: notification._id,
    label: notification.notification_name,
  }));

  const progressOptions = progresses.map((progress) => ({
    value: progress._id,
    label: progress.progressName,
  }));

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="border-b-[1px] w-full  pb-3 mb-3 border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">Create Task</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-sm">
        <InputField
          label="Task Name"
          type="text"
          placeholder="Enter Task Name"
          register={register('taskName', { required: 'Task name is required' })}
          error={errors.taskName}
        />

        {progressId ? (
          <div>
            <label className="block text-sm font-medium text-gray-700">Progress</label>
            <p className="mt-1 text-base font-semibold text-gray-900">
              {progresses.find((p) => p._id === progressId)?.progressName || 'Progress not found'}
            </p>
          </div>
        ) : (
          <SelectField
            label="Progress"
            options={progressOptions}
            optionLabel="label"
            register={register('progressId', { required: 'Please select progress' })}
            error={errors.progressId}
          />
        )}

        <div className="flex gap-4 justify-between">
          <InputField
            placeholder="Enter date"
            label="Start Date"
            type="date"
            register={register('taskStart', { required: 'Please select start date' })}
            error={errors.taskStart}
          />
          <InputField
            placeholder="Enter date"
            label="End Date"
            type="date"
            register={register('taskEnd', { required: 'Please select end date' })}
            error={errors.taskEnd}
          />
        </div>
        <SelectField
          label="Task Category"
          options={categoryOptions}
          optionLabel="label"
          register={register('taskCategory', { required: 'Please select task category' })}
          error={errors.taskCategory}
        />

        <div className="flex gap-4 justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700">Assigner</label>
            <p className="mt-1 text-base font-semibold text-gray-900">
              {currentUser ? currentUser.employeeName : 'Employee not found'}
            </p>
          </div>

          <SelectField
            label="Recipient"
            options={filteredEmployees.map((employee) => ({
              value: employee._id,
              label: employee.employeeName,
            }))}
            optionLabel="label"
            register={register('taskRecipient', { required: 'Please select recipient' })}
            error={errors.taskRecipient}
          />
        </div>



        <SelectField
          label="Notification"
          options={notificationOptions}
          optionLabel="label"
          register={register('notificationSent', { required: 'Please select notification' })}
          error={errors.notificationSent}
        />

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

        <InputField
          placeholder="Enter description"
          label="Description"
          type="text"
          register={register('description', { required: 'Please enter description' })}
          error={errors.description}
        />

        <div className="text-center flex gap-2 justify-between">
          <button type="submit" className="bg-blue-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-blue-600" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Task'}
          </button>
          <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskItem;
