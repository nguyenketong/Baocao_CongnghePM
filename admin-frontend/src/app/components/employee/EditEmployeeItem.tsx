'use client';

import React, { useEffect } from 'react';
import { Employee, EmployeeFormData } from '@/app/models/employee';

import { useEmployeeForm } from '../hook/employee/employeeEdit';

import { EmployeeFacade } from './employeeEdit/EmployeeFacade';

interface EditEmployeeItemProps {
  employee: Employee;
  onClose: () => void;
}

const EditEmployeeItem: React.FC<EditEmployeeItemProps> = ({ employee, onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    file,
    departments,
    designations,
    isSubmitting,
    setIsSubmitting,
    onFileChange
  } = useEmployeeForm(employee);

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

 

  const onSubmit = async (data: EmployeeFormData) => {
    if (isSubmitting) return;
    await EmployeeFacade.updateEmployee(employee._id, data, file, setIsSubmitting, onClose);
  };
  

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Employee</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Employee Name *</label>
          <input {...register('employeeName', { required: 'Employee name is required' })} 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          {errors.employeeName && <p className="text-red-500 text-sm">{errors.employeeName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Image</label>
          <input type="file" onChange={onFileChange} accept="image/*" 
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none" />
          {employee.employeeProfile && (
            <img src={`http://localhost:3000${employee.employeeProfile}`} alt="Profile" 
              className="mt-2 h-20 w-20 rounded-full border" />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Joining Date</label>
            <input type="date" {...register('joiningDate')} max={new Date().toISOString().split('T')[0]} 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input {...register('phone')} 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select {...register('department')} 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept._id} value={dept._id}>{dept.nameDepartment}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Designation</label>
            <select {...register('designation')} 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select Designation</option>
              {designations.map(desig => (
                <option key={desig._id} value={desig._id}>{desig.designationName}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea {...register('description')} 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <div className="flex justify-end space-x-3">
          <button type="button" className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={onClose}>Cancel</button>
          <button type="submit" disabled={isSubmitting} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
            {isSubmitting ? 'Updating...' : 'Update Employee'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeItem;
