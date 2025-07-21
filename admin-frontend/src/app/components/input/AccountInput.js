"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// components/AccountInput.tsx
var react_1 = require("react");
var AccountInput = function (_a) {
    var value = _a.value, onChange = _a.onChange, type = _a.type, placeholder = _a.placeholder;
    return (<input type={type} value={value} onChange={onChange} className="border p-2 rounded mr-2" placeholder={placeholder}/>);
};
exports.default = AccountInput;
