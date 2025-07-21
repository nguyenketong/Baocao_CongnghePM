import { useState } from "react";
import { Employee } from "../models/employee";

// API URLs (giả sử bạn có API này)
const API_URL = "http://localhost:3000/auth/login"; 
const TEAM_API_URL = "http://localhost:3000/teams";
const TASK_API_URL = "http://localhost:3000/tasks";

export const useLogin = (onLoginSuccess: (employee: Employee) => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError("");

    console.log("🔗 API URL:", API_URL);
    console.log("📩 Gửi dữ liệu đăng nhập:", { email, password });

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("📥 Phản hồi từ server:", response);

      const data = await response.json();
      console.log("📌 Dữ liệu trả về:", data);

      if (!response.ok) {
        throw new Error(data.message || "Đăng nhập thất bại");
      }

      // Lưu token, email và thông tin nhân viên vào localStorage
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("email", email); // Lưu email vào localStorage
      localStorage.setItem("employeeId", data.employee._id);

      localStorage.setItem("employee", JSON.stringify(data.employee));

      // Gọi các API lấy thêm dữ liệu liên quan
      const teamResponse = await fetch(`${TEAM_API_URL}?employeeId=${data.employee._id}`);
      const teamData = await teamResponse.json();
      data.employee.team_id = teamData; // Gán team data vào employee

      const tasksResponse = await fetch(`${TASK_API_URL}?taskRecipientId=${data.employee._id}`);
      const tasksData = await tasksResponse.json();
      data.employee.tasks = tasksData; // Gán tasks data vào employee

      // Call the function that handles successful login
      onLoginSuccess(data.employee);
    } catch (error) {
      console.error("❌ Lỗi đăng nhập:", error);
      setError(error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleLogin };
};
