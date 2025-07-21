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
exports.useLogin = void 0;
var react_1 = require("react");
// API URLs (giả sử bạn có API này)
var API_URL = "http://localhost:3000/auth/login";
var TEAM_API_URL = "http://localhost:3000/teams";
var TASK_API_URL = "http://localhost:3000/tasks";
var useLogin = function (onLoginSuccess) {
    var _a = (0, react_1.useState)(false), loading = _a[0], setLoading = _a[1];
    var _b = (0, react_1.useState)(""), error = _b[0], setError = _b[1];
    var handleLogin = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, teamResponse, teamData, tasksResponse, tasksData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    setError("");
                    console.log("🔗 API URL:", API_URL);
                    console.log("📩 Gửi dữ liệu đăng nhập:", { email: email, password: password });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, 9, 10]);
                    return [4 /*yield*/, fetch(API_URL, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email: email, password: password }),
                        })];
                case 2:
                    response = _a.sent();
                    console.log("📥 Phản hồi từ server:", response);
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    console.log("📌 Dữ liệu trả về:", data);
                    if (!response.ok) {
                        throw new Error(data.message || "Đăng nhập thất bại");
                    }
                    // Lưu token, email và thông tin nhân viên vào localStorage
                    localStorage.setItem("token", data.accessToken);
                    localStorage.setItem("email", email); // Lưu email vào localStorage
                    localStorage.setItem("employeeId", data.employee._id);
                    localStorage.setItem("employee", JSON.stringify(data.employee));
                    return [4 /*yield*/, fetch("".concat(TEAM_API_URL, "?employeeId=").concat(data.employee._id))];
                case 4:
                    teamResponse = _a.sent();
                    return [4 /*yield*/, teamResponse.json()];
                case 5:
                    teamData = _a.sent();
                    data.employee.team_id = teamData; // Gán team data vào employee
                    return [4 /*yield*/, fetch("".concat(TASK_API_URL, "?taskRecipientId=").concat(data.employee._id))];
                case 6:
                    tasksResponse = _a.sent();
                    return [4 /*yield*/, tasksResponse.json()];
                case 7:
                    tasksData = _a.sent();
                    data.employee.tasks = tasksData; // Gán tasks data vào employee
                    // Call the function that handles successful login
                    onLoginSuccess(data.employee);
                    return [3 /*break*/, 10];
                case 8:
                    error_1 = _a.sent();
                    console.error("❌ Lỗi đăng nhập:", error_1);
                    setError(error_1 instanceof Error ? error_1.message : "Đã xảy ra lỗi không xác định");
                    return [3 /*break*/, 10];
                case 9:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    }); };
    return { loading: loading, error: error, handleLogin: handleLogin };
};
exports.useLogin = useLogin;
