"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./login/Login";
import { Employee } from "./models/employee";
import NotificationTask from "./components/notification-task/NotificationTask";
import { getEmployeeById } from "./services/employeeService";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [upcomingTasks, setUpcomingTasks] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      const employeeId = localStorage.getItem("employeeId");
      if (!employeeId) return;

      try {
        const employeeData = await getEmployeeById(employeeId);
        console.log("Dữ liệu nhân viên mới nhất:", employeeData);
        setEmployee(employeeData);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin nhân viên:", error);
      }
    };

    if (isLoggedIn) {
      fetchEmployee();
    }
  }, [isLoggedIn]); // Cập nhật khi trạng thái đăng nhập thay đổi

  // Kiểm tra task sắp hết hạn
  useEffect(() => {
    if (!employee || !employee.tasks) return;

    const now = new Date();
    const threeDaysInMillis = 6 * 24 * 60 * 60 * 1000; // 6 ngày tính bằng milliseconds

    const tasks = employee.tasks.filter((task) => {
      const taskEnd = new Date(task.taskEnd);
      const timeDiff = taskEnd.getTime() - now.getTime();

      return (
        timeDiff > 0 && // Task chưa hết hạn
        timeDiff <= threeDaysInMillis && // Sắp hết hạn trong 3 ngày
        task.status === "In Progress" // Chỉ lấy task đang thực hiện
      );
    });

    setUpcomingTasks(tasks);
  }, [employee]);

  const handleLoginSuccess = (employee: Employee) => {
    setIsLoggedIn(true);

    // Kiểm tra designation_id của nhân viên và điều hướng tương ứng
    if (employee && employee.designation_id) {
      if (employee.designation_id.designationName === "Tech Lead") {
        router.push("/List/projectemployee"); // Điều hướng đến trang tasks nếu là Tech Lead
      }
      else if
        (employee.designation_id.designationName === "Admin") {
        router.push("/List/projects"); // Điều hướng đến trang project nếu không phải là Tech Lead
      }
      else if
        (employee.designation_id.designationName === "IT Project Manager") {
        router.push("/List/projectpm"); // Điều hướng đến trang project nếu không phải là Tech Lead
      }
      else if
        (employee.designation_id.designationName === "manager") {
        router.push("/List/projects"); // Điều hướng đến trang project nếu không phải là Tech Lead
      }
      else if
        (employee.designation_id.designationName !== "IT Project Manager,Admin,Tech Lead") {
        router.push("/List/projectemployee"); // Điều hướng đến trang project nếu không phải là Tech Lead
      }

    } else {
      console.error("Thông tin nhân viên không hợp lệ"); // Xử lý trường hợp không có thông tin nhân viên
    }
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="flex w-full bg-[#f8f9fa]">
          {isLoggedIn ? (
            <div className="flex w-full">
              <div className="h-full transition-all duration-700">
                <Sidebar />
              </div>
              <div className="flex flex-col w-full h-full mt-4 ml-3">
                <NotificationTask upcomingTasks={upcomingTasks} />
                {children}
              </div>
            </div>
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )}
        </div>
      </body>
    </html>
  );
}
