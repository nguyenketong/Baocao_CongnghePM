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
exports.useEmployeeList = void 0;
var react_1 = require("react");
var debounce_1 = require("lodash/debounce");
var gsap_1 = require("gsap");
var employeeCommand_1 = require("../command/employeeCommand");
var SortStrategy_1 = require("../employees/SortStrategy");
var EmployeeStore_1 = require("../employees/EmployeeStore");
var useEmployeeList = function () {
    var _a = (0, react_1.useState)(false), showCreateEmployeeDialog = _a[0], setShowCreateEmployeeDialog = _a[1];
    var _b = (0, react_1.useState)(""), searchTerm = _b[0], setSearchTerm = _b[1];
    var _c = (0, react_1.useState)([]), employees = _c[0], setEmployees = _c[1];
    var _d = (0, react_1.useState)(new SortStrategy_1.SortByName()), sortStrategy = _d[0], setSortStrategy = _d[1];
    // Lắng nghe thay đổi từ EmployeeStore
    (0, react_1.useEffect)(function () {
        var updateEmployees = function () { return setEmployees(EmployeeStore_1.employeeStore.getEmployees()); };
        EmployeeStore_1.employeeStore.addObserver(updateEmployees);
        EmployeeStore_1.employeeStore.fetchEmployees();
        return function () {
            EmployeeStore_1.employeeStore.removeObserver(updateEmployees);
        };
    }, []);
    // Debounce tìm kiếm
    var debouncedSearch = (0, react_1.useCallback)((0, debounce_1.default)(function (value) { return setSearchTerm(value); }, 300), []);
    var handleSearchChange = function (e) {
        debouncedSearch(e.target.value);
    };
    // Lọc và sắp xếp nhân viên
    var filteredEmployees = (0, react_1.useMemo)(function () {
        var result = employees;
        if (searchTerm) {
            var searchTermLower_1 = searchTerm.toLowerCase();
            result = employees.filter(function (employee) {
                return employee.employeeName.toLowerCase().includes(searchTermLower_1);
            });
        }
        return sortStrategy.sort(result);
    }, [employees, searchTerm, sortStrategy]);
    // Hiệu ứng GSAP
    (0, react_1.useEffect)(function () {
        gsap_1.gsap.to("#addBtn", { opacity: 1, y: -50, delay: 0.5, backgroundColor: "#2D336B" });
    }, []);
    var handleOpenDialog = function () { return setShowCreateEmployeeDialog(true); };
    var handleCloseDialog = function () { return setShowCreateEmployeeDialog(false); };
    var handleAddEmployee = function (newData) { return __awaiter(void 0, void 0, void 0, function () {
        var command;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Adding new employee:", newData);
                    command = new employeeCommand_1.AddEmployeeCommand(newData);
                    return [4 /*yield*/, command.execute()];
                case 1:
                    _a.sent();
                    EmployeeStore_1.employeeStore.fetchEmployees();
                    console.log("Employee list after adding:", EmployeeStore_1.employeeStore.getEmployees());
                    return [2 /*return*/];
            }
        });
    }); };
    return {
        showCreateEmployeeDialog: showCreateEmployeeDialog,
        filteredEmployees: filteredEmployees,
        sortStrategy: sortStrategy,
        handleSearchChange: handleSearchChange,
        handleOpenDialog: handleOpenDialog,
        handleCloseDialog: handleCloseDialog,
        handleAddEmployee: handleAddEmployee,
        setSortStrategy: setSortStrategy,
    };
};
exports.useEmployeeList = useEmployeeList;
