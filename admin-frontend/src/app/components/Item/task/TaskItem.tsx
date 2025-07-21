import React, { useState } from 'react';
import EditTaskItem from './EditTaskItem';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useTaskActions } from '../../hook/task/taskItemHanlder';

interface Task {
  _id: string;
  taskName: string;
  progressId?: { progressName: string };
  taskCategory?: { taskCategoryName: string };
  taskStart: string;
  taskEnd: string;
  notificationSent?: { notification_name: string };
  taskAssignPerson?: { employeeName: string; employeeProfile: string };
  taskRecipient?: { employeeName: string; employeeProfile: string };
  priority: string;
  description: string;
  status: string;
}

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}

const TasksItem: React.FC<TaskItemProps> = ({ task, onDelete, onStatusChange }) => {
  const { isEditModalOpen, setIsEditModalOpen, handleAddReport, handleEdit } = useTaskActions(task._id);
  const [showStatusTag, setShowStatusTag] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(task.status);

  const [isDeleting, setIsDeleting] = useState(false);
  const storedEmployee = localStorage.getItem('employee');
  const employeeData = storedEmployee ? JSON.parse(storedEmployee) : null;
  const designationName = employeeData?.designation_id?.designationName || '';
  const isMember = !['Admin', 'Technical Lead', 'IT Project Manager'].includes(designationName);

  const handleStatusChange = async (status: string) => {
    setSelectedStatus(status);
    onStatusChange(task._id, status); // Notify parent to update status
    setShowStatusTag(false); // Hide the tag after selecting a status
  };

  const handleDelete = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa nhiệm vụ này không?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await onDelete(task._id);
      toast.success('Nhiệm vụ đã được xóa thành công');
      mutate('http://localhost:3000/tasks');
    } catch (error) {
      toast.error('Lỗi khi xóa nhiệm vụ');
      console.error('Error deleting task:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleStatusTag = () => {
    setShowStatusTag(!showStatusTag); // Toggle the dropdown visibility
  };

  // Prevent dropdown from closing when clicking on the dropdown options
  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click on dropdown from closing the task item
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-5 relative hover:shadow-lg transition-shadow duration-200 mb-6"
      onClick={toggleStatusTag} // Clicking on the task item toggles the dropdown
    >
      {/* Task Category and Task Assign Person in the Same Row */}
      <div className="flex justify-between items-center mt-2">
        {/* Task Category */}
        <div className="bg-green-100 text-green-600 px-2 py-1 rounded-md">
          <div className="light-success-bg py-1 px-2 rounded-1 d-inline-block fw-bold small-14 mb-0">
            <span className="text-gray-600">
              {task.taskCategory?.taskCategoryName || 'Không có danh mục'}
            </span>
          </div>
        </div>

        {/* Task Assign Person and Recipient */}
        <div className="flex flex-row gap-2">
          {/* Task Assign Person */}
          {task.taskAssignPerson?.employeeProfile ? (
            <img
              src={task.taskAssignPerson.employeeProfile}
              className="w-8 h-8 rounded-full border-2 border-white shadow-md"
              alt="Assign Person"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-300" />
          )}

          {/* Task Recipient */}
          {task.taskRecipient?.employeeProfile ? (
            <img
              src={task.taskRecipient.employeeProfile}
              className="w-8 h-8 rounded-full border-2 border-white shadow-md"
              alt="Recipient"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-300" />
          )}
        </div>
      </div>

      {/* Priority Level Below */}
      <div className="absolute top-16 right-3 bg-yellow-100 text-yellow-600 px-2 py-1 rounded-md">
        <span className="text-gray-600">{task.priority || 'Không xác định'}</span>
      </div>

      {/* Task Description */}
      <div className="w-full mt-12 space-y-2">
        <p className="tpy-2 mb-0 overflow-hidden overflow-ellipsis line-clamp-2">
          {task.description || 'Không có mô tả'}
        </p>
      </div>

      {/* Task Start and End Dates */}
      <div className="text-sm mt-2">
        <span className="font-medium text-gray-700">Ngày bắt đầu: </span>
        <span className="text-gray-600">
          {task.taskStart ? new Date(task.taskStart).toLocaleDateString() : 'Chưa có ngày'}
        </span>
      </div>
      <div className="text-sm">
        <span className="font-medium text-gray-700">Ngày kết thúc: </span>
        <span className="text-gray-600">
          {task.taskEnd ? new Date(task.taskEnd).toLocaleDateString() : 'Chưa có ngày'}
        </span>
      </div>

      {/* Buttons: "Add Report", Edit, and Delete all aligned horizontally */}
      <div className="flex gap-3 mt-4">
        {/* "Add report" button */}
        <button
          onClick={() => handleAddReport()}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
        >
          Thêm report
        </button>

        {/* Edit and Delete Buttons */}
        {!isMember && (
          <div className="flex gap-2 ml-auto">
            <button
              onClick={handleEdit}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isDeleting}
              title="Chỉnh sửa"
            >
              <PencilSquareIcon className="h-5 w-5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isDeleting}
              title={isDeleting ? 'Đang xóa...' : 'Xóa'}
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Conditionally render status change dropdown */}
      {showStatusTag && (
        <div
          className="status-update flex flex-col gap-2 max-w-xs mt-4"
          onClick={handleDropdownClick} // Prevent dropdown from closing on interaction
        >
          <label className="text-sm font-semibold text-gray-800">Update Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="status-dropdown p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer bg-white text-gray-900"
          >
            <option value="In Progress" className="text-yellow-600">In Progress</option>
            <option value="Needs Review" className="text-orange-600">Needs Review</option>
            <option value="Completed" className="text-green-600">Completed</option>
          </select>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <EditTaskItem taskId={task._id} onClose={() => setIsEditModalOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default TasksItem;
