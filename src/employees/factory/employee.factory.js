"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeFactory = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("mongoose");
var EmployeeFactory = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var EmployeeFactory = _classThis = /** @class */ (function () {
        function EmployeeFactory_1(employeeModel, teamModel, projectModel, accountModel, projectPermissionsModel, departmentService, designationService, projectPermissionService, accountService) {
            this.employeeModel = employeeModel;
            this.teamModel = teamModel;
            this.projectModel = projectModel;
            this.accountModel = accountModel;
            this.projectPermissionsModel = projectPermissionsModel;
            this.departmentService = departmentService;
            this.designationService = designationService;
            this.projectPermissionService = projectPermissionService;
            this.accountService = accountService;
        }
        EmployeeFactory_1.prototype.create = function (_a) {
            return __awaiter(this, void 0, void 0, function () {
                var savedAccounts, savedProjectPermissions, createdAccounts, createdProjectPermissions, department_id, designation_id, departmentExists, designationExists, newEmployee;
                var account = _a.account, projectpermission = _a.projectpermission, createEmployee = __rest(_a, ["account", "projectpermission"]);
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            savedAccounts = null;
                            savedProjectPermissions = [];
                            if (!account) return [3 /*break*/, 2];
                            createdAccounts = new this.accountModel(account);
                            return [4 /*yield*/, createdAccounts.save()];
                        case 1:
                            savedAccounts = _b.sent();
                            _b.label = 2;
                        case 2:
                            if (!(projectpermission && projectpermission.length > 0)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.projectPermissionsModel.insertMany(projectpermission)];
                        case 3:
                            createdProjectPermissions = _b.sent();
                            // Chuyển đổi _id thành ObjectId và kiểm tra kiểu dữ liệu
                            savedProjectPermissions = createdProjectPermissions
                                .map(function (permission) { return ('_id' in permission ? permission._id : null); })
                                .filter(function (id) { return id !== null; });
                            _b.label = 4;
                        case 4:
                            department_id = createEmployee.department_id, designation_id = createEmployee.designation_id;
                            if (!department_id) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.departmentService.getDepartmentById(department_id)];
                        case 5:
                            departmentExists = _b.sent();
                            if (!departmentExists) {
                                throw new common_1.NotFoundException('Department không tồn tại');
                            }
                            _b.label = 6;
                        case 6:
                            if (!designation_id) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.designationService.getDesignationById(designation_id)];
                        case 7:
                            designationExists = _b.sent();
                            if (!designationExists) {
                                throw new common_1.NotFoundException('Designation không tồn tại');
                            }
                            _b.label = 8;
                        case 8:
                            newEmployee = new this.employeeModel(__assign(__assign({}, createEmployee), { account: (savedAccounts === null || savedAccounts === void 0 ? void 0 : savedAccounts._id) || null, projectpermission: savedProjectPermissions.length > 0 ? savedProjectPermissions : [] }));
                            return [2 /*return*/, newEmployee.save()];
                    }
                });
            });
        };
        EmployeeFactory_1.prototype.getByUsernameOrEmail = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                var account, employee;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log("🔍 Đang tìm kiếm tài khoản với email:", email);
                            return [4 /*yield*/, this.accountModel.findOne({ email: email }).select("_id userName email password")];
                        case 1:
                            account = _a.sent();
                            if (!account) {
                                console.log("❌ Không tìm thấy tài khoản.");
                                return [2 /*return*/, null];
                            }
                            console.log("✅ Tìm thấy tài khoản:", account);
                            return [4 /*yield*/, this.employeeModel.findOne({ account: account._id })
                                    .populate(['department_id', 'designation_id', 'team_id', 'projectpermission'])
                                    .populate({
                                    path: 'account',
                                    model: 'Account',
                                    select: 'userName email password',
                                })
                                    .exec()];
                        case 2:
                            employee = _a.sent();
                            console.log("📌 Dữ liệu nhân viên từ DB:", employee);
                            return [2 /*return*/, employee];
                    }
                });
            });
        };
        EmployeeFactory_1.prototype.getAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.employeeModel
                                .find()
                                .populate('department_id')
                                .populate('designation_id')
                                .populate('account')
                                .populate('team_id')
                                .populate('projectpermission')
                                .exec()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        EmployeeFactory_1.prototype.getById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var employee;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                                throw new common_1.NotFoundException('ID không hợp lệ');
                            }
                            return [4 /*yield*/, this.employeeModel
                                    .findById(id)
                                    .populate('department_id')
                                    .populate('designation_id')
                                    .populate('account')
                                    .populate('projectpermission')
                                    .populate('tasks')
                                    .populate({
                                    path: 'team_id',
                                    model: 'Team',
                                    populate: {
                                        path: 'projectid', // Populating project from team
                                        model: 'Project',
                                    },
                                })
                                    .exec()];
                        case 1:
                            employee = _a.sent();
                            if (!employee) {
                                throw new common_1.NotFoundException('Nhân viên không tồn tại');
                            }
                            return [2 /*return*/, employee];
                    }
                });
            });
        };
        EmployeeFactory_1.prototype.getTeamsById = function (employeeId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.teamModel
                            .find({ teamLead: employeeId }) // Find all teams where the employee is the team lead
                            .populate('teamLead') // Populate the team lead (Employee)
                            .populate('projectid') // Populate the project (Project)
                            .exec()];
                });
            });
        };
        EmployeeFactory_1.prototype.getProjectsById = function (employeeId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    try {
                        return [2 /*return*/, this.projectModel
                                .find({
                                assignedPerson: employeeId
                            })
                                .populate('assignedPerson') // Nếu bạn muốn lấy thông tin đầy đủ của nhân viên
                                .exec()];
                    }
                    catch (error) {
                        console.error("Lỗi khi lấy dự án:", error);
                        throw new Error("Không thể lấy dự án");
                    }
                    return [2 /*return*/];
                });
            });
        };
        EmployeeFactory_1.prototype.update = function (employee_id, updateEmployeeDto) {
            return __awaiter(this, void 0, void 0, function () {
                var updatedEmployee;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.employeeModel.findByIdAndUpdate(employee_id, updateEmployeeDto, { new: true }).populate('department_id')
                                .populate('designation_id')
                                .populate('team_id')
                                .populate('account')];
                        case 1:
                            updatedEmployee = _a.sent();
                            if (!updatedEmployee) {
                                throw new common_1.NotFoundException('Nhân viên không tồn tại');
                            }
                            return [2 /*return*/, updatedEmployee];
                    }
                });
            });
        };
        EmployeeFactory_1.prototype.delete = function (employee_id) {
            return __awaiter(this, void 0, void 0, function () {
                var deletedEmployee;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.employeeModel.findByIdAndDelete(employee_id)];
                        case 1:
                            deletedEmployee = _a.sent();
                            if (!deletedEmployee) {
                                throw new common_1.NotFoundException('Nhân viên không tồn tại');
                            }
                            return [2 /*return*/, deletedEmployee];
                    }
                });
            });
        };
        EmployeeFactory_1.prototype.getProfileFromToken = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                var employee;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!email) {
                                throw new common_1.UnauthorizedException("Không có email trong request");
                            }
                            console.log("🔍 Đang tìm kiếm nhân viên với email:", email);
                            return [4 /*yield*/, this.getByUsernameOrEmail(email)];
                        case 1:
                            employee = _a.sent();
                            if (!employee) {
                                throw new common_1.UnauthorizedException("Không tìm thấy thông tin nhân viên");
                                throw new common_1.UnauthorizedException("Không tìm thấy thông tin nhân viên");
                            }
                            return [2 /*return*/, employee];
                    }
                });
            });
        };
        EmployeeFactory_1.prototype.removeTeam = function (employeeId, teamId) {
            return __awaiter(this, void 0, void 0, function () {
                var employee, currentTeamIds, isInTeam, updatedTeamIds, updatedEmployee, verifiedEmployee, error_1;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 4, , 5]);
                            // Log thông tin input
                            console.log('Removing team from employee:', {
                                employeeId: employeeId,
                                teamId: teamId,
                                timestamp: '2025-02-28 07:53:05'
                            });
                            // Validate IDs
                            if (!mongoose_1.Types.ObjectId.isValid(employeeId) || !mongoose_1.Types.ObjectId.isValid(teamId)) {
                                throw new common_1.BadRequestException('ID không hợp lệ');
                            }
                            return [4 /*yield*/, this.employeeModel.findById(employeeId)];
                        case 1:
                            employee = _b.sent();
                            if (!employee) {
                                throw new common_1.NotFoundException('Employee không tồn tại');
                            }
                            currentTeamIds = employee.team_id || [];
                            console.log('Current team IDs:', currentTeamIds.map(function (id) { return id.toString(); }));
                            isInTeam = currentTeamIds.some(function (id) { return id.toString() === teamId; });
                            if (!isInTeam) {
                                throw new common_1.BadRequestException('Employee không thuộc team này');
                            }
                            updatedTeamIds = currentTeamIds.filter(function (id) { return id.toString() !== teamId; });
                            console.log('Updated team IDs:', updatedTeamIds.map(function (id) { return id.toString(); }));
                            return [4 /*yield*/, this.employeeModel.findByIdAndUpdate(employeeId, {
                                    $set: {
                                        team_id: updatedTeamIds,
                                        lastModifiedAt: '2025-02-28 07:53:05',
                                        lastModifiedBy: 'HMK1510'
                                    }
                                }, {
                                    new: true,
                                    runValidators: true
                                }).populate(['department_id', 'designation_id', 'team_id', 'account'])];
                        case 2:
                            updatedEmployee = _b.sent();
                            if (!updatedEmployee) {
                                throw new common_1.BadRequestException('Không thể cập nhật thông tin employee');
                            }
                            return [4 /*yield*/, this.employeeModel.findById(employeeId)];
                        case 3:
                            verifiedEmployee = _b.sent();
                            console.log('Verification after update:', {
                                id: verifiedEmployee === null || verifiedEmployee === void 0 ? void 0 : verifiedEmployee._id,
                                teams: (_a = verifiedEmployee === null || verifiedEmployee === void 0 ? void 0 : verifiedEmployee.team_id) === null || _a === void 0 ? void 0 : _a.map(function (id) { return id.toString(); })
                            });
                            return [2 /*return*/, updatedEmployee];
                        case 4:
                            error_1 = _b.sent();
                            console.error('Error removing team from employee:', {
                                error: error_1.message,
                                stack: error_1.stack,
                                employeeId: employeeId,
                                teamId: teamId
                            });
                            if (error_1 instanceof common_1.BadRequestException || error_1 instanceof common_1.NotFoundException) {
                                throw error_1;
                            }
                            throw new common_1.BadRequestException('Không thể xóa team khỏi employee. Vui lòng thử lại sau.');
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        EmployeeFactory_1.prototype.getByTeamId = function (teamId) {
            return __awaiter(this, void 0, void 0, function () {
                var employees, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Validate teamId format
                            if (!mongoose_1.Types.ObjectId.isValid(teamId)) {
                                throw new common_1.NotFoundException('Team ID không hợp lệ');
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.employeeModel
                                    .find({ team_id: teamId })
                                    .populate([
                                    {
                                        path: 'department_id',
                                        select: 'departmentName description'
                                    },
                                    {
                                        path: 'designation_id',
                                        select: 'designationName description'
                                    },
                                    {
                                        path: 'account',
                                        select: 'userName email' // Exclude sensitive data like password
                                    },
                                    {
                                        path: 'team_id',
                                        select: 'teamName teamLead projectid'
                                    },
                                    {
                                        path: 'projectpermission',
                                        select: 'projectid permissions'
                                    }
                                ])
                                    .exec()];
                        case 2:
                            employees = _a.sent();
                            // Log the operation for audit purposes
                            console.log("[".concat(new Date('2025-02-25 10:01:46').toISOString(), "] User HMK1510 retrieved ").concat(employees.length, " employees for team ").concat(teamId));
                            // Return the Employee documents directly
                            return [2 /*return*/, employees];
                        case 3:
                            error_2 = _a.sent();
                            console.error('Error fetching employees by team ID:', error_2);
                            throw new common_1.NotFoundException('Không thể tìm thấy nhân viên cho team này. Vui lòng thử lại sau.');
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return EmployeeFactory_1;
    }());
    __setFunctionName(_classThis, "EmployeeFactory");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EmployeeFactory = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EmployeeFactory = _classThis;
}();
exports.EmployeeFactory = EmployeeFactory;
