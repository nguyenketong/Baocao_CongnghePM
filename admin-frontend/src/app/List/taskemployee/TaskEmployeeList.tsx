"use client";
import React, { useEffect, useState } from "react";
import { Employee } from "@/app/models/employee";
import { getEmployeeById } from "../../services/employeeService"; // Adjust this import according to your project structure
import TaskEmployeeItem from "@/app/components/Item/task/TaskEmployeeItem"; // Adjust import path
import { Task } from "@/app/models/task";

const TaskSummary: React.FC<{ tasks: Task[] }> = ({ tasks }) => {

  const totalTasks = tasks.length;
  const overdueTasks = tasks.filter(
    (task) => new Date(task.taskEnd).getTime() < Date.now() && task.status !== "Completed"
  ).length;
  const completedTasks = tasks.filter((task) => task.status === "Completed").length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h3 className="text-2xl font-bold text-[#2D336B]">My Task Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {/* Total Tasks */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-300 p-6 rounded-lg text-center text-white">
          <h4 className="text-lg font-semibold">Total Tasks</h4>
          <p className="text-3xl font-bold">{totalTasks}</p>
        </div>

        {/* Overdue Tasks */}
        <div className="bg-gradient-to-r from-red-500 to-red-300 p-6 rounded-lg text-center text-white">
          <h4 className="text-lg font-semibold">Overdue Tasks</h4>
          <p className="text-3xl font-bold">{overdueTasks}</p>
        </div>

        {/* Completed Tasks */}
        <div className="bg-gradient-to-r from-green-500 to-green-300 p-6 rounded-lg text-center text-white">
          <h4 className="text-lg font-semibold">Completed Tasks</h4>
          <p className="text-3xl font-bold">{completedTasks}</p>
        </div>
      </div>
    </div>
  );
};

const TaskEmployeeList: React.FC = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchProfile = async () => {
      const employeeId = localStorage.getItem("employeeId");

      if (!employeeId) {
        setError("Không có ID nhân viên trong localStorage");
        return;
      }

      try {
        const profile = await getEmployeeById(employeeId);
        setEmployee(profile);
      } catch (err) {
        console.error("Lỗi khi lấy thông tin nhân viên hoặc task:", err);
        setError("Lỗi khi lấy thông tin nhân viên.");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return (
      <div className="text-center text-red-500 p-5">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Thử lại
        </button>
      </div>
    );
  }

  if (!employee) {
    return <p className="text-center p-5">Đang tải danh sách nhiệm vụ...</p>;
  }

  return (
    <div className="container">
      {/* Task Summary */}
      <TaskSummary tasks={employee.tasks || []} />

      {/* List of Tasks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {employee.tasks && employee.tasks.length > 0 ? (
          employee.tasks.map((task) => (
            <TaskEmployeeItem key={task._id} task={task} />
          ))
        ) : (
          <p className="text-center col-span-3">Nhân viên chưa có nhiệm vụ nào.</p>
        )}
      </div>
    </div>
  );
};
export default TaskEmployeeList;
