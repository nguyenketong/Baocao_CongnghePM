import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

// Định nghĩa kiểu SelectOption rõ ràng
interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  defaultValue?: string; // Thêm defaultValue vào đây
  options: SelectOption[];  // Thay any[] bằng SelectOption[]
  optionLabel: string;
  register: UseFormRegisterReturn<string>;  // Cập nhật register với kiểu đúng từ react-hook-form
  error?: FieldError | undefined;  // Cập nhật error với FieldError thay vì any
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  optionLabel,
  register,
  error,
}) => (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <select className="fw-full bg-gray-200 px-4 py-2 rounded-md focus:outline-none" {...register}>
      <option value="">Select {label}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option[optionLabel as keyof SelectOption]}  {/* Truy cập thuộc tính động */}
        </option>
      ))}
    </select>
    {error && <span className="error-message">{error.message}</span>}
  </div>
);

export default SelectField;
