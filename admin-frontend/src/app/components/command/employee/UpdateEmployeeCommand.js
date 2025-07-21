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
exports.UpdateEmployeeCommand = void 0;
var axios_1 = require("axios");
var react_toastify_1 = require("react-toastify");
var swr_1 = require("swr");
var UpdateEmployeeStrategy_1 = require("../../employee/employeeEdit/UpdateEmployeeStrategy");
var API_BASE_URL = 'http://localhost:3000';
var CURRENT_USER = 'HMK1510';
var CURRENT_UTC_TIME = '2025-02-16 07:40:55';
var UpdateEmployeeCommand = /** @class */ (function () {
    function UpdateEmployeeCommand(employeeId, data, // Thay any bằng EmployeeFormData
    file, setIsSubmitting, onClose, observerSubject) {
        this.employeeId = employeeId;
        this.data = data;
        this.file = file;
        this.setIsSubmitting = setIsSubmitting;
        this.onClose = onClose;
        this.observerSubject = observerSubject;
    }
    UpdateEmployeeCommand.prototype.formatDateForServer = function (dateString) {
        try {
            var date = new Date(dateString);
            return date.toISOString();
        }
        catch (error) {
            console.error('Error formatting date:', error);
            return null;
        }
    };
    UpdateEmployeeCommand.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var formData, formattedDate, strategy, context, error_1, errorMessage;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.setIsSubmitting(true);
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, 4, 5]);
                        formData = new FormData();
                        formData.append('employeeName', this.data.employeeName.trim());
                        if (this.file)
                            formData.append('employeeProfile', this.file);
                        if (this.data.joiningDate) {
                            formattedDate = this.formatDateForServer(this.data.joiningDate);
                            if (formattedDate)
                                formData.append('joiningDate', formattedDate);
                        }
                        if (this.data.phone)
                            formData.append('phone', this.data.phone.trim());
                        if (this.data.description)
                            formData.append('description', this.data.description.trim());
                        if (this.data.department)
                            formData.append('department_id', this.data.department);
                        if (this.data.designation)
                            formData.append('designation_id', this.data.designation);
                        formData.append('lastUpdatedBy', CURRENT_USER);
                        formData.append('lastUpdatedAt', CURRENT_UTC_TIME);
                        strategy = this.file ? new UpdateEmployeeStrategy_1.UpdateWithImageStrategy() : new UpdateEmployeeStrategy_1.UpdateWithoutImageStrategy();
                        context = new UpdateEmployeeStrategy_1.UpdateEmployeeContext(strategy);
                        return [4 /*yield*/, context.executeStrategy(this.employeeId, formData)];
                    case 2:
                        _d.sent();
                        react_toastify_1.toast.success('Employee updated successfully');
                        (0, swr_1.mutate)("".concat(API_BASE_URL, "/employees"));
                        // Thông báo đến observer
                        this.observerSubject.notifyObservers(this.employeeId);
                        this.onClose();
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _d.sent();
                        if (axios_1.default.isAxiosError(error_1)) {
                            errorMessage = (_b = (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message;
                            react_toastify_1.toast.error(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage || 'Error updating employee');
                            console.error('API Error:', (_c = error_1.response) === null || _c === void 0 ? void 0 : _c.data);
                        }
                        else {
                            react_toastify_1.toast.error('An unexpected error occurred');
                            console.error('Error:', error_1);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        this.setIsSubmitting(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return UpdateEmployeeCommand;
}());
exports.UpdateEmployeeCommand = UpdateEmployeeCommand;
