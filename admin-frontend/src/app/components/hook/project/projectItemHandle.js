"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProjectActions = void 0;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var useProjectActions = function (projectId) {
    var router = (0, navigation_1.useRouter)();
    var _a = (0, react_1.useState)(false), isEditModalOpen = _a[0], setIsEditModalOpen = _a[1];
    var handleAddProgress = function () {
        router.push("/List/progress?projectId=".concat(projectId));
    };
    var handleEdit = function () {
        setIsEditModalOpen(true);
    };
    return {
        isEditModalOpen: isEditModalOpen,
        setIsEditModalOpen: setIsEditModalOpen,
        handleAddProgress: handleAddProgress,
        handleEdit: handleEdit,
    };
};
exports.useProjectActions = useProjectActions;
