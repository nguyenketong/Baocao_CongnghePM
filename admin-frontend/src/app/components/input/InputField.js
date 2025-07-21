"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// components/InputField.tsx
var react_1 = require("react");
var InputField = function (_a) {
    var label = _a.label, placeholder = _a.placeholder, type = _a.type, register = _a.register, error = _a.error;
    return (<div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input className="w-full bg-gray-200 px-4 py-2 rounded-md focus:outline-none" type={type} placeholder={placeholder} {...register}/>
    {error && <span className="error-message">{error.message}</span>}
  </div>);
};
exports.default = InputField;
