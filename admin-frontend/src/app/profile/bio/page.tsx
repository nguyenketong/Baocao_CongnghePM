"use client";
import React from "react";

import TaskEmployeeItem from "@/app/components/Item/task/TaskEmployeeItem";
import ProjectEmployeeItem from "@/app/components/Item/project/ProjectEmployeeItem";
import "../../styles/BioPage.css";
import { useEmployee } from "@/app/hook/bioHandler";
import EmployeeInfoItem from "@/app/components/bio/EmployeeItem";



const ProfilePage: React.FC = () => {
  const { employee, error, loading } = useEmployee();

  if (loading) return <p>Đang tải thông tin...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!employee) return <p>Không có thông tin nhân viên.</p>;
 

  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p className="loading-text">Đang tải thông tin...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <span role="img" aria-label="warning" className="error-icon">⚠️</span>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
            aria-label="Thử lại"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!employee) {
    return <div>Không có thông tin nhân viên.</div>;
  }

  // Lấy ID của nhân viên từ đối tượng employee
  const employeeId = employee._id;

  console.log("ID của nhân viên:", employeeId); // In ra ID của nhân viên



  return (
    <main className="profile-container">
      <header className="header-title">
        <h1>Employee Profile</h1>
      </header>

      <div className="flex gap-3">
        {/* Thông tin cơ bản về nhân viên */}
        <div className="flex flex-col ml-3 w-full gap-6">
          <section>
          <EmployeeInfoItem employee={employee} />
          </section>
       
          <section>
          {employee.description && (
                  <div className="description-section">
                    <h3>
                      <span aria-hidden="true">📝</span>
                      Mô tả
                    </h3>
                    <p className="description-content">{employee.description}</p>
                  </div>
                )}
          </section>

          {/* Current Work Project Section */}
          <section className="current-work-projects">
            <h3 className="title-profile">Current Work Project</h3>
            <div className="grid grid-cols-2 gap-4 mt-3">
              {employee.team_id && employee.team_id.length > 0 ? (
                employee.team_id.map((team) =>
                  team.projectid ? (
                    <div key={team.projectid._id} className="w-full">
                      <ProjectEmployeeItem
                        key={team.projectid._id}
                        project={team.projectid}
                      />
                    </div>
                  ) : (
                    <p key={team._id} className="text-center">
                      Không có dự án cho nhóm này.
                    </p>
                  )
                )
              ) : (
                <p className="text-center">Nhân viên chưa tham gia nhóm nào với dự án.</p>
              )}
            </div>


          </section>
        </div>

        <div className="ml-auto">
          {/* Current Tasks Section */}
          <section className="current-tasks rounded-lg border border-gray-200 px-5 bg-white max-w-[500px] mr-3 pb-5">
            <h3 className="title-profile mt-3">Current Task</h3>
            <div className="tasks-list pt-5 ">
              {employee.tasks && employee.tasks.length > 0 ? (
                employee.tasks.map((task, index) => (
                  <div key={task._id} className="flex justify-start mt-6 ml-4">
                    <p className="mt-10 mr-3 font-normal">{index + 1}.</p>
                    <TaskEmployeeItem key={task._id} task={task} />
                  </div>
                ))
              ) : (
                <p className="text-center">Không có nhiệm vụ hiện tại.</p>
              )}
            </div>
          </section>
        </div>



      </div>
    </main>
  );
};

export default ProfilePage;
