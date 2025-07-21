"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Employee {
  _id: string;
  employeeName: string;
  employeeProfile: string;
  joiningDate: string; // Date format "YYYY-MM-DD"
  designation: string;
}

const NewEmployees: React.FC = () => {
  const [newEmployees, setNewEmployees] = useState<Employee[]>([]);

  // Fetch new employees based on their joining date
  useEffect(() => {
    const fetchNewEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/employees"); // Replace with your API endpoint
        const employees = response.data;

        // Get today's date
        const today = new Date();

        // Filter employees who joined today or in the past week (example logic)
        const recentEmployees = employees.filter((employee: Employee) => {
          const joinDate = new Date(employee.joiningDate);
          // Check if the employee joined in the past week (or you can adjust this logic based on your need)
          const timeDiff = today.getTime() - joinDate.getTime();
          const daysDiff = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days
          return daysDiff <= 7; // Joined within the last week
        });

        setNewEmployees(recentEmployees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchNewEmployees();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Interviews</h2>
      <div className="space-y-4">
        {newEmployees.length === 0 ? (
          <p>No new employees this week.</p>
        ) : (
          <div className="max-h-[300px] overflow-y-auto"> {/* Set max height and enable vertical scrolling */}
            {newEmployees.map((employee: Employee) => (
              <div key={employee._id} className="flex items-center space-x-4">
                <img
                  src={employee.employeeProfile || "/default-avatar.png"}
                  alt={employee.employeeName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-800">{employee.employeeName}</p>
                  <p className="text-gray-500 text-sm">{employee.designation}</p>
                  <p className="text-gray-400 text-xs">
                    Joined: {new Date(employee.joiningDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}  
export default NewEmployees;
