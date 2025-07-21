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
exports.useProgressData = void 0;
var react_1 = require("react");
var axios_1 = require("axios");
var react_toastify_1 = require("react-toastify");
var progressFactory_1 = require("../../Item/progress/editProgress/progressFactory");
var API_PROGRESS_URL = 'http://localhost:3000/progress';
var API_CATEGORY_URL = 'http://localhost:3000/progresscategories';
var API_NOTIFICATION_URL = 'http://localhost:3000/notifications';
var API_ASSIGNPERSON_URL = 'http://localhost:3000/employees';
var useProgressData = function (progressId, setValue) {
    var _a = (0, react_1.useState)(null), progressData = _a[0], setProgressData = _a[1];
    var _b = (0, react_1.useState)([]), categories = _b[0], setCategories = _b[1];
    var _c = (0, react_1.useState)([]), notifications = _c[0], setNotifications = _c[1];
    var _d = (0, react_1.useState)([]), employees = _d[0], setEmployees = _d[1];
    var _e = (0, react_1.useState)(true), loading = _e[0], setLoading = _e[1];
    (0, react_1.useEffect)(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, progressRes, categoriesRes, employeesRes, notificationsRes, progress, formatDate, error_1;
            var _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, Promise.all([
                                axios_1.default.get("".concat(API_PROGRESS_URL, "/").concat(progressId)),
                                axios_1.default.get(API_CATEGORY_URL),
                                axios_1.default.get(API_ASSIGNPERSON_URL),
                                axios_1.default.get(API_NOTIFICATION_URL)
                            ])];
                    case 1:
                        _a = _f.sent(), progressRes = _a[0], categoriesRes = _a[1], employeesRes = _a[2], notificationsRes = _a[3];
                        progress = progressRes.data;
                        setProgressData(progress);
                        formatDate = function (isoString) { return isoString === null || isoString === void 0 ? void 0 : isoString.split('T')[0]; };
                        // Đặt giá trị vào form
                        setValue('progressName', progress.progressName);
                        setValue('progressStart', formatDate(progress.progressStart));
                        setValue('progressEnd', formatDate(progress.progressEnd));
                        setValue('priority', progress.priority || '');
                        setValue('description', progress.description || '');
                        setValue('status', progress.status || '');
                        setValue('progressCategory', ((_b = progress.progressCategory) === null || _b === void 0 ? void 0 : _b._id) || '');
                        setValue('notificationSent', ((_c = progress.notificationSent) === null || _c === void 0 ? void 0 : _c._id) || '');
                        setValue('taskAssignPerson', ((_d = progress.taskAssignPerson) === null || _d === void 0 ? void 0 : _d._id) || '');
                        setValue('taskRecipient', ((_e = progress.taskRecipient) === null || _e === void 0 ? void 0 : _e._id) || '');
                        // Chuyển đổi dữ liệu sang SelectOption[] bằng Factory Function
                        setCategories((0, progressFactory_1.mapToSelectOptions)(categoriesRes.data, 'progressCategoryName'));
                        setEmployees((0, progressFactory_1.mapToSelectOptions)(employeesRes.data, 'employeeName'));
                        setNotifications((0, progressFactory_1.mapToSelectOptions)(notificationsRes.data, 'notification_name'));
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _f.sent();
                        react_toastify_1.toast.error('Failed to load progress data');
                        console.error('Fetch Data Error:', error_1);
                        return [3 /*break*/, 4];
                    case 3:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, [progressId, setValue]);
    return { progressData: progressData, categories: categories, notifications: notifications, employees: employees, loading: loading };
};
exports.useProgressData = useProgressData;
