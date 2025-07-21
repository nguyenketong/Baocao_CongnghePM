import React, { useState, useEffect } from "react";
import { Employee } from "@/app/models/employee";
import ProjectEmployeeItem from "@/app/components/Item/project/ProjectEmployeeItem";
import { Team } from "@/app/models/team";
import { Project } from "@/app/models/project";

import { fetchEmployeeById, fetchProjectsForLead } from "@/app/command/projectEmployeeCommand"; // Import các hàm từ command file

const ProjectEmployeeList: React.FC = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filterText, setFilterText] = useState('');
  const [sortBy, setSortBy] = useState<'projectName' | 'projectStart'>('projectName'); // Add sortBy state

  // Lấy thông tin nhân viên và dự án
  useEffect(() => {
    const employeeId = localStorage.getItem("employeeId");

    if (!employeeId) {
      setError("Không có ID nhân viên trong localStorage");
      return;
    }

    const fetchProfileAndProjects = async () => {
      try {
        const employeeData = await fetchEmployeeById(employeeId);
        setEmployee(employeeData);

        // If the employee is a Technical Lead, get the projects
        if (employeeData.designation_id?.designationName === "Technical Lead") {
          const projectsData = await fetchProjectsForLead(employeeId);
          const projects = projectsData.map((team: Team) => team.projectid); // Accessing projectid directly
          setProjects(projects);
        } else {
          // For non-leads, get projects from their team_id
          const teamProjects = employeeData.team_id?.map((team: Team) => team.projectid) || [];
          setProjects(teamProjects);
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
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <header className="header-title">
          <h3 className="fw-bold mb-0 py-3 pb-2">Projects</h3>
        </header>
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Tìm kiếm project..."
          className="border p-2 rounded-md"
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'projectName' | 'projectStart')} className="border p-2 rounded-md">
          <option value="projectName">Sắp xếp theo tên project</option>
          <option value="projectStart">Sắp xếp theo ngày bắt đầu</option>
        </select>
      </div>

      <div className="row g-3 gy-5 py-3 row-deck">
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
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
