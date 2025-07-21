"use client";
import React, { useState, useEffect } from "react";
import { Employee } from "@/app/models/employee";
import ProjectEmployeeItem from "@/app/components/Item/project/ProjectEmployeeItem";
import { fetchEmployeeById, fetchProjectsForPM, filterProjectsByAssignedPerson } from "@/app/command/projectpmCommand"; // Import các hàm từ command file
import { Project } from "@/app/models/project";

// 1. Singleton (sử dụng hàm fetch duy nhất để lấy dữ liệu)
// 2. Command (tách các hàm gọi API ra khỏi component chính)
// 3. Observer (React sẽ tự động render lại giao diện khi state thay đổi)

const ProjectEmployeeList: React.FC = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 4. Factory - Có thể áp dụng trong việc tạo các đối tượng dự án.
  // 5. Strategy - Các chiến lược lọc dự án có thể được tách thành các hàm riêng biệt trong command.

  useEffect(() => {
    const employeeId = localStorage.getItem("employeeId");

    if (!employeeId) {
      setError("Không có ID nhân viên trong localStorage");
      return;
    }

    const fetchProfileAndProjects = async () => {
      try {
        // Command Pattern: Fetch employee data
        const employeeData = await fetchEmployeeById(employeeId);
        setEmployee(employeeData);

        // Nếu nhân viên là Project Manager, lấy danh sách dự án của PM
        if (employeeData.designation_id?.designationName === "IT Project Manager") {
          const projectsData = await fetchProjectsForPM(employeeId);

          // Strategy Pattern: Lọc các dự án của Project Manager dựa vào assignedPerson
          const filteredProjects = filterProjectsByAssignedPerson(projectsData, employeeId);
          setProjects(filteredProjects);
        }
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
        setError("Lỗi khi lấy dữ liệu nhân viên hoặc dự án.");
      }
    };

    fetchProfileAndProjects();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          ⚠️ <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900" />
        <p className="mt-2 text-gray-600">Đang tải thông tin nhân viên...</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4">
      <header className="text-center py-4">
        <h1 className="text-2xl font-bold">Dự án của nhân viên</h1>
      </header>
      <div className="row g-3 gy-5 py-3 row-deck">
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {projects.map((project) =>
              project ? (
                <ProjectEmployeeItem key={project._id} project={project} />
              ) : (
                <p key={Math.random()} className="text-center">
                  Không có dự án nào.
                </p>
              )
            )}
          </div>
        ) : (
          <p className="text-center">Nhân viên chưa tham gia dự án nào.</p>
        )}
      </div>
    </main>
  );
};

export default ProjectEmployeeList;
