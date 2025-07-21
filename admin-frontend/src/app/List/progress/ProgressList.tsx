"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProgressItem from "../../components/Item/progress/ProgressItem";
import CreateProgressItem from "../../components/Item/progress/CreateProgressItem";
import { useProgressListCommand } from "../../command/progressCommand";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useProgressHandlers } from "../../hook/progressHandler";
import axios from "axios";
import { Employee } from "@/app/models/employee";

const API_BASE_URL = 'http://localhost:3000/tasks';

interface Task {
  _id: string;
  taskName: string;
  progressId: { _id: string; progressName: string };
  taskCategory: { taskCategoryName: string };
  taskStart: string;
  taskEnd: string;
  status: string; // task status like 'Completed', 'In Progress', etc.

}


const ProgressList: React.FC = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId") || undefined;
  const progressId = searchParams.get("id") || undefined;

  const { paginatedProgresses, isLoading, error } = useProgressListCommand(
    projectId,
    progressId
  );

  const {
    showCreateProgressDialog,
    handleDelete,
    handleEdit,
    handleOpenDialog,
    handleCloseDialog,
  } = useProgressHandlers();
  const [isTechLead, setIsTechLead] = useState(false); 
  const [isPM, setIsPM] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  // State for filter text and sorting
  const [filterText, setFilterText] = useState(""); // Add filterText state
  const [sortBy, setSortBy] = useState<"progressName" | "progressStart">(
    "progressName"
  ); // Add sortBy state

  const [employeeData, setEmployeeData] = useState<Employee>(); // Khai báo state để lưu thông tin nhân viên

  useEffect(() => {
    const storedEmployee = localStorage.getItem("employee");
  
    if (storedEmployee) {
      const employeeData = JSON.parse(storedEmployee);
      setEmployeeData(employeeData); // Lưu thông tin vào state
  
      // Check if the employee is an IT Project Manager
      if (employeeData?.designation_id?.designationName === "IT Project Manager") {
        setIsPM(true);
      }
      // Check if the employee is a Tech Lead
      if (employeeData?.designation_id?.designationName === "Technical Lead") {
        setIsTechLead(true);
      }
    }
  }, []);
  
  
  useEffect(() => {
    // Fetch tasks related to this project
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>(API_BASE_URL);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

   

    fetchTasks();
  
  }, []);
   // Filter and sort progresses
   const filteredAndSortedProgresses = React.useMemo(() => {
    let filtered = paginatedProgresses.filter((progress) =>
      progress.progressName.toLowerCase().includes(filterText.toLowerCase())
    );

    if (sortBy === "progressStart") {
      filtered = filtered.sort((a, b) =>
        new Date(a.progressStart).getTime() - new Date(b.progressStart).getTime()
      );
    } else {
      filtered = filtered.sort((a, b) => a.progressName.localeCompare(b.progressName));
    }

    return filtered;
  }, [paginatedProgresses, filterText, sortBy]);

  // Filter progresses for TechLead role
  const filteredProgressesForTechLead = isTechLead && employeeData
    ? filteredAndSortedProgresses.filter((progress) =>
        progress.taskRecipient.id === String(employeeData._id) // Compare taskRecipient (string) with employeeData._id (string)
      )
    : filteredAndSortedProgresses;

  const overdueTasks = tasks.filter(
    (task) =>
      new Date(task.taskEnd).getTime() < Date.now() && task.status !== "Completed"
  );
 
 

  return (
    <div className="container">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <header className="header-title">
          <h3 className="fw-bold mb-0 py-3 pb-2">Progress</h3>
        </header>
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Tìm kiếm progress..."
          className="border p-2 rounded-md"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "progressName" | "progressStart")}
          className="border p-2 rounded-md"
        >
          <option value="progressName">Sắp xếp theo tên progress</option>
          <option value="progressStart">Sắp xếp theo ngày bắt đầu</option>
        </select>
      </div>

  {/* Container Layout */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
   
 {/* Task Progress */}
 <div className="bg-white p-4 rounded-lg shadow-lg">
  <h3 className="font-bold text-lg">Task Progress</h3>
  <div className="overflow-y-auto max-h-[150px]"> {/* Set max height for scrolling */}
    <div className="space-y-4 mt-2">
      {filteredAndSortedProgresses.map((progress) => {
        // Filter tasks related to this progress
        const tasksInProgress = tasks.filter((task) => task.progressId?._id === progress._id);
        const completedTasks = tasksInProgress.filter((task) => task.status === "Completed");

        const progressPercentage = (completedTasks.length / tasksInProgress.length) * 100;

        return (
          <div key={progress._id}>
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">
                  {progress.progressCategory?.progressCategoryName || "No Category"}
                </div>
                <div className="text-xs text-gray-500">
                  {completedTasks.length} / {tasksInProgress.length} Completed
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="bg-gray-200 h-2 mt-1 rounded-full">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="absolute inset-0 flex justify-between items-center px-2 text-xs text-white">
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</div>


       {/* Recent Activity */}
<div className="bg-white p-4 rounded-lg shadow-lg">
  <h3 className="font-bold text-lg">Recent Activity</h3>
  <ul className="mt-2 space-y-4 max-h-[150px] overflow-y-auto"> {/* Set max-height and enable vertical scrolling */}
    {paginatedProgresses
      .slice(0, 5) // Show the most recent 5 progress updates
      .map((progress) => (
        <li key={progress._id} className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
            <span>{progress.progressName[0]}</span>
          </div>
          <div>
            <p className="font-medium">{progress.progressName}</p>
            <p className="text-sm text-gray-500">{new Date(progress.progressStart).toLocaleDateString()} ago</p>
          </div>
        </li>
      ))}
  </ul>
</div>


``
  
  {/* Overdue Tasks */}
  <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg mb-4">Overdue Tasks</h3>
          <ul className="space-y-3  max-h-[150px] overflow-y-auto">
            {overdueTasks.length ? (
              overdueTasks.map((task) => (
                <li key={task._id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="block font-medium">{task.taskName}</span>
                  </div>
                  <div className="text-xs text-gray-500">Due: {new Date(task.taskEnd).toLocaleDateString()}</div>
                </li>
              ))
            ) : (
              <div>No overdue tasks.</div>
            )}
          </ul>
        </div>
      
</div>
  

      {isLoading && <div>Đang tải danh sách tiến độ...</div>}
      {error && <div>Lỗi khi tải danh sách tiến độ!</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
     {/* In Progress Column */}
     <div>
          <h3 className="font-bold text-lg mb-4">In Progress</h3>
          <div className="space-y-4">
            {filteredProgressesForTechLead
              .filter((progress) => progress.status === "In Progress")
              .map((progress) => (
                <ProgressItem
                  key={progress._id}
                  progress={progress}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
          </div>
        </div>

    {/* Needs Review Column */}
    <div>
          <h3 className="font-bold text-lg mb-4">Needs Review</h3>
          <div className="space-y-4">
            {filteredProgressesForTechLead
              .filter((progress) => progress.status === "Needs Review")
              .map((progress) => (
                <ProgressItem
                  key={progress._id}
                  progress={progress}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
          </div>
        </div>

        {/* Completed Column */}
        <div>
          <h3 className="font-bold text-lg mb-4">Completed</h3>
          <div className="space-y-4">
            {filteredProgressesForTechLead
              .filter((progress) => progress.status === "Completed")
              .map((progress) => (
                <ProgressItem
                  key={progress._id}
                  progress={progress}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
          </div>
        </div>
      </div>


      {/* Show button only if the user is PM */}
   {/* Show button only if the user is PM */}
{isPM && (
  <button
    className="fab-button fixed bottom-5 right-5 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all duration-200"
    onClick={handleOpenDialog}
    aria-label="Add New Task"
  >
    <PlusIcon className="w-6 h-6" />
  </button>
)}

{showCreateProgressDialog && (
  <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="modal-content bg-white p-6 rounded-lg w-full max-w-lg">
      <CreateProgressItem projectId={projectId} onClose={handleCloseDialog} />
     
    </div>
  </div>
)}

    </div>
  );
};

export default ProgressList;
