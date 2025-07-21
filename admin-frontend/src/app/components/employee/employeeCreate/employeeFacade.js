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
exports.EmployeeFacade = void 0;
var axios_1 = require("axios");
var react_toastify_1 = require("react-toastify");
var swr_1 = require("swr");
var formDataFactory_1 = require("./formDataFactory");
var observer_1 = require("./observer");
var API_BASE_URL = 'http://localhost:3000';
var API_DEPARTMENT_URL = "".concat(API_BASE_URL, "/departments");
var API_DESIGNATION_URL = "".concat(API_BASE_URL, "/designations");
var API_EMPLOYEE_URL = "".concat(API_BASE_URL, "/employees");
var EmployeeFacade = /** @class */ (function () {
    function EmployeeFacade() {
    }
    EmployeeFacade.fetchDepartmentsAndDesignations = function () {
        return __awaiter(this, void 0, void 0, function () {
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
                        return [2 /*return*/, { departments: deptRes.data, designations: desigRes.data }];
                    case 2:
                        error_1 = _b.sent();
                        console.error('Error fetching data:', error_1);
                        react_toastify_1.toast.error('Failed to load initial data');
                        return [2 /*return*/, { departments: [], designations: [] }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EmployeeFacade.createEmployee = function (data, file, reset, onClose) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        formData = (0, formDataFactory_1.createEmployeeFormData)(data, file);
                        return [4 /*yield*/, axios_1.default.post(API_EMPLOYEE_URL, formData, {
                                headers: { 'Content-Type': 'multipart/form-data' }
                            })];
                    case 1:
                        response = _a.sent();
                        if (response.status === 201 || response.status === 200) {
                            react_toastify_1.toast.success('Employee created successfully');
                            reset();
                            (0, swr_1.mutate)(API_EMPLOYEE_URL);
                            observer_1.employeeObserver.notify();
                            onClose();
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        react_toastify_1.toast.error('Error creating employee');
                        console.error('Error:', error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return EmployeeFacade;
}());
exports.EmployeeFacade = EmployeeFacade;
