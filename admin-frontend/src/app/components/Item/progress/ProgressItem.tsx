import React, { useEffect, useState } from 'react';
import EditProgressItem from './EditProgressItem';
import { PencilSquareIcon, TrashIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useProgressHandler } from '@/app/components/hook/progress/progressItemHandle';

interface Progress {
  _id: string;
  progressName: string;
  projectid: { projectName: string };
  progressCategory: { progressCategoryName: string };
  progressStart: string;
  progressEnd: string;
  notificationSent?: { notification_name: string };
  taskAssignPerson: { employeeName: string; employeeProfile?: string };
  taskRecipient: { employeeName: string; employeeProfile?: string };
  priority: string;
  description: string;
  status: string;
}

interface ProgressItemProps {
  progress: Progress;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const calculateMonthsDifference = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let months = end.getMonth() - start.getMonth();
  const years = end.getFullYear() - start.getFullYear();
  months += years * 12;
  return months >= 0 ? months : 0;
};

const ProgressItem: React.FC<ProgressItemProps> = ({ progress }) => {
  const { isEditModalOpen, setIsEditModalOpen, isDeleting, handleAddTasks, handleDelete } = useProgressHandler();
  const [isTechLead, setIsTechLead] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPM, setIsPM] = useState(false);

  useEffect(() => {
    const storedEmployee = localStorage.getItem('employee');
    if (storedEmployee) {
      const employeeData = JSON.parse(storedEmployee);
      setIsTechLead(employeeData?.designation_id?.designationName === 'Technical Lead');
      setIsAdmin(employeeData?.designation_id?.designationName === 'Admin');
      setIsPM(employeeData?.designation_id?.designationName === 'IT Project Manager');
    }
  }, []);

  const monthsRequired = progress.progressStart && progress.progressEnd 
    ? calculateMonthsDifference(progress.progressStart, progress.progressEnd) 
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-5 relative hover:shadow-lg transition-shadow duration-200">
      <div className="absolute top-3 right-3 flex items-center gap-2">
        {progress.taskAssignPerson?.employeeProfile ? (
          <img src={progress.taskAssignPerson.employeeProfile} className="w-10 h-10 rounded-full object-cover" alt={progress.taskAssignPerson.employeeName} />
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        )}

        {progress.taskRecipient?.employeeProfile ? (
          <img src={progress.taskRecipient.employeeProfile} className="w-10 h-10 rounded-full object-cover -ml-4" alt={progress.taskRecipient.employeeName} />
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        )}
      </div>

      <div className="absolute top-3 left-3 bg-green-100 text-green-600 px-2 py-1 rounded-md">
        {progress.progressCategory?.progressCategoryName}
      </div>

      <div className="flex flex-col items-center mt-16">
        <h3 className="text-lg font-semibold text-gray-800">
          {progress.progressName || 'Không có tên'}
        </h3>

        <div className="absolute top-16 right-3 bg-yellow-100 text-yellow-600 px-2 py-1 rounded-md">
          {progress.priority}
        </div>

        <div className="w-full mt-3 space-y-2">
          <div className="text-sm">
            <span className="text-gray-600">{progress.description || 'Không có dữ liệu'}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Ngày bắt đầu: </span>
            <span className="text-gray-600">{progress.progressStart ? new Date(progress.progressStart).toLocaleDateString() : 'Chưa có ngày'}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-700">Ngày kết thúc: </span>
            <span className="text-gray-600">{progress.progressEnd ? new Date(progress.progressEnd).toLocaleDateString() : 'Chưa có ngày'}</span>
          </div>
          <div className="text-sm flex items-center gap-1">
            <ClockIcon className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-700">Thời gian thực hiện: </span>
            <span className="text-gray-600">{monthsRequired} tháng</span>
          </div>
        </div>

        {(isTechLead || isPM) ? (
  <button onClick={() => handleAddTasks(progress._id)}
    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200">
    Thêm công việc
  </button>
) : (
  <button onClick={() => handleAddTasks(progress._id)}
    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
    Xem công việc
  </button>
)}


      </div>

      {/* Nút Hành động: Chỉ hiển thị nếu là Admin hoặc PM */}
      {(isAdmin ||isPM) && (
        <div className="absolute bottom-3 right-3 flex gap-2">
          {/* Nút Sửa */}
          <button onClick={() => setIsEditModalOpen(true)}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isDeleting}
            title="Chỉnh sửa">
            <PencilSquareIcon className="h-5 w-5" />
          </button>

          {/* Nút Xóa */}
          <button onClick={() => handleDelete(progress._id)}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isDeleting}
            title={isDeleting ? 'Đang xóa...' : 'Xóa'}>
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Modal chỉnh sửa */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <EditProgressItem progressId={progress._id} onClose={() => setIsEditModalOpen(false)} />
           
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressItem;
