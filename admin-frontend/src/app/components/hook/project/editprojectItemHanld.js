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
exports.useEditProjectItem = void 0;
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var react_toastify_1 = require("react-toastify");
var navigation_1 = require("next/navigation");
var editprojectCommand_1 = require("@/app/components/command/project/editprojectCommand");
var useEditProjectItem = function (projectId, onClose) {
    var _a = (0, react_hook_form_1.useForm)(), register = _a.register, handleSubmit = _a.handleSubmit, setValue = _a.setValue, errors = _a.formState.errors;
    var _b = (0, react_1.useState)(null), file = _b[0], setFile = _b[1];
    var _c = (0, react_1.useState)([]), categories = _c[0], setCategories = _c[1];
    var _d = (0, react_1.useState)([]), notifications = _d[0], setNotifications = _d[1];
    var _e = (0, react_1.useState)([]), employees = _e[0], setEmployees = _e[1];
    var _f = (0, react_1.useState)(null), projectData = _f[0], setProjectData = _f[1];
    var _g = (0, react_1.useState)(null), existingImage = _g[0], setExistingImage = _g[1];
    var _h = (0, react_1.useState)(false), isSubmitting = _h[0], setIsSubmitting = _h[1];
    var router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(function () {
        var loadProject = function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, project, categories_1, employees_1, notifications_1, formatDate, err_1;
            var _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, editprojectCommand_1.fetchProjectData)(projectId)];
                    case 1:
                        _a = _e.sent(), project = _a.project, categories_1 = _a.categories, employees_1 = _a.employees, notifications_1 = _a.notifications;
                        setProjectData(project);
                        setExistingImage(project.projectImage || null);
                        formatDate = function (isoString) { return isoString === null || isoString === void 0 ? void 0 : isoString.split('T')[0]; };
                        setValue('projectName', project.projectName);
                        setValue('projectStart', formatDate(project.projectStart));
                        setValue('projectEnd', formatDate(project.projectEnd));
                        setValue('budget', project.budget);
                        setValue('priority', project.priority);
                        setValue('description', project.description || '');
                        setValue('projectCategory', ((_b = project.projectCategory) === null || _b === void 0 ? void 0 : _b._id) || '');
                        setValue('notificationSent', ((_c = project.notificationSent) === null || _c === void 0 ? void 0 : _c._id) || '');
                        setValue('assignedPerson', ((_d = project.assignedPerson) === null || _d === void 0 ? void 0 : _d._id) || '');
                        setCategories(categories_1);
                        setEmployees(employees_1);
                        setNotifications(notifications_1);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _e.sent();
                        react_toastify_1.toast.error('Failed to load project data');
                        console.error("Fetch Data Error:", err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        loadProject();
    }, [projectId, setValue]);
    var onFileChange = function (e) {
        var _a;
        if ((_a = e.target.files) === null || _a === void 0 ? void 0 : _a.length) {
            setFile(e.target.files[0]);
        }
    };
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isSubmitting)
                        return [2 /*return*/];
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, (0, editprojectCommand_1.updateProject)(projectId, data, file, existingImage)];
                case 2:
                    _a.sent();
                    react_toastify_1.toast.success('Project updated successfully');
                    onClose();
                    router.refresh();
                    return [3 /*break*/, 5];
                case 3:
                    err_2 = _a.sent();
                    react_toastify_1.toast.error('Failed to load project data');
                    console.error("Fetch Data Error:", err_2);
                    return [3 /*break*/, 5];
                case 4:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return {
        register: register,
        handleSubmit: handleSubmit,
        onSubmit: onSubmit,
        errors: errors,
        file: file,
        onFileChange: onFileChange,
        categories: categories,
        notifications: notifications,
        employees: employees,
        projectData: projectData,
        existingImage: existingImage,
        isSubmitting: isSubmitting,
    };
};
exports.useEditProjectItem = useEditProjectItem;
