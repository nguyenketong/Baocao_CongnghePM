"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var SelectField = function (_a) {
    var label = _a.label, options = _a.options, optionLabel = _a.optionLabel, register = _a.register, error = _a.error;
    return (<div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <select className="fw-full bg-gray-200 px-4 py-2 rounded-md focus:outline-none" {...register}>
      <option value="">Select {label}</option>
      {options.map(function (option, index) { return (<option key={index} value={option.value}>
          {option[optionLabel]}  {/* Truy cập thuộc tính động */}
        </option>); })}
    </select>
    {error && <span className="error-message">{error.message}</span>}
  </div>);
};
exports.default = SelectField;
