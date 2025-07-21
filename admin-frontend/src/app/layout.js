"use client";
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
exports.default = RootLayout;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var google_1 = require("next/font/google");
require("./globals.css");
var Sidebar_1 = require("./components/sidebar/Sidebar");
var react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
var Login_1 = require("./login/Login");
var NotificationTask_1 = require("./components/notification-task/NotificationTask");
var employeeService_1 = require("./services/employeeService");
var inter = (0, google_1.Inter)({ subsets: ["latin"] });
function RootLayout(_a) {
    var _this = this;
    var children = _a.children;
    var _b = (0, react_1.useState)(false), isLoggedIn = _b[0], setIsLoggedIn = _b[1];
    var _c = (0, react_1.useState)(null), employee = _c[0], setEmployee = _c[1];
    var _d = (0, react_1.useState)([]), upcomingTasks = _d[0], setUpcomingTasks = _d[1];
    var router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(function () {
        var token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);
    (0, react_1.useEffect)(function () {
        var fetchEmployee = function () { return __awaiter(_this, void 0, void 0, function () {
            var employeeId, employeeData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        employeeId = localStorage.getItem("employeeId");
                        if (!employeeId)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, employeeService_1.getEmployeeById)(employeeId)];
                    case 2:
                        employeeData = _a.sent();
                        console.log("Dữ liệu nhân viên mới nhất:", employeeData);
                        setEmployee(employeeData);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Lỗi khi lấy thông tin nhân viên:", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        if (isLoggedIn) {
            fetchEmployee();
        }
    }, [isLoggedIn]); // Cập nhật khi trạng thái đăng nhập thay đổi
    // Kiểm tra task sắp hết hạn
    (0, react_1.useEffect)(function () {
        if (!employee || !employee.tasks)
            return;
        var now = new Date();
        var threeDaysInMillis = 6 * 24 * 60 * 60 * 1000; // 6 ngày tính bằng milliseconds
        var tasks = employee.tasks.filter(function (task) {
            var taskEnd = new Date(task.taskEnd);
            var timeDiff = taskEnd.getTime() - now.getTime();
            return (timeDiff > 0 && // Task chưa hết hạn
                timeDiff <= threeDaysInMillis && // Sắp hết hạn trong 3 ngày
                task.status === "In Progress" // Chỉ lấy task đang thực hiện
            );
        });
        setUpcomingTasks(tasks);
    }, [employee]);
    var handleLoginSuccess = function (employee) {
        setIsLoggedIn(true);
        // Kiểm tra designation_id của nhân viên và điều hướng tương ứng
        if (employee && employee.designation_id) {
            if (employee.designation_id.designationName === "Tech Lead") {
                router.push("/List/projectemployee"); // Điều hướng đến trang tasks nếu là Tech Lead
            }
            else if (employee.designation_id.designationName === "Admin") {
                router.push("/List/projects"); // Điều hướng đến trang project nếu không phải là Tech Lead
            }
            else if (employee.designation_id.designationName === "IT Project Manager") {
                router.push("/List/projectpm"); // Điều hướng đến trang project nếu không phải là Tech Lead
            }
            else if (employee.designation_id.designationName === "manager") {
                router.push("/List/projects"); // Điều hướng đến trang project nếu không phải là Tech Lead
            }
            else if (employee.designation_id.designationName !== "IT Project Manager,Admin,Tech Lead") {
                router.push("/List/projectemployee"); // Điều hướng đến trang project nếu không phải là Tech Lead
            }
        }
        else {
            console.error("Thông tin nhân viên không hợp lệ"); // Xử lý trường hợp không có thông tin nhân viên
        }
    };
    return (<html lang="en">
      <body className={inter.className}>
        <react_toastify_1.ToastContainer position="top-right" autoClose={3000}/>
        <div className="flex w-full bg-[#f8f9fa]">
          {isLoggedIn ? (<div className="flex w-full">
              <div className="h-full transition-all duration-700">
                <Sidebar_1.default />
              </div>
              <div className="flex flex-col w-full h-full mt-4 ml-3">
                <NotificationTask_1.default upcomingTasks={upcomingTasks}/>
                {children}
              </div>
            </div>) : (<Login_1.default onLoginSuccess={handleLoginSuccess}/>)}
        </div>
      </body>
    </html>);
}
