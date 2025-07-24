import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { AccountService } from "src/accounts/accounts.service";
import { DepartmentService } from "src/departments/departments.service";
import { DesignationService } from "src/designations/designations.service";
import { ProjectPermissionsService } from "src/projectpermissions/projectpermissions.service";
import { Account } from "src/schemas/Account.schema";
import { Employee } from "src/schemas/Employee.schema";
import { Project } from "src/schemas/Project.schema";
import { ProjectPermissions } from "src/schemas/ProjectPermissions.schema";
import { Team } from "src/schemas/Team.schema";
import { CreateEmployeeDto } from "../dto/CreateEmployee.dto";
import { CreateProjectPermissionsDto } from "src/projectpermissions/dto/CreateProjectPermission.dto";
import { UpdateEmployeeDto } from "../dto/UpdateEmployee.dto";

@Injectable()
export class EmployeeFactory {
    constructor(
        @InjectModel(Employee.name) private employeeModel: Model<Employee>,
        @InjectModel(Team.name) private teamModel: Model<Team>,
        @InjectModel(Project.name) private projectModel: Model<Project>,
        @InjectModel(Account.name) private accountModel: Model<Account>,
        @InjectModel(ProjectPermissions.name) private projectPermissionsModel: Model<ProjectPermissions>,
        private departmentService: DepartmentService,
        private designationService: DesignationService,
        private projectPermissionService: ProjectPermissionsService,
        private accountService: AccountService,
    ) { }

    async create({ account, projectpermission, ...createEmployee }: CreateEmployeeDto): Promise<Employee> {
        let savedAccounts: Account | null = null;
        let savedProjectPermissions: Types.ObjectId[] = [];

        // Xử lý tài khoản nếu có
        if (account) {
            const createdAccounts = new this.accountModel(account);
            savedAccounts = await createdAccounts.save();
        }

        // Xử lý danh sách quyền trên dự án nếu có
        if (projectpermission && projectpermission.length > 0) {
            const createdProjectPermissions = await this.projectPermissionsModel.insertMany(projectpermission) as CreateProjectPermissionsDto[];

            // Chuyển đổi _id thành ObjectId và kiểm tra kiểu dữ liệu
            savedProjectPermissions = createdProjectPermissions
                .map(permission => ('_id' in permission ? permission._id : null))
                .filter((id): id is Types.ObjectId => id !== null);
        }

        const { department_id, designation_id } = createEmployee;

        // Kiểm tra department_id hợp lệ
        if (department_id) {
            const departmentExists = await this.departmentService.getDepartmentById(department_id);
            if (!departmentExists) {
                throw new NotFoundException('Department không tồn tại');
            }
        }

        // Kiểm tra designation_id hợp lệ
        if (designation_id) {
            const designationExists = await this.designationService.getDesignationById(designation_id);
            if (!designationExists) {
                throw new NotFoundException('Designation không tồn tại');
            }
        }

        // Tạo nhân viên với dữ liệu đầy đủ
        const newEmployee = new this.employeeModel({
            ...createEmployee,
            account: savedAccounts?._id || null,
            projectpermission: savedProjectPermissions.length > 0 ? savedProjectPermissions : [],
        });

        return newEmployee.save();
    }

    async getByUsernameOrEmail(email: string): Promise<Employee | null> {
        console.log("🔍 Đang tìm kiếm tài khoản với email:", email);

        // Tìm account trước
        const account = await this.accountModel.findOne({ email }).select("_id userName email password");
        if (!account) {
            console.log("❌ Không tìm thấy tài khoản.");
            return null;
        }

        console.log("✅ Tìm thấy tài khoản:", account);

        // Tìm employee có liên kết với account này
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

    async getAll(): Promise<Employee[]> {
        return await this.employeeModel
            .find()
            .populate('department_id')
            .populate('designation_id')
            .populate('account')
            .populate('team_id')
            .populate('projectpermission')
            .exec();
    }

    async getById(id: Types.ObjectId | string): Promise<Employee> {
        if (!Types.ObjectId.isValid(id)) {
            throw new NotFoundException('ID không hợp lệ');
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
                    path: 'projectid', // Populating project from team
                    model: 'Project',
                },

            })
            .exec();

        if (!employee) {
            throw new NotFoundException('Nhân viên không tồn tại');
        }
        return employee;
    }

    async getTeamsById(employeeId: string): Promise<Team[]> {
        return this.teamModel
            .find({ teamLead: employeeId })  // Find all teams where the employee is the team lead
            .populate('teamLead')  // Populate the team lead (Employee)
            .populate('projectid')  // Populate the project (Project)
            .exec();
    }

    async getProjectsById(employeeId: string): Promise<Project[]> {
        try {
            return this.projectModel
                .find({
                    assignedPerson: employeeId
                })
                .populate('assignedPerson') // Nếu bạn muốn lấy thông tin đầy đủ của nhân viên
                .exec();

        } catch (error) {
            console.error("Lỗi khi lấy dự án:", error);
            throw new Error("Không thể lấy dự án");
        }
    }

    async update(employee_id: string, updateEmployeeDto: UpdateEmployeeDto) {
        const updatedEmployee = await this.employeeModel.findByIdAndUpdate(
            employee_id,
            updateEmployeeDto,
            { new: true }
        ).populate('department_id')
            .populate('designation_id')
            .populate('team_id')
            .populate('account');


        if (!updatedEmployee) {
            throw new NotFoundException('Nhân viên không tồn tại');
        }

        return updatedEmployee;
    }

    async delete(employee_id: string): Promise<Employee> {
        const deletedEmployee = await this.employeeModel.findByIdAndDelete(employee_id);
        if (!deletedEmployee) {
            throw new NotFoundException('Nhân viên không tồn tại');
        }
        return deletedEmployee;
    }

    async getProfileFromToken(email: string): Promise<Employee> {
        if (!email) {
            throw new UnauthorizedException("Không có email trong request");
        }

        console.log("🔍 Đang tìm kiếm nhân viên với email:", email);

        const employee = await this.getByUsernameOrEmail(email);
        if (!employee) {
            throw new UnauthorizedException("Không tìm thấy thông tin nhân viên");
            throw new UnauthorizedException("Không tìm thấy thông tin nhân viên");
        }


        return employee;
    }

    async removeTeam(employeeId: string, teamId: string): Promise<Employee> {
        try {
            // Log thông tin input
            console.log('Removing team from employee:', {
                employeeId,
                teamId,
                timestamp: '2025-02-28 07:53:05'
            });

            // Validate IDs
            if (!Types.ObjectId.isValid(employeeId) || !Types.ObjectId.isValid(teamId)) {
                throw new BadRequestException('ID không hợp lệ');
            }

            // Tìm employee
            const employee = await this.employeeModel.findById(employeeId);
            if (!employee) {
                throw new NotFoundException('Employee không tồn tại');
            }

            // Kiểm tra team_id array
            const currentTeamIds = employee.team_id || [];
            console.log('Current team IDs:', currentTeamIds.map(id => id.toString()));

            // Kiểm tra xem employee có thuộc team không
            const isInTeam = currentTeamIds.some(id => id.toString() === teamId);
            if (!isInTeam) {
                throw new BadRequestException('Employee không thuộc team này');
            }

            // Lọc bỏ teamId cần xóa
            const updatedTeamIds = currentTeamIds.filter(
                id => id.toString() !== teamId
            );

            console.log('Updated team IDs:', updatedTeamIds.map(id => id.toString()));

            // Cập nhật trực tiếp vào database
            const updatedEmployee = await this.employeeModel.findByIdAndUpdate(
                employeeId,
                {
                    $set: {
                        team_id: updatedTeamIds,
                        lastModifiedAt: '2025-02-28 07:53:05',
                        lastModifiedBy: 'HMK1510'
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            ).populate(['department_id', 'designation_id', 'team_id', 'account']);

            if (!updatedEmployee) {
                throw new BadRequestException('Không thể cập nhật thông tin employee');
            }

            // Verify update
            const verifiedEmployee = await this.employeeModel.findById(employeeId);
            console.log('Verification after update:', {
                id: verifiedEmployee?._id,
                teams: verifiedEmployee?.team_id?.map(id => id.toString())
            });

            return updatedEmployee;

        } catch (error) {
            console.error('Error removing team from employee:', {
                error: error.message,
                stack: error.stack,
                employeeId,
                teamId
            });

            if (error instanceof BadRequestException || error instanceof NotFoundException) {
                throw error;
            }

            throw new BadRequestException(
                'Không thể xóa team khỏi employee. Vui lòng thử lại sau.'
            );
        }
    }

    async getByTeamId(teamId: string): Promise<Employee[]> {
        // Validate teamId format
        if (!Types.ObjectId.isValid(teamId)) {
            throw new NotFoundException('Team ID không hợp lệ');
        }

        try {
            // Find all employees that have this teamId in their team_id array
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
                .exec();

            // Log the operation for audit purposes
            console.log(`[${new Date('2025-02-25 10:01:46').toISOString()}] User HMK1510 retrieved ${employees.length} employees for team ${teamId}`);

            // Return the Employee documents directly
            return employees;

        } catch (error) {
            console.error('Error fetching employees by team ID:', error);
            throw new NotFoundException(
                'Không thể tìm thấy nhân viên cho team này. Vui lòng thử lại sau.'
            );
        }
    }
}