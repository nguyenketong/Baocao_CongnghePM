"use client";
import React, { useState, useEffect } from "react";
import SidebarItems from "./SidebarItemsList";
import { useRouter } from "next/navigation"; // Import useRouter

interface ISidebarItem {
  name: string;
  path: string;
  items?: ISubItems[];
  icon?: string;
}

interface ISubItems {
  name: string;
  path: string;
}

const adminItems: ISidebarItem[] = [
  { name: "Departments", path: "/List/departments", icon: "/department.svg" },
  { name: "Designations", path: "/List/designation", icon: "/designation.svg" },
  { name: "Teams", path: "/List/teams", icon: "/teams.svg" },
  {
    name: "Employees",
    path: "/List/settings",
    items: [
      { name: "Members", path: "/employees" },
    ],
    icon: "/employees.svg"
  },
  { name: "Notifications", path: "/List/notifications", icon: "/notification.svg" },
  { name: "Accounts", path: "/List/accounts", icon: "/account.svg" },
  { name: "ProjectCategories", path: "/List/projectcategories", icon: "/project-cate.svg" },
  { name: "ProgressCategories", path: "/List/progresscategories", icon: "/progress-cate.svg" },
  { name: "TaskCategories", path: "/List/taskcategories", icon: "/task-cate.svg" },
  { name: "Project", path: "/List/projects", icon: "/task-cate.svg" },
];


const leadItems: ISidebarItem[] = [
  { name: "Teams", path: "/List/teamslead", icon: "/teams.svg" },
  {
    name: "Employees",
    path: "/List/settings",
    items: [
      { name: "Members", path: "/employeesLead" },
    ],
    icon: "/employees.svg"
  },

  {
    name: "Project",
    path: "/List/projects",
    items: [
      { name: "My Project", path: "/List/projectemployee" },
      { name: "My Task", path: "/List/taskemployee" },
      { name: "List Tasks", path: "/List/tasks" },
    ],
    icon: "/project.svg"
  },
  { name: "Reports", path: "/List/reports", icon: "/report.svg" },
];

const mbItems: ISidebarItem[] = [
  { name: "Teams", path: "/List/teamsmember", icon: "/teams.svg" },


  {
    name: "Project",
    path: "/List/projects",
    items: [
      { name: "My Project", path: "/List/projectemployee" },
      { name: "My Task", path: "/List/taskemployee" },

    ],
    icon: "/project.svg"
  },
  { name: "Reports", path: "/List/reports", icon: "/report.svg" },
];
const pmItems: ISidebarItem[] = [
  { name: "Teams", path: "/List/teamspm", icon: "/teams.svg" },
  {
    name: "Employees",
    path: "/List/settings",
    items: [
      { name: "Members", path: "/employeesPM" },
    ],
    icon: "/employees.svg"
  },

  {
    name: "Project",
    path: "/List/projects",
    items: [
      { name: "My Project", path: "/List/projectpm" },

    ],
    icon: "/project.svg"
  },

];

const managerItems: ISidebarItem[] = [
 
  { name: "Teams", path: "/List/teams", icon: "/teams.svg" },
 
  {
    name: "Dashboard",
    path: "/List/dashboard",
    items: [
      { name: "Dashboard", path: "/List/dashboard" },
      { name: "Hr Dashboard", path: "/List/hrdashboard" },
    ],
   icon: "/teams.svg",
   

  },

  {
    name: "Employees",
    path: "/List/settings",
    items: [
      { name: "Members", path: "/employees" },
    ],
    icon: "/employees.svg"
  },
  { name: "Project", path: "/List/projects", icon: "/task-cate.svg" },

  
];


const bottomItems: ISidebarItem[] = [
  {
    name: "Profile",
    path: "/List/profile",
    items: [
      { name: "Bio", path: "/profile/bio" },

    ],
    icon: "/profile.svg"
  },
  { name: "Logout", path: "#" },
];
const Sidebar = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [role, setRole] = useState<string | null>(null); // Chỉ lưu vai trò duy nhất

  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token"); // Xóa token
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("logout")); // Gửi sự kiện logout
    router.push("/login"); // Điều hướng về login bằng Next.js
  };

  // Trạng thái để mở/đóng sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    // Lấy thông tin user từ localStorage
    const storedEmployee = localStorage.getItem("employee");

    if (storedEmployee) {
      const employee = JSON.parse(storedEmployee);
      const userRole = employee.designation_id?.designationName || "Member"; // Nếu không có role, mặc định là Member
      setRole(userRole);
    }
  }, []);

  // Xác định danh sách sidebar dựa trên vai trò
  const getSidebarItems = () => {
    switch (role) {
      case "Admin":
        return adminItems;
      case "Technical Lead":
        return leadItems;
      case "IT Project Manager":
        return pmItems;
      case "manager":
        return managerItems;
      default:
        return mbItems; // Mặc định là Member
    }
  };

  return (
    <>
      {isSidebarOpen ? (
        <div className="fixed top-0 left-0 h-screen bg-[#2D336B] shadow-lg z-10 p-4 flex flex-col">
          <div className="flex flex-col flex-grow">
            <div className="flex items-center mb-3">
              {isSidebarOpen && (
                <span className="ml-1 text-2xl font-bold p-3 text-white">Project Manager</span>
              )}
            </div>

            {/* Render danh sách sidebar dựa trên vai trò */}
            <div className="flex flex-col flex-grow space-y-1">
              {getSidebarItems().map((item) => (
                <SidebarItems key={item.path} item={item} isSidebarOpen={isSidebarOpen} />
              ))}
            </div>

            <div className="flex flex-col space-y-1">
              {bottomItems.map((item) =>
                item.name === "Logout" ? (
                  <div
                    key={item.name}
                    className="px-6 py-3 bg-[#2b51dd] text-white font-semibold rounded-sm shadow-lg cursor-pointer w-full
               hover:bg-black hover:text-[#A9B5DF] hover:shadow-xl transition duration-200 flex items-center justify-center space-x-2"
                    onClick={handleLogout}
                  >
                    {isSidebarOpen ? item.name : "🚪"}
                  </div>
                ) : (
                  <SidebarItems key={item.path} item={item} isSidebarOpen={isSidebarOpen} />
                )
              )}
            </div>
          </div>
          <span className="fixed top-5 left-[253px] w-[45px] h-[45px] rounded-e-lg cursor-pointer bg-[#2D336B] flex items-center justify-center z-10" onClick={toggleSidebar}>
            <img src="/sidebar.svg" className="w-5 h-5" alt="Open Sidebar" />
          </span>
        </div>
      ) : (
        <span className="fixed top-5 left-0 w-[45px] h-[45px] rounded-e-lg cursor-pointer bg-[#2D336B] flex items-center justify-center z-10" onClick={toggleSidebar}>
          <img src="/sidebar.svg" className="w-5 h-5" alt="Open Sidebar" />
        </span>
      )}

      {/* Phần nội dung của trang */}
      <div className={`flex-grow transition-all duration-700 ${isSidebarOpen ? "ml-64" : "ml-23"}`}>
        <div className="p-6"></div>
      </div>
    </>
  );
};

export default Sidebar;
