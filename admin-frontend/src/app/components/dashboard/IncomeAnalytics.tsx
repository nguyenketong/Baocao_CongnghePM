import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Project } from "@/app/models/project";

// Đăng ký các thành phần của Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const IncomeAnalytics: React.FC = () => {
  // State lưu danh sách project và dữ liệu biểu đồ
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [{ data: [] as number[], backgroundColor: [] as string[] }],
  });
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:3000/projects");
        const projects = response.data;

        // Trích xuất dữ liệu
        const labels = projects.map((project: Project) => project.projectName);
        const data = projects.map((project: [Project]) => project.budget);
        const total = data.reduce((acc: number, val: number) => acc + val, 0);

        // Màu sắc tối ưu (pastel)
        const backgroundColors = [
          "#4CAF50", "#FF9800", "#E91E63", "#3F51B5", "#00BCD4", "#8BC34A",
          "#FFC107", "#9C27B0", "#795548", "#FF5722"
        ].slice(0, projects.length);

        // Cập nhật state
        setChartData({ labels, datasets: [{ data, backgroundColor: backgroundColors }] });
        setTotalBudget(total);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md m-5 flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">📊 Budget Analytics</h2>

      {/* Tổng ngân sách */}
      <div className="mb-4 p-4 bg-blue-100 text-blue-800 rounded-lg shadow-md">
        <p className="text-sm">Tổng ngân sách:</p>
        <h3 className="text-xl font-bold">${totalBudget.toLocaleString()}</h3>
      </div>

      {/* Biểu đồ Doughnut */}
      <div className="w-72 h-72">
        {loading ? (
          <p className="text-gray-500 text-center animate-pulse">Đang tải dữ liệu...</p>
        ) : (
          <Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        )}
      </div>

      {/* Ghi chú */}
      <div className="mt-4 text-sm text-gray-500 text-center">
        Di chuột vào biểu đồ để xem chi tiết.
      </div>
    </div>
  );
};

export default IncomeAnalytics;
