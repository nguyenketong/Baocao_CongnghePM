import { useState, useEffect, useCallback, useMemo } from "react";
import debounce from "lodash/debounce";
import { gsap } from "gsap";
import { Employee } from "../models/employee";

import { AddEmployeeCommand } from "../command/employeeCommand";
import { SortByName, SortStrategy } from "../employees/SortStrategy";
import { employeeStore } from "../employees/EmployeeStore";

export const useEmployeeList = () => {
  const [showCreateEmployeeDialog, setShowCreateEmployeeDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [sortStrategy, setSortStrategy] = useState<SortStrategy>(new SortByName());

  // Lắng nghe thay đổi từ EmployeeStore
  useEffect(() => {
    const updateEmployees = () => setEmployees(employeeStore.getEmployees());

    employeeStore.addObserver(updateEmployees);
    employeeStore.fetchEmployees();

    return () => {
      employeeStore.removeObserver(updateEmployees);
    };
  }, []);

  // Debounce tìm kiếm
  const debouncedSearch = useCallback(
    debounce((value: string) => setSearchTerm(value), 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  // Lọc và sắp xếp nhân viên
  const filteredEmployees = useMemo(() => {
    let result = employees;
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      result = employees.filter((employee) =>
        employee.employeeName.toLowerCase().includes(searchTermLower)
      );
    }
    return sortStrategy.sort(result);
  }, [employees, searchTerm, sortStrategy]);

  // Hiệu ứng GSAP
  useEffect(() => {
    gsap.to("#addBtn", { opacity: 1, y: -50, delay: 0.5, backgroundColor: "#2D336B" });
  }, []);

  const handleOpenDialog = () => setShowCreateEmployeeDialog(true);
  const handleCloseDialog = () => setShowCreateEmployeeDialog(false);

  const handleAddEmployee = async (newData: Partial<Employee>) => {
    console.log("Adding new employee:", newData);
    const command = new AddEmployeeCommand(newData);
    await command.execute();
    employeeStore.fetchEmployees();
    console.log("Employee list after adding:", employeeStore.getEmployees());
  };

  return {
    showCreateEmployeeDialog,
    filteredEmployees,
    sortStrategy,
    handleSearchChange,
    handleOpenDialog,
    handleCloseDialog,
    handleAddEmployee,
    setSortStrategy,
  };
};
