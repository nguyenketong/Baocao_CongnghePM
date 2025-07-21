'use client';
import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import { PlusIcon } from '@heroicons/react/24/outline';
import TaskItem from '../../components/Item/task/TaskItem';
import CreateTaskItem from '../../components/Item/task/CreateTaskItem';
import { Progress } from '@/app/models/Progress';
import { Task } from '@/app/models/task';

const API_BASE_URL = 'http://localhost:3000/tasks';



const TaskList: React.FC = () => {

  const [showCreateTaskDialog, setShowCreateTaskDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [filterText, setFilterText] = useState('');
  const [sortBy, setSortBy] = useState<'taskName' | 'taskStart'>('taskName');
  const [employeeId, setEmployeeId] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const progressId = searchParams.get('progressId');

  useEffect(() => {


    // Lấy employeeId từ localStorage
    const storedEmployeeId = localStorage.getItem('employeeId');
    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId);
    }
  }, []);

  const fetcher = (url: string) => axios.get<Task[]>(url).then((res) => res.data);
  const { data: tasks, error, isLoading } = useSWR(API_BASE_URL, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const storedEmployee = localStorage.getItem('employee');
  const employeeData = storedEmployee ? JSON.parse(storedEmployee) : null;
  const designationName = employeeData?.designation_id?.designationName || '';
  const isPM = designationName === 'IT Project Manager';
  const isMember = !['Admin', 'Technical Lead', 'IT Project Manager'].includes(designationName);

  console.log('Role:', designationName); // Debug xem role của user hiện tại
  const filteredTasks = useMemo(() => {
    if (!tasks) return [];

    let result = tasks;



    if (progressId) {
      if (isPM) {
        // Nếu là PM -> Hiển thị tất cả task thuộc progressId
        result = result.filter(task => task.progressId && (task.progressId as Progress)._id === progressId);
      } else if (employeeId) {
        if (isMember) {
          // Nếu là Member -> Chỉ hiển thị task mà employeeId là taskRecipient
          result = result.filter(task =>
            task.progressId &&
            (task.progressId as Progress)._id === progressId &&
            task.taskRecipient?._id === employeeId
          );
        } else {
          // Nếu không phải Member -> Chỉ hiển thị task mà employeeId là taskAssignPerson
          result = result.filter(task =>
            task.progressId &&
            (task.progressId as Progress)._id === progressId &&
            task.taskAssignPerson?._id === employeeId
          );
        }
      }
    } else if (employeeId) {
      if (isMember) {
        // Nếu là Member -> Chỉ hiển thị task mà employeeId là taskRecipient
        result = result.filter(task => task.taskRecipient?._id === employeeId);
      } else {
        // Nếu không phải Member -> Chỉ hiển thị task mà employeeId là taskAssignPerson
        result = result.filter(task => task.taskAssignPerson?._id === employeeId);
      }
    }

    // Lọc theo tên nhiệm vụ
    result = result.filter(task =>
      task.taskName.toLowerCase().includes(filterText.toLowerCase())
    );

    // Sắp xếp dữ liệu
    return result.sort((a, b) =>
      sortBy === 'taskName'
        ? a.taskName.localeCompare(b.taskName)
        : new Date(a.taskStart).getTime() - new Date(b.taskStart).getTime()
    );
  }, [tasks, filterText, sortBy, progressId, employeeId]);


  const paginatedTasks = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return filteredTasks.slice(startIndex, startIndex + pageSize);
  }, [filteredTasks, page, pageSize]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      window.location.reload();
    } catch (error) {
      console.error('Lỗi khi xóa nhiệm vụ:', error);
    }
  };

  const handleOpenDialog = () => setShowCreateTaskDialog(true);
  const handleCloseDialog = () => setShowCreateTaskDialog(false);

  const totalPages = Math.ceil(filteredTasks.length / pageSize);

  const calculateTimeAgo = (dateString: string) => {
    const now = new Date();
    const taskDate = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - taskDate.getTime()) / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''}`;
    }
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    return 'Just now';
  };



  // Function to calculate the completion percentage based on task status
  const calculateProgress = (taskStatus: string) => {
    // Check the status of the task and return the corresponding progress
    if (taskStatus === 'In Progress') {
      return 0; // 0% when the task is in progress
    }
    if (taskStatus === 'Needs Review') {
      return 50; // 50% when the task needs review
    }
    if (taskStatus === 'Completed') {
      return 100; // 100% when the task is completed
    }
    return 0; // Default to 0% if the status is not recognized
  };



  const handleStatusChange = async (taskId: string, newStatus: string) => {
    try {
      await axios.patch(`${API_BASE_URL}/${taskId}`, { status: newStatus });
      // After updating the status on the server, we could refresh the list or
      // optimistically update the state (if necessary).
      window.location.reload();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">

        <header className="header-title">
          <h3 className="fw-bold mb-0 py-3 pb-2">Tasks Management</h3>
        </header>
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Tìm kiếm nhiệm vụ..."
          className="border p-2 rounded-md"
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'taskName' | 'taskStart')} className="border p-2 rounded-md">
          <option value="taskName">Sắp xếp theo tên nhiệm vụ</option>
          <option value="taskStart">Sắp xếp theo ngày bắt đầu</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Task Progress */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg ">Task Progress</h3>

          <div className="mt-2 max-h-[150px] overflow-y-auto">
            {filteredTasks.map((task) => {
              // Calculate the progress based on the task status
              const progress = calculateProgress(task.status);

              return (
                <div key={task._id} className="mb-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">{task.taskCategory?.taskCategoryName || 'No Category'}</div>
                    <div className="text-xs text-gray-500">
                      {/* Here you can update the current task count if necessary */}
                      1 / 3
                    </div>
                  </div>

                  {/* Task Progress Bar */}
                  <div className="relative">
                    <div className="bg-gray-200 h-2 mt-1 rounded-full">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${progress}%` }} // Set width based on the progress percentage
                      ></div>
                    </div>
                    <div className="absolute inset-0 flex justify-between items-center px-2 text-xs text-white">
                      <span>{progress}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        {/* Recent Activity */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg">Recent Activity</h3>
          <ul className="mt-2 space-y-4 max-h-[150px] overflow-y-auto">
            {tasks
              ?.filter((task) => !progressId || task.progressId?._id === progressId) // If progressId exists, filter tasks, otherwise show all tasks
              .sort((a, b) => new Date(b.taskStart).getTime() - new Date(a.taskStart).getTime()) // Sort by the latest added task
              .slice(0, 5) // Show the most recent 5 tasks
              .map((task) => {
                // Example activity initials, you can customize based on task data
                const activityInitials = task.taskName.split(" ")[0].substring(0, 2).toUpperCase(); // Getting first 2 letters
                const activityColor = task.taskName.includes("Completed") ? "bg-blue-500" : "bg-green-500"; // Color based on task status

                return (
                  <li key={task._id} className="flex items-center space-x-4">
                    {/* Activity Circle with initials */}
                    <div className={`w-8 h-8 rounded-full ${activityColor} text-white flex items-center justify-center`}>
                      <span>{activityInitials}</span>
                    </div>
                    {/* Task Name and Time */}
                    <div>
                      <p className="font-medium">{task.taskName}</p>
                      <p className="text-sm text-gray-500">{calculateTimeAgo(task.taskStart)} ago</p>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>



        {/* Allocated Task Members */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg mb-4">Allocated Task Members</h3>
          <ul className="space-y-4 max-h-[150px] overflow-y-auto">
            {/* Filter and get unique task recipients */}
            {tasks
              ?.filter((task) => {
                // If progressId exists, filter by progressId; otherwise, include all tasks
                if (progressId) {
                  return task.progressId?._id === progressId && task.taskRecipient;
                } else {
                  return task.taskRecipient; // If no progressId, show all tasks with a taskRecipient
                }
              })
              .map((task) => task.taskRecipient) // Map through the taskRecipient of each task
              .filter((value, index, self) =>
                index === self.findIndex((t) => t._id === value._id) // Ensures uniqueness based on _id
              )
              .map((taskRecipient) => {
                const employeeProfile = taskRecipient?.employeeProfile || ''; // Get the employee profile URL
                const designationName = taskRecipient?.designation_id?.designationName || 'No Designation'; // Get designation name or fallback

                return (
                  <li key={taskRecipient._id} className="flex items-center justify-between">
                    {/* Employee Profile Image */}
                    <div className="flex items-center space-x-3">
                      {employeeProfile ? (
                        <img
                          src={employeeProfile}
                          alt={taskRecipient?.employeeName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xl font-bold text-gray-500">{taskRecipient?.employeeName?.[0]}</span>
                        </div>
                      )}
                      <div>
                        <span className="block font-medium">{taskRecipient?.employeeName}</span>
                        <span className="text-sm text-gray-500">{designationName}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>



      </div>


      {isLoading && <div className="text-center">Đang tải danh sách nhiệm vụ...</div>}
      {error && <div className="text-center text-red-500">Lỗi khi tải danh sách nhiệm vụ!</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[5px]">
        {/* In Progress */}
        <div>
          <h4 className="font-semibold text-lg mb-2">In Progress</h4>
          {paginatedTasks
            .filter((task) => task.status === 'In Progress') // Filter tasks by 'In Progress' status
            .map((task) => (
              <TaskItem key={task._id} task={task} onDelete={handleDelete} onStatusChange={handleStatusChange} />
            ))}
          {!paginatedTasks.some((task) => task.status === 'In Progress') && (
            <div className="text-center text-gray-500">No tasks in progress.</div>
          )}
        </div>

        {/* Needs Review */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Needs Review</h4>
          {paginatedTasks
            .filter((task) => task.status === 'Needs Review') // Filter tasks by 'Needs Review' status
            .map((task) => (
              <TaskItem key={task._id} task={task} onDelete={handleDelete} onStatusChange={handleStatusChange} />
            ))}
          {!paginatedTasks.some((task) => task.status === 'Needs Review') && (
            <div className="text-center text-gray-500">No tasks need review.</div>
          )}
        </div>

        {/* Completed */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Completed</h4>
          {paginatedTasks
            .filter((task) => task.status === 'Completed') // Filter tasks by 'Completed' status
            .map((task) => (
              <TaskItem key={task._id} task={task} onDelete={handleDelete} onStatusChange={handleStatusChange} />
            ))}
          {!paginatedTasks.some((task) => task.status === 'Completed') && (
            <div className="text-center text-gray-500">No completed tasks.</div>
          )}
        </div>
      </div>



      <div className="flex justify-center items-center mt-4">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="px-4 py-2 border rounded-md mr-2 disabled:opacity-50">
          Trước
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="px-4 py-2 border rounded-md ml-2 disabled:opacity-50">
          Tiếp theo
        </button>
      </div>
      {!isMember && (
        <button
          className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
          onClick={handleOpenDialog}
          aria-label="Thêm nhiệm vụ mới"
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      )
      }
      {showCreateTaskDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <CreateTaskItem progressId={progressId ?? undefined} onClose={handleCloseDialog} />
        </div>
      )}
    </div>
  );
};

export default TaskList;
