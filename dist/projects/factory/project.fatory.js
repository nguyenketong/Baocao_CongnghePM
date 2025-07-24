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
exports.ProjectFactory = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const Project_schema_1 = require("../../schemas/Project.schema");
const mongoose_2 = require("mongoose");
const projectCategories_service_1 = require("../../projectcategories/projectCategories.service");
const notifications_service_1 = require("../../notifications/notifications.service");
const employees_service_1 = require("../../employees/employees.service");
let ProjectFactory = class ProjectFactory {
    constructor(projectModel, projectCategoryService, notificationService, employeeService) {
        this.projectModel = projectModel;
        this.projectCategoryService = projectCategoryService;
        this.notificationService = notificationService;
        this.employeeService = employeeService;
    }
    async create(createProjectDto) {
        const { projectCategory, notificationSent, assignedPerson } = createProjectDto;
        if (projectCategory) {
            const projectCategoryExists = await this.projectCategoryService.getProjectCategoryById(projectCategory);
            if (!projectCategoryExists) {
                throw new common_1.BadRequestException('ProjectCategory không tồn tại');
            }
        }
        if (notificationSent) {
            const notificationExists = await this.notificationService.getNotificationById(notificationSent);
            if (!notificationExists) {
                throw new common_1.BadRequestException('Notification không tồn tại');
            }
        }
        if (assignedPerson) {
            const assignedPersonExists = await this.employeeService.getEmployeeById(assignedPerson);
            if (!assignedPersonExists) {
                throw new common_1.BadRequestException('Employee không tồn tại');
            }
        }
        const newProject = new this.projectModel(createProjectDto);
        return await newProject.save();
    }
    async getAll() {
        return await this.projectModel.aggregate([
            {
                $lookup: {
                    from: 'projectcategories',
                    localField: 'projectCategory',
                    foreignField: '_id',
                    as: 'projectCategory'
                }
            },
            {
                $unwind: {
                    path: '$projectCategory',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'progresses',
                    localField: '_id',
                    foreignField: 'projectid',
                    as: 'progressList'
                }
            },
            {
                $lookup: {
                    from: 'notifications',
                    localField: 'notificationSent',
                    foreignField: '_id',
                    as: 'notificationSent'
                }
            },
            {
                $lookup: {
                    from: 'employees',
                    localField: 'assignedPerson',
                    foreignField: '_id',
                    as: 'assignedPerson'
                }
            },
            {
                $project: {
                    _id: 1,
                    projectName: 1,
                    projectImage: 1,
                    projectStart: 1,
                    projectEnd: 1,
                    budget: 1,
                    priority: 1,
                    description: 1,
                    notificationSent: { $arrayElemAt: ['$notificationSent', 0] },
                    assignedPerson: { $arrayElemAt: ['$assignedPerson', 0] },
                    'projectCategory._id': 1,
                    'projectCategory.projectCategoryName': 1,
                    progressList: 1
                }
            }
        ]).exec();
    }
    async getById(id) {
        const project = await this.projectModel
            .findById(id)
            .populate('projectCategory', 'projectCategoryName')
            .populate('notificationSent')
            .populate('assignedPerson')
            .exec();
        if (!project) {
            throw new common_1.NotFoundException('Project không tồn tại');
        }
        return project;
    }
    async update(id, updateProjectDto) {
        const updatedProject = await this.projectModel.findByIdAndUpdate(id, updateProjectDto, { new: true });
        if (!updatedProject) {
            throw new common_1.NotFoundException('Không tìm thấy Project để cập nhật');
        }
        return updatedProject;
    }
    async delete(id) {
        const deletedProject = await this.projectModel.findByIdAndDelete(id);
        if (!deletedProject) {
            throw new common_1.NotFoundException('Không tìm thấy Project để xóa');
        }
        return deletedProject;
    }
};
exports.ProjectFactory = ProjectFactory;
exports.ProjectFactory = ProjectFactory = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Project_schema_1.Project.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        projectCategories_service_1.ProjectCategoryService,
        notifications_service_1.NotificationService,
        employees_service_1.EmployeeService])
], ProjectFactory);
//# sourceMappingURL=project.fatory.js.map