"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = Button;
var react_1 = require("react");
function Button(_a) {
    var label = _a.label, onClick = _a.onClick, _b = _a.variant, variant = _b === void 0 ? "primary" : _b, icon = _a.icon, disabled = _a.disabled;
    var baseStyle = "px-4 py-2 text-white rounded-lg transition flex items-center gap-2";
    var styles = {
        primary: "bg-blue-500 hover:bg-blue-600",
        danger: "bg-red-500 hover:bg-red-600",
    };
    return (<button onClick={onClick} className={"".concat(baseStyle, " ").concat(styles[variant])} disabled={disabled} // Thêm thuộc tính disabled vào button
    >
      {icon} {label}
    </button>);
}
