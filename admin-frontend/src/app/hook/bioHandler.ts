import { useEffect, useState } from "react";
import { Employee } from "../models/employee";
import { getEmployeeById } from "../services/employeeService";

export const useEmployee = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const employeeId = localStorage.getItem("employeeId");

    if (!employeeId) {
      setError("Không có ID nhân viên trong localStorage");
      setLoading(false);
      return;
    }

    getEmployeeById(employeeId)
      .then((data) => setEmployee(data))
      .catch((err) => setError(err.message || "Lỗi không xác định"))
      .finally(() => setLoading(false));
  }, []);

  return { employee, error, loading };
};
