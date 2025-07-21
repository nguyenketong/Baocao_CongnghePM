"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var InfoCard = function (_a) {
    var icon = _a.icon, label = _a.label, value = _a.value;
    return (<div className="info-card">
    <span className="info-icon" role="img" aria-hidden="true">
      {icon}
    </span>
    <div className="info-content">
      <p className="info-label">{label}</p>
      <p className="info-value">{value}</p>
    </div>
  </div>);
};
var EmployeeInfoItem = function (_a) {
    var employee = _a.employee;
    return (<section className="bg-white rounded-lg p-5 border border-slate-200">
      <div className="flex gap-4">
        <div className="flex flex-col pr-4 border-e-[1px] border-slate-200">
          <div className="w-48 h-48 rounded-full overflow-hidden mx-auto">
            {employee.employeeProfile ? (<img src={employee.employeeProfile} alt={"\u1EA2nh c\u1EE7a ".concat(employee.employeeName)} className="object-fit"/>) : (<div className="avatar-placeholder">
                {employee.employeeName.charAt(0)}
              </div>)}
            <div className="avatar-status online" aria-label="Trạng thái: online"/>
          </div>

          <div className="employee-title">
            <h2>{employee.employeeName}</h2>
            <p className="email">{employee.account.email}</p>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="info-grid">
            <InfoCard icon="👤" label="Tên tài khoản" value={employee.account.userName}/>
            {employee.phone && <InfoCard icon="📱" label="Số điện thoại" value={employee.phone}/>}
            {employee.joiningDate && (<InfoCard icon="📅" label="Ngày gia nhập" value={new Date(employee.joiningDate).toLocaleDateString("vi-VN")}/>)}
            {employee.department_id && (<InfoCard icon="🏢" label="Phòng ban" value={employee.department_id.nameDepartment}/>)}
            {employee.designation_id && (<InfoCard icon="💼" label="Chức vụ" value={employee.designation_id.designationName}/>)}
          </div>
        </div>
      </div>
    </section>);
};
exports.default = EmployeeInfoItem;
