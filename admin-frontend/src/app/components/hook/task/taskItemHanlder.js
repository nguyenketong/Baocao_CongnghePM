"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTaskActions = void 0;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var useTaskActions = function (taskId) {
    var router = (0, navigation_1.useRouter)();
    var _a = (0, react_1.useState)(false), isEditModalOpen = _a[0], setIsEditModalOpen = _a[1];
    var handleAddReport = function () {
        router.push("/List/reports?taskId=".concat(taskId));
    };
    var handleEdit = function () {
        setIsEditModalOpen(true);
    };
    return {
        isEditModalOpen: isEditModalOpen,
        setIsEditModalOpen: setIsEditModalOpen,
        handleAddReport: handleAddReport,
        handleEdit: handleEdit,
    };
};
exports.useTaskActions = useTaskActions;
