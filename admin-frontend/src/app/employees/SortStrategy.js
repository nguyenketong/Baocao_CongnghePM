"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortByDepartment = exports.SortByName = void 0;
var SortByName = /** @class */ (function () {
    function SortByName() {
    }
    SortByName.prototype.sort = function (employees) {
        return __spreadArray([], employees, true).sort(function (a, b) { return a.employeeName.localeCompare(b.employeeName); });
    };
    return SortByName;
}());
exports.SortByName = SortByName;
var SortByDepartment = /** @class */ (function () {
    function SortByDepartment() {
    }
    SortByDepartment.prototype.sort = function (employees) {
        return __spreadArray([], employees, true).sort(function (a, b) { var _a, _b; return (((_a = a.department_id) === null || _a === void 0 ? void 0 : _a.nameDepartment) || "").localeCompare(((_b = b.department_id) === null || _b === void 0 ? void 0 : _b.nameDepartment) || ""); });
    };
    return SortByDepartment;
}());
exports.SortByDepartment = SortByDepartment;
