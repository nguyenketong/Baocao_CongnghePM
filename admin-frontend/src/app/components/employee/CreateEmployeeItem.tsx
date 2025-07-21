'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Department, Designation, Employee, EmployeeData } from '../../models/employee';
import { EmployeeFacade } from './employeeCreate/employeeFacade';

interface CreateEmployeeItemProps {
  onClose: () => void;
  onAdd: (newData: Partial<Employee>) => Promise<void>;
}

const CreateEmployeeItem: React.FC<CreateEmployeeItemProps> = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EmployeeData>();
  const [file, setFile] = useState<File | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [designations, setDesignations] = useState<Designation[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    EmployeeFacade.fetchDepartmentsAndDesignations().then(({ departments, designations }) => {
      setDepartments(departments);
      setDesignations(designations);
    });
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: EmployeeData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    await EmployeeFacade.createEmployee(data, file, reset, onClose);

    setIsSubmitting(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create New Employee</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Employee Name *</label>
            <input className="w-full p-2 border rounded" {...register('employeeName', { required: true })} placeholder="Enter name" />
            {errors.employeeName && <span className="text-red-500 text-sm">Required</span>}
          </div>
          <div>
            <label className="block text-sm font-medium">Profile Image *</label>
            <input type="file" onChange={onFileChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Joining Date *</label>
            <input type="date" className="w-full p-2 border rounded" {...register('joiningDate', { required: true })} />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone *</label>
            <input className="w-full p-2 border rounded" {...register('phone', { required: true })} placeholder="Enter phone number" />
          </div>
          <div>
            <label className="block text-sm font-medium">Department *</label>
            <select className="w-full p-2 border rounded" {...register('department', { required: true })}>
              <option value="">Select Department</option>
              {departments.map(dept => <option key={dept._id} value={dept._id}>{dept.nameDepartment}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Designation *</label>
            <select className="w-full p-2 border rounded" {...register('designation', { required: true })}>
              <option value="">Select Designation</option>
              {designations.map(desig => <option key={desig._id} value={desig._id}>{desig.designationName}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea className="w-full p-2 border rounded" {...register('description')} placeholder="Enter description" />
        </div>
        <h3 className="text-lg font-semibold mt-4">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Username *</label>
            <input className="w-full p-2 border rounded" {...register('account.userName', { required: true })} placeholder="Enter username" />
          </div>
          <div>
            <label className="block text-sm font-medium">Password *</label>
            <input type="password" className="w-full p-2 border rounded" {...register('account.password', { required: true })} placeholder="Enter password" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email *</label>
            <input type="email" className="w-full p-2 border rounded" {...register('account.email', { required: true })} placeholder="Enter email" />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployeeItem;
