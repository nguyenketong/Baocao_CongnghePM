"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEmployeeForm = void 0;
var react_1 = require("react");
var axios_1 = require("axios");
var react_toastify_1 = require("react-toastify");
var react_hook_form_1 = require("react-hook-form");
var API_BASE_URL = 'http://localhost:3000';
var API_DEPARTMENT_URL = "".concat(API_BASE_URL, "/departments");
var API_DESIGNATION_URL = "".concat(API_BASE_URL, "/designations");
var useEmployeeForm = function (employee) {
    var _a, _b;
    var _c = (0, react_hook_form_1.useForm)({
        defaultValues: {
            employeeName: employee.employeeName || '',
            phone: employee.phone || '',
            joiningDate: employee.joiningDate ? new Date(employee.joiningDate).toISOString().split('T')[0] : '',
            department: ((_a = employee.department_id) === null || _a === void 0 ? void 0 : _a._id) || '',
            designation: ((_b = employee.designation_id) === null || _b === void 0 ? void 0 : _b._id) || '',
            description: employee.description || '',
        }
    }), register = _c.register, handleSubmit = _c.handleSubmit, setValue = _c.setValue, errors = _c.formState.errors;
    var _d = (0, react_1.useState)(null), file = _d[0], setFile = _d[1];
    var _e = (0, react_1.useState)([]), departments = _e[0], setDepartments = _e[1];
    var _f = (0, react_1.useState)([]), designations = _f[0], setDesignations = _f[1];
    var _g = (0, react_1.useState)(false), isSubmitting = _g[0], setIsSubmitting = _g[1];
    // Cập nhật giá trị khi employee thay đổi
    (0, react_1.useEffect)(function () {
        var _a, _b;
        if (employee) {
            setValue('employeeName', employee.employeeName || '');
            setValue('phone', employee.phone || '');
            setValue('joiningDate', employee.joiningDate ? new Date(employee.joiningDate).toISOString().split('T')[0] : '');
            setValue('department', ((_a = employee.department_id) === null || _a === void 0 ? void 0 : _a._id) || '');
            setValue('designation', ((_b = employee.designation_id) === null || _b === void 0 ? void 0 : _b._id) || '');
            setValue('description', employee.description || '');
        }
    }, [employee, setValue]);
    // Fetch dữ liệu department & designation
    (0, react_1.useEffect)(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, deptRes, desigRes, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.all([
                                axios_1.default.get(API_DEPARTMENT_URL),
                                axios_1.default.get(API_DESIGNATION_URL)
                            ])];
                    case 1:
                        _a = _b.sent(), deptRes = _a[0], desigRes = _a[1];
                        setDepartments(deptRes.data);
                        setDesignations(desigRes.data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.error('Error fetching data:', error_1);
                        react_toastify_1.toast.error('Failed to load initial data');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    var onFileChange = function (e) {
        var _a;
        if ((_a = e.target.files) === null || _a === void 0 ? void 0 : _a.length) {
            setFile(e.target.files[0]);
        }
    };
    return {
        register: register,
        handleSubmit: handleSubmit,
        errors: errors,
        file: file,
        setValue: setValue,
        setFile: setFile,
        departments: departments,
        designations: designations,
        isSubmitting: isSubmitting,
        setIsSubmitting: setIsSubmitting,
        onFileChange: onFileChange,
    };
};
exports.useEmployeeForm = useEmployeeForm;
