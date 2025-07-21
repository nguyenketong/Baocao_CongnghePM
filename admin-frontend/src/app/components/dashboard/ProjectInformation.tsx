import React, { useEffect, useState } from "react";
import axios from "axios";

interface Project {
  _id: string;
  projectName: string;
  projectStart: string;
  projectEnd: string;
  priority: string;
  assignedPerson?: {
    employeeName: string;
    employeeProfile?: string;
  };
}

const ProjectTable: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectResponse = await axios.get("http://localhost:3000/projects");
        setProjects(projectResponse.data);
      } catch (err) {
        console.error("Error fetching projects", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Information</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-left">
            <th className="p-3">TITLE</th>
            <th className="p-3">DATE START</th>
            <th className="p-3">DEADLINE</th>
            <th className="p-3">ASSIGNED PERSON</th>
            <th className="p-3">PRIORITY</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id} className="border-b">
              <td className="p-3">{project.projectName}</td>
              <td className="p-3">{new Date(project.projectStart).toLocaleDateString()}</td>
              <td className="p-3">{new Date(project.projectEnd).toLocaleDateString()}</td>

              {/* Hiển thị thông tin nhân viên */}
              <td className="p-3 flex items-center space-x-2">
                {project.assignedPerson ? (
                  <>
                    <img
                      src={project.assignedPerson.employeeProfile || "/default-avatar.png"} 
                      className="w-10 h-10 rounded-full object-cover"
                      alt={project.assignedPerson.employeeName}
                    />
                    <span>{project.assignedPerson.employeeName}</span>
                  </>
                ) : (
                  <span>No Leader</span>
                )}
              </td>

              {/* Hiển thị mức độ ưu tiên */}
              <td className="p-3">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded ${
                    project.priority === "High" ? "bg-red-500 text-white" :
                    project.priority === "Medium" ? "bg-yellow-500 text-white" :
                    "bg-green-500 text-white"
                  }`}
                >
                  {project.priority}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
