"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCreateProgressItemCommand = void 0;
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var createprogressItemHandle_1 = require("../../hook/progress/createprogressItemHandle");
var useSubmitProgressHandle_1 = require("../../hook/progress/useSubmitProgressHandle");
var useCreateProgressItemCommand = function (projectId, onClose) {
    var _a = (0, react_hook_form_1.useForm)({
        defaultValues: {
            taskAssignPerson: '',
            projectid: projectId !== null && projectId !== void 0 ? projectId : undefined, // Ensure default value is either null or string
        },
    }), register = _a.register, handleSubmit = _a.handleSubmit, errors = _a.formState.errors, reset = _a.reset, setValue = _a.setValue;
    var _b = (0, createprogressItemHandle_1.default)(), categories = _b.categories, notifications = _b.notifications, employees = _b.employees, projects = _b.projects;
    var _c = (0, useSubmitProgressHandle_1.default)(onClose), isSubmitting = _c.isSubmitting, onSubmit = _c.onSubmit;
    (0, react_1.useEffect)(function () {
        // Check if projectId is not undefined or null before calling setValue
        if (projectId !== undefined && projectId !== null) {
            setValue('projectid', projectId); // Set projectId if it's valid
        }
    }, [projectId, setValue]);
    var categoryOptions = categories.map(function (category) { return ({
        value: category._id,
        label: category.progressCategoryName,
    }); });
    var employeeOptions = employees.map(function (employee) { return ({
        value: employee._id,
        label: employee.employeeName,
    }); });
    var notificationOptions = notifications.map(function (notification) { return ({
        value: notification._id,
        label: notification.notification_name,
    }); });
    var projectOptions = projects.map(function (project) { return ({
        value: project._id,
        label: project.projectName,
    }); });
    return {
        register: register,
        handleSubmit: handleSubmit,
        errors: errors,
        reset: reset,
        setValue: setValue,
        isSubmitting: isSubmitting,
        onSubmit: onSubmit,
        projectOptions: projectOptions,
        categoryOptions: categoryOptions,
        notificationOptions: notificationOptions,
        employeeOptions: employeeOptions,
        projects: projects,
    };
};
exports.useCreateProgressItemCommand = useCreateProgressItemCommand;
