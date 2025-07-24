import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateProjectDto } from "../dto/CreateProject.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Project } from "src/schemas/Project.schema";
import { Model, Types } from "mongoose";
import { ProjectCategoryService } from "src/projectcategories/projectCategories.service";
import { NotificationService } from "src/notifications/notifications.service";
import { EmployeeService } from "src/employees/employees.service";
import { UpdateProjectDto } from "../dto/UpdateProject.dto";

@Injectable()
export class ProjectFactory {
    constructor(
        @InjectModel(Project.name)
        private projectModel: Model<Project>,
        private projectCategoryService: ProjectCategoryService,
        private notificationService: NotificationService,
        private employeeService: EmployeeService,
    ) { }
    async create(createProjectDto: CreateProjectDto) {
        const { projectCategory, notificationSent, assignedPerson } = createProjectDto;

        if (projectCategory) {
            const projectCategoryExists = await this.projectCategoryService.getProjectCategoryById(projectCategory);
            if (!projectCategoryExists) {
                throw new BadRequestException('ProjectCategory không tồn tại');
            }
        }

        if (notificationSent) {
            const notificationExists = await this.notificationService.getNotificationById(notificationSent);
            if (!notificationExists) {
                throw new BadRequestException('Notification không tồn tại');
            }
        }

        if (assignedPerson) {
            const assignedPersonExists = await this.employeeService.getEmployeeById(assignedPerson);
            if (!assignedPersonExists) {
                throw new BadRequestException('Employee không tồn tại');
            }
        }

        const newProject = new this.projectModel(createProjectDto);
        return await newProject.save();
    }

    async getAll(): Promise<any[]> {
        return await this.projectModel.aggregate([
            {
                $lookup: {
                    from: 'projectcategories', // Make sure this matches your actual collection name for categories
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

    async getById(id: Types.ObjectId | string): Promise<Project> {
        const project = await this.projectModel
            .findById(id)
            .populate('projectCategory', 'projectCategoryName') // Explicitly specify the field we want
            .populate('notificationSent')
            .populate('assignedPerson')
            .exec();

        if (!project) {
            throw new NotFoundException('Project không tồn tại');
        }
        return project;
    }

    async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
        const updatedProject = await this.projectModel.findByIdAndUpdate(id, updateProjectDto, { new: true });
        if (!updatedProject) {
            throw new NotFoundException('Không tìm thấy Project để cập nhật');
        }
        return updatedProject;
    }

    async delete(id: string): Promise<Project> {
        const deletedProject = await this.projectModel.findByIdAndDelete(id);
        if (!deletedProject) {
            throw new NotFoundException('Không tìm thấy Project để xóa');
        }
        return deletedProject;
    }

}