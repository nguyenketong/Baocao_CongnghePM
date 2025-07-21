import { EmployeeData } from "@/app/models/employee";

export const createEmployeeFormData = (data: EmployeeData, file: File | null) => {
    const formData = new FormData();
    formData.append('employeeName', data.employeeName.trim());
    if (file) {
      formData.append('employeeProfile', file);
    }
    formData.append('joiningDate', data.joiningDate);
    formData.append('phone', data.phone.trim());
    formData.append('description', (data.description || '').trim());
    formData.append('department_id', data.department);
    formData.append('designation_id', data.designation);
    formData.append('account[userName]', data.account.userName.trim());
    formData.append('account[password]', data.account.password);
    formData.append('account[email]', data.account.email.trim());
    return formData;
  };
  