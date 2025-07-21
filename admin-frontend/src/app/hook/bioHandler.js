"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEmployee = void 0;
var react_1 = require("react");
var employeeService_1 = require("../services/employeeService");
var useEmployee = function () {
    var _a = (0, react_1.useState)(null), employee = _a[0], setEmployee = _a[1];
    var _b = (0, react_1.useState)(null), error = _b[0], setError = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    (0, react_1.useEffect)(function () {
        var employeeId = localStorage.getItem("employeeId");
        if (!employeeId) {
            setError("Không có ID nhân viên trong localStorage");
            setLoading(false);
            return;
        }
        (0, employeeService_1.getEmployeeById)(employeeId)
            .then(function (data) { return setEmployee(data); })
            .catch(function (err) { return setError(err.message || "Lỗi không xác định"); })
            .finally(function () { return setLoading(false); });
    }, []);
    return { employee: employee, error: error, loading: loading };
};
exports.useEmployee = useEmployee;
