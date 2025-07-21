"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeInfoChart from "@/app/components/dashboard/EmployeesInfo";
import ApplicationCard from "@/app/components/dashboard/ApplicationCard";
import { HiDocumentText } from "react-icons/hi"; // Importing the document icon
import TotalEmployee from "@/app/components/dashboard/TotalEmployees";
import TopPerformers from "@/app/components/dashboard/TopPerformers";
import NewEmployees from "@/app/components/dashboard/NewEmployees"; // Import the NewEmployees component

const HrDashBoardList: React.FC = () => {
  const [applicationsCount, setApplicationsCount] = useState<number>(0);

  // Fetch applications count data
  useEffect(() => {
    const fetchApplicationsData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/employees"); // Replace with your API endpoint
        const employees = response.data;
        
        // Assuming the response is an array of employee objects, count the length of the array
        setApplicationsCount(employees.length); // Set the total count of employees
      } catch (err) {
        console.error("Error fetching applications data:", err);
      }
    };

    fetchApplicationsData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-md p-5">
        <h1 className="text-2xl font-bold text-gray-800">HR Dashboard</h1>
      </header>

       {/* Dashboard Analytics Section */}
     {/* Dashboard Analytics Section */}
     <section className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
        {/* Left Side: Application Card and New Employees */}
        <div className="col-span-1">
          <ApplicationCard
            count={applicationsCount}
            label="Applications"
            icon={<HiDocumentText className="w-8 h-8" />}
            imageSrc="/path-to-image/interview.svg" // Add the image path for better UI
          />
          <div className="bg-white p-5 rounded-lg shadow-md mt-5">
            <NewEmployees /> {/* Include the NewEmployees component */}
          </div>
        </div>

        {/* Right Side: Employee Info Chart */}
        <div className="col-span-1 md:col-span-2 bg-white p-5 rounded-lg shadow-md m-5">
          <EmployeeInfoChart />
        </div>
      </section>

      {/* Top Performers Section */}
      <TopPerformers />

    
    </div>
  );
};

export default HrDashBoardList;
