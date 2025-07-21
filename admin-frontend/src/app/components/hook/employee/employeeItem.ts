import { Employee } from "@/app/models/employee";
import { useState, useEffect } from "react";
import EmployeeObserver from "../../employee/employeeItem/EmployeeObserver";
import EmployeeFactory from "@/app/employees/EmployeeFactory";
import { DeleteEmployeeCommand } from "../../command/employee/DeleteEmployeeCommand";


export const useEmployee = (employee: Employee) => {
  const [employeeData, setEmployeeData] = useState(EmployeeFactory.createEmployee(employee));
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const observer = EmployeeObserver.getInstance();

    const updateUI = () => {
      setEmployeeData(EmployeeFactory.createEmployee(employee));
    };

    observer.subscribe(updateUI);
    return () => observer.unsubscribe(updateUI);
  }, [employee]);

  const handleDelete = async () => {
    setIsDeleting(true);
    const deleteCommand = new DeleteEmployeeCommand(employeeData._id);
    await deleteCommand.execute();
    setIsDeleting(false);
    EmployeeObserver.getInstance().notify();
  };

  return {
    employeeData,
    isDeleting,
    handleDelete,
  };
};
