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
var react_1 = require("react");
var axios_1 = require("axios");
var react_toastify_1 = require("react-toastify");
var API_CATEGORY_URL = 'http://localhost:3000/progresscategories';
var API_NOTIFICATION_URL = 'http://localhost:3000/notifications';
var API_ASSIGNPERSON_URL = 'http://localhost:3000/employees';
var API_PROJECT_URL = 'http://localhost:3000/projects';
var useFetchData = function () {
    var _a = (0, react_1.useState)([]), categories = _a[0], setCategories = _a[1];
    var _b = (0, react_1.useState)([]), notifications = _b[0], setNotifications = _b[1];
    var _c = (0, react_1.useState)([]), employees = _c[0], setEmployees = _c[1];
    var _d = (0, react_1.useState)([]), projects = _d[0], setProjects = _d[1];
    var _e = (0, react_1.useState)(true), isLoading = _e[0], setIsLoading = _e[1];
    (0, react_1.useEffect)(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, categoriesRes, employeesRes, notificationsRes, projectsRes, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, Promise.all([
                                axios_1.default.get(API_CATEGORY_URL),
                                axios_1.default.get(API_ASSIGNPERSON_URL),
                                axios_1.default.get(API_NOTIFICATION_URL),
                                axios_1.default.get(API_PROJECT_URL),
                            ])];
                    case 1:
                        _a = _b.sent(), categoriesRes = _a[0], employeesRes = _a[1], notificationsRes = _a[2], projectsRes = _a[3];
                        setCategories(categoriesRes.data);
                        setEmployees(employeesRes.data);
                        setNotifications(notificationsRes.data);
                        setProjects(projectsRes.data);
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _b.sent();
                        react_toastify_1.toast.error('Lỗi khi tải dữ liệu');
                        console.error(error_1);
                        return [3 /*break*/, 4];
                    case 3:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    return { categories: categories, notifications: notifications, employees: employees, projects: projects, isLoading: isLoading };
};
exports.default = useFetchData;
