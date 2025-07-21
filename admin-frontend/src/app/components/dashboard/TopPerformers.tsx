"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const TopPerformers: React.FC = () => {
  const [topPerformers, setTopPerformers] = useState<any[]>([]);
  const [newTasks, setNewTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);

  useEffect(() => {
    // Gọi API để lấy danh sách nhân viên và công việc
    const fetchTopPerformers = async () => {
      try {
        const employeesResponse = await axios.get("http://localhost:3000/employees");
        const taskResponse = await axios.get("http://localhost:3000/tasks");

        const employees = employeesResponse.data;
        const tasks = taskResponse.data;

        // Log all tasks for debugging
        console.log("All Tasks:", tasks);

        const employeesWithPerformance = employees.map((employee: any) => {
            // Log the employee's _id and task recipient for debugging
            console.log("Employee _id:", employee._id);
            
            // Filter tasks assigned to the employee (where taskRecipient._id matches employee._id)
            const assignedTasks = tasks.filter((task: any) => {
              const taskRecipient = task.taskRecipient ? String(task.taskRecipient._id).trim() : null; // Extract _id from taskRecipient
              const employeeId = String(employee._id).trim();
              console.log(`Comparing taskRecipient: ${taskRecipient} with employeeId: ${employeeId}`);
              return taskRecipient === employeeId; // Compare the _id values
            });
          
            // Log assigned tasks for debugging
            console.log("Assigned Tasks for Employee:", assignedTasks);
          
            // Calculate completed tasks for this employee
            const completed = assignedTasks.filter((task: any) => task.status === "Completed").length;
            console.log("Completed Tasks:", completed);
          
            // Calculate performance as percentage of completed tasks
            const performance = assignedTasks.length > 0 ? (completed / assignedTasks.length) * 100 : 0;
            console.log("Performance:", performance);
          
            return { ...employee, performance }; // Attach performance to the employee object
          });
          
        // Sort employees by performance in descending order and take top 6
        const sortedEmployees = employeesWithPerformance
          .sort((a, b) => b.performance - a.performance) // Sort by performance
          .slice(0, 6); // Take top 6

        // Set the top performers in the state
        setTopPerformers(sortedEmployees);
        setTotalEmployees(employees.length);

        // Count new and completed tasks
        setNewTasks(tasks.filter((task: any) => task.status === "In Progress").length);
        setCompletedTasks(tasks.filter((task: any) => task.status === "Completed").length);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchTopPerformers();
  }, []);

  return (
    <div className="bg-pink-200 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Top Performers</h2>
      <p className="text-sm text-gray-600 mb-4">
        You have <strong>{totalEmployees} employees</strong> in your company.
      </p>

      {/* Thống kê công việc */}
      <div className="flex space-x-8 mb-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{newTasks}</p>
          <p className="text-sm text-gray-500">New Task</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{completedTasks}</p>
          <p className="text-sm text-gray-500">Task Completed</p>
        </div>
      </div>

      {/* Danh sách nhân viên hiệu suất cao */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {topPerformers.map((person: any, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg text-center">
            <img
              src={person.employeeProfile || "/default-avatar.png"} // Nếu không có avatar thì dùng ảnh mặc định
              alt={person.employeeName}
              className="w-12 h-12 mx-auto mb-2 rounded-full"
            />
            <h3 className="text-sm font-semibold text-gray-800">{person.employeeName}</h3>
            <p className="text-xs text-gray-500">@{person.account?.email}</p>
            <p className="text-lg font-bold text-indigo-600 mt-2">
              {person.performance ? person.performance.toFixed(2) : '0.00'}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPerformers;
