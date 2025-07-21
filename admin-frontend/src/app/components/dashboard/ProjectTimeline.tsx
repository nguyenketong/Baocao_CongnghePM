"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

// Register necessary chart elements
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Define types for the data structure
interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

const ProjectTimelineChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null); // State to hold the chart data
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        // Step 1: Fetch all projects
        const projectResponse = await axios.get("http://localhost:3000/projects");
        const projects = projectResponse.data;

        // Step 2: Fetch progress data for each project
        const progressPromises = projects.map((project: any) =>
          axios.get(`http://localhost:3000/progress?projectId=${project._id}`)
        );
        const progressResponses = await Promise.all(progressPromises);

        // Step 3: Filter out the progress that is completed for each project and make sure progress belongs to the project
        const filteredProgressData = projects.map((project: any, index: number) => {
          const projectProgress = progressResponses[index].data;

          // Debugging: Log each progress status to check the values
          console.log("Project Progress Data for Project:", project._id, projectProgress);

          // Filter progress that is associated with the current project and is marked as "Completed"
          const completedProgress = projectProgress.filter(
            (progress: any) => progress.projectid._id === project._id && progress.status.trim() === "Completed"
          );

          // Debugging: Check the completed progress for this project
          console.log("Completed Progresses for Project:", project._id, completedProgress);

          return completedProgress.length; // Return the number of completed progresses for each project
        });

        // Step 4: Prepare chart data
        const labels = [
          "Mar '20", "02 Mar", "03 Mar", "04 Mar", "05 Mar", "06 Mar", 
          "07 Mar", "08 Mar", "09 Mar", "10 Mar", "11 Mar", "12 Mar", 
          "13 Mar", "14 Mar"
        ];

        // Construct the datasets, now each dataset corresponds to the completed progresses per project
        const datasets: Dataset[] = projects.map((project: any, index: number) => {
          return {
            label: project.projectName,
            data: [filteredProgressData[index]], // Just showing the number of completed progresses for each project
            backgroundColor: "rgba(54, 162, 235, 0.2)", // Color for the project
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          };
        });

        // Set the chart data
        setChartData({
          labels,
          datasets,
        });
      } catch (err) {
        setError("Lỗi khi lấy dữ liệu dự án và tiến độ.");
        console.error("Error fetching project or progress data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Project Timeline",
        font: {
          size: 16,
        },
      },
      legend: {
        position: "top", // Valid position for legend
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Completed Progresses",
        },
      },
    },
  };

  if (isLoading) {
    return <div>Đang tải thông tin...</div>;
  }

  if (error) {
    return <div>Lỗi khi lấy dữ liệu dự án và tiến độ.</div>;
  }

  return (
    <div className="bg-white p-5 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Project Timeline</h2>
      {chartData ? <Line data={chartData} options={options} /> : <p>Không có dữ liệu để hiển thị.</p>}
    </div>
  );
};

export default ProjectTimelineChart;
