"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var FileUpload = function (_a) {
    var onChange = _a.onChange, required = _a.required, error = _a.error;
    return (<div className="form-group">
    <label className="form-label">Project Image</label>
    <input type="file" onChange={onChange} required={required} className={"form-input file-input ".concat(error ? 'border-red-500' : '')}/>
    {error && <span className="text-red-500 text-sm mt-1">{error.message}</span>} {/* Thêm màu cho thông báo lỗi */}
    <p className="text-xs text-gray-500 mt-2">Please upload a valid project image (max size: 5MB)</p> {/* Thêm mô tả */}
  </div>);
};
exports.default = FileUpload;
