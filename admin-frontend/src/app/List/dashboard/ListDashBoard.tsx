"use client";
import React, { useEffect, useState } from "react";
import ProjectTimelineChart from "@/app/components/dashboard/ProjectTimeline";
import IncomeAnalytics from "@/app/components/dashboard/IncomeAnalytics";

import axios from "axios";
import ProjectTable from "@/app/components/dashboard/ProjectInformation";
import { Task } from "@/app/models/task";
import { Progress } from "@/app/models/Progress";

// Định nghĩa kiểu dữ liệu cho Task Metrics
interface TaskMetrics {
  totalTasks: number;
  completedTasks: number;
  progressTasks: number;
}

// Định nghĩa kiểu dữ liệu cho Project Metrics
interface ProjectMetrics {
  totalProjects: number;
  completedProjects: number;
  progressProjects: number;
}

const DashBoardList: React.FC = () => {
  const [taskMetrics, setTaskMetrics] = useState<TaskMetrics>({
    totalTasks: 0,
    completedTasks: 0,
    progressTasks: 0,
  });

  const [projectMetrics, setProjectMetrics] = useState<ProjectMetrics>({
    totalProjects: 0,
    completedProjects: 0,
    progressProjects: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Lấy danh sách dự án
        const projectResponse = await axios.get("http://localhost:3000/projects");
        const progressResponse = await axios.get("http://localhost:3000/progress");
        const reportResponse = await axios.get("http://localhost:3000/reports");
        const projects = projectResponse.data;
        const progress:Progress[] = progressResponse.data;
        const reports = reportResponse.data;

        const totalProjects = projects.length;
        const completedProjects = reports.length;
        const progressProjects = progress.length;

        // Lấy danh sách công việc
        const taskResponse = await axios.get("http://localhost:3000/tasks");
        const tasks: Task[] = taskResponse.data;
        

        const totalTasks = tasks.length;
        const completedTasks = tasks.filter((task) => task.status === "Completed").length;
        const progressTasks = tasks.filter((task) => task.status === "In Progress").length;

        // Cập nhật state
        setProjectMetrics({ totalProjects, completedProjects, progressProjects });
        setTaskMetrics({ totalTasks, completedTasks, progressTasks });
      } catch (err) {
        console.error("Error fetching metrics", err);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md p-5">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </header>

      {/* Task Metrics Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
        <div className="bg-yellow-200 p-5 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800">Total Tasks</h3>
          <p className="text-3xl font-bold text-gray-700">{taskMetrics.totalTasks}</p>
        </div>
        <div className="bg-green-200 p-5 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800">Completed Tasks</h3>
          <p className="text-3xl font-bold text-gray-700">{taskMetrics.completedTasks}</p>
        </div>
        <div className="bg-blue-200 p-5 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800">In Progress Tasks</h3>
          <p className="text-3xl font-bold text-gray-700">{taskMetrics.progressTasks}</p>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="flex flex-col md:flex-row gap-5 p-5">
        <div className="flex-2 bg-white p-5 rounded-lg shadow-md">
          <IncomeAnalytics />
        </div>
        <div className="flex-1 bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Timeline</h2>
          <ProjectTimelineChart />
        </div>
      </section>

      {/* Project Metrics Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
        <div className="bg-yellow-200 p-5 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800">Total Projects</h3>
          <p className="text-3xl font-bold text-gray-700">{projectMetrics.totalProjects}</p>
        </div>

        <div className="bg-blue-200 p-5 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800">In Progress Projects</h3>
          <p className="text-3xl font-bold text-gray-700">{projectMetrics.progressProjects}</p>
        </div>
        <div className="bg-green-200 p-5 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800">Finished Projects</h3>
          <p className="text-3xl font-bold text-gray-700">{projectMetrics.completedProjects}</p>
        </div>
      </section>

      {/* Project Table Section */}
      <section className="p-5">
        <ProjectTable />
      </section>
    </div>
  );
};

export default DashBoardList;
