"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectFactory = void 0;
var common_1 = require("@nestjs/common");
var ProjectFactory = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ProjectFactory = _classThis = /** @class */ (function () {
        function ProjectFactory_1(projectModel, projectCategoryService, notificationService, employeeService) {
            this.projectModel = projectModel;
            this.projectCategoryService = projectCategoryService;
            this.notificationService = notificationService;
            this.employeeService = employeeService;
        }
        ProjectFactory_1.prototype.create = function (createProjectDto) {
            return __awaiter(this, void 0, void 0, function () {
                var projectCategory, notificationSent, assignedPerson, projectCategoryExists, notificationExists, assignedPersonExists, newProject;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            projectCategory = createProjectDto.projectCategory, notificationSent = createProjectDto.notificationSent, assignedPerson = createProjectDto.assignedPerson;
                            if (!projectCategory) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.projectCategoryService.getProjectCategoryById(projectCategory)];
                        case 1:
                            projectCategoryExists = _a.sent();
                            if (!projectCategoryExists) {
                                throw new common_1.BadRequestException('ProjectCategory không tồn tại');
                            }
                            _a.label = 2;
                        case 2:
                            if (!notificationSent) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.notificationService.getNotificationById(notificationSent)];
                        case 3:
                            notificationExists = _a.sent();
                            if (!notificationExists) {
                                throw new common_1.BadRequestException('Notification không tồn tại');
                            }
                            _a.label = 4;
                        case 4:
                            if (!assignedPerson) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.employeeService.getEmployeeById(assignedPerson)];
                        case 5:
                            assignedPersonExists = _a.sent();
                            if (!assignedPersonExists) {
                                throw new common_1.BadRequestException('Employee không tồn tại');
                            }
                            _a.label = 6;
                        case 6:
                            newProject = new this.projectModel(createProjectDto);
                            return [4 /*yield*/, newProject.save()];
                        case 7: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ProjectFactory_1.prototype.getAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.projectModel.aggregate([
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
                            ]).exec()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ProjectFactory_1.prototype.getById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var project;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.projectModel
                                .findById(id)
                                .populate('projectCategory', 'projectCategoryName') // Explicitly specify the field we want
                                .populate('notificationSent')
                                .populate('assignedPerson')
                                .exec()];
                        case 1:
                            project = _a.sent();
                            if (!project) {
                                throw new common_1.NotFoundException('Project không tồn tại');
                            }
                            return [2 /*return*/, project];
                    }
                });
            });
        };
        ProjectFactory_1.prototype.update = function (id, updateProjectDto) {
            return __awaiter(this, void 0, void 0, function () {
                var updatedProject;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.projectModel.findByIdAndUpdate(id, updateProjectDto, { new: true })];
                        case 1:
                            updatedProject = _a.sent();
                            if (!updatedProject) {
                                throw new common_1.NotFoundException('Không tìm thấy Project để cập nhật');
                            }
                            return [2 /*return*/, updatedProject];
                    }
                });
            });
        };
        ProjectFactory_1.prototype.delete = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var deletedProject;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.projectModel.findByIdAndDelete(id)];
                        case 1:
                            deletedProject = _a.sent();
                            if (!deletedProject) {
                                throw new common_1.NotFoundException('Không tìm thấy Project để xóa');
                            }
                            return [2 /*return*/, deletedProject];
                    }
                });
            });
        };
        return ProjectFactory_1;
    }());
    __setFunctionName(_classThis, "ProjectFactory");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProjectFactory = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProjectFactory = _classThis;
}();
exports.ProjectFactory = ProjectFactory;
