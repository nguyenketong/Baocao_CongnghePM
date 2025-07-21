"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // Import the Filler plugin
} from "chart.js";

// Register necessary chart elements and Filler plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Register the Filler plugin
);

const EmployeeInfoChart: React.FC = () => {
  const [employeeData, setEmployeeData] = useState<any[]>([]);

  // Fetch data from API
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/employees"); // Replace with your API URL
        const employees = response.data;

        // Process employee data to count employees per date (for example: per month)
        const dates = ["0 Jan", "31 Jan", "22 Feb", "15 Mar", "05 Apr", "26 Apr", "17 May", "08 Jun", "29 Jun", "20 Jul"];
        const employeeCount = dates.map((date, index) => {
          // Filter and count employees based on their joining or leaving date (adjust this based on your data structure)
          const count = employees.filter((employee: any) => {
            // Assuming employee has `joinDate` field (format as YYYY-MM-DD)
            const joinDate = new Date(employee.joiningDate);
            return joinDate.getMonth() === index; // Modify the condition based on your data
          }).length;
          return count;
        });

        setEmployeeData(employeeCount);
      } catch (err) {
        console.error("Error fetching employee data:", err);
      }
    };

    fetchEmployeeData();
  }, []);

  // Data for the chart (this will be dynamic data)
  const data = {
    labels: [
      "0 Jan", "31 Jan", "22 Feb", "15 Mar", "05 Apr", "26 Apr", "17 May", "08 Jun", "29 Jun", "20 Jul"
    ],
    datasets: [
      {
        label: "Employees Info",
        data: employeeData, // Using the dynamic employee count
        fill: true, // Enable the fill option
        backgroundColor: "rgba(255, 159, 64, 0.2)", // Gradient background
        borderColor: "rgba(255, 159, 64, 1)", // Line color
        borderWidth: 2,
        pointBackgroundColor: "rgba(255, 159, 64, 1)", // Point color
        pointRadius: 5, // Size of the point
        tension: 0.4, // Makes the line curve
        pointHitRadius: 10,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Employees Info",
        font: {
          size: 18,
        },
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
          text: "Number of Employees",
        },
      },
    },
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      {/* Heading */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Employees Info</h2>

      {/* Chart */}
      <div className="h-72 sm:h-96"> {/* Set a fixed height for the chart */}
        <Line data={data} options={options} />
      </div>

      {/* Additional Information (Optional) */}
      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
          <p>New Employees</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <p>Returning Employees</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfoChart;
