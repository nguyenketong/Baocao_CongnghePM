"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var SidebarItemsList_1 = require("./SidebarItemsList");
var navigation_1 = require("next/navigation"); // Import useRouter
var adminItems = [
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
var leadItems = [
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
var mbItems = [
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
var pmItems = [
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
var managerItems = [
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
var bottomItems = [
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
var Sidebar = function () {
    var router = (0, navigation_1.useRouter)();
    var _a = (0, react_1.useState)(true), isSidebarOpen = _a[0], setIsSidebarOpen = _a[1];
    var _b = (0, react_1.useState)(null), role = _b[0], setRole = _b[1]; // Chỉ lưu vai trò duy nhất
    // Hàm đăng xuất
    var handleLogout = function () {
        localStorage.removeItem("token"); // Xóa token
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("logout")); // Gửi sự kiện logout
        router.push("/login"); // Điều hướng về login bằng Next.js
    };
    // Trạng thái để mở/đóng sidebar
    var toggleSidebar = function () {
        setIsSidebarOpen(function (prev) { return !prev; });
    };
    (0, react_1.useEffect)(function () {
        var _a;
        // Lấy thông tin user từ localStorage
        var storedEmployee = localStorage.getItem("employee");
        if (storedEmployee) {
            var employee = JSON.parse(storedEmployee);
            var userRole = ((_a = employee.designation_id) === null || _a === void 0 ? void 0 : _a.designationName) || "Member"; // Nếu không có role, mặc định là Member
            setRole(userRole);
        }
    }, []);
    // Xác định danh sách sidebar dựa trên vai trò
    var getSidebarItems = function () {
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
    return (<>
      {isSidebarOpen ? (<div className="fixed top-0 left-0 h-screen bg-[#2D336B] shadow-lg z-10 p-4 flex flex-col">
          <div className="flex flex-col flex-grow">
            <div className="flex items-center mb-3">
              {isSidebarOpen && (<span className="ml-1 text-2xl font-bold p-3 text-white">Project Manager</span>)}
            </div>

            {/* Render danh sách sidebar dựa trên vai trò */}
            <div className="flex flex-col flex-grow space-y-1">
              {getSidebarItems().map(function (item) { return (<SidebarItemsList_1.default key={item.path} item={item} isSidebarOpen={isSidebarOpen}/>); })}
            </div>

            <div className="flex flex-col space-y-1">
              {bottomItems.map(function (item) {
                return item.name === "Logout" ? (<div key={item.name} className="px-6 py-3 bg-[#2b51dd] text-white font-semibold rounded-sm shadow-lg cursor-pointer w-full
               hover:bg-black hover:text-[#A9B5DF] hover:shadow-xl transition duration-200 flex items-center justify-center space-x-2" onClick={handleLogout}>
                    {isSidebarOpen ? item.name : "🚪"}
                  </div>) : (<SidebarItemsList_1.default key={item.path} item={item} isSidebarOpen={isSidebarOpen}/>);
            })}
            </div>
          </div>
          <span className="fixed top-5 left-[253px] w-[45px] h-[45px] rounded-e-lg cursor-pointer bg-[#2D336B] flex items-center justify-center z-10" onClick={toggleSidebar}>
            <img src="/sidebar.svg" className="w-5 h-5" alt="Open Sidebar"/>
          </span>
        </div>) : (<span className="fixed top-5 left-0 w-[45px] h-[45px] rounded-e-lg cursor-pointer bg-[#2D336B] flex items-center justify-center z-10" onClick={toggleSidebar}>
          <img src="/sidebar.svg" className="w-5 h-5" alt="Open Sidebar"/>
        </span>)}

      {/* Phần nội dung của trang */}
      <div className={"flex-grow transition-all duration-700 ".concat(isSidebarOpen ? "ml-64" : "ml-23")}>
        <div className="p-6"></div>
      </div>
    </>);
};
exports.default = Sidebar;
