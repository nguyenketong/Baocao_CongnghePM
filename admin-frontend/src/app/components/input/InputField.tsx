// components/InputField.tsx
import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  placeholder: string;
  value?: string;
  disabled?: boolean;
  type: string;

  register?: UseFormRegisterReturn<string>;
  error?: FieldError | undefined; // Lỗi validation
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, type, register, error }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input className="w-full bg-gray-200 px-4 py-2 rounded-md focus:outline-none" type={type} placeholder={placeholder} {...register} />
    {error && <span className="error-message">{error.message}</span>}
  </div>
);

export default InputField;
