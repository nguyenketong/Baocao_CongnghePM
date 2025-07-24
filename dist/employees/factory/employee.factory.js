"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeFactory = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const accounts_service_1 = require("../../accounts/accounts.service");
const departments_service_1 = require("../../departments/departments.service");
const designations_service_1 = require("../../designations/designations.service");
const projectpermissions_service_1 = require("../../projectpermissions/projectpermissions.service");
const Account_schema_1 = require("../../schemas/Account.schema");
const Employee_schema_1 = require("../../schemas/Employee.schema");
const Project_schema_1 = require("../../schemas/Project.schema");
const ProjectPermissions_schema_1 = require("../../schemas/ProjectPermissions.schema");
const Team_schema_1 = require("../../schemas/Team.schema");
let EmployeeFactory = class EmployeeFactory {
    constructor(employeeModel, teamModel, projectModel, accountModel, projectPermissionsModel, departmentService, designationService, projectPermissionService, accountService) {
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
    async create({ account, projectpermission, ...createEmployee }) {
        let savedAccounts = null;
        let savedProjectPermissions = [];
        if (account) {
            const createdAccounts = new this.accountModel(account);
            savedAccounts = await createdAccounts.save();
        }
        if (projectpermission && projectpermission.length > 0) {
            const createdProjectPermissions = await this.projectPermissionsModel.insertMany(projectpermission);
            savedProjectPermissions = createdProjectPermissions
                .map(permission => ('_id' in permission ? permission._id : null))
                .filter((id) => id !== null);
        }
        const { department_id, designation_id } = createEmployee;
        if (department_id) {
            const departmentExists = await this.departmentService.getDepartmentById(department_id);
            if (!departmentExists) {
                throw new common_1.NotFoundException('Department không tồn tại');
            }
        }
        if (designation_id) {
            const designationExists = await this.designationService.getDesignationById(designation_id);
            if (!designationExists) {
                throw new common_1.NotFoundException('Designation không tồn tại');
            }
        }
        const newEmployee = new this.employeeModel({
            ...createEmployee,
            account: savedAccounts?._id || null,
            projectpermission: savedProjectPermissions.length > 0 ? savedProjectPermissions : [],
        });
        return newEmployee.save();
    }
    async getByUsernameOrEmail(email) {
        console.log("🔍 Đang tìm kiếm tài khoản với email:", email);
        const account = await this.accountModel.findOne({ email }).select("_id userName email password");
        if (!account) {
            console.log("❌ Không tìm thấy tài khoản.");
            return null;
        }
        console.log("✅ Tìm thấy tài khoản:", account);
        const employee = await this.employeeModel.findOne({ account: account._id })
            .populate(['department_id', 'designation_id', 'team_id', 'projectpermission'])
            .populate({
            path: 'account',
            model: 'Account',
            select: 'userName email password',
        })
            .exec();
        console.log("📌 Dữ liệu nhân viên từ DB:", employee);
        return employee;
    }
    async getAll() {
        return await this.employeeModel
            .find()
            .populate('department_id')
            .populate('designation_id')
            .populate('account')
            .populate('team_id')
            .populate('projectpermission')
            .exec();
    }
    async getById(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('ID không hợp lệ');
        }
        const employee = await this.employeeModel
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
                path: 'projectid',
                model: 'Project',
            },
        })
            .exec();
        if (!employee) {
            throw new common_1.NotFoundException('Nhân viên không tồn tại');
        }
        return employee;
    }
    async getTeamsById(employeeId) {
        return this.teamModel
            .find({ teamLead: employeeId })
            .populate('teamLead')
            .populate('projectid')
            .exec();
    }
    async getProjectsById(employeeId) {
        try {
            return this.projectModel
                .find({
                assignedPerson: employeeId
            })
                .populate('assignedPerson')
                .exec();
        }
        catch (error) {
            console.error("Lỗi khi lấy dự án:", error);
            throw new Error("Không thể lấy dự án");
        }
    }
    async update(employee_id, updateEmployeeDto) {
        const updatedEmployee = await this.employeeModel.findByIdAndUpdate(employee_id, updateEmployeeDto, { new: true }).populate('department_id')
            .populate('designation_id')
            .populate('team_id')
            .populate('account');
        if (!updatedEmployee) {
            throw new common_1.NotFoundException('Nhân viên không tồn tại');
        }
        return updatedEmployee;
    }
    async delete(employee_id) {
        const deletedEmployee = await this.employeeModel.findByIdAndDelete(employee_id);
        if (!deletedEmployee) {
            throw new common_1.NotFoundException('Nhân viên không tồn tại');
        }
        return deletedEmployee;
    }
    async getProfileFromToken(email) {
        if (!email) {
            throw new common_1.UnauthorizedException("Không có email trong request");
        }
        console.log("🔍 Đang tìm kiếm nhân viên với email:", email);
        const employee = await this.getByUsernameOrEmail(email);
        if (!employee) {
            throw new common_1.UnauthorizedException("Không tìm thấy thông tin nhân viên");
            throw new common_1.UnauthorizedException("Không tìm thấy thông tin nhân viên");
        }
        return employee;
    }
    async removeTeam(employeeId, teamId) {
        try {
            console.log('Removing team from employee:', {
                employeeId,
                teamId,
                timestamp: '2025-02-28 07:53:05'
            });
            if (!mongoose_2.Types.ObjectId.isValid(employeeId) || !mongoose_2.Types.ObjectId.isValid(teamId)) {
                throw new common_1.BadRequestException('ID không hợp lệ');
            }
            const employee = await this.employeeModel.findById(employeeId);
            if (!employee) {
                throw new common_1.NotFoundException('Employee không tồn tại');
            }
            const currentTeamIds = employee.team_id || [];
            console.log('Current team IDs:', currentTeamIds.map(id => id.toString()));
            const isInTeam = currentTeamIds.some(id => id.toString() === teamId);
            if (!isInTeam) {
                throw new common_1.BadRequestException('Employee không thuộc team này');
            }
            const updatedTeamIds = currentTeamIds.filter(id => id.toString() !== teamId);
            console.log('Updated team IDs:', updatedTeamIds.map(id => id.toString()));
            const updatedEmployee = await this.employeeModel.findByIdAndUpdate(employeeId, {
                $set: {
                    team_id: updatedTeamIds,
                    lastModifiedAt: '2025-02-28 07:53:05',
                    lastModifiedBy: 'HMK1510'
                }
            }, {
                new: true,
                runValidators: true
            }).populate(['department_id', 'designation_id', 'team_id', 'account']);
            if (!updatedEmployee) {
                throw new common_1.BadRequestException('Không thể cập nhật thông tin employee');
            }
            const verifiedEmployee = await this.employeeModel.findById(employeeId);
            console.log('Verification after update:', {
                id: verifiedEmployee?._id,
                teams: verifiedEmployee?.team_id?.map(id => id.toString())
            });
            return updatedEmployee;
        }
        catch (error) {
            console.error('Error removing team from employee:', {
                error: error.message,
                stack: error.stack,
                employeeId,
                teamId
            });
            if (error instanceof common_1.BadRequestException || error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Không thể xóa team khỏi employee. Vui lòng thử lại sau.');
        }
    }
    async getByTeamId(teamId) {
        if (!mongoose_2.Types.ObjectId.isValid(teamId)) {
            throw new common_1.NotFoundException('Team ID không hợp lệ');
        }
        try {
            const employees = await this.employeeModel
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
                    select: 'userName email'
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
                .exec();
            console.log(`[${new Date('2025-02-25 10:01:46').toISOString()}] User HMK1510 retrieved ${employees.length} employees for team ${teamId}`);
            return employees;
        }
        catch (error) {
            console.error('Error fetching employees by team ID:', error);
            throw new common_1.NotFoundException('Không thể tìm thấy nhân viên cho team này. Vui lòng thử lại sau.');
        }
    }
};
exports.EmployeeFactory = EmployeeFactory;
exports.EmployeeFactory = EmployeeFactory = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Employee_schema_1.Employee.name)),
    __param(1, (0, mongoose_1.InjectModel)(Team_schema_1.Team.name)),
    __param(2, (0, mongoose_1.InjectModel)(Project_schema_1.Project.name)),
    __param(3, (0, mongoose_1.InjectModel)(Account_schema_1.Account.name)),
    __param(4, (0, mongoose_1.InjectModel)(ProjectPermissions_schema_1.ProjectPermissions.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        departments_service_1.DepartmentService,
        designations_service_1.DesignationService,
        projectpermissions_service_1.ProjectPermissionsService,
        accounts_service_1.AccountService])
], EmployeeFactory);
//# sourceMappingURL=employee.factory.js.map