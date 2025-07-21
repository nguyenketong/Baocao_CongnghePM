"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the type for the metric component
interface ApplicationCardProps {
  count: number;
  label: string;
  icon: React.ReactNode;
  imageSrc: string; // Add the imageSrc prop here
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ count, label, icon, imageSrc }) => {
  return (
    <div className="bg-indigo-600 text-white p-5 rounded-lg shadow-lg flex items-center justify-between">
      {/* Left side of the card */}
      <div className="flex flex-col items-center">
        <span className="avatar lg bg-white rounded-full flex items-center justify-center p-4">
          {icon}
        </span>
        <h1 className="mt-3 mb-0 fw-bold text-white text-3xl">{count}</h1>
        <span className="text-white">{label}</span>
      </div>

     
    </div>
  );
};

const EmployeeCountCard: React.FC = () => {
  const [employeeCount, setEmployeeCount] = useState<number>(0);

  // Fetch total number of employees from the API
  useEffect(() => {
    const fetchEmployeeCount = async () => {
      try {
        const response = await axios.get("http://localhost:3000/employees"); // API to get all employees
        const employees = response.data;
        setEmployeeCount(employees.length); // Set the total number of employees
      } catch (err) {
        console.error("Error fetching employee data:", err);
      }
    };

    fetchEmployeeCount();
  }, []);

  return (
    <ApplicationCard
      count={employeeCount} // Pass the employee count to ApplicationCard
      label="Total Employees"
      icon={<i className="fa fa-users"></i>} // Example icon (you can replace it with your custom icon)
      imageSrc="/path-to-your-image.jpg" // Add image source here (replace with the actual image path)
    />
  );
};

export default EmployeeCountCard;
