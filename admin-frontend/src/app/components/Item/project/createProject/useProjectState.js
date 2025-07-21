"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProjectState = void 0;
var react_1 = require("react");
var useProjectState = function () {
    var _a = (0, react_1.useState)(''), priority = _a[0], setPriority = _a[1];
    var _b = (0, react_1.useState)(null), file = _b[0], setFile = _b[1];
    var onFileChange = function (event) {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };
    return {
        priority: priority,
        setPriority: setPriority,
        file: file,
        setFile: setFile,
        onFileChange: onFileChange
    };
};
exports.useProjectState = useProjectState;
