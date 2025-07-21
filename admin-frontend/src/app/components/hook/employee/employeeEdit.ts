import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Department } from '@/app/models/department';
import { Designation } from '@/app/services/designationService';
import { Employee, EmployeeFormData } from '@/app/models/employee';
import { useForm } from 'react-hook-form';

const API_BASE_URL = 'http://localhost:3000';
const API_DEPARTMENT_URL = `${API_BASE_URL}/departments`;
const API_DESIGNATION_URL = `${API_BASE_URL}/designations`;

export const useEmployeeForm = (employee: Employee) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<EmployeeFormData>({
    defaultValues: {
      employeeName: employee.employeeName || '',
      phone: employee.phone || '',
      joiningDate: employee.joiningDate ? new Date(employee.joiningDate).toISOString().split('T')[0] : '',
      department: employee.department_id?._id || '',
      designation: employee.designation_id?._id || '',
      description: employee.description || '',
    }
  });

  const [file, setFile] = useState<File | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [designations, setDesignations] = useState<Designation[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cập nhật giá trị khi employee thay đổi
  useEffect(() => {
    if (employee) {
      setValue('employeeName', employee.employeeName || '');
      setValue('phone', employee.phone || '');
      setValue('joiningDate', employee.joiningDate ? new Date(employee.joiningDate).toISOString().split('T')[0] : '');
      setValue('department', employee.department_id?._id || '');
      setValue('designation', employee.designation_id?._id || '');
      setValue('description', employee.description || '');
    }
  }, [employee, setValue]);

  // Fetch dữ liệu department & designation
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deptRes, desigRes] = await Promise.all([
          axios.get(API_DEPARTMENT_URL),
          axios.get(API_DESIGNATION_URL)
        ]);
        setDepartments(deptRes.data);
        setDesignations(desigRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load initial data');
      }
    };
    fetchData();
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    file,
    setValue, 
    setFile,
    departments,
    designations,
    isSubmitting,
    setIsSubmitting,
    onFileChange,
  };
};
